"use client";

import Project from "@/views/SingleProject/SingleProject";
import { useParams, useSearchParams } from "next/navigation";

export default function ProjectDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectSlug = params?.["project-id"];
  const isAdmin = searchParams ? searchParams.get("admin") === "true" : false;

  return <Project projectSlug={projectSlug as string} isAdmin={isAdmin} />;
}
