import React from "react";
import TechStackIcon from "@/Shared/TechStackIcon/TechStackIcon";

interface SkillProps {
  name: string;
  link?: string;
}

const Skills: React.FC<SkillProps> = ({ name = "React", link }) => {
  return (
    <div className="scale-100" >
      <TechStackIcon name={name} />
    </div>
  );
};

export default Skills;
