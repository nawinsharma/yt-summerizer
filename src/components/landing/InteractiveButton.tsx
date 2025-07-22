import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function InteractiveButton({
  text = "Get Started",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <a
      href="/auth"
      className={cn(
        "group relative w-40 cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white/5 p-3 text-center font-semibold text-white backdrop-blur-sm",
        "hover:bg-white/10 transition-all duration-300",
        className,
      )}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-blue-500 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-blue-500"></div>
    </a>
  );
}

export default InteractiveButton; 