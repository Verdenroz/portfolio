"use client";

import { ChevronLeft, ChevronRight } from "./icons";
import { forwardRef, useRef, ReactNode } from "react";

export interface CarouselProps {
  children: ReactNode;
  scrollAmount?: number;
  gap?: string; // e.g., "gap-6", "gap-10"
  padding?: string; // custom px-[calc(...)] for centering
  id: string;
  ariaLabel?: string;
  className?: string;
  as?: "div" | "ul";
  controlsPosition?: "absolute" | "relative"; // for different control layouts
}

interface CarouselNavigationProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  carouselId: string;
  position?: "absolute" | "relative";
}

function CarouselNavigation({
  onScrollLeft,
  onScrollRight,
  carouselId,
  position = "absolute"
}: CarouselNavigationProps) {
  const buttonClass = "pointer-events-auto z-20 aspect-square h-fit rounded-full border-2 border-neutral-400 bg-neutral-950/95 p-4 text-neutral-50 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutral-950/90";
  
  // Responsive positioning: relative on mobile, configurable on desktop
  return (
    <>
      {/* Mobile controls (always relative positioning for better touch UX) */}
      <div className="flex justify-between mt-6 md:hidden">
        <button
          type="button"
          onClick={onScrollLeft}
          title="Previous slide"
          aria-controls={carouselId}
          className={buttonClass}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={onScrollRight}
          title="Next slide"
          aria-controls={carouselId}
          className={buttonClass}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Desktop controls (based on position prop) */}
      <div className="hidden md:block">
        {position === "absolute" ? (
          <div
            aria-label="Carousel Controls"
            className="pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4 lg:px-8 z-20"
          >
            <button
              type="button"
              onClick={onScrollLeft}
              title="Previous slide"
              aria-controls={carouselId}
              className={buttonClass}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={onScrollRight}
              title="Next slide"
              aria-controls={carouselId}
              className={buttonClass}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={onScrollLeft}
              title="Previous slide"
              aria-controls={carouselId}
              className={buttonClass}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={onScrollRight}
              title="Next slide"
              aria-controls={carouselId}
              className={buttonClass}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const CarouselContent = forwardRef<
  HTMLDivElement | HTMLUListElement,
  {
    children: ReactNode;
    id: string;
    className?: string;
    ariaLabel?: string;
    as?: "div" | "ul";
    gap?: string;
    padding?: string;
  }
>(({ children, id, className = "", ariaLabel, as = "div", gap = "gap-6", padding = "" }, ref) => {
  const baseClasses = `relative z-0 grid auto-cols-min grid-flow-col ${gap} overflow-x-auto scrollbar-hide`;
  const fullClassName = `${baseClasses} ${padding} ${className}`;

  const content = as === "ul" ? (
    <ul
      id={id}
      ref={ref as React.RefObject<HTMLUListElement>}
      className={fullClassName}
      aria-label={ariaLabel}
      role="list"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {children}
    </ul>
  ) : (
    <div
      id={id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={fullClassName}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );

  return content;
});

CarouselContent.displayName = "CarouselContent";

export function Carousel({
  children,
  scrollAmount,
  gap = "gap-6",
  padding = "",
  id,
  ariaLabel,
  className = "",
  as = "div",
  enableMotion = false,
  controlsPosition = "absolute"
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement | HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    
    // Use provided scrollAmount or default to 400
    const baseAmount = scrollAmount || 400;
    const scrollValue = direction === "left" ? -baseAmount : baseAmount;
    
    carouselRef.current.scrollBy({
      left: scrollValue,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${className}`}>
      <CarouselNavigation
        onScrollLeft={() => scroll("left")}
        onScrollRight={() => scroll("right")}
        carouselId={id}
        position={controlsPosition}
      />
      
      <div className={controlsPosition === "relative" ? "relative" : ""}>
        <CarouselContent
          ref={carouselRef}
          id={id}
          ariaLabel={ariaLabel}
          as={as}
          enableMotion={enableMotion}
          gap={gap}
          padding={padding}
          className={controlsPosition === "relative" ? "pb-4 pt-4" : "pb-4 pt-4"}
        >
          {children}
        </CarouselContent>
      </div>
    </div>
  );
}

export default Carousel;