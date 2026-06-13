"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FontChanger, { FontInitializer } from "@/Shared/FontChanger/FontChanger";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import SmoothScroll from "@/Shared/SmoothScroll/SmoothScroll";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute stale time
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <>
          <FontChanger />
          <FontInitializer />
        </>
      )}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <SmoothScroll>
          <TooltipProvider>{children}</TooltipProvider>
        </SmoothScroll>
      </ThemeProvider>
      <script
        src="https://page-views-api.ratneshc.com/script"
        data-site="ashutoshtiwari.me"
        data-path="/"
        defer
      />
    </QueryClientProvider>
  );
};

export default Provider;
