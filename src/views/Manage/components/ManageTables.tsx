"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2, Search, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import ErrorComponent from "@/Shared/Error/Error";

import {
  // Hooks & Types
  useGetTechCategories, useDeleteTechCategory, TechCategory,
  useGetTechStacks, useDeleteTechStack, TechStack,
  useGetAdminProjects, useDeleteProject, Project,
  useGetFrontends, useDeleteFrontend, Frontend,
  useGetBackends, useDeleteBackend, Backend,
  useGetProjectTasks, useDeleteProjectTask, ProjectTask
} from "@/hooks/useManage";

import CategoryDialog from "./CategoryDialog";
import TechStackDialog from "./TechStackDialog";
import ProjectDialog from "./ProjectDialog";
import FrontendDialog from "./FrontendDialog";
import BackendDialog from "./BackendDialog";
import TaskDialog from "./TaskDialog";

// ==========================================
// Reusable Delete Confirmation Dialog
// ==========================================
interface ConfirmDeleteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

function ConfirmDelete({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the record and cascade delete any dependent rows.",
}: ConfirmDeleteProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm font-semibold tracking-tight">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-muted-foreground">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none text-xs font-mono uppercase cursor-pointer py-1.5 h-8">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-none text-xs font-mono uppercase bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer py-1.5 h-8"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ==========================================
// 1. Projects Table Component
// ==========================================
export function ProjectsTable() {
  const { data: projects = [], isLoading, isError, error, refetch } = useGetAdminProjects();
  const deleteMutation = useDeleteProject();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      deleteMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success("Project deleted successfully");
          setDeleteTargetId(null);
        },
        onError: () => {
          toast.error("Failed to delete project");
        },
      });
    }
  };

  if (isLoading) return <div className="text-center font-mono text-xs text-muted-foreground py-8">LOADING PROJECTS...</div>;
  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load projects"
        message={error instanceof Error ? error.message : "An error occurred while fetching project records."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 text-xs"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedProject(undefined);
            setDialogOpen(true);
          }}
          className="rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 h-9 px-3 cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> New Project
        </Button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-none overflow-x-auto">
        <Table className="border-collapse text-left font-sans text-xs">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="w-12 font-mono uppercase text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Title</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Category</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Repo Architecture</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="w-24 text-right font-mono uppercase text-muted-foreground font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground font-mono text-[10px] uppercase">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((proj) => (
                <TableRow key={proj.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-muted/5">
                  <TableCell className="font-mono">{proj.id}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div>{proj.title}</div>
                    <div className="text-[10px] text-muted-foreground font-light line-clamp-1">{proj.shortDescription}</div>
                  </TableCell>
                  <TableCell>
                    {proj.techCategoryName ? (
                      <Badge variant="outline" className="rounded-none font-mono text-[8px] uppercase">
                        {proj.techCategoryName}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-[10px] uppercase">
                    {proj.isMonorepo ? "Monorepo" : "Split (Client/Server)"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={proj.isActivelyMaintining ? "default" : "secondary"} className="rounded-none font-mono text-[8px] uppercase">
                      {proj.isActivelyMaintining ? "Active" : "Archived"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedProject(proj);
                          setDialogOpen(true);
                        }}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteTargetId(proj.id)}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} projectToEdit={selectedProject} />
      <ConfirmDelete isOpen={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)} onConfirm={handleDelete} />
    </div>
  );
}

