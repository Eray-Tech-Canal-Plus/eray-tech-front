import { createFileRoute } from "@tanstack/react-router";
import ErayTechBlog from "@/components/blog/BlogPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Eray Tech" },
      { name: "description", content: "Actualités, guides et conseils tech par Eray Tech." },
    ],
  }),
  component: BlogRoute,
});

function BlogRoute() {
  return (
    <div className="theme-blog">
      <ErayTechBlog />
    </div>
  );
}