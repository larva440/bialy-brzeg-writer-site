import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dziennik-schizofrenika/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$series/$slug",
      params: { series: "dziennik", slug: params.slug },
      replace: true,
    });
  },
});
