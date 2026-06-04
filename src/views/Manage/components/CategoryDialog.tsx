"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreateTechCategory,
  useUpdateTechCategory,
  TechCategory,
} from "@/hooks/useManage";

interface CategoryDialogProps {
  categoryToEdit?: TechCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryDialog({
  categoryToEdit,
  open,
  onOpenChange,
}: CategoryDialogProps) {
  const [name, setName] = React.useState("");

  const createMutation = useCreateTechCategory();
  const updateMutation = useUpdateTechCategory();

  React.useEffect(() => {
    if (open) {
      if (categoryToEdit) {
        setName(categoryToEdit.name);
      } else {
        setName("");
      }
    }
  }, [open, categoryToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const payload = { name: name.trim() };

    if (categoryToEdit) {
      updateMutation.mutate(
        { id: categoryToEdit.id, name: name.trim() },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            onOpenChange(false);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "Failed to update category");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Category created successfully");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.error || "Failed to create category");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-zinc-200 dark:border-zinc-800 rounded-none bg-background max-w-sm w-full p-6 shadow-md">
        <DialogHeader>
          <DialogTitle className="font-sans text-lg font-semibold tracking-tight text-foreground">
            {categoryToEdit ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            {categoryToEdit ? "Modify existing category name" : "Register a new category group"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 my-2 text-left">
          <div className="space-y-1.5">
            <Label htmlFor="cat-name" className="text-xs font-medium text-foreground">
              Category Name *
            </Label>
            <Input
              id="cat-name"
              required
              placeholder="e.g. Frontend, Backend, DevOps"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-none font-mono text-xs uppercase bg-foreground text-background hover:bg-foreground/90 py-2 cursor-pointer"
            >
              {isPending ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
