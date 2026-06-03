import LineX from "../Line/LineX";
import LineY from "../Line/LineY";
import Section from "./Section";
import { cn } from "@/lib/utils";
import LineJoint from "../Line/LineJoint";

interface SubSectionProp {
  className?: string;
  id?: string;
  children: React.ReactNode;
}

const SubSection: React.FC<SubSectionProp> = ({ className, id, children }) => {
  return (
    <LineY>
      <Section className={cn("", className)} id={id || ""}>
        <LineX>
          <div>{children}</div>
          <LineJoint side="left" vertical="top" />
          <LineJoint side="right" vertical="top" />
          <LineJoint side="left" vertical="bottom" />
          <LineJoint side="right" vertical="bottom" />
        </LineX>
      </Section>
    </LineY>
  );
};

export default SubSection;
