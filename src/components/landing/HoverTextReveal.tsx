import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GSAP_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
const PROXIMITY_RADIUS = 200;

declare global {
  interface Window {
    gsap?: any;
  }
}

function HoverTextReveal({
  items = ['S', 'H', 'R', 'I', 'N', 'K', 'L', 'Y', 'Y', 'Y'],
  className = '',
}: {
  items?: string[];
  className?: string;
}) {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    if (window.gsap) {
      setGsapReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = GSAP_CDN_URL;
    script.async = true;
    script.onload = () => {
      if (window.gsap) {
        setGsapReady(true);
      }
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!gsapReady || !window.gsap) {
      return;
    }

    const { gsap } = window;
    const { mapRange, clamp } = gsap.utils;

    const containerElement = containerRef.current;
    const revealableElements = itemRefs.current.filter(Boolean);

    if (!containerElement || revealableElements.length !== items.length || items.length === 0) {
      itemRefs.current.forEach(el => {
        if (el) gsap.set(el, { '--active': 0 });
      });
      return;
    }

    const DISTANCE_MAPPER = mapRange(250, 50, 0, 90);

    const updateItemsVisibility = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;

      if (!containerElement) return;

      const containerBounds = containerElement.getBoundingClientRect();
      const containerCenterX = containerBounds.x + containerBounds.width * 0.5;
      const containerCenterY = containerBounds.y + containerBounds.height * 0.5;
      const distToContainerCenter = Math.hypot(x - containerCenterX, y - containerCenterY);

      if (distToContainerCenter > Math.max(containerBounds.width, containerBounds.height) * 0.5 + PROXIMITY_RADIUS) {
        return;
      }

      revealableElements.forEach((itemEl) => {
        if (!itemEl) return;
        const itemBounds = itemEl.getBoundingClientRect();
        const itemCenterX = itemBounds.x + itemBounds.width * 0.5;
        const itemCenterY = itemBounds.y + itemBounds.height * 0.5;
        const distToItem = Math.hypot(x - itemCenterX, y - itemCenterY);
        
        const activeAngleDeg = clamp(0, 90, DISTANCE_MAPPER(distToItem));
        const activeAngleRad = activeAngleDeg * (Math.PI / 180);
        const activeValue = Math.sin(activeAngleRad);

        gsap.to(itemEl, {
          '--active': activeValue.toFixed(4),
          duration: 0.1,
          ease: 'power1.out'
        });
      });
    };

    revealableElements.forEach((itemEl) => {
      if (itemEl) {
        gsap.set(itemEl, { '--active': 0 });
      }
    });
    
    document.body.addEventListener('pointermove', updateItemsVisibility);

    return () => {
      document.body.removeEventListener('pointermove', updateItemsVisibility);
    };
  }, [items, gsapReady]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  const assignRef = (el: HTMLLIElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  return (
    <ul
      ref={containerRef}
      className={cn(
        "p-0 m-0 flex flex-nowrap rounded-xl sm:rounded-2xl bg-white/[0.03] justify-center",
        "shadow-[inset_0_1px_1px_hsl(0_0%_100%_/_0.15),0_5px_15px_rgba(0,0,0,0.3)]",
        "py-8 sm:py-12 px-2 sm:px-4 select-none list-none w-full overflow-x-auto border border-white/[0.08]",
        className
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          ref={(el) => assignRef(el, index)}
          className="flex items-center justify-center h-full p-1 sm:p-2 md:p-3 lg:p-4 flex-shrink-0"
          style={{ '--active': 0 } as React.CSSProperties}
        >
          <span
            className="text-transparent bg-gradient-to-b from-blue-300 via-white to-blue-200 bg-clip-text
                       transform-gpu scale-[calc(var(--active,0)*0.5+0.5)] 
                       blur-[calc((1-var(--active,0))*1rem)]
                       text-lg sm:text-xl md:text-2xl lg:text-3xl 
                       whitespace-nowrap px-1 font-bold"
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default HoverTextReveal; 