import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  height?: number;
  showText?: boolean;
}

export function Logo({ className, height = 40, showText = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)}>
      <img 
        src="/logo.jpeg" 
        alt="YoTech Systems" 
        style={{ height }}
        className="object-contain"
      />
      {showText && (
        <span className="font-extrabold text-xl tracking-tight">YoTech</span>
      )}
    </Link>
  );
}
