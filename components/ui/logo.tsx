import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
  showText?: boolean;
}

export function Logo({ className, height = 40, showText = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)}>
      <Image 
        src="/yotech-logo.jpg" 
        alt="YoTech Systems" 
        width={height * 3} 
        height={height}
        className="object-contain w-auto"
        style={{ height }}
      />
      {showText && (
        <span className="font-extrabold text-xl tracking-tight">YoTech</span>
      )}
    </Link>
  );
}
