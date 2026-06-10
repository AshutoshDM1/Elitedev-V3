"use client";
import LineY from "@/Shared/Line/LineY";
import SubSection from "@/Shared/Section/SubSection";
import Error404 from "@/Shared/ErrorPage/ErrorPage";

export default function ProjectNotFound() {
  return (
    <div className="pt-5 bg-background">
      <LineY className="border-t">
        <SubSection>
          <Error404/>
        </SubSection>
      </LineY>
    </div>
  );
}
