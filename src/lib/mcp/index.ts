import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getSummitInfo from "./tools/get-summit-info";
import listRegistrationLinks from "./tools/list-registration-links";

// Managed Cloud OAuth issuer must be the direct Supabase host (not the .lovable.cloud proxy).
// VITE_SUPABASE_PROJECT_ID is inlined at build time.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "genai-coe-summit-mcp",
  title: "GenAI CoE Summit 2027",
  version: "0.1.0",
  instructions:
    "Tools describing the GenAI CoE Summit 2027 (IEM-UEM, STPI Sector V Kolkata). Use these to answer questions about the event, tracks, venue, and registration links. Callers act as a signed-in Summit user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getSummitInfo, listRegistrationLinks],
});
