import { useQuery } from "@tanstack/react-query";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  liveUrl: string | null;
  isMonorepo: boolean;
  repoUrl: string | null;
  backgroundImage: string | null;
  isActivelyMaintining: boolean;
  islatestReadme: boolean;
  isCustomDomain: boolean;
  isSelfHostingDatabase: boolean;
  isNeonDatabase: boolean;
  isLLDAvailable: boolean;
  isAuth: boolean;
  isGoogleAuth: boolean;
  isGithubAuth: boolean;
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
