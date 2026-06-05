"use client";

import * as React from "react";
import { Plus } from "lucide-react";
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

export function CreateProjectDialog() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [titleVal, setTitleVal] = React.useState("");
  const [descVal, setDescVal] = React.useState("");
  const [imageVal, setImageVal] = React.useState("");
  const [tagsVal, setTagsVal] = React.useState("");
  const [liveUrlVal, setLiveUrlVal] = React.useState("");
  const [isActiveVal, setIsActiveVal] = React.useState(true);
  const [backgroundImageVal, setBackgroundImageVal] = React.useState("image1");

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
      setIsActiveVal(true);
      setBackgroundImageVal("image1");
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
      isActivelyMaintining: isActiveVal,
      backgroundImage: backgroundImageVal,
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-mono text-[10px] uppercase bg-muted/20 border-zinc-400 dark:border-zinc-700 hover:border-zinc-500 rounded-none cursor-pointer flex items-center gap-1"
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
              htmlFor="backgroundImage"
              className="font-mono text-[10px] text-muted-foreground uppercase"
            >
              background_image
            </Label>
            <select
              id="backgroundImage"
              value={backgroundImageVal}
              onChange={(e) => setBackgroundImageVal(e.target.value)}
              className="w-full rounded-none border border-dashed border-zinc-400 dark:border-zinc-700 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground font-mono text-xs p-2 h-9 text-foreground"
            >
              <option value="image1" className="bg-background">image1 (Cyan Wave)</option>
              <option value="image2" className="bg-background">image2 (Neon Ring)</option>
              <option value="image3" className="bg-background">image3 (Dark Cyberpunk)</option>
              <option value="image4" className="bg-background">image4 (Sci-Fi Tunnel)</option>
              <option value="image5" className="bg-background">image5 (Blue Geometric)</option>
              <option value="image6" className="bg-background">image6 (Orange Swirl)</option>
              <option value="image7" className="bg-background">image7 (Abstract Tech)</option>
              <option value="image8" className="bg-background">image8 (Monochrome Synth)</option>
            </select>
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
              {addProjectMutation.isPending ? "WRITING..." : "SAVE_RECORD"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
