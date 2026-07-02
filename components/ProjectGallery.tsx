"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = { images: string[]; alt: string };

export default function ProjectGallery({ images, alt }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl bg-ink/5" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative shrink-0 grow-0 basis-full md:basis-[85%] lg:basis-[75%] mr-4"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={`${alt} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                selected === i ? "w-10 bg-maroon" : "w-5 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-stone mr-3">
            {String(selected + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev && images.length <= 1}
            aria-label="Previous image"
            className="w-11 h-11 rounded-full border border-ink/15 grid place-items-center hover:border-maroon hover:text-maroon transition-colors disabled:opacity-40"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext && images.length <= 1}
            aria-label="Next image"
            className="w-11 h-11 rounded-full border border-ink/15 grid place-items-center hover:border-maroon hover:text-maroon transition-colors disabled:opacity-40"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
