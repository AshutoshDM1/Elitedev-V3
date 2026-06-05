import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export const H1: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <h1
      className={cn(
        "text-2xl font-medium tracking-tight text-center text-zinc-900 dark:text-white leading-none",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export const H2: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <h2
      className={cn(
        "text-[13px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white leading-none",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export const H3: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn(
        "text-xs font-bold text-zinc-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const H4: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "inline text-[11px] font-bold mr-0.5 text-zinc-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const P: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <p
      className={cn(
        "text-[11px] text-black dark:text-zinc-300 font-semibold leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export const Strong: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <strong
      className={cn(
        "font-semibold text-zinc-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </strong>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ className, children, ...props }) => {
  return (
    <a
      className={cn(
        "text-black font-semibold dark:text-emerald-400 hover:underline",
        className
      )}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

interface ContactItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: React.ReactNode;
  href?: string;
  isRoundedFull?: boolean;
  children: React.ReactNode;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  href,
  isRoundedFull = true,
  className,
  children,
  ...props
}) => {
  const content = href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-black dark:text-zinc-300"
    >
      {children}
    </a>
  ) : (
    <span className="text-black dark:text-zinc-300">
      {children}
    </span>
  );

  return (
    <span className={cn("flex items-center gap-1.5", className)} {...props}>
      <span
        className={cn(
          "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center size-4 shrink-0",
          isRoundedFull ? "rounded-full" : "rounded-[3px]"
        )}
      >
        {icon}
      </span>
      {content}
    </span>
  );
};

export const Li: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <li
      className={cn(
        "text-[10px] text-black dark:text-zinc-300 font-normal leading-normal",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
};

