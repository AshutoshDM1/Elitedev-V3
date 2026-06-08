"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  TechStacksTable,
  CategoriesTable,
} from "./components/ManageTables";
import Link from "next/link";
import { LayoutGrid, Code2, ArrowLeft } from "lucide-react";

export default function Manage() {
  return (
    <div className="pt-10 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-3 border border-zinc-200 dark:border-zinc-800 bg-background p-6 rounded-none shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center p-1.5 border border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Back to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight uppercase font-sans">
              Admin Registry Dashboard
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
            Configure system registry records: tech stacks & categories
          </p>
        </div>

        {/* Tabbed Registry Sections */}
        <div className="bg-background border border-zinc-200 dark:border-zinc-800 p-6 rounded-none shadow-xs">
          <Tabs defaultValue="tech-stack" className="w-full">
            <TabsList variant="line" className="w-full justify-start border-b border-zinc-200 dark:border-zinc-800 mb-6 flex-wrap gap-2 pb-px h-auto">
              <TabsTrigger value="tech-stack" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <Code2 className="w-3.5 h-3.5 mr-1" /> Tech Stack
              </TabsTrigger>
              <TabsTrigger value="categories" className="font-mono uppercase text-[10px] tracking-wider py-2 cursor-pointer">
                <LayoutGrid className="w-3.5 h-3.5 mr-1" /> Categories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tech-stack" className="mt-0 focus-visible:outline-none">
              <TechStacksTable />
            </TabsContent>
            <TabsContent value="categories" className="mt-0 focus-visible:outline-none">
              <CategoriesTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
