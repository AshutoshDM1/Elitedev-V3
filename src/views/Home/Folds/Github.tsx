import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import SubSection from "@/Shared/Section/SubSection";
import { TooltipProvider } from "@/components/ui/tooltip";

const GITHUB_USERNAME = "AshutoshDM1";
const GITHUB_PROFILE_URL = "https://github.com/AshutoshDM1";

export default function GitHubGraph() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <SubSection>
      <TooltipProvider>
        <div style={{ scrollbarWidth: "none" }}>
          <Suspense fallback={<GitHubContributionsFallback />}>
            <GitHubContributions
              contributions={contributions}
              githubProfileUrl={GITHUB_PROFILE_URL}
            />
          </Suspense>
        </div>
      </TooltipProvider>
    </SubSection>
  );
}
