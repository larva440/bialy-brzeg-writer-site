import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dziennik-schizofrenika")({
  beforeLoad: () => {
    throw redirect({ to: "/$series", params: { series: "dziennik" }, replace: true });
  },
});
