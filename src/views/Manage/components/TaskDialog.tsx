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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreateProjectTask,
  useUpdateProjectTask,
  useGetAdminProjects,
  ProjectTask,
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

interface TaskDialogProps {
  taskToEdit?: ProjectTask;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TaskDialog({
  taskToEdit,
  open,
  onOpenChange,
}: TaskDialogProps) {
  const [projectId, setProjectId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("todo");
  const [priority, setPriority] = React.useState("medium");
  const [dueDate, setDueDate] = React.useState("");

  const { data: projects = [] } = useGetAdminProjects();

  const createMutation = useCreateProjectTask();
  const updateMutation = useUpdateProjectTask();

  React.useEffect(() => {
    if (open) {
      if (taskToEdit) {
        setProjectId(taskToEdit.projectId.toString());
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || "");
        setStatus(taskToEdit.status || "todo");
        setPriority(taskToEdit.priority || "medium");
        setDueDate(
          taskToEdit.dueDate
            ? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
            : ""
        );
      } else {
        setProjectId("");
        setTitle("");
        setDescription("");
        setStatus("todo");
        setPriority("medium");
        setDueDate("");
      }
    }
  }, [open, taskToEdit]);

  const projectOptions = React.useMemo(() => {
    return projects.map((p) => ({
      value: p.id.toString(),
      label: p.title,
    }));
  }, [projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !title.trim()) {
      toast.error("Project ID and Title are required");
      return;
    }

    const payload = {
      projectId: parseInt(projectId, 10),
      title: title.trim(),
      description: description.trim() || null,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    if (taskToEdit) {
      updateMutation.mutate(
        { id: taskToEdit.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Project task updated");
            onOpenChange(false);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "Failed to update task");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Project task created");
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.error || "Failed to create task");
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
              {taskToEdit ? "Edit Task" : "Add Task"}
            </DialogTitle>
            <DialogDescription className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {taskToEdit ? "Modify existing project task registry" : "Register a new project todo"}
            </DialogDescription>
          </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 my-2 text-left">
          <div className="space-y-1.5 flex flex-col justify-end">
            <Label className="text-xs font-medium text-foreground mb-1.5">
              Target Project *
            </Label>
            <AutosearchSelect
              options={projectOptions}
              value={projectId}
              onChange={setProjectId}
              placeholder="Search project..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-title" className="text-xs font-medium text-foreground">
              Task Title *
            </Label>
            <Input
              id="task-title"
              required
              placeholder="e.g. Integrate auth router"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-desc" className="text-xs font-medium text-foreground">
              Description
            </Label>
            <Textarea
              id="task-desc"
              placeholder="Brief details about the task task requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm min-h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="task-status" className="text-xs font-medium text-foreground">
                Task Status
              </Label>
              <Select
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 text-xs h-9">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="border border-zinc-200 dark:border-zinc-800 bg-popover rounded-none">
                  <SelectItem value="todo">TODO</SelectItem>
                  <SelectItem value="in_progress">IN PROGRESS</SelectItem>
                  <SelectItem value="done">DONE</SelectItem>
                  <SelectItem value="backlog">BACKLOG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="task-priority" className="text-xs font-medium text-foreground">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={setPriority}
              >
                <SelectTrigger className="w-full rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 text-xs h-9">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent className="border border-zinc-200 dark:border-zinc-800 bg-popover rounded-none">
                  <SelectItem value="low">LOW</SelectItem>
                  <SelectItem value="medium">MEDIUM</SelectItem>
                  <SelectItem value="high">HIGH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="task-date" className="text-xs font-medium text-foreground">
              Due Date
            </Label>
            <Input
              id="task-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-background/50 focus-visible:ring-0 focus-visible:border-foreground text-sm h-9 text-foreground"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-none font-mono text-xs uppercase bg-foreground text-background hover:bg-foreground/90 py-2 cursor-pointer"
            >
              {isPending ? "Saving..." : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
