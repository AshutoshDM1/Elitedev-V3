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
import { Edit2, Trash2, Search, Plus, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import ErrorComponent from "@/Shared/Error/Error";

import {
  // Hooks & Types
  useGetTechCategories, useDeleteTechCategory, TechCategory,
  useGetTechStacks, useDeleteTechStack, TechStack,
} from "@/hooks/useManage";

import CategoryDialog from "./CategoryDialog";
import TechStackDialog from "./TechStackDialog";

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
// 4. Tech Stack Table Component
// ==========================================
export function TechStacksTable() {
  const { data: techStacks = [], isLoading, isError, error, refetch } = useGetTechStacks();
  const deleteMutation = useDeleteTechStack();

  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedStack, setSelectedStack] = React.useState<TechStack | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc" | null>(null);

  const toggleSort = () => {
    setSortDirection((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  const filtered = React.useMemo(() => {
    const res = techStacks.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.techCategoryName?.toLowerCase().includes(search.toLowerCase())
    );
    if (sortDirection) {
      res.sort((a, b) => {
        const catA = a.techCategoryName || "";
        const catB = b.techCategoryName || "";
        return sortDirection === "asc" ? catA.localeCompare(catB) : catB.localeCompare(catA);
      });
    }
    return res;
  }, [techStacks, search, sortDirection]);

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
              <TableHead
                className="font-mono uppercase text-muted-foreground font-semibold cursor-pointer hover:text-foreground select-none transition-colors"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-1">
                  Category
                  {sortDirection === "asc" ? (
                    <ArrowUp className="h-3 w-3 text-foreground" />
                  ) : sortDirection === "desc" ? (
                    <ArrowDown className="h-3 w-3 text-foreground" />
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  )}
                </div>
              </TableHead>
              <TableHead className="font-mono uppercase text-muted-foreground font-semibold">Logo Presets (Light/Dark)</TableHead>
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


