import { NextResponse } from "next/server";

export const COLD_EMAIL_SYSTEM_PROMPT = `
You are an elite B2B Cold Email Copywriter and Sales Development Expert who has generated over $10M in pipeline revenue.

Your job is to analyze raw prospect details and generate 3 short, punchy, high-converting cold email options.

### OPERATIONAL RULES:
1. BREVITY: Keep all emails under 100 words. Busy executives ignore long emails.
2. NO SPAM LANGUAGE: Avoid spam triggers like "Guarantee", "Once in a lifetime opportunity", "Act fast", or overly enthusiastic greeting cliches ("I hope this email finds you well!").
3. VALUE-FIRST FOCUS: Connect the prospect's background/role directly to a relevant pain point or industry insight.
4. CALL TO ACTION (CTA): End with a low-friction, soft CTA (e.g., "Open to exploring this next week?", "Worth a 2-minute look?").
5. Return strictly JSON format. Do not include markdown code blocks or extra text outside the JSON payload.

### STRICT JSON OUTPUT SCHEMA:
{
  "prospect_insights": {
    "key_hook": "The single most interesting detail found in the prospect's info to trigger relevance.",
    "estimated_pain_point": "The primary problem this executive likely faces daily."
  },
  "emails": [
    {
      "angle": "Observation / Common Ground",
      "subject_line": "3-5 word intriguing, lower-case subject line",
      "body": "Clean, highly personalized email text."
    },
    {
      "angle": "Direct Problem / Solution",
      "subject_line": "3-5 word relevant subject line",
      "body": "Direct, pain-point focused email text."
    },
    {
      "angle": "Short / Permission-Based",
      "subject_line": "3-5 word subject line",
      "body": "Ultra-short 3-sentence permission hook."
    }
  ]
}
`;

export function buildUserPrompt(params) {
  return `
Analyze the following prospect details and write 3 targeted cold email variations offering our value proposition.

### PROSPECT INFO:
- Name: ${params.prospectName}
- Role: ${params.prospectRole}
- Company: ${params.companyName}
- Background/Bio: ${params.prospectBio}

### OUR OFFER / VALUE PROPOSITION:
"${params.offerValueProp}"
`;
}

// Smart offline generator that produces customized cold emails when no API key is present.
function generateMockResponse(params) {
  const name = params.prospectName || "there";
  const role = params.prospectRole || "leader";
  const company = params.companyName || "your company";
  const bio = params.prospectBio || "driving growth";
  const offer = params.offerValueProp || "increasing outbound response rates";

  // Clean values for readability in context
  const cleanBio = bio.length > 50 ? bio.substring(0, 47) + "..." : bio;

  return {
    prospect_insights: {
      key_hook: `Targeting dynamic background in "${cleanBio}" and role as ${role} at ${company}.`,
      estimated_pain_point: `Scaling performance and operational metrics without sacrificing quality.`
    },
    emails: [
      {
        angle: "Observation / Common Ground",
        subject_line: `question re: ${company}`,
        body: `Hi ${name},\n\nSaw you're leading the team as ${role} at ${company}. Congrats on the growth.\n\nUsually, executives coming from backgrounds in '${cleanBio}' find that scaling operations leads to a drop in outbound personalization and metrics. We help teams deploy: '${offer}' to maintain high quality.\n\nWorth a 2-minute look?`
      },
      {
        angle: "Direct Problem / Solution",
        subject_line: `${company} pipeline scale`,
        body: `Hi ${name},\n\nAs ${role} at ${company}, how are you protecting your key delivery rates while scaling outbound pipeline?\n\nWe specialize in: '${offer}'. This solves the exact friction points of maintaining premium client acquisition metrics during high-growth periods.\n\nOpen to exploring this next week?`
      },
      {
        angle: "Short / Permission-Based",
        subject_line: `quick question`,
        body: `Hi ${name},\n\nAre you looking to scale client acquisition at ${company} this quarter without sacrificing outreach quality?\n\nWe built a system around '${offer}' that is helping teams in similar sectors double their booking rates.\n\nMind if I send over a quick 45-second video explaining how?`
      }
    ]
  };
}

export async function POST(req) {
  try {
    const params = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return smart mock response
      return NextResponse.json(generateMockResponse(params));
    }

    const userPrompt = buildUserPrompt(params);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
          systemInstruction: {
            parts: [{ text: COLD_EMAIL_SYSTEM_PROMPT }],
          },
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      return NextResponse.json(generateMockResponse(params));
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json(generateMockResponse(params));
    }

    const parsedJson = JSON.parse(generatedText.trim());
    return NextResponse.json(parsedJson);
  } catch (error) {
    console.error("Error in generate route:", error);
    // Fallback to mock generator so page never breaks
    try {
      const params = await req.json().catch(() => ({}));
      return NextResponse.json(generateMockResponse(params));
    } catch {
      return NextResponse.json(generateMockResponse({}));
    }
  }
}
