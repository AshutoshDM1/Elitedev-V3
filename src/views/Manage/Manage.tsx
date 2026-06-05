"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ProjectsTable,
  FrontendsTable,
  BackendsTable,
  TechStacksTable,
  CategoriesTable,
  TasksTable,
} from "./components/ManageTables";
import { LayoutGrid, Layers, Server, Code2, ListTodo, FolderGit } from "lucide-react";

export default function Manage() {
  return (
    <div className="pt-10 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2 border border-zinc-200 dark:border-zinc-800 bg-background p-6 rounded-none shadow-xs">
          <h1 className="text-xl font-semibold tracking-tight uppercase font-sans">
            Admin Registry Dashboard
          </h1>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
            Configure system registry records: projects, services, tech stacks, categories & tasks
          </p>
        </div>

        {/* Tabbed Registry Sections */}
        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 rounded-none shadow-xs">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList variant="line" className="w-full justify-start border-b border-zinc-200 dark:border-zinc-800 mb-6 flex-wrap gap-2 pb-px h-auto">
              <TabsTrigger value="projects" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <FolderGit className="w-3.5 h-3.5 mr-1" /> Projects
              </TabsTrigger>
              <TabsTrigger value="frontend" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <Layers className="w-3.5 h-3.5 mr-1" /> Frontends
              </TabsTrigger>
              <TabsTrigger value="backend" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <Server className="w-3.5 h-3.5 mr-1" /> Backends
              </TabsTrigger>
              <TabsTrigger value="tech-stack" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <Code2 className="w-3.5 h-3.5 mr-1" /> Tech Stack
              </TabsTrigger>
              <TabsTrigger value="categories" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <LayoutGrid className="w-3.5 h-3.5 mr-1" /> Categories
              </TabsTrigger>
              <TabsTrigger value="tasks" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <ListTodo className="w-3.5 h-3.5 mr-1" /> Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-0 focus-visible:outline-none">
              <ProjectsTable />
            </TabsContent>
            <TabsContent value="frontend" className="mt-0 focus-visible:outline-none">
              <FrontendsTable />
            </TabsContent>
            <TabsContent value="backend" className="mt-0 focus-visible:outline-none">
              <BackendsTable />
            </TabsContent>
            <TabsContent value="tech-stack" className="mt-0 focus-visible:outline-none">
              <TechStacksTable />
            </TabsContent>
            <TabsContent value="categories" className="mt-0 focus-visible:outline-none">
              <CategoriesTable />
            </TabsContent>
            <TabsContent value="tasks" className="mt-0 focus-visible:outline-none">
              <TasksTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
