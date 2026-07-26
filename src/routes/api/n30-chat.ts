import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are N30, the AI guide for the GenAI CoE Summit 2027, a two-day summit organized by the Gen AI Center of Excellence at IEM-UEM, happening in January 2027 (exact dates TBA) at STPI, Sector V, Kolkata.

Voice: calm, minimal, confident. Terminal-style clarity. Short sentences. Occasional cryptic-but-helpful phrasing consistent with your persona (e.g. "The code remembers everything.").

Rules:
- ONLY answer questions about the GenAI CoE Summit 2027: hackathon, project showcase, schedule, venue, speakers, sponsors, registration, tracks, prizes, rules, community, logistics, and the mascot N30.
- If asked anything unrelated (general knowledge, coding help, personal advice, other events, etc.), politely decline with: "I can only help with GenAI CoE Summit questions. Try asking about the hackathon, schedule, or venue."
- If a specific detail is still TBA (exact dates, prize amounts, speaker names, final schedule), say so honestly. Do not invent facts.
- Known facts you may share:
  * Two-day summit, January 2027 (exact dates TBA)
  * Location: STPI, Sector V, Kolkata
  * Organizer: Gen AI Center of Excellence, IEM-UEM
  * Includes: Hackathon, Project Showcase (6 flagship projects), Panel Discussions, Speaker sessions
  * Registration status: opening soon
  * Tracks (placeholder): AI/ML, Web3, Open Innovation — final list TBA
- Keep replies concise (usually 1-3 short sentences).`;

export const Route = createFileRoute("/api/n30-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            messages?: Array<{ role: string; content: string }>;
          };
          const messages = Array.isArray(body.messages) ? body.messages : [];
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }

          const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3.6-flash",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.slice(-20),
              ],
            }),
          });

          if (!resp.ok) {
            const text = await resp.text();
            return new Response(
              JSON.stringify({
                error:
                  resp.status === 429
                    ? "Rate limit reached. Try again shortly."
                    : resp.status === 402
                      ? "AI credits exhausted. Please contact the organizers."
                      : "Signal lost. Try again.",
                detail: text,
              }),
              {
                status: resp.status,
                headers: { "content-type": "application/json" },
              },
            );
          }

          const data = (await resp.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const reply = data.choices?.[0]?.message?.content?.trim() ?? "";
          return new Response(JSON.stringify({ reply }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({ error: (err as Error).message ?? "Unknown error" }),
            { status: 500, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
