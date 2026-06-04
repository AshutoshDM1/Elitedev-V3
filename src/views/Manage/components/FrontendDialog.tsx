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
  useCreateFrontend,
  useUpdateFrontend,
  useGetAdminProjects,
  useGetTechStacks,
  Frontend,
} from "@/hooks/useManage";
import AutosearchSelect from "./AutosearchSelect";

interface FrontendDialogProps {
  frontendToEdit?: Frontend;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FrontendDialog({
  frontendToEdit,
  open,
  onOpenChange,
}: FrontendDialogProps) {
  const [projectId, setProjectId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [techStackId, setTechStackId] = React.useState("");
  const [liveUrl, setLiveUrl] = React.useState("");
  const [clientRepo, setClientRepo] = React.useState("");
  const [isMonorepo, setIsMonorepo] = React.useState(false);
  const [repoUrl, setRepoUrl] = React.useState("");
  const [rootPath, setRootPath] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);
  const [deploymentPlatform, setDeploymentPlatform] = React.useState("");
  const [cicd, setCicd] = React.useState(true);
  const [cicdTool, setCicdTool] = React.useState("");
  const [status, setStatus] = React.useState("unknown");
  const [stars, setStars] = React.useState("0");
  const [forks, setForks] = React.useState("0");
  const [openIssues, setOpenIssues] = React.useState("0");

  const { data: projects = [] } = useGetAdminProjects();
  const { data: techStacks = [] } = useGetTechStacks();

  const createMutation = useCreateFrontend();
  const updateMutation = useUpdateFrontend();

  React.useEffect(() => {
    if (open) {
      if (frontendToEdit) {
        setProjectId(frontendToEdit.projectId.toString());
        setTitle(frontendToEdit.title);
        setDescription(frontendToEdit.description);
        setTechStackId(frontendToEdit.techStackId?.toString() || "");
        setLiveUrl(frontendToEdit.liveUrl || "");
        setClientRepo(frontendToEdit.clientRepo || "");
        setIsMonorepo(frontendToEdit.isMonorepo);
        setRepoUrl(frontendToEdit.repoUrl || "");
        setRootPath(frontendToEdit.rootPath || "");
        setIsActive(frontendToEdit.isActive);
        setDeploymentPlatform(frontendToEdit.deploymentPlatform || "");
        setCicd(frontendToEdit.cicd);
        setCicdTool(frontendToEdit.cicdTool || "");
        setStatus(frontendToEdit.status || "unknown");
        setStars(frontendToEdit.stars.toString());
        setForks(frontendToEdit.forks.toString());
        setOpenIssues(frontendToEdit.openIssues.toString());
      } else {
        setProjectId("");
        setTitle("");
        setDescription("");
        setTechStackId("");
        setLiveUrl("");
        setClientRepo("");
        setIsMonorepo(false);
        setRepoUrl("");
        setRootPath("");
        setIsActive(true);
        setDeploymentPlatform("");
        setCicd(true);
        setCicdTool("");
        setStatus("unknown");
        setStars("0");
        setForks("0");
        setOpenIssues("0");
      }
    }
  }, [open, frontendToEdit]);

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
      clientRepo: clientRepo.trim() || null,
      isMonorepo,
      repoUrl: repoUrl.trim() || null,
      rootPath: rootPath.trim() || null,
      isActive,
      deploymentPlatform: deploymentPlatform.trim() || null,
      cicd,
      cicdTool: cicdTool.trim() || null,
      status,
      stars: parseInt(stars, 10) || 0,
      forks: parseInt(forks, 10) || 0,
      openIssues: parseInt(openIssues, 10) || 0,
    };

