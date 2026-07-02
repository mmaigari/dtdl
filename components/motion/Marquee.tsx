type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee overflow-hidden w-full ${className}`}>
      <div className="marquee-track py-2">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-16 shrink-0"
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            <span className="text-2xl md:text-3xl font-serif text-ink/40 whitespace-nowrap tracking-tight">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
