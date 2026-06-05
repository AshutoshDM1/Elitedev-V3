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
  useGetTechStacks,
  Project,
} from "@/hooks/useManage";
import AutosearchSelect from "./AutosearchSelect";
import ImageUpload from "./ImageUpload";
import { ScrollArea } from "@/components/ui/scroll-area";
import { bg } from "@/assets/import";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { XIcon, CheckIcon, Plus } from "lucide-react";
import { useTheme } from "next-themes";

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
  const [isMonorepo, setIsMonorepo] = React.useState(false);
  const [repoUrl, setRepoUrl] = React.useState("");
  const [backgroundImage, setBackgroundImage] = React.useState("image1");

  // Feature flags
  const [isActivelyMaintining, setIsActivelyMaintining] = React.useState(true);
  const [islatestReadme, setIslatestReadme] = React.useState(false);
  const [isCustomDomain, setIsCustomDomain] = React.useState(false);
  const [isSelfHostingDatabase, setIsSelfHostingDatabase] = React.useState(false);
  const [isNeonDatabase, setIsNeonDatabase] = React.useState(false);
  const [isLLDAvailable, setIsLLDAvailable] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = React.useState(false);
  const [isGithubAuth, setIsGithubAuth] = React.useState(false);

  // Tech Stacks Selection States
  const [selectedTechStackIds, setSelectedTechStackIds] = React.useState<string[]>([]);
  const [techSearch, setTechSearch] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { data: categories = [] } = useGetTechCategories();
  const { data: techStacks = [] } = useGetTechStacks();

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
        setIsMonorepo(projectToEdit.isMonorepo);
        setRepoUrl(projectToEdit.repoUrl || "");
        setBackgroundImage(projectToEdit.backgroundImage || "image1");
        setIsActivelyMaintining(projectToEdit.isActivelyMaintining);
        setIslatestReadme(projectToEdit.islatestReadme);
        setIsCustomDomain(projectToEdit.isCustomDomain);
        setIsSelfHostingDatabase(projectToEdit.isSelfHostingDatabase);
        setIsNeonDatabase(projectToEdit.isNeonDatabase);
        setIsLLDAvailable(projectToEdit.isLLDAvailable);
        setIsAuth(projectToEdit.isAuth);
        setIsGoogleAuth(projectToEdit.isGoogleAuth);
        setIsGithubAuth(projectToEdit.isGithubAuth);

        // Find and select existing tech stacks associated with this project
        const projectTechStacks = techStacks.filter(
          (ts) => ts.projectId === projectToEdit.id
        );
        setSelectedTechStackIds(projectTechStacks.map((ts) => ts.id.toString()));
      } else {
        setTitle("");
        setDescription("");
        setShortDescription("");
        setProjectImage("");
        setTechCategoryId("");
        setLiveUrl("");
        setIsMonorepo(false);
        setRepoUrl("");
        setBackgroundImage("image1");
        setIsActivelyMaintining(true);
        setIslatestReadme(false);
        setIsCustomDomain(false);
        setIsSelfHostingDatabase(false);
        setIsNeonDatabase(false);
        setIsLLDAvailable(false);
        setIsAuth(false);
        setIsGoogleAuth(false);
        setIsGithubAuth(false);
        setSelectedTechStackIds([]);
      }
      setTechSearch("");
    }
  }, [open, projectToEdit, techStacks]);

  const categoryOptions = React.useMemo(() => {
    return categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }));
  }, [categories]);

  const filteredTechStacks = React.useMemo(() => {
    if (!techSearch.trim()) return techStacks;
    return techStacks.filter((ts) =>
      ts.name.toLowerCase().includes(techSearch.toLowerCase())
    );
  }, [techStacks, techSearch]);

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
      isMonorepo,
      repoUrl: repoUrl.trim() || null,
      backgroundImage,
      isActivelyMaintining,
      islatestReadme,
      isCustomDomain,
      isSelfHostingDatabase,
      isNeonDatabase,
      isLLDAvailable,
      isAuth,
      isGoogleAuth,
      isGithubAuth,
      techStackIds: selectedTechStackIds,
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

  const getBgImage = (bgName: string): any => {
    if (!bgName) return null;
    const cleanKey = bgName
      .replace(/\.(jpg|png|jpeg)$/, "")
      .replace("/background/", "") as keyof typeof bg;
    return bg[cleanKey] || null;
  };

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
                <Label className="text-xs font-medium text-foreground">
                  Tech Category
                </Label>
                <AutosearchSelect
                  options={categoryOptions}
                  value={techCategoryId}
                  onChange={setTechCategoryId}
                  placeholder="Search category..."
                />
              </div>

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
            </div>

            <div className="space-y-1.5 border border-zinc-200 dark:border-zinc-800 p-4 bg-muted/5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold tracking-tight text-foreground">
                  Tech Stack Reference
                </Label>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                  {selectedTechStackIds.length} Selected
                </span>
              </div>
              
              {/* Selected Stack Badges */}
              {selectedTechStackIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-2 border border-dashed border-zinc-200 dark:border-zinc-800 bg-background/30">
                  {selectedTechStackIds.map((id) => {
                    const ts = techStacks.find((t) => t.id.toString() === id);
                    if (!ts) return null;
                    const isDark = mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
                    const logo = isDark ? ts.logoDark : ts.logoLight;
                    return (
                      <div
                        key={id}
                        className="inline-flex items-center gap-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-foreground transition-all"
                      >
                        {logo?.trim() && (
                          <img
                            src={logo}
                            alt={ts.name}
                            className="w-3.5 h-3.5 object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        )}
                        <span>{ts.name}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedTechStackIds(prev => prev.filter(x => x !== id))}
                          className="hover:text-destructive text-muted-foreground ml-1 p-0.5"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Search filter input */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search and select tech stacks..."
                  value={techSearch}
                  onChange={(e) => setTechSearch(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>

              {/* Scrollable list of options */}
              <div className="max-h-36 overflow-y-auto border border-zinc-200 dark:border-zinc-800 bg-background divide-y divide-zinc-100 dark:divide-zinc-900 no-scrollbar">
                {filteredTechStacks.length === 0 ? (
                  <div className="py-2 text-center text-xs text-muted-foreground font-mono">
                    No matching tech stacks
                  </div>
                ) : (
                  filteredTechStacks.map((ts) => {
                    const isSelected = selectedTechStackIds.includes(ts.id.toString());
                    const isDark = mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
                    const logo = isDark ? ts.logoDark : ts.logoLight;
                    return (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTechStackIds(prev => prev.filter(id => id !== ts.id.toString()));
                          } else {
                            setSelectedTechStackIds(prev => [...prev, ts.id.toString()]);
                          }
                        }}
                        className={cn(
                          "w-full text-left flex items-center justify-between py-1.5 px-2.5 text-xs transition-colors cursor-pointer",
                          isSelected
                            ? "bg-zinc-100 dark:bg-zinc-800 text-foreground font-medium"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {logo?.trim() ? (
                            <img
                              src={logo}
                              alt={ts.name}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-4 h-4 bg-zinc-300 dark:bg-zinc-700" />
                          )}
                          <span>{ts.name}</span>
                        </div>
                        {isSelected ? (
                          <CheckIcon className="size-3.5 text-foreground" />
                        ) : (
                          <Plus className="size-3.5 opacity-40 hover:opacity-100" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
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

              <div className="space-y-1.5">
                <Label
                  htmlFor="proj-bg"
                  className="text-xs font-medium text-foreground"
                >
                  Background Image Preset
                </Label>
                <Select
                  value={backgroundImage}
                  onValueChange={setBackgroundImage}
                >
                  <SelectTrigger className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 text-xs h-9">
                    <SelectValue placeholder="Select Background" />
                  </SelectTrigger>
                  <SelectContent className="border border-zinc-200 dark:border-zinc-800 bg-popover rounded-none">
                    <SelectItem value="image1">image1 (Aset Light Blue)</SelectItem>
                    <SelectItem value="image2">image2 (Neon Teal)</SelectItem>
                    <SelectItem value="image3">image3 (Dark Indigo)</SelectItem>
                    <SelectItem value="image4">image4 (Orange Accent)</SelectItem>
                    <SelectItem value="image5">image5 (Cloud Violet)</SelectItem>
                    <SelectItem value="image6">image6 (Deep Charcoal)</SelectItem>
                    <SelectItem value="image7">image7 (Gold Dust)</SelectItem>
                    <SelectItem value="background.jpg">background.jpg (Default)</SelectItem>
                  </SelectContent>
                </Select>
                {backgroundImage && getBgImage(backgroundImage) && (
                  <div className="mt-1.5 border border-zinc-200 dark:border-zinc-800 bg-zinc-950 h-14 w-full relative overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        typeof getBgImage(backgroundImage) === "string"
                          ? (getBgImage(backgroundImage) as string)
                          : (getBgImage(backgroundImage) as any)?.src
                      }
                      alt="Background Image Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <span className="relative z-10 text-[9px] font-mono text-white bg-black/60 px-2 py-0.5 uppercase tracking-wider font-bold">
                      BG Preview
                    </span>
                  </div>
                )}
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

              {isMonorepo && (
                <div className="space-y-1.5 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
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
              )}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-4">
              <h4 className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground text-left">
                Project Status & Feature Flags
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-zinc-200 dark:border-zinc-800 p-4 bg-muted/5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="active-toggle" className="text-xs font-medium text-foreground">
                      Actively Maintaining
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Actively updating the project
                    </span>
                  </div>
                  <Switch
                    id="active-toggle"
                    checked={isActivelyMaintining}
                    onCheckedChange={setIsActivelyMaintining}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="readme-toggle" className="text-xs font-medium text-foreground">
                      Latest Readme
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      GitHub readme is fully up-to-date
                    </span>
                  </div>
                  <Switch
                    id="readme-toggle"
                    checked={islatestReadme}
                    onCheckedChange={setIslatestReadme}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="domain-toggle" className="text-xs font-medium text-foreground">
                      Custom Domain
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Project runs on a custom domain
                    </span>
                  </div>
                  <Switch
                    id="domain-toggle"
                    checked={isCustomDomain}
                    onCheckedChange={setIsCustomDomain}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="selfhost-toggle" className="text-xs font-medium text-foreground">
                      Self-Hosted DB
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Using a self-hosted database instance
                    </span>
                  </div>
                  <Switch
                    id="selfhost-toggle"
                    checked={isSelfHostingDatabase}
                    onCheckedChange={setIsSelfHostingDatabase}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="neon-toggle" className="text-xs font-medium text-foreground">
                      Neon Database
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Serverless PostgreSQL via Neon
                    </span>
                  </div>
                  <Switch
                    id="neon-toggle"
                    checked={isNeonDatabase}
                    onCheckedChange={setIsNeonDatabase}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="lld-toggle" className="text-xs font-medium text-foreground">
                      LLD Available
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Low-level design doc is available
                    </span>
                  </div>
                  <Switch
                    id="lld-toggle"
                    checked={isLLDAvailable}
                    onCheckedChange={setIsLLDAvailable}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auth-toggle" className="text-xs font-medium text-foreground">
                      Auth Configured
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Features login/signup system
                    </span>
                  </div>
                  <Switch
                    id="auth-toggle"
                    checked={isAuth}
                    onCheckedChange={setIsAuth}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="google-toggle" className="text-xs font-medium text-foreground">
                      Google OAuth
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      Google authentication integrated
                    </span>
                  </div>
                  <Switch
                    id="google-toggle"
                    checked={isGoogleAuth}
                    onCheckedChange={setIsGoogleAuth}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="github-toggle" className="text-xs font-medium text-foreground">
                      GitHub OAuth
                    </Label>
                    <span className="block text-[9px] text-muted-foreground">
                      GitHub authentication integrated
                    </span>
                  </div>
                  <Switch
                    id="github-toggle"
                    checked={isGithubAuth}
                    onCheckedChange={setIsGithubAuth}
                  />
                </div>
              </div>
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
