import React from "react";

interface SkillProps {
  name: string;
  link?: string;
}

const Skills: React.FC<SkillProps> = ({ name = "React", link }) => {
  return (
    <>
      <div className="border p-1.5">
        <p className="text-xs font-light">{name}</p>
      </div>
    </>
  );
};

export default Skills;
