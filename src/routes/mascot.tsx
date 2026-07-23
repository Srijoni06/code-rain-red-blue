// Alias route: /mascot → same page as /n30
export { Route as _ } from "./n30";
import { createFileRoute } from "@tanstack/react-router";
import { Route as N30Route } from "./n30";

export const Route = createFileRoute("/mascot")({
  head: N30Route.options.head,
  component: N30Route.options.component!,
});
