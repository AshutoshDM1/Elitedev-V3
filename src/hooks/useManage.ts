import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// ==========================================
// Types
// ==========================================

export interface TechCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechStack {
  id: number;
  name: string;
  techCategoryId: number | null;
  techCategoryName?: string | null;
  logoLight: string;
  logoDark: string;
  projectId: number | null;
  projectTitle?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  projectImage: string;
  techCategoryId: number | null;
  techCategoryName?: string | null;
  liveUrl: string | null;
  frontendRepo: string | null;
  backendRepo: string | null;
  isMonorepo: boolean;
  repoUrl: string | null;
  backgroundImage: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Frontend {
  id: number;
  projectId: number;
  projectTitle?: string | null;
  title: string;
  description: string;
  techStackId: number | null;
  techStackName?: string | null;
  liveUrl: string | null;
  clientRepo: string | null;
  isMonorepo: boolean;
  repoUrl: string | null;
  rootPath: string | null;
  isActive: boolean;
  deploymentPlatform: string | null;
  cicd: boolean;
  cicdTool: string | null;
  status: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastCommitMessage?: string | null;
  lastCommitAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Backend {
  id: number;
  projectId: number;
  projectTitle?: string | null;
  title: string;
  description: string;
  techStackId: number | null;
  techStackName?: string | null;
  liveUrl: string | null;
  cicd: boolean;
  cicdTool: string | null;
  containerization: boolean;
  containerizationTool: string | null;
  deploymentPlatform: string | null;
  isCliTool: boolean;
  npmVersion: boolean; // represents is_server_less
  serverRepo: string | null;
  isMonorepo: boolean;
  repoUrl: string | null;
  rootPath: string | null;
  isActive: boolean;
  status: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastCommitMessage?: string | null;
  lastCommitAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTask {
  id: number;
  projectId: number;
  projectTitle?: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 1. Tech Categories Hooks
// ==========================================

export function useGetTechCategories() {
  return useQuery<TechCategory[]>({
    queryKey: ["tech-categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manage/tech-categories");
      return data;
    },
  });
}

export function useCreateTechCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: { name: string }) => {
      const { data } = await axios.post("/api/manage/tech-categories", newCategory);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-categories"] });
    },
  });
}

export function useUpdateTechCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const { data } = await axios.put(`/api/manage/tech-categories/${id}`, { name });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-categories"] });
    },
  });
}

export function useDeleteTechCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/manage/tech-categories/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-categories"] });
    },
  });
}

// ==========================================
// 2. Tech Stack Hooks
// ==========================================

export function useGetTechStacks() {
  return useQuery<TechStack[]>({
    queryKey: ["tech-stack"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manage/tech-stack");
      return data;
    },
  });
}

export function useCreateTechStack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newStack: Omit<TechStack, "id" | "techCategoryName" | "projectTitle" | "createdAt" | "updatedAt">) => {
      const { data } = await axios.post("/api/manage/tech-stack", newStack);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
    },
  });
}

export function useUpdateTechStack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updatedData }: Partial<TechStack> & { id: number }) => {
      const { data } = await axios.put(`/api/manage/tech-stack/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
    },
  });
}

export function useDeleteTechStack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/manage/tech-stack/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
    },
  });
}

// ==========================================
// 3. Projects Hooks
// ==========================================

export function useGetAdminProjects() {
  return useQuery<Project[]>({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manage/projects");
      return data;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProject: Omit<Project, "id" | "techCategoryName" | "createdAt" | "updatedAt">) => {
      const { data } = await axios.post("/api/manage/projects", newProject);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updatedData }: Partial<Project> & { id: number }) => {
      const { data } = await axios.put(`/api/manage/projects/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/manage/projects/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ==========================================
// 4. Frontend Stacks Hooks
// ==========================================

export function useGetFrontends() {
  return useQuery<Frontend[]>({
    queryKey: ["admin-frontends"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manage/frontend");
      return data;
    },
  });
}

export function useCreateFrontend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFrontend: Omit<Frontend, "id" | "projectTitle" | "techStackName" | "createdAt" | "updatedAt">) => {
      const { data } = await axios.post("/api/manage/frontend", newFrontend);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-frontends"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateFrontend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updatedData }: Partial<Frontend> & { id: number }) => {
      const { data } = await axios.put(`/api/manage/frontend/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-frontends"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteFrontend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/manage/frontend/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-frontends"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ==========================================
// 5. Backend Stacks Hooks
// ==========================================

export function useGetBackends() {
  return useQuery<Backend[]>({
    queryKey: ["admin-backends"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manage/backend");
      return data;
    },
  });
}

export function useCreateBackend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBackend: Omit<Backend, "id" | "projectTitle" | "techStackName" | "createdAt" | "updatedAt">) => {
      const { data } = await axios.post("/api/manage/backend", newBackend);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-backends"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateBackend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updatedData }: Partial<Backend> & { id: number }) => {
      const { data } = await axios.put(`/api/manage/backend/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-backends"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteBackend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/manage/backend/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-backends"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ==========================================
// 6. Project Tasks Hooks
// ==========================================

export function useGetProjectTasks() {
  return useQuery<ProjectTask[]>({
    queryKey: ["admin-tasks"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manage/tasks");
      return data;
    },
  });
}

export function useCreateProjectTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: Omit<ProjectTask, "id" | "projectTitle" | "createdAt" | "updatedAt">) => {
      const { data } = await axios.post("/api/manage/tasks", newTask);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProjectTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updatedData }: Partial<ProjectTask> & { id: number }) => {
      const { data } = await axios.put(`/api/manage/tasks/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProjectTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/manage/tasks/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