// ==========================================
// 2. Frontend Stacks Table Component
// ==========================================
export function FrontendsTable() {
  const { data: frontends = [], isLoading, isError, error, refetch } = useGetFrontends();
  const deleteMutation = useDeleteFrontend();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedFrontend, setSelectedFrontend] = React.useState<Frontend | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    return frontends.filter(
      (f) =>
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.projectTitle?.toLowerCase().includes(search.toLowerCase())
    );
  }, [frontends, search]);

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      deleteMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success("Frontend stack deleted");
          setDeleteTargetId(null);
        },
        onError: () => {
          toast.error("Failed to delete frontend stack");
        },
      });
    }
  };

  if (isLoading) return <div className="text-center font-mono text-xs text-muted-foreground py-8">LOADING FRONTENDS...</div>;
  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load frontends"
        message={error instanceof Error ? error.message : "An error occurred while fetching frontend stack records."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frontends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 text-xs"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedFrontend(undefined);
            setDialogOpen(true);
          }}
          className="rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 h-9 px-3 cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> New Frontend
        </Button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-none overflow-x-auto">
        <Table className="border-collapse text-left font-sans text-xs">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="w-12 font-mono uppercase text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Service Title</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Associated Project</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Tech Stack</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Platform</TableHead>
              <TableHead className="w-24 text-right font-mono uppercase text-muted-foreground font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground font-mono text-[10px] uppercase">
                  No frontends found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((fe) => (
                <TableRow key={fe.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-muted/5">
                  <TableCell className="font-mono">{fe.id}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div>{fe.title}</div>
                    {fe.liveUrl && (
                      <a
                        href={fe.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-muted-foreground flex items-center gap-0.5 hover:underline font-mono"
                      >
                        {fe.liveUrl} <ExternalLink className="h-2 w-2" />
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{fe.projectTitle || "-"}</TableCell>
                  <TableCell>
                    {fe.techStackName ? (
                      <Badge variant="outline" className="rounded-none font-mono text-[8px] uppercase">
                        {fe.techStackName}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${fe.status === "UP" ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`} />
                      <span className="font-mono uppercase text-[9px]">{fe.status}</span>
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-[10px] uppercase">{fe.deploymentPlatform || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedFrontend(fe);
                          setDialogOpen(true);
                        }}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer"
                        title="Edit Frontend"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteTargetId(fe.id)}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Frontend"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <FrontendDialog open={dialogOpen} onOpenChange={setDialogOpen} frontendToEdit={selectedFrontend} />
      <ConfirmDelete isOpen={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)} onConfirm={handleDelete} />
    </div>
  );
}

// ==========================================
// 3. Backend Stacks Table Component
// ==========================================
export function BackendsTable() {
  const { data: backends = [], isLoading, isError, error, refetch } = useGetBackends();
  const deleteMutation = useDeleteBackend();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedBackend, setSelectedBackend] = React.useState<Backend | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    return backends.filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.projectTitle?.toLowerCase().includes(search.toLowerCase())
    );
  }, [backends, search]);

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      deleteMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success("Backend stack deleted");
          setDeleteTargetId(null);
        },
        onError: () => {
          toast.error("Failed to delete backend stack");
        },
      });
    }
  };

  if (isLoading) return <div className="text-center font-mono text-xs text-muted-foreground py-8">LOADING BACKENDS...</div>;
  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load backends"
        message={error instanceof Error ? error.message : "An error occurred while fetching backend stack records."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search backends..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 text-xs"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedBackend(undefined);
            setDialogOpen(true);
          }}
          className="rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 h-9 px-3 cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> New Backend
        </Button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-none overflow-x-auto">
        <Table className="border-collapse text-left font-sans text-xs">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="w-12 font-mono uppercase text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Service Title</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Associated Project</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Tech Stack</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Deployment Info</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="w-24 text-right font-mono uppercase text-muted-foreground font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground font-mono text-[10px] uppercase">
                  No backends found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((be) => (
                <TableRow key={be.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-muted/5">
                  <TableCell className="font-mono">{be.id}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div>{be.title}</div>
                    {be.liveUrl && (
                      <a
                        href={be.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-muted-foreground flex items-center gap-0.5 hover:underline font-mono"
                      >
                        {be.liveUrl} <ExternalLink className="h-2 w-2" />
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{be.projectTitle || "-"}</TableCell>
                  <TableCell>
                    {be.techStackName ? (
                      <Badge variant="outline" className="rounded-none font-mono text-[8px] uppercase">
                        {be.techStackName}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="space-y-1">
                    <div className="font-mono text-[10px]">
                      PLATFORM: <span className="uppercase text-foreground">{be.deploymentPlatform || "N/A"}</span>
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground">
                      DOCKER: {be.containerization ? (be.containerizationTool || "YES") : "NO"} | TYPE: {be.isCliTool ? "CLI" : "API SERVER"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${be.status === "UP" ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`} />
                      <span className="font-mono uppercase text-[9px]">{be.status}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedBackend(be);
                          setDialogOpen(true);
                        }}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer"
                        title="Edit Backend"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteTargetId(be.id)}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Backend"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BackendDialog open={dialogOpen} onOpenChange={setDialogOpen} backendToEdit={selectedBackend} />
      <ConfirmDelete isOpen={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)} onConfirm={handleDelete} />
    </div>
  );
}

// ==========================================
// 4. Tech Stack Table Component
// ==========================================
export function TechStacksTable() {
  const { data: techStacks = [], isLoading, isError, error, refetch } = useGetTechStacks();
  const deleteMutation = useDeleteTechStack();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedStack, setSelectedStack] = React.useState<TechStack | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    return techStacks.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.techCategoryName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [techStacks, search]);

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      deleteMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success("Tech stack entry deleted");
          setDeleteTargetId(null);
        },
        onError: () => {
          toast.error("Failed to delete tech stack entry");
        },
      });
    }
  };

  if (isLoading) return <div className="text-center font-mono text-xs text-muted-foreground py-8">LOADING TECH STACKS...</div>;
  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load tech stacks"
        message={error instanceof Error ? error.message : "An error occurred while fetching tech stack records."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 text-xs"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedStack(undefined);
            setDialogOpen(true);
          }}
          className="rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 h-9 px-3 cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> New Tech Stack
        </Button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-none overflow-x-auto">
        <Table className="border-collapse text-left font-sans text-xs">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="w-12 font-mono uppercase text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Name</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Category</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Logo Presets (Light/Dark)</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Inline SVG</TableHead>
              <TableHead className="w-24 text-right font-mono uppercase text-muted-foreground font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground font-mono text-[10px] uppercase">
                  No tech stack elements found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((t) => (
                <TableRow key={t.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-muted/5">
                  <TableCell className="font-mono">{t.id}</TableCell>
                  <TableCell className="font-semibold text-foreground">{t.name}</TableCell>
                  <TableCell>
                    {t.techCategoryName ? (
                      <Badge variant="outline" className="rounded-none font-mono text-[8px] uppercase">
                        {t.techCategoryName}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {t.logoLight?.trim() ? (
                        <div
                          className="h-7 w-9 border border-zinc-200 dark:border-zinc-800 bg-white flex items-center justify-center p-0.5 select-none overflow-hidden"
                          title={`Light Logo: ${t.logoLight}`}
                        >
                          <img
                            src={t.logoLight}
                            alt={`${t.name} light logo`}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-[9px] text-muted-foreground font-mono">NO LIGHT</span>
                      )}
                      {t.logoDark?.trim() ? (
                        <div
                          className="h-7 w-9 border border-zinc-200 dark:border-zinc-800 bg-black flex items-center justify-center p-0.5 select-none overflow-hidden"
                          title={`Dark Logo: ${t.logoDark}`}
                        >
                          <img
                            src={t.logoDark}
                            alt={`${t.name} dark logo`}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-[9px] text-muted-foreground font-mono">NO DARK</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {t.svg ? (
                      <div
                        className={`h-7 w-9 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-0.5 select-none overflow-hidden ${
                          t.svgTheme === "light" ? "bg-white text-black" : "bg-black text-white"
                        }`}
                        title={`SVG Theme: ${t.svgTheme}`}
                        dangerouslySetInnerHTML={{ __html: t.svg }}
                      />
                    ) : (
                      <span className="text-[9px] text-muted-foreground font-mono">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedStack(t);
                          setDialogOpen(true);
                        }}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer"
                        title="Edit Tech Stack"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteTargetId(t.id)}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Tech Stack"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TechStackDialog open={dialogOpen} onOpenChange={setDialogOpen} stackToEdit={selectedStack} />
      <ConfirmDelete isOpen={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)} onConfirm={handleDelete} />
    </div>
  );
}

// ==========================================
// 5. Categories Table Component
// ==========================================
export function CategoriesTable() {
  const { data: categories = [], isLoading, isError, error, refetch } = useGetTechCategories();
  const deleteMutation = useDeleteTechCategory();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<TechCategory | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      deleteMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success("Category deleted");
          setDeleteTargetId(null);
        },
        onError: () => {
          toast.error("Failed to delete category");
        },
      });
    }
  };

  if (isLoading) return <div className="text-center font-mono text-xs text-muted-foreground py-8">LOADING CATEGORIES...</div>;
  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load categories"
        message={error instanceof Error ? error.message : "An error occurred while fetching category records."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 text-xs"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedCategory(undefined);
            setDialogOpen(true);
          }}
          className="rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 h-9 px-3 cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> New Category
        </Button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-none overflow-x-auto">
        <Table className="border-collapse text-left font-sans text-xs">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="w-12 font-mono uppercase text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Category Name</TableHead>
              <TableHead className="w-24 text-right font-mono uppercase text-muted-foreground font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground font-mono text-[10px] uppercase">
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((cat) => (
                <TableRow key={cat.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-muted/5">
                  <TableCell className="font-mono">{cat.id}</TableCell>
                  <TableCell className="font-semibold text-foreground uppercase tracking-wider">{cat.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setDialogOpen(true);
                        }}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteTargetId(cat.id)}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Category"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} categoryToEdit={selectedCategory} />
      <ConfirmDelete isOpen={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)} onConfirm={handleDelete} />
    </div>
  );
}

