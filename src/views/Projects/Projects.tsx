"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetProjects, Project } from "./hooks/getproject";
import { Table, Column } from "@/Shared/Table/Table";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Server, Loader, Plus } from "lucide-react";
import Loading from "@/Shared/Loading/Loading";
import ServerError from "@/Shared/Error/Error";
import { GithubIcon } from "@/Shared/Icons/Icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const columns: Column<Project>[] = [
  {
    header: "ID",
    accessorKey: "id",
    className: "w-12 font-mono text-muted-foreground",
    cell: (p) => `#${p.id}`,
  },
  {
    header: "Preview",
    accessorKey: "image",
    className: "w-20",
    cell: (p) => (
      <div className="relative w-12 h-12 overflow-hidden border border-dashed border-zinc-400 dark:border-zinc-700 bg-muted flex items-center justify-center rounded-none">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <span className="text-[10px] text-muted-foreground font-mono">
            N/A
          </span>
        )}
      </div>
    ),
  },
  {
    header: "Project Title",
    accessorKey: "title",
    className: "w-44 font-medium font-mono text-foreground",
  },
  {
    header: "Description",
    accessorKey: "description",
    className: "max-w-xs whitespace-normal",
    cell: (p) => (
      <p className="text-muted-foreground leading-relaxed wrap-break-word line-clamp-3 font-sans">
        {p.description}
      </p>
    ),
  },
  {
    header: "Technologies",
    accessorKey: "tags",
    className: "max-w-[200px] whitespace-normal",
    cell: (p) => {
      const tagList = p.tags
        ? p.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
      return (
        <div className="flex flex-wrap gap-1">
          {tagList.length > 0 ? (
            tagList.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-mono text-[9px] rounded-none border-dashed py-0 px-1.5 uppercase bg-muted/20 text-foreground"
              >
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground font-mono text-[10px]">
              -
            </span>
          )}
        </div>
      );
    },
  },
  {
    header: "Links",
    accessorKey: "links",
    className: "w-28",
    cell: (p) => (
      <div className="flex gap-2">
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Live URL"
            className="p-1.5 hover:bg-muted text-foreground border border-dashed border-zinc-400 dark:border-zinc-700 hover:border-zinc-500 hover:text-primary transition-all duration-150 rounded-none"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {p.clientRepo && (
          <a
            href={p.clientRepo}
            target="_blank"
            rel="noopener noreferrer"
            title="Repository"
            className="p-1.5 hover:bg-muted text-foreground border border-dashed border-zinc-400 dark:border-zinc-700 hover:border-zinc-500 hover:text-primary transition-all duration-150 rounded-none"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        )}
        {p.serverRepo && (
          <a
            href={p.serverRepo}
            target="_blank"
            rel="noopener noreferrer"
            title="Backend Repository"
            className="p-1.5 hover:bg-muted text-foreground border border-dashed border-zinc-400 dark:border-zinc-700 hover:border-zinc-500 hover:text-primary transition-all duration-150 rounded-none"
          >
            <Server className="w-3.5 h-3.5" />
          </a>
        )}
        {!p.liveUrl && !p.clientRepo && !p.serverRepo && (
          <span className="text-muted-foreground font-mono text-[10px]">-</span>
        )}
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "isActive",
    className: "w-24 font-mono",
    cell: (p) => (
      <div className="flex items-center gap-1.5">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            p.isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-450"
          }`}
        />
        <span className="text-[10px] uppercase font-mono tracking-wider">
          {p.isActive ? "Active" : "Archived"}
        </span>
      </div>
    ),
  },
  {
    header: "Created",
    accessorKey: "createdAt",
    className: "w-28 font-mono text-muted-foreground",
    cell: (p) => {
      if (!p.createdAt) return "-";
      const date = new Date(p.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
];

export default function Projects() {
  const queryClient = useQueryClient();
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjects();

  // Dialog State
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [titleVal, setTitleVal] = React.useState("");
  const [descVal, setDescVal] = React.useState("");
  const [imageVal, setImageVal] = React.useState("");
  const [tagsVal, setTagsVal] = React.useState("");
  const [liveUrlVal, setLiveUrlVal] = React.useState("");
  const [clientRepoVal, setClientRepoVal] = React.useState("");
  const [serverRepoVal, setServerRepoVal] = React.useState("");
  const [isActiveVal, setIsActiveVal] = React.useState(true);

  // Column visibility state
  const [visibleCols, setVisibleCols] = React.useState<Record<string, boolean>>(
    {
      id: true,
      image: true,
      title: true,
      description: true,
      tags: true,
      links: true,
      isActive: true,
      createdAt: true,
    },
  );

  // Sorting state
  const [sortKey, setSortKey] = React.useState<string>("id");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  // Mutation for adding a project
  const addProjectMutation = useMutation({
    mutationFn: async (newProject: any) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save project");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setDialogOpen(false);
      // Reset Form Fields
      setTitleVal("");
      setDescVal("");
      setImageVal("");
      setTagsVal("");
      setLiveUrlVal("");
      setClientRepoVal("");
      setServerRepoVal("");
      setIsActiveVal(true);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleVal || !descVal || !imageVal) return;
    addProjectMutation.mutate({
      title: titleVal,
      description: descVal,
      image: imageVal,
      tags: tagsVal,
      liveUrl: liveUrlVal || null,
      clientRepo: clientRepoVal || null,
      serverRepo: serverRepoVal || null,
      isActive: isActiveVal,
    });
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter columns based on user selection
  const filteredColumns = React.useMemo(() => {
    return columns.filter((col) => visibleCols[col.accessorKey as string]);
  }, [visibleCols]);

  // Sort projects list client-side
  const sortedProjects = React.useMemo(() => {
    if (!sortKey) return projects;

    return [...projects].sort((a, b) => {
      let aVal = a[sortKey as keyof Project];
      let bVal = b[sortKey as keyof Project];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        return sortOrder === "asc"
          ? aVal === bVal
            ? 0
            : aVal
              ? 1
              : -1
          : aVal === bVal
            ? 0
            : bVal
              ? 1
              : -1;
      }

      if (sortKey === "createdAt") {
        const aTime = new Date(aVal as string).getTime();
        const bTime = new Date(bVal as string).getTime();
        return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
      }

      return sortOrder === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [projects, sortKey, sortOrder]);

  return (
    <>
      <div className="pt-10">
        <LineY className="border-t border-b-0">
          <SubSection className="max-w-7xl">
            <div className="flex items-center justify-between py-2">
              <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">
                  Projects Registry
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  See and Manage all project in there
                </p>
              </div>
              <div className="flex items-center gap-3">
                {isLoading && (
                  <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[10px]">
                    <Loader className="w-3 h-3 animate-spin" />
                    Loading...
                  </div>
                )}

                {/* Add Project Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-dashed font-mono text-[10px] uppercase bg-muted/20 border-zinc-400 dark:border-zinc-700 hover:border-zinc-500 rounded-none cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border border-dashed border-zinc-400 dark:border-zinc-700 rounded-none bg-background max-w-md w-full p-6">
                    <DialogHeader>
                      <DialogTitle className="font-mono text-sm tracking-tight uppercase">
                        Add New Project
                      </DialogTitle>
                      <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                        Create a new entry in the registry database
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleFormSubmit}
                      className="space-y-4 my-2 text-left"
                    >
                      <div className="space-y-1">
                        <Label
                          htmlFor="title"
                          className="font-mono text-[10px] text-muted-foreground uppercase"
                        >
                          title [string] *
                        </Label>
                        <Input
                          id="title"
                          required
                          placeholder="e.g. Aset"
                          value={titleVal}
                          onChange={(e) => setTitleVal(e.target.value)}
                          className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="description"
                          className="font-mono text-[10px] text-muted-foreground uppercase"
                        >
                          description [text] *
                        </Label>
                        <Textarea
                          id="description"
                          required
                          placeholder="A high performance file management platform..."
                          value={descVal}
                          onChange={(e) => setDescVal(e.target.value)}
                          className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground min-h-[70px] font-sans text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label
                            htmlFor="image"
                            className="font-mono text-[10px] text-muted-foreground uppercase"
                          >
                            image_url [url] *
                          </Label>
                          <Input
                            id="image"
                            required
                            placeholder="/project/aset.png"
                            value={imageVal}
                            onChange={(e) => setImageVal(e.target.value)}
                            className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="tags"
                            className="font-mono text-[10px] text-muted-foreground uppercase"
                          >
                            tags [comma_separated]
                          </Label>
                          <Input
                            id="tags"
                            placeholder="React, TypeScript, Drizzle"
                            value={tagsVal}
                            onChange={(e) => setTagsVal(e.target.value)}
                            className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <Label
                            htmlFor="liveUrl"
                            className="font-mono text-[10px] text-muted-foreground uppercase"
                          >
                            live_url
                          </Label>
                          <Input
                            id="liveUrl"
                            placeholder="https://..."
                            value={liveUrlVal}
                            onChange={(e) => setLiveUrlVal(e.target.value)}
                            className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="clientRepo"
                            className="font-mono text-[10px] text-muted-foreground uppercase"
                          >
                            client_repo
                          </Label>
                          <Input
                            id="clientRepo"
                            placeholder="https://github..."
                            value={clientRepoVal}
                            onChange={(e) => setClientRepoVal(e.target.value)}
                            className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="serverRepo"
                            className="font-mono text-[10px] text-muted-foreground uppercase"
                          >
                            server_repo
                          </Label>
                          <Input
                            id="serverRepo"
                            placeholder="https://github..."
                            value={serverRepoVal}
                            onChange={(e) => setServerRepoVal(e.target.value)}
                            className="rounded-none border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          id="isActive"
                          type="checkbox"
                          checked={isActiveVal}
                          onChange={(e) => setIsActiveVal(e.target.checked)}
                          className="rounded-none accent-zinc-800 cursor-pointer h-3.5 w-3.5"
                        />
                        <Label
                          htmlFor="isActive"
                          className="font-mono text-[10px] text-muted-foreground uppercase cursor-pointer select-none"
                        >
                          project_is_active
                        </Label>
                      </div>
                      <DialogFooter className="pt-2">
                        <Button
                          type="submit"
                          disabled={addProjectMutation.isPending}
                          className="w-full rounded-none font-mono text-[10px] uppercase bg-foreground text-background hover:bg-foreground/90 py-1"
                        >
                          {addProjectMutation.isPending
                            ? "WRITING..."
                            : "SAVE_RECORD"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </SubSection>

          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Show/Hide Columns Toggle Panel */}
            <div className="flex flex-wrap gap-1.5 items-center py-2 border-x border-b border-dashed border-zinc-400 dark:border-zinc-700 p-3 bg-muted/15  text-xs font-mono">
              <span className="text-[11px] uppercase text-muted-foreground mr-1.5 select-none ">
                Columns
              </span>
              {Object.keys(visibleCols).map((colKey) => {
                const column = columns.find((c) => c.accessorKey === colKey);
                const label = column ? String(column.header) : colKey;
                const isVisible = visibleCols[colKey];
                return (
                  <button
                    key={colKey}
                    onClick={() => {
                      setVisibleCols((prev) => ({
                        ...prev,
                        [colKey]: !prev[colKey],
                      }));
                    }}
                    className={cn(
                      "px-2 py-0.5 border text-[9px] uppercase transition-all duration-150 rounded-none cursor-pointer ",
                      isVisible
                        ? "border-zinc-500 dark:border-zinc-400 bg-foreground text-background font-medium"
                        : "border-zinc-300 dark:border-zinc-800 text-muted-foreground hover:border-zinc-400 hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="py-4">
              {isLoading ? (
                <Loading message="Loading Projects Data..." />
              ) : isError ? (
                <ServerError
                  title="Failed to load Projects Data"
                  message={
                    error instanceof Error
                      ? error.message
                      : "Failed to load database projects"
                  }
                  onRetry={() => refetch()}
                />
              ) : (
                <Table
                  columns={filteredColumns}
                  data={sortedProjects}
                  onHeaderClick={handleSort}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </LineY>
      </div>
    </>
  );
}
