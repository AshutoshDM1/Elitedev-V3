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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useCreateTechStack,
  useUpdateTechStack,
  useGetTechCategories,
  TechStack,
} from "@/hooks/useManage";
import AutosearchSelect from "./AutosearchSelect";
import ImageUpload from "./ImageUpload";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TechStackDialogProps {
  stackToEdit?: TechStack;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TechStackDialog({
  stackToEdit,
  open,
  onOpenChange,
}: TechStackDialogProps) {
  const [name, setName] = React.useState("");
  const [logoLight, setLogoLight] = React.useState("");
  const [logoDark, setLogoDark] = React.useState("");
  const [techCategoryId, setTechCategoryId] = React.useState("");
  const [useSameLogo, setUseSameLogo] = React.useState(true);

  const { data: categories = [] } = useGetTechCategories();

  const createMutation = useCreateTechStack();
  const updateMutation = useUpdateTechStack();

  React.useEffect(() => {
    if (open) {
      if (stackToEdit) {
        setName(stackToEdit.name);
        setLogoLight(stackToEdit.logoLight);
        setLogoDark(stackToEdit.logoDark);
        setTechCategoryId(stackToEdit.techCategoryId?.toString() || "");
        
        const isSame = !!stackToEdit.logoLight && stackToEdit.logoLight === stackToEdit.logoDark;
        setUseSameLogo(isSame);
      } else {
        setName("");
        setLogoLight("");
        setLogoDark("");
        setTechCategoryId("");
        setUseSameLogo(true);
      }
    }
  }, [open, stackToEdit]);

  // Sync logoDark to logoLight when useSameLogo option is active
  React.useEffect(() => {
    if (useSameLogo) {
      setLogoDark(logoLight);
    }
  }, [logoLight, useSameLogo]);

  const categoryOptions = React.useMemo(() => {
    return categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }));
  }, [categories]);

  const handleUseSameLogoChange = (checked: boolean) => {
    setUseSameLogo(checked);
    if (checked) {
      setLogoDark(logoLight);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLogoDark = useSameLogo ? logoLight.trim() : logoDark.trim();
    if (!name.trim() || !logoLight.trim() || !finalLogoDark) {
      toast.error("Name and logo paths are required");
      return;
    }

    const payload = {
      name: name.trim(),
      logoLight: logoLight.trim(),
      logoDark: finalLogoDark,
      techCategoryId: techCategoryId ? parseInt(techCategoryId, 10) : null,
      projectId: null,
    };

    if (stackToEdit) {
      updateMutation.mutate(
        { id: stackToEdit.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Tech stack entry updated");
            onOpenChange(false);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "Failed to update tech stack");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Tech stack entry created");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.error || "Failed to create tech stack");
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
              {stackToEdit ? "Edit Tech Stack" : "Add Tech Stack"}
            </DialogTitle>
            <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {stackToEdit ? "Modify existing tech stack properties" : "Register a new technology stack element"}
            </DialogDescription>
          </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 my-2 text-left">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium text-foreground">
              Tech Stack Name *
            </Label>
            <Input
              id="name"
              required
              placeholder="e.g. Next.js, Postgres"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-1.5 flex flex-col">
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

          <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 p-3 bg-muted/10">
            <div className="space-y-0.5">
              <Label htmlFor="same-logo-toggle" className="text-xs font-medium text-foreground">
                Use Light Mode Logo for Dark Mode
              </Label>
              <span className="block text-[10px] text-muted-foreground">
                Enable if the logo is suitable for both light and dark backgrounds
              </span>
            </div>
            <Switch
              id="same-logo-toggle"
              checked={useSameLogo}
              onCheckedChange={handleUseSameLogoChange}
            />
          </div>

          {useSameLogo ? (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="logoLightSingle" className="text-xs font-medium text-foreground">
                  Logo Path/URL *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="logoLightSingle"
                    required
                    placeholder="e.g. nextjs.png"
                    value={logoLight}
                    onChange={(e) => setLogoLight(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9 flex-1"
                  />
                  <ImageUpload onUploadSuccess={(url) => setLogoLight(url)} label="Up" />
                </div>
              </div>
              {logoLight?.trim() && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Light Background</span>
                    <div className="border border-zinc-200 bg-white p-2 flex items-center justify-center h-16 w-full select-none overflow-hidden">
                      <img
                        src={logoLight}
                        alt="Logo Light Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Dark Background</span>
                    <div className="border border-zinc-800 bg-black p-2 flex items-center justify-center h-16 w-full select-none overflow-hidden">
                      <img
                        src={logoLight}
                        alt="Logo Dark Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="logoLight" className="text-xs font-medium text-foreground">
                  Logo Light Path/URL *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="logoLight"
                    required
                    placeholder="e.g. nextjs.png"
                    value={logoLight}
                    onChange={(e) => setLogoLight(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9 flex-1"
                  />
                  <ImageUpload onUploadSuccess={(url) => setLogoLight(url)} label="Up" />
                </div>
                {logoLight?.trim() && (
                  <div className="border border-zinc-200 bg-white p-2 flex items-center justify-center h-14 w-full select-none overflow-hidden">
                    <img
                      src={logoLight}
                      alt="Logo Light Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="logoDark" className="text-xs font-medium text-foreground">
                  Logo Dark Path/URL *
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="logoDark"
                    required
                    placeholder="e.g. nextjs.png"
                    value={logoDark}
                    onChange={(e) => setLogoDark(e.target.value)}
                    className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9 flex-1"
                  />
                  <ImageUpload onUploadSuccess={(url) => setLogoDark(url)} label="Up" />
                </div>
                {logoDark?.trim() && (
                  <div className="border border-zinc-800 bg-black p-2 flex items-center justify-center h-14 w-full select-none overflow-hidden">
                    <img
                      src={logoDark}
                      alt="Logo Dark Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-none font-mono text-xs uppercase bg-foreground text-background hover:bg-foreground/90 py-2 cursor-pointer"
            >
              {isPending ? "Saving..." : "Save Tech Stack"}
            </Button>
          </DialogFooter>
        </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