// ==========================================
// 6. Project Tasks Table Component
// ==========================================
export function TasksTable() {
  const { data: tasks = [], isLoading, isError, error, refetch } = useGetProjectTasks();
  const deleteMutation = useDeleteProjectTask();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<ProjectTask | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.projectTitle?.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      deleteMutation.mutate(deleteTargetId, {
        onSuccess: () => {
          toast.success("Task deleted");
          setDeleteTargetId(null);
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      });
    }
  };

  if (isLoading) return <div className="text-center font-mono text-xs text-muted-foreground py-8">LOADING PROJECT TASKS...</div>;
  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load project tasks"
        message={error instanceof Error ? error.message : "An error occurred while fetching project task records."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 text-xs"
          />
        </div>
        <Button
          onClick={() => {
            setSelectedTask(undefined);
            setDialogOpen(true);
          }}
          className="rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 h-9 px-3 cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> New Task
        </Button>
      </div>

      <div className="border border-zinc-200 dark:border-zinc-800 rounded-none overflow-x-auto">
        <Table className="border-collapse text-left font-sans text-xs">
          <TableHeader className="bg-muted/30">
            <TableRow className="border-b border-zinc-200 dark:border-zinc-800">
              <TableHead className="w-12 font-mono uppercase text-muted-foreground font-semibold">ID</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Task Description/Title</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Associated Project</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Priority</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Due Date</TableHead>
              <TableHead className="w-24 text-right font-mono uppercase text-muted-foreground font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground font-mono text-[10px] uppercase">
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((task) => (
                <TableRow key={task.id} className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-muted/5">
                  <TableCell className="font-mono">{task.id}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div>{task.title}</div>
                    {task.description && (
                      <div className="text-[10px] text-muted-foreground font-light line-clamp-1">{task.description}</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{task.projectTitle || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-none font-mono text-[8px] uppercase border ${
                        task.priority === "high"
                          ? "border-red-500/20 text-red-500 bg-red-500/5"
                          : task.priority === "medium"
                          ? "border-amber-500/20 text-amber-500 bg-amber-500/5"
                          : "border-zinc-300 dark:border-zinc-700 text-muted-foreground"
                      }`}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono uppercase text-[9px]">
                    <span
                      className={`inline-block px-1 py-0.5 text-[8px] font-bold ${
                        task.status === "done"
                          ? "text-emerald-500 bg-emerald-500/5"
                          : task.status === "in_progress"
                          ? "text-amber-500 bg-amber-500/5 animate-pulse"
                          : "text-muted-foreground"
                      }`}
                    >
                      [{task.status.replace("_", " ")}]
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-[10px]">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setSelectedTask(task);
                          setDialogOpen(true);
                        }}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer"
                        title="Edit Task"
                      >
                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setDeleteTargetId(task.id)}
                        className="h-7 w-7 rounded-none border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Task"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TaskDialog open={dialogOpen} onOpenChange={setDialogOpen} taskToEdit={selectedTask} />
      <ConfirmDelete isOpen={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)} onConfirm={handleDelete} />
    </div>
  );
}
