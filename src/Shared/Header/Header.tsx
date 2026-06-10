import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  href?: string;
}

const Header = ({ title, href }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {href ? (
          <Link href={href}>
            <Button>
              <ArrowBigLeftDash />
            </Button>
          </Link>
        ) : (
          <Button onClick={() => window.history.back()}>
            <ArrowBigLeftDash />
          </Button>
        )}
        <h1 className="text-xl font-medium text-foreground tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};
export default Header;
