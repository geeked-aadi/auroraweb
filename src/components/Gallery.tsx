import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  { src: "/gallery/IMG_5881.jpg", alt: "Aurora Studio Gallery Image 1" },
  { src: "/gallery/IMG_5916.jpg", alt: "Aurora Studio Gallery Image 2" },
  { src: "/gallery/IMG_5917.jpg", alt: "Aurora Studio Gallery Image 3" },
  { src: "/gallery/IMG_5918.jpg", alt: "Aurora Studio Gallery Image 4" },
  { src: "/gallery/IMG_5919.jpg", alt: "Aurora Studio Gallery Image 5" },
  { src: "/gallery/IMG_5920.jpg", alt: "Aurora Studio Gallery Image 6" },
  { src: "/gallery/IMG_5921.jpg", alt: "Aurora Studio Gallery Image 7" },
  { src: "/gallery/IMG_5923.jpg", alt: "Aurora Studio Gallery Image 8" },
  { src: "/gallery/IMG_5924.jpg", alt: "Aurora Studio Gallery Image 9" },
  { src: "/gallery/IMG_5925.jpg", alt: "Aurora Studio Gallery Image 10" },
];

const Gallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [startScrollLeft, setStartScrollLeft] = useState<number>(0);

  useEffect(() => {
    if (isHovering || dragStartX !== null) return;

    const frame = window.requestAnimationFrame(function scrollStep() {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth / 2;
      let next = container.scrollLeft + 0.5;
      if (next >= maxScroll) next -= maxScroll;
      container.scrollLeft = next;

      window.requestAnimationFrame(scrollStep);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isHovering, dragStartX]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    if (scrollContainerRef.current) setStartScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null || !scrollContainerRef.current) return;
    const delta = dragStartX - e.clientX;
    scrollContainerRef.current.scrollLeft = startScrollLeft + delta;
  };

  const handleMouseUp = () => setDragStartX(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    if (scrollContainerRef.current) setStartScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null || !scrollContainerRef.current) return;
    const delta = dragStartX - e.touches[0].clientX;
    scrollContainerRef.current.scrollLeft = startScrollLeft + delta;
  };

  const loopItems = [...galleryImages, ...galleryImages];

  const scrollBy = (direction: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.8;
    container.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section id="gallery" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Our Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-16 tracking-tight"
        >
          Gallery
        </motion.h2>

        {/* Auto-scroll carousel */}
        <div className="relative group mx-auto max-w-7xl">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/90 border border-border text-foreground hover:bg-background transition-colors"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/90 border border-border text-foreground hover:bg-background transition-colors"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-card via-card/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-card via-card/50 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); handleMouseUp(); }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 cursor-grab active:cursor-grabbing"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {loopItems.map((image, index) => (
              <div
                key={`${image.alt}-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/room-bridal.jpg";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator for mobile */}
        <p className="text-xs text-muted-foreground text-center mt-6 md:hidden">
          Auto-scrolling gallery • Hover to pause
        </p>
      </div>

      <style>{`
        /* Hide scrollbar while maintaining functionality */
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
