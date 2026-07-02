import Link from "next/link";

export default function PreviewBadge() {
  return (
    <div className="fixed bottom-4 left-4 z-[200] flex items-center gap-2 rounded-full bg-ink/90 text-cream backdrop-blur-md border border-gold/40 pl-3 pr-1 py-1 shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-70" />
        <span className="relative rounded-full bg-gold h-2 w-2" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
        Preview mode
      </span>
      <Link
        href="/?preview=off"
        className="ml-1 rounded-full bg-maroon hover:bg-maroon-700 transition-colors px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]"
      >
        Exit
      </Link>
    </div>
  );
}