    if (frontendToEdit) {
      updateMutation.mutate(
        { id: frontendToEdit.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Frontend stack updated");
            onOpenChange(false);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "Failed to update frontend stack");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Frontend stack created");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.error || "Failed to create frontend stack");
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-zinc-200 dark:border-zinc-800 rounded-none bg-background max-w-lg w-full p-6 shadow-md overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-sans text-lg font-semibold tracking-tight text-foreground">
            {frontendToEdit ? "Edit Frontend Stack" : "Add Frontend Stack"}
          </DialogTitle>
          <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            {frontendToEdit ? "Modify existing frontend deployment stack" : "Register a new frontend service"}
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
            <Label htmlFor="fe-title" className="text-xs font-medium text-foreground">
              Service Title *
            </Label>
            <Input
              id="fe-title"
              required
              placeholder="e.g. Manga Heaven Client"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fe-desc" className="text-xs font-medium text-foreground">
              Description *
            </Label>
            <Textarea
              id="fe-desc"
              required
              placeholder="Describe the frontend service and frameworks used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm min-h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fe-live" className="text-xs font-medium text-foreground">
                Service Live URL
              </Label>
              <Input
                id="fe-live"
                placeholder="e.g. https://mangaheaven.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fe-platform" className="text-xs font-medium text-foreground">
                Deployment Platform
              </Label>
              <Input
                id="fe-platform"
                placeholder="e.g. Vercel, Netlify, AWS S3"
                value={deploymentPlatform}
                onChange={(e) => setDeploymentPlatform(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 bg-muted/10">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="fe-monorepo" className="text-xs font-medium text-foreground">
                  Inside Monorepo
                </Label>
                <span className="block text-[10px] text-muted-foreground">
                  Is directory nested inside monorepo workspace
                </span>
              </div>
              <Switch
                id="fe-monorepo"
                checked={isMonorepo}
                onCheckedChange={setIsMonorepo}
              />
            </div>

            {isMonorepo ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="fe-repourl" className="text-xs font-medium text-foreground">
                    Monorepo GitHub URL
                  </Label>
                  <Input
                    id="fe-repourl"
                    placeholder="e.g. https://github.com/user/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fe-root" className="text-xs font-medium text-foreground">
                    Root Path inside repo
                  </Label>
                  <Input
                    id="fe-root"
                    placeholder="e.g. apps/web"
                    value={rootPath}
                    onChange={(e) => setRootPath(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="fe-client" className="text-xs font-medium text-foreground">
                  Client Repository URL
                </Label>
                <Input
                  id="fe-client"
                  placeholder="e.g. https://github.com/user/client"
                  value={clientRepo}
                  onChange={(e) => setClientRepo(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 border border-zinc-200 dark:border-zinc-800 p-4 bg-muted/10">
            <div className="flex items-center justify-between col-span-2">
              <div className="space-y-0.5">
                <Label htmlFor="fe-cicd" className="text-xs font-medium text-foreground">
                  CI/CD Configured
                </Label>
              </div>
              <Switch
                id="fe-cicd"
                checked={cicd}
                onCheckedChange={setCicd}
              />
            </div>
            {cicd && (
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="fe-cicdtool" className="text-xs font-medium text-foreground">
                  CI/CD Tool / Pipeline
                </Label>
                <Input
                  id="fe-cicdtool"
                  placeholder="e.g. GitHub Actions, Vercel Build"
                  value={cicdTool}
                  onChange={(e) => setCicdTool(e.target.value)}
                  className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fe-status" className="text-xs font-medium text-foreground">
                Service Status
              </Label>
              <select
                id="fe-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus:border-foreground text-sm p-2 h-9 text-foreground focus:outline-none"
              >
                <option value="unknown" className="bg-background">UNKNOWN</option>
                <option value="UP" className="bg-background">UP (HEALTHY)</option>
                <option value="DOWN" className="bg-background">DOWN (OFFLINE)</option>
                <option value="DEGRADED" className="bg-background">DEGRADED</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fe-stars" className="text-xs font-medium text-foreground">
                GitHub Stars
              </Label>
              <Input
                id="fe-stars"
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fe-forks" className="text-xs font-medium text-foreground">
                GitHub Forks
              </Label>
              <Input
                id="fe-forks"
                type="number"
                value={forks}
                onChange={(e) => setForks(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fe-issues" className="text-xs font-medium text-foreground">
                Open Issues
              </Label>
              <Input
                id="fe-issues"
                type="number"
                value={openIssues}
                onChange={(e) => setOpenIssues(e.target.value)}
                className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <Label htmlFor="fe-active" className="text-xs font-medium text-foreground">
              Service Active status
            </Label>
            <Switch
              id="fe-active"
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
              {isPending ? "Saving..." : "Save Frontend"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
