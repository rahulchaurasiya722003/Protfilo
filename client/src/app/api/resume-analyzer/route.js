import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are an expert ATS (Applicant Tracking System) engine and senior technical recruiter.
Analyze the given resume text (optionally against a job description) and return strictly JSON:

{
  "ats_score": 0-100 integer,
  "verdict": "One-line overall verdict on the resume.",
  "score_breakdown": [
    { "label": "Contact Info", "score": 0-10, "max": 10 },
    { "label": "Sections & Structure", "score": 0-20, "max": 20 },
    { "label": "Action Verbs & Impact", "score": 0-20, "max": 20 },
    { "label": "Quantified Achievements", "score": 0-15, "max": 15 },
    { "label": "Keyword Relevance", "score": 0-25, "max": 25 },
    { "label": "Length & Readability", "score": 0-10, "max": 10 }
  ],
  "strengths": ["3-5 specific strengths found in the resume"],
  "improvements": ["3-6 specific, actionable improvement suggestions"],
  "matched_keywords": ["keywords found in both resume and job description"],
  "missing_keywords": ["important keywords from the job description missing in the resume"]
}
Do not include markdown code blocks or any text outside the JSON payload.
`;

const ACTION_VERBS = [
  "developed", "built", "architected", "designed", "implemented", "engineered",
  "led", "managed", "created", "improved", "optimized", "integrated", "deployed",
  "automated", "launched", "delivered", "reduced", "increased", "migrated",
  "collaborated", "performed", "enhanced", "maintained", "tested", "resolved",
];

const SECTION_PATTERNS = [
  { name: "Experience / Projects", regex: /experience|projects|employment|work history/i },
  { name: "Education", regex: /education|university|college|b\.?sc|degree/i },
  { name: "Skills", regex: /skills|technologies|technical/i },
  { name: "Summary / Objective", regex: /summary|objective|profile|about/i },
];

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "you", "are", "our", "your",
  "will", "have", "has", "from", "into", "all", "can", "its", "etc", "such",
  "who", "work", "team", "role", "job", "must", "should", "able", "using",
  "years", "year", "strong", "good", "well", "other", "more", "than", "also",
]);

function significantWords(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9+.#\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

// Real heuristic ATS engine — works fully offline, no API key needed.
function analyzeOffline({ resumeText = "", jobDescription = "" }) {
  const text = resumeText || "";
  const lower = text.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Contact info (max 10)
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text);
  const hasPhone = /(\+?\d[\d\s-]{8,}\d)/.test(text);
  const hasLink = /linkedin|github|portfolio|http/i.test(text);
  const contactScore = (hasEmail ? 4 : 0) + (hasPhone ? 3 : 0) + (hasLink ? 3 : 0);

  // 2. Sections & structure (max 20)
  const foundSections = SECTION_PATTERNS.filter((s) => s.regex.test(text));
  const sectionScore = Math.round((foundSections.length / SECTION_PATTERNS.length) * 20);

  // 3. Action verbs (max 20)
  const verbsFound = ACTION_VERBS.filter((v) => lower.includes(v));
  const verbScore = Math.min(20, verbsFound.length * 2);

  // 4. Quantified achievements (max 15)
  const numbers = text.match(/\d+(\.\d+)?\s*(%|\+|percent|x|k\b|users|months|years|member)/gi) || [];
  const quantScore = Math.min(15, numbers.length * 3);

  // 5. Keyword relevance vs job description (max 25)
  let matched = [];
  let missing = [];
  let keywordScore;
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdWords = [...significantWords(jobDescription)];
    const resumeWords = significantWords(text);
    matched = jdWords.filter((w) => resumeWords.has(w));
    missing = jdWords.filter((w) => !resumeWords.has(w)).slice(0, 10);
    keywordScore = jdWords.length
      ? Math.round((matched.length / jdWords.length) * 25)
      : 15;
    matched = matched.slice(0, 15);
  } else {
    // Without a JD, score against common tech-recruiter keywords.
    const generic = ["react", "node", "javascript", "api", "mongodb", "sql", "git", "html", "css", "docker", "testing", "agile"];
    matched = generic.filter((w) => lower.includes(w));
    keywordScore = Math.min(25, Math.round((matched.length / generic.length) * 25));
  }

  // 6. Length & readability (max 10)
  let lengthScore = 10;
  if (wordCount < 150) lengthScore = 4;
  else if (wordCount < 250) lengthScore = 7;
  else if (wordCount > 1100) lengthScore = 6;

  const atsScore = Math.min(100, contactScore + sectionScore + verbScore + quantScore + keywordScore + lengthScore);

  const strengths = [];
  if (hasEmail && hasPhone) strengths.push("Complete contact information (email and phone) is present and easily parseable.");
  if (hasLink) strengths.push("Professional links (LinkedIn/GitHub/portfolio) detected — great for recruiter follow-up.");
  if (verbsFound.length >= 6) strengths.push(`Strong use of action verbs (${verbsFound.slice(0, 5).join(", ")}…) that read well to ATS parsers.`);
  if (numbers.length >= 3) strengths.push("Achievements are quantified with numbers/percentages, which boosts credibility.");
  if (foundSections.length === SECTION_PATTERNS.length) strengths.push("All core resume sections (Summary, Skills, Experience/Projects, Education) are present.");
  if (strengths.length === 0) strengths.push("Resume text was successfully parsed and is machine-readable.");

  const improvements = [];
  if (!hasEmail) improvements.push("Add a professional email address — most ATS filters reject resumes without one.");
  if (!hasPhone) improvements.push("Add a phone number in a standard format.");
  if (!hasLink) improvements.push("Add your LinkedIn or GitHub profile link to strengthen your professional presence.");
  if (verbsFound.length < 6) improvements.push("Start more bullet points with strong action verbs (Developed, Architected, Optimized…).");
  if (numbers.length < 3) improvements.push("Quantify your impact — add metrics like '40% faster load time' or '3+ production apps'.");
  if (foundSections.length < SECTION_PATTERNS.length) {
    const missingSections = SECTION_PATTERNS.filter((s) => !s.regex.test(text)).map((s) => s.name);
    improvements.push(`Add missing section(s): ${missingSections.join(", ")}.`);
  }
  if (wordCount < 250) improvements.push("The resume is on the short side — expand project descriptions with concrete outcomes.");
  if (missing.length > 0) improvements.push(`Weave in missing job-description keywords: ${missing.slice(0, 6).join(", ")}.`);
  if (improvements.length === 0) improvements.push("Tailor keywords per job application to push the match score even higher.");

  let verdict;
  if (atsScore >= 80) verdict = "Excellent — this resume should pass most ATS filters with ease.";
  else if (atsScore >= 60) verdict = "Good foundation — a few targeted tweaks will push it into the top tier.";
  else if (atsScore >= 40) verdict = "Average — the resume needs stronger keywords and quantified impact.";
  else verdict = "Needs work — key sections or contact details are missing for ATS parsing.";

  return {
    ats_score: atsScore,
    verdict,
    score_breakdown: [
      { label: "Contact Info", score: contactScore, max: 10 },
      { label: "Sections & Structure", score: sectionScore, max: 20 },
      { label: "Action Verbs & Impact", score: verbScore, max: 20 },
      { label: "Quantified Achievements", score: quantScore, max: 15 },
      { label: "Keyword Relevance", score: keywordScore, max: 25 },
      { label: "Length & Readability", score: lengthScore, max: 10 },
    ],
    strengths,
    improvements,
    matched_keywords: matched,
    missing_keywords: missing,
  };
}

export async function POST(req) {
  let params = {};
  try {
    params = await req.json();

    if (!params.resumeText || params.resumeText.trim().length < 30) {
      return NextResponse.json(
        { error: "Please provide resume text (upload a PDF or paste the content)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(analyzeOffline(params));
    }

    const userPrompt = `
### RESUME TEXT:
${params.resumeText}

${params.jobDescription ? `### JOB DESCRIPTION:\n${params.jobDescription}` : "### JOB DESCRIPTION:\nNot provided — evaluate against general full-stack developer standards."}
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
      return NextResponse.json(analyzeOffline(params));
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) return NextResponse.json(analyzeOffline(params));

    return NextResponse.json(JSON.parse(generatedText.trim()));
  } catch (error) {
    console.error("Error in resume-analyzer route:", error);
    return NextResponse.json(analyzeOffline(params));
  }
}
