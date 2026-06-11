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
              height={50}
              width={50}
              className="size-full object-cover rounded-sm border "
              alt="profile Image"
            />
          </div>
          <div className="flex flex-col justify-end pb-2">
            <h2 className="font-medium text-xl leading-5 flex items-center gap-1.5">
              Ashutosh Tiwari{" "}
              <BadgeCheck className="size-[20px] fill-blue-500  text-white dark:text-black shrink-0" />
            </h2>
            <p className="text-sm leading-5 ">Software Engineer</p>
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
