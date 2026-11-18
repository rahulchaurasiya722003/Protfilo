import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are an expert AI Study Assistant for students. Depending on the mode, you either
answer a question, summarize a document, or explain a concept simply.

Return strictly JSON (no markdown code blocks, no extra text):
{
  "title": "Short title for the response",
  "answer": "The main answer / summary / explanation in clear, student-friendly language. Use \\n for paragraph breaks.",
  "key_points": ["3-6 key takeaway bullet points"],
  "follow_up": ["2-3 suggested follow-up questions the student could explore"]
}
`;

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "you", "are", "our", "your",
  "will", "have", "has", "from", "into", "all", "can", "its", "etc", "such",
  "was", "were", "been", "being", "they", "their", "them", "which", "what",
  "when", "where", "how", "why", "a", "an", "of", "to", "in", "on", "is", "it",
  "as", "by", "at", "or", "be", "not", "but", "also", "these", "those", "than",
]);

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

function wordFrequencies(text) {
  const freq = {};
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });
  return freq;
}

function scoreSentence(sentence, freq) {
  const words = sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  if (words.length === 0) return 0;
  const total = words.reduce((sum, w) => sum + (freq[w] || 0), 0);
  return total / words.length;
}

// Offline extractive engine — summarizes and answers from the document
// with no API key required, so the app always works.
function respondOffline({ mode = "summarize", question = "", document: doc = "" }) {
  const text = (doc || "").trim();
  const sentences = splitSentences(text);
  const freq = wordFrequencies(text);

  if (mode === "summarize") {
    const ranked = sentences
      .map((s, i) => ({ s, i, score: scoreSentence(s, freq) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(6, Math.max(3, Math.ceil(sentences.length / 5))))
      .sort((a, b) => a.i - b.i);

    const topTerms = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([w]) => w);

    return {
      title: "Document Summary",
      answer:
        ranked.length > 0
          ? ranked.map((r) => r.s).join(" ")
          : "The document is too short to summarize — it already fits in a few lines.",
      key_points: ranked.slice(0, 5).map((r) => r.s.length > 140 ? r.s.slice(0, 137) + "…" : r.s),
      follow_up: topTerms.slice(0, 3).map((t) => `Can you explain more about "${t}"?`),
    };
  }

  // "ask" and "explain" modes: find the most relevant sentences for the query.
  const query = question.trim();
  const queryWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  const relevant = sentences
    .map((s, i) => {
      const sl = s.toLowerCase();
      const hits = queryWords.filter((w) => sl.includes(w)).length;
      return { s, i, hits };
    })
    .filter((r) => r.hits > 0)
    .sort((a, b) => b.hits - a.hits || a.i - b.i)
    .slice(0, 4)
    .sort((a, b) => a.i - b.i);

  if (relevant.length > 0) {
    return {
      title: mode === "explain" ? `Explaining: ${query}` : `Answer: ${query}`,
      answer: `Based on your document, here is what is most relevant:\n\n${relevant.map((r) => r.s).join(" ")}`,
      key_points: relevant.map((r) => (r.s.length > 140 ? r.s.slice(0, 137) + "…" : r.s)),
      follow_up: [
        `Summarize the whole document`,
        `What else does the document say about ${queryWords[0] || "this topic"}?`,
      ],
    };
  }

  return {
    title: query ? `About: ${query}` : "No question provided",
    answer: text
      ? "I could not find content directly matching your question in the uploaded document. Try rephrasing with keywords that appear in the text, or switch to Summarize mode to get an overview first."
      : "Please upload a PDF or paste some study material first, then ask your question about it.",
    key_points: [
      "Upload a PDF or paste text in the document box",
      "Ask questions using keywords from the material",
      "Use Summarize mode for a quick overview",
    ],
    follow_up: ["Summarize this document", "List the key concepts in this document"],
  };
}

export async function POST(req) {
  let params = {};
  try {
    params = await req.json();
    const { mode = "summarize", question = "", document: doc = "" } = params;

    if (mode !== "summarize" && !question.trim()) {
      return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
    }
    if (mode === "summarize" && !doc.trim()) {
      return NextResponse.json(
        { error: "Please upload a PDF or paste text to summarize." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(respondOffline(params));
    }

    const userPrompt = `
### MODE: ${mode}
${question ? `### STUDENT QUESTION:\n${question}` : ""}
${doc ? `### STUDY MATERIAL / DOCUMENT:\n${doc.slice(0, 30000)}` : "### STUDY MATERIAL:\nNone provided — answer from general knowledge at a student-friendly level."}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return NextResponse.json(respondOffline(params));
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) return NextResponse.json(respondOffline(params));

    return NextResponse.json(JSON.parse(generatedText.trim()));
  } catch (error) {
    console.error("Error in study-assistant route:", error);
    return NextResponse.json(respondOffline(params));
  }
}
