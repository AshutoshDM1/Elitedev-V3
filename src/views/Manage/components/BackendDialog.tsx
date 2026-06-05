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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreateBackend,
  useUpdateBackend,
  useGetAdminProjects,
  useGetTechStacks,
  Backend,
} from "@/hooks/useManage";
import AutosearchSelect from "./AutosearchSelect";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BackendDialogProps {
  backendToEdit?: Backend;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BackendDialog({
  backendToEdit,
  open,
  onOpenChange,
}: BackendDialogProps) {
  const [projectId, setProjectId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [techStackId, setTechStackId] = React.useState("");
  const [liveUrl, setLiveUrl] = React.useState("");
  const [cicd, setCicd] = React.useState(true);
  const [cicdTool, setCicdTool] = React.useState("");
  const [containerization, setContainerization] = React.useState(true);
  const [containerizationTool, setContainerizationTool] = React.useState("");
  const [deploymentPlatform, setDeploymentPlatform] = React.useState("");
  const [isCliTool, setIsCliTool] = React.useState(false);
  const [npmVersion, setNpmVersion] = React.useState(false); // maps to is_server_less
  const [isMonorepo, setIsMonorepo] = React.useState(false);
  const [repoUrl, setRepoUrl] = React.useState("");
  const [rootPath, setRootPath] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);
  const [status, setStatus] = React.useState("unknown");
  const [stars, setStars] = React.useState("0");
  const [forks, setForks] = React.useState("0");
  const [openIssues, setOpenIssues] = React.useState("0");

  const { data: projects = [] } = useGetAdminProjects();
  const { data: techStacks = [] } = useGetTechStacks();

  const createMutation = useCreateBackend();
  const updateMutation = useUpdateBackend();

  React.useEffect(() => {
    if (open) {
      if (backendToEdit) {
        setProjectId(backendToEdit.projectId.toString());
        setTitle(backendToEdit.title);
        setDescription(backendToEdit.description);
        setTechStackId(backendToEdit.techStackId?.toString() || "");
        setLiveUrl(backendToEdit.liveUrl || "");
        setCicd(backendToEdit.cicd);
        setCicdTool(backendToEdit.cicdTool || "");
        setContainerization(backendToEdit.containerization);
        setContainerizationTool(backendToEdit.containerizationTool || "");
        setDeploymentPlatform(backendToEdit.deploymentPlatform || "");
        setIsCliTool(backendToEdit.isCliTool);
        setNpmVersion(backendToEdit.npmVersion);
        setIsMonorepo(backendToEdit.isMonorepo);
        setRepoUrl(backendToEdit.repoUrl || "");
        setRootPath(backendToEdit.rootPath || "");
        setIsActive(backendToEdit.isActivelyMaintining);
        setStatus(backendToEdit.status || "unknown");
        setStars(backendToEdit.stars.toString());
        setForks(backendToEdit.forks.toString());
        setOpenIssues(backendToEdit.openIssues.toString());
      } else {
        setProjectId("");
        setTitle("");
        setDescription("");
        setTechStackId("");
        setLiveUrl("");
        setCicd(true);
        setCicdTool("");
        setContainerization(true);
        setContainerizationTool("");
        setDeploymentPlatform("");
        setIsCliTool(false);
        setNpmVersion(false);
        setIsMonorepo(false);
        setRepoUrl("");
        setRootPath("");
        setIsActive(true);
        setStatus("unknown");
        setStars("0");
        setForks("0");
        setOpenIssues("0");
      }
    }
  }, [open, backendToEdit]);

  const projectOptions = React.useMemo(() => {
    return projects.map((p) => ({
      value: p.id.toString(),
      label: p.title,
    }));
  }, [projects]);

  const techStackOptions = React.useMemo(() => {
    return techStacks.map((t) => ({
      value: t.id.toString(),
      label: t.name,
    }));
  }, [techStacks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !title.trim() || !description.trim()) {
      toast.error("Project, Title, and Description are required");
      return;
    }

    const payload = {
      projectId: parseInt(projectId, 10),
      title: title.trim(),
      description: description.trim(),
      techStackId: techStackId ? parseInt(techStackId, 10) : null,
      liveUrl: liveUrl.trim() || null,
      cicd,
      cicdTool: cicdTool.trim() || null,
      containerization,
      containerizationTool: containerizationTool.trim() || null,
      deploymentPlatform: deploymentPlatform.trim() || null,
      isCliTool,
      npmVersion,
      isMonorepo,
      repoUrl: repoUrl.trim() || null,
      rootPath: rootPath.trim() || null,
      isActivelyMaintining: isActive,
      status,
      stars: parseInt(stars, 10) || 0,
      forks: parseInt(forks, 10) || 0,
      openIssues: parseInt(openIssues, 10) || 0,
    };

    if (backendToEdit) {
      updateMutation.mutate(
        { id: backendToEdit.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Backend stack updated");
            onOpenChange(false);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "Failed to update backend stack");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Backend stack created");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.error || "Failed to create backend stack");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-zinc-200 dark:border-zinc-800 rounded-none bg-background max-w-lg sm:max-w-2xl w-full p-6 shadow-md">
        <ScrollArea className="max-h-[80vh] pr-5">
          <DialogHeader>
            <DialogTitle className="font-sans text-lg font-semibold tracking-tight text-foreground">
              {backendToEdit ? "Edit Backend Stack" : "Add Backend Stack"}
            </DialogTitle>
          <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            {backendToEdit ? "Modify existing backend deployment stack" : "Register a new backend service"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 my-2 text-left">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 flex flex-col justify-end">
              <Label className="text-xs font-medium text-foreground mb-1.5">
                Associated Project *
              </Label>
              <AutosearchSelect
                options={projectOptions}
                value={projectId}
                onChange={setProjectId}
                placeholder="Search project..."
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <Label className="text-xs font-medium text-foreground mb-1.5">
                Tech Stack Reference
              </Label>
              <AutosearchSelect
                options={techStackOptions}
                value={techStackId}
                onChange={setTechStackId}
                placeholder="Search tech stack..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="be-title" className="text-xs font-medium text-foreground">
              Service Title *
            </Label>
            <Input
              id="be-title"
              required
              placeholder="e.g. Manga Heaven API Scraper"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="be-desc" className="text-xs font-medium text-foreground">
              Description *
            </Label>
            <Textarea
              id="be-desc"
              required
              placeholder="Describe the backend service, API frameworks, database configuration..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm min-h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="be-live" className="text-xs font-medium text-foreground">
                Live URL Endpoint
              </Label>
              <Input
                id="be-live"
                placeholder="e.g. https://api.mangaheaven.app/api"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="be-platform" className="text-xs font-medium text-foreground">
                Deployment Platform
              </Label>
              <Input
                id="be-platform"
                placeholder="e.g. AWS EC2, Railway, fly.io"
                value={deploymentPlatform}
                onChange={(e) => setDeploymentPlatform(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="be-monorepo" className="text-xs font-medium text-foreground">
                  Inside Monorepo
                </Label>
                <span className="block text-[10px] text-muted-foreground">
                  Is directory nested inside monorepo workspace
                </span>
              </div>
              <Switch
                id="be-monorepo"
                checked={isMonorepo}
                onCheckedChange={setIsMonorepo}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="be-repourl" className="text-xs font-medium text-foreground">
                Repository URL
              </Label>
              <Input
                id="be-repourl"
                placeholder="e.g. https://github.com/user/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            {isMonorepo && (
              <div className="space-y-1.5">
                <Label htmlFor="be-root" className="text-xs font-medium text-foreground">
                  Root Path inside repo
                </Label>
                <Input
                  id="be-root"
                  placeholder="e.g. apps/api"
                  value={rootPath}
                  onChange={(e) => setRootPath(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 border border-zinc-200 dark:border-zinc-800 p-4 bg-muted/10">
            <div className="flex items-center justify-between col-span-2">
              <Label htmlFor="be-container" className="text-xs font-medium text-foreground">
                Containerization (Docker)
              </Label>
              <Switch
                id="be-container"
                checked={containerization}
                onCheckedChange={setContainerization}
              />
            </div>
            {containerization && (
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="be-containertool" className="text-xs font-medium text-foreground">
                  Containerization Tool
                </Label>
                <Input
                  id="be-containertool"
                  placeholder="e.g. Docker, Podman"
                  value={containerizationTool}
                  onChange={(e) => setContainerizationTool(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 border border-zinc-200 dark:border-zinc-800 p-4 bg-muted/10">
            <div className="flex items-center justify-between col-span-2">
              <Label htmlFor="be-cicd" className="text-xs font-medium text-foreground">
                CI/CD Setup
              </Label>
              <Switch
                id="be-cicd"
                checked={cicd}
                onCheckedChange={setCicd}
              />
            </div>
            {cicd && (
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="be-cicdtool" className="text-xs font-medium text-foreground">
                  CI/CD Tool
                </Label>
                <Input
                  id="be-cicdtool"
                  placeholder="e.g. GitHub Actions, Jenkins"
                  value={cicdTool}
                  onChange={(e) => setCicdTool(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 border border-zinc-200 dark:border-zinc-800 p-4 bg-muted/10">
            <div className="flex items-center justify-between">
              <Label htmlFor="cli-toggle" className="text-xs font-medium text-foreground">
                CLI Utility Tool
              </Label>
              <Switch
                id="cli-toggle"
                checked={isCliTool}
                onCheckedChange={setIsCliTool}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="serverless-toggle" className="text-xs font-medium text-foreground">
                Serverless Deploy / npm
              </Label>
              <Switch
                id="serverless-toggle"
                checked={npmVersion}
                onCheckedChange={setNpmVersion}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="be-status" className="text-xs font-medium text-foreground">
                Service Status
              </Label>
              <Select
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 text-xs h-9">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="border border-zinc-200 dark:border-zinc-800 bg-popover rounded-none">
                  <SelectItem value="unknown">UNKNOWN</SelectItem>
                  <SelectItem value="UP">UP (HEALTHY)</SelectItem>
                  <SelectItem value="DOWN">DOWN (OFFLINE)</SelectItem>
                  <SelectItem value="DEGRADED">DEGRADED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="be-stars" className="text-xs font-medium text-foreground">
                GitHub Stars
              </Label>
              <Input
                id="be-stars"
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="be-forks" className="text-xs font-medium text-foreground">
                GitHub Forks
              </Label>
              <Input
                id="be-forks"
                type="number"
                value={forks}
                onChange={(e) => setForks(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="be-issues" className="text-xs font-medium text-foreground">
                Open Issues
              </Label>
              <Input
                id="be-issues"
                type="number"
                value={openIssues}
                onChange={(e) => setOpenIssues(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <Label htmlFor="be-active" className="text-xs font-medium text-foreground">
              Service Active status
            </Label>
            <Switch
              id="be-active"
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
              {isPending ? "Saving..." : "Save Backend"}
            </Button>
          </DialogFooter>
        </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
