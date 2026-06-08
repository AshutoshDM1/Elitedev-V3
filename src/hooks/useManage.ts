import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
  logoLight: string | null;
  logoDark: string | null;
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


