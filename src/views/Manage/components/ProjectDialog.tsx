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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useCreateProject,
  useUpdateProject,
  useGetTechCategories,
  Project,
} from "@/hooks/useManage";
import AutosearchSelect from "./AutosearchSelect";
import ImageUpload from "./ImageUpload";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectDialogProps {
  projectToEdit?: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDialog({
  projectToEdit,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [projectImage, setProjectImage] = React.useState("");
  const [techCategoryId, setTechCategoryId] = React.useState("");
  const [liveUrl, setLiveUrl] = React.useState("");
  const [frontendRepo, setFrontendRepo] = React.useState("");
  const [backendRepo, setBackendRepo] = React.useState("");
  const [isMonorepo, setIsMonorepo] = React.useState(false);
  const [repoUrl, setRepoUrl] = React.useState("");
  const [backgroundImage, setBackgroundImage] = React.useState("image1");
  const [isActive, setIsActive] = React.useState(true);

  const { data: categories = [] } = useGetTechCategories();

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  React.useEffect(() => {
    if (open) {
      if (projectToEdit) {
        setTitle(projectToEdit.title);
        setDescription(projectToEdit.description);
        setShortDescription(projectToEdit.shortDescription);
        setProjectImage(projectToEdit.projectImage);
        setTechCategoryId(projectToEdit.techCategoryId?.toString() || "");
        setLiveUrl(projectToEdit.liveUrl || "");
        setFrontendRepo(projectToEdit.frontendRepo || "");
        setBackendRepo(projectToEdit.backendRepo || "");
        setIsMonorepo(projectToEdit.isMonorepo);
        setRepoUrl(projectToEdit.repoUrl || "");
        setBackgroundImage(projectToEdit.backgroundImage || "image1");
        setIsActive(projectToEdit.isActive);
      } else {
        setTitle("");
        setDescription("");
        setShortDescription("");
        setProjectImage("");
        setTechCategoryId("");
        setLiveUrl("");
        setFrontendRepo("");
        setBackendRepo("");
        setIsMonorepo(false);
        setRepoUrl("");
        setBackgroundImage("image1");
        setIsActive(true);
      }
    }
  }, [open, projectToEdit]);

  const categoryOptions = React.useMemo(() => {
    return categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }));
  }, [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !description.trim() ||
      !shortDescription.trim() ||
      !projectImage.trim()
    ) {
      toast.error("Title, descriptions, and project image are required");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      shortDescription: shortDescription.trim(),
      projectImage: projectImage.trim(),
      techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
      liveUrl: liveUrl.trim() || null,
      frontendRepo: frontendRepo.trim() || null,
      backendRepo: backendRepo.trim() || null,
      isMonorepo,
      repoUrl: repoUrl.trim() || null,
      backgroundImage,
      isActive,
    };

    if (projectToEdit) {
      updateMutation.mutate(
        { id: projectToEdit.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Project updated successfully");
            onOpenChange(false);
          },
          onError: (err: any) => {
            toast.error(
              err.response?.data?.error || "Failed to update project",
            );
          },
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Project created successfully");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.error || "Failed to create project");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-zinc-200 dark:border-zinc-800 rounded-none bg-background max-w-lg sm:max-w-2xl w-full p-6 shadow-md">
        <ScrollArea className="max-h-[80vh] pr-5" >
          <DialogHeader>
            <DialogTitle className="font-sans text-lg font-semibold tracking-tight text-foreground">
              {projectToEdit ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {projectToEdit
                ? "Modify existing project details"
                : "Register a new portfolio project"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 my-2 text-left">
            <div className="space-y-1.5">
              <Label
                htmlFor="proj-title"
                className="text-xs font-medium text-foreground"
              >
                Project Title *
              </Label>
              <Input
                id="proj-title"
                required
                placeholder="e.g. Manga Heaven"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="proj-short"
                className="text-xs font-medium text-foreground"
              >
                Short Description *
              </Label>
              <Input
                id="proj-short"
                required
                placeholder="A concise summary for lists and cards"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="proj-desc"
                className="text-xs font-medium text-foreground"
              >
                Detailed Description *
              </Label>
              <Textarea
                id="proj-desc"
                required
                placeholder="Detailed description of features and setup..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm min-h-24 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="proj-img"
                  className="text-xs font-medium text-foreground"
                >
                  Project Card Image Path *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="proj-img"
                    required
                    placeholder="e.g. /project/mangahaven.png"
                    value={projectImage}
                    onChange={(e) => setProjectImage(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9 flex-1"
                  />
                  <ImageUpload
                    onUploadSuccess={(url) => setProjectImage(url)}
                  />
                </div>
                {projectImage?.trim() && (
                  <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                    <div className="border border-zinc-200 bg-white p-1.5 flex flex-col items-center justify-center h-14 w-full select-none overflow-hidden">
                      <span className="text-[7px] font-mono text-zinc-400 mb-0.5 uppercase tracking-wider">
                        LIGHT BG
                      </span>
                      <img
                        src={projectImage}
                        alt="Project Light Preview"
                        className="max-h-[30px] max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="border border-zinc-800 bg-black p-1.5 flex flex-col items-center justify-center h-14 w-full select-none overflow-hidden">
                      <span className="text-[7px] font-mono text-zinc-500 mb-0.5 uppercase tracking-wider">
                        DARK BG
                      </span>
                      <img
                        src={projectImage}
                        alt="Project Dark Preview"
                        className="max-h-[30px] max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <Label className="text-xs font-medium text-foreground mb-1.5">
                  Tech Category
                </Label>
                <AutosearchSelect
                  options={categoryOptions}
                  value={techCategoryId}
                  onChange={setTechCategoryId}
                  placeholder="Search category..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="proj-live"
                  className="text-xs font-medium text-foreground"
                >
                  Live URL
                </Label>
                <Input
                  id="proj-live"
                  placeholder="e.g. https://mangaheaven.app"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="proj-bg"
                  className="text-xs font-medium text-foreground"
                >
                  Background Image Preset
                </Label>
                <select
                  id="proj-bg"
                  value={backgroundImage}
                  onChange={(e) => setBackgroundImage(e.target.value)}
                  className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus:border-foreground text-sm p-2 h-9 text-foreground focus:outline-none"
                >
                  <option value="image1" className="bg-background">
                    image1 (Aset Light Blue)
                  </option>
                  <option value="image2" className="bg-background">
                    image2 (Neon Teal)
                  </option>
                  <option value="image3" className="bg-background">
                    image3 (Dark Indigo)
                  </option>
                  <option value="image4" className="bg-background">
                    image4 (Orange Accent)
                  </option>
                  <option value="image5" className="bg-background">
                    image5 (Cloud Violet)
                  </option>
                  <option value="image6" className="bg-background">
                    image6 (Deep Charcoal)
                  </option>
                  <option value="image7" className="bg-background">
                    image7 (Gold Dust)
                  </option>
                  <option value="background.jpg" className="bg-background">
                    background.jpg (Default)
                  </option>
                </select>
              </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 bg-muted/10">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="monorepo-toggle"
                    className="text-xs font-medium text-foreground"
                  >
                    Monorepo Workspace
                  </Label>
                  <span className="block text-[10px] text-muted-foreground">
                    Contains both client and server inside a single repository
                  </span>
                </div>
                <Switch
                  id="monorepo-toggle"
                  checked={isMonorepo}
                  onCheckedChange={setIsMonorepo}
                />
              </div>

              {isMonorepo ? (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="proj-repourl"
                    className="text-xs font-medium text-foreground"
                  >
                    Monorepo GitHub URL
                  </Label>
                  <Input
                    id="proj-repourl"
                    placeholder="e.g. https://github.com/user/project"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="proj-client"
                      className="text-xs font-medium text-foreground"
                    >
                      Client Repo URL
                    </Label>
                    <Input
                      id="proj-client"
                      placeholder="e.g. GitHub Client URL"
                      value={frontendRepo}
                      onChange={(e) => setFrontendRepo(e.target.value)}
                      className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="proj-server"
                      className="text-xs font-medium text-foreground"
                    >
                      Server Repo URL
                    </Label>
                    <Input
                      id="proj-server"
                      placeholder="e.g. GitHub Server URL"
                      value={backendRepo}
                      onChange={(e) => setBackendRepo(e.target.value)}
                      className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
              <Label
                htmlFor="active-toggle"
                className="text-xs font-medium text-foreground"
              >
                Active/Live Portfolio Card
              </Label>
              <Switch
                id="active-toggle"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-none font-mono text-xs uppercase bg-foreground text-background hover:bg-foreground/90 py-2 cursor-pointer"
              >
                {isPending ? "Saving..." : "Save Project"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
