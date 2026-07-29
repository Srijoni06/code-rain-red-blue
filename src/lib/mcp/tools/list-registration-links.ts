import { defineTool } from "@lovable.dev/mcp-js";

const LINKS = [
  { name: "Hackathon", path: "/hackathon/register", description: "1-day hackathon team registration." },
  { name: "Project Showcase (Attendee)", path: "/showcase/register", description: "Attendee registration for the 6 flagship project showcase." },
  { name: "Project Exhibition", path: "/project-exhibition/register", description: "Open team project exhibition across both days." },
];

export default defineTool({
  name: "list_registration_links",
  title: "List registration links",
  description: "List the Summit's registration paths (hackathon, showcase attendee, project exhibition).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(LINKS, null, 2) }],
    structuredContent: { links: LINKS },
  }),
});
