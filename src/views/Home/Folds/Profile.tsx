import { ThemeToggle } from "@/components/theme-toggle";
import SubSection from "@/Shared/Section/SubSection";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { BlurShimmerText } from "@/components/blur-shimmer-text";

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
            <h1 className="font-medium text-xl leading-5 flex items-center justify-start gap-1.5">
              Ashutosh Tiwari
              <BadgeCheck className="size-[20px] fill-blue-500  text-white dark:text-black shrink-0" />
            </h1>
            <BlurShimmerText
              texts={["Full-Stack Developer", "Software Engineer", "Open Source Contributer" ]}
              className="text-start text-[14px] font-medium text-muted-foreground mt-1"
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
