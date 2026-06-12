import RotatingText from "@/components/RotatingText";
import { ThemeToggle } from "@/components/theme-toggle";
import SubSection from "@/Shared/Section/SubSection";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

const Profile = () => {
  return (
    <SubSection>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="size-24 border shadow-sm  rounded-sm p-1 overflow-hidden">
            <Image
              src="/avatar/avatar.png"
              height={100}
              width={100}
              className="size-full object-cover rounded-sm border "
              alt="profile Image"
            />
          </div>
          <div className="flex flex-col justify-center pt-4">
            <h1 className="font-medium text-xl leading-5 flex items-start justify-start gap-1.5">
              Ashutosh Tiwari{" "}
              <BadgeCheck className="size-[20px] fill-blue-500  text-white dark:text-black shrink-0" />
            </h1>
            <RotatingText
              texts={[
                "Software Engineer",
                "Web Designer",
                "Open Source Contributor",
                "Freelancer",
              ]}
              mainClassName="text-[13px] overflow-hidden"
              staggerFrom="first"
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              exit={{ y: "-130%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              splitBy="characters"
              auto
              loop
            />
          </div>
        </div>
        <div className="flex items-start">
          <ThemeToggle />
        </div>
      </div>
    </SubSection>
  );
};

export default Profile;
