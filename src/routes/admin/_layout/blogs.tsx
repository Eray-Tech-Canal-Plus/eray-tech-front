import { createFileRoute } from "@tanstack/react-router";
import Blogs from "@/admin/pages/Blogs";

export const Route = createFileRoute("/admin/_layout/blogs")({
  component: Blogs,
});
