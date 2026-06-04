import { useQuery } from "@tanstack/react-query";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  liveUrl: string | null;
  clientRepo: string | null;
  serverRepo: string | null;
  isMonorepo: boolean;
  repoUrl: string | null;
  backgroundImage: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch("/api/projects");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export function useGetProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}
