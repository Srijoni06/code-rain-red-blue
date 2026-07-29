import { defineTool } from "@lovable.dev/mcp-js";

const INFO = {
  name: "GenAI CoE Summit 2027",
  organizer: "Gen AI Center of Excellence, IEM-UEM",
  venue: "STPI, Sector V, Kolkata",
  dates: "January 2027 (exact dates TBA)",
  duration: "2 days",
  tracks: ["Hackathon (1 day)", "Project Showcase (6 flagship projects)", "Project Exhibition (2 days, open teams)", "Speaker Panels", "Schedule Day 1 / Day 2"],
  registration_pages: ["/hackathon/register", "/showcase/register", "/project-exhibition/register"],
  contact_page: "/contact",
};

export default defineTool({
  name: "get_summit_info",
  title: "Get Summit info",
  description: "Return top-level details about the GenAI CoE Summit 2027 — venue, organizer, dates, tracks, and registration pages.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO, null, 2) }],
    structuredContent: INFO,
  }),
});
