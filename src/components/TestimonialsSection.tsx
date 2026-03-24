import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import review1 from "@/assets/vidReviews/IMG_5936.MP4";
import review2 from "@/assets/vidReviews/IMG_5937.MP4";
import review3 from "@/assets/vidReviews/IMG_5938.MP4";

const testimonials = [
  {
    name: "Vinayaka GC",
    rating: 5,
    date: "04 Apr 2025",
    review: "My experience at Aurora Unisex Salon Makeup Studio and Academy was exceptional! The staff is highly skilled and attentive, ensuring a personalized touch. Their great offers on makeup services and packages make luxury affordable.",
  },
  {
    name: "Prashanth. S. M",
    rating: 5,
    date: "17 Mar 2025",
    review: "I recently visited Aurora beauty and salon, Studios and had a fantastic experience! The staff were incredibly friendly and professional, making me feel welcomed right from the start.",
  },
  {
    name: "NETHRA",
    rating: 5,
    date: "18 May 2024",
    review: "Aurora Unisex Salon Makeup Studio and Academy exceeded my expectations with its high-quality products, great offers, and luxurious vibe. The clean equipment and experienced staff made me feel pampered.",
  },
  {
    name: "Mubarak Hc",
    rating: 5,
    date: "24 Apr 2024",
    review: "Aurora Unisex Salon Makeup Studio and Academy is a top-notch beauty destination. The salon is hygienic, uses clean equipment, and offers reasonably priced services with great offers.",
  },
  {
    name: "Vinayak Joshi",
    rating: 5,
    date: "23 Apr 2024",
    review: "Step into luxury and relaxation at Aurora Unisex Salon Makeup Studio and Academy. The highly professional staff ensures a hygienic salon environment while providing top-notch beauty services.",
  },
  {
    name: "Pavan Rathod",
    rating: 5,
    date: "25 Jul 2024",
    review: "Great service I like that atmosphere staff also treat like to family and also great offers this salon was very hygienic",
  },
  {
    name: "SIDDANAGOWDA",
    rating: 5,
    date: "23 Apr 2024",
    review: "Experience excellence at Aurora Unisex Salon Makeup Studio and Academy! They offer reasonably priced services with great offers. The salon is hygienic, with clean equipment.",
  },
  {
    name: "Yuvarajakumar Sannappanavar",
    rating: 5,
    date: "23 Apr 2024",
    review: "Aurora Unisex Salon Makeup Studio and Academy is a very clean and hygienic salon. I always feel comfortable getting my hair and makeup done here.",
  },
  {
    name: "Rithika",
    rating: 5,
    date: "22 Jul 2025",
    review: "Ramya did good job. I really liked her work",
  },
  {
    name: "Khushi.Cl",
    rating: 5,
    date: "12 Jul 2025",
    review: "The service was good... And Ramya did very well eyebrows I'm impressed",
  },
  {
    name: "MD Keyamuddin",
    rating: 5,
    date: "22 Mar 2025",
    review: "Ajar best haircut thanks ajar 👍✅. Coming aurora salon famil",
  },
];

const videoReviews = [
  { src: review1, title: "Aurora Review 1" },
  { src: review2, title: "Aurora Review 2" },
  { src: review3, title: "Aurora Review 3" },
];

const TestimonialsSection = () => {
  // WRITTEN CAROUSEL STATES
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  // VIDEO CAROUSEL STATES
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [featuredLoaded, setFeaturedLoaded] = useState(false);
  const [queueLoaded, setQueueLoaded] = useState<boolean[]>(new Array(videoReviews.length).fill(false));

  const featuredRef = useRef<HTMLVideoElement>(null);
  const queueRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Reset featured loader when active video changes
  useEffect(() => {
    setFeaturedLoaded(false);
  }, [activeIndex]);

  // Auto-scroll effect for written testimonials
  useEffect(() => {
    if (isHovering || isDragging) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        setScrollPosition((prev) => {
          let newPos = prev + 1; // Slow smooth scroll
          if (newPos > maxScroll) {
            newPos = 0; // Reset to start for infinite loop
          }
          container.scrollLeft = newPos;
          return newPos;
        });
      }
    }, 30); // Smooth scroll at ~30ms intervals

    return () => clearInterval(interval);
  }, [isHovering, isDragging]);

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX - (scrollContainerRef.current?.scrollLeft || 0));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - dragStart;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = x;
      setScrollPosition(x);
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    setIsHovering(false);
    handleMouseUp();
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX - (scrollContainerRef.current?.scrollLeft || 0));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - dragStart;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = x;
      setScrollPosition(x);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Manual navigation for written testimonials
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Reorder: featured first, then the rest in original order
  const queuedVideos = videoReviews.filter((_, i) => i !== activeIndex);

  const handleFeaturedClick = () => {
    if (!featuredRef.current) return;
    if (featuredRef.current.paused) {
      featuredRef.current.play();
      setPlaying(true);
    } else {
      featuredRef.current.pause();
      setPlaying(false);
    }
  };

  const handleQueueClick = (originalIndex: number) => {
    if (featuredRef.current) featuredRef.current.pause();
    setPlaying(false);
    setActiveIndex(originalIndex);
  };

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">

        {/* ================= WRITTEN CAROUSEL ================= */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-16 tracking-tight"
        >
          What Our Clients Say
        </motion.h2>

        <div className="relative group mx-auto max-w-7xl">
          {/* Left/Right fade gradients */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-card via-card/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-card via-card/50 to-transparent z-10 pointer-events-none" />

          {/* Left/Right nav buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 cursor-grab active:cursor-grabbing hide-scrollbar"
            style={{
              scrollBehavior: isDragging ? "auto" : "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <a
                href="https://www.justdial.com/Davangere/Aurora-Unisex-Salon-Makeup-Studio-and-Academy-Near-Hemavtahi-Hostel-Siddaveerappa-Layout/9999P8192-8192-240119144253-J6C2_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                key={`${testimonial.name}-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="h-full p-6 bg-background rounded-lg border border-border shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    "{testimonial.review}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-display text-foreground font-semibold">{testimonial.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{testimonial.date}</p>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6 md:hidden">
          Swipe to see more reviews
        </p>

        {/* ================= VIDEO SECTION ================= */}
        <div className="mt-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-3xl text-foreground mb-10 text-center"
          >
            Video Reviews
          </motion.h3>

          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto items-start">

            {/* ── FEATURED VIDEO (left, large) ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                className="relative flex-shrink-0 w-full md:w-[340px] lg:w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-background"
              >
                {/* Skeleton Loader for Featured Video */}
                {!featuredLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                )}

                <video
                  ref={featuredRef}
                  src={videoReviews[activeIndex].src}
                  className={`w-full aspect-[9/16] object-cover transition-opacity duration-500 ${featuredLoaded ? 'opacity-100' : 'opacity-0'}`}
                  playsInline
                  onLoadedData={() => setFeaturedLoaded(true)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                />

                {/* Play / pause overlay */}
                <button
                  onClick={handleFeaturedClick}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <motion.div
                    key={playing ? "pause" : "play"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-black/50 backdrop-blur-sm rounded-full p-5 group-hover:bg-black/70 transition-colors"
                  >
                    {playing ? (
                      <span className="text-white text-2xl leading-none">⏸</span>
                    ) : (
                      <span className="text-white text-2xl leading-none">▶</span>
                    )}
                  </motion.div>
                </button>

                {/* Title bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-display text-sm font-semibold text-white">
                    {videoReviews[activeIndex].title}
                  </p>
                  <p className="text-xs text-white/60">Now Playing</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── QUEUE (right, stacked small cards or horizontal slider on mobile) ── */}
            <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto flex-1 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory hide-scrollbar">
              <p className="hidden md:block text-xs uppercase tracking-widest text-muted-foreground mb-1 font-body shrink-0">
                Up Next
              </p>
              {queuedVideos.map((video) => {
                const originalIndex = videoReviews.indexOf(video);
                return (
                  <motion.button
                    key={originalIndex}
                    layout
                    onClick={() => handleQueueClick(originalIndex)}
                    className="relative shrink-0 w-40 md:w-full rounded-xl overflow-hidden border border-border bg-background shadow-md hover:shadow-lg hover:border-primary transition-all duration-300 group text-left snap-start"
                    style={{ aspectRatio: "9/5" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Skeleton Loader for Queue Video */}
                    {!queueLoaded[originalIndex] && (
                      <div className="absolute inset-0 bg-muted animate-pulse z-10" />
                    )}

                    {/* Thumbnail via video element (first frame) */}
                    <video
                      ref={(el) => (queueRefs.current[originalIndex] = el)}
                      src={video.src}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${queueLoaded[originalIndex] ? 'opacity-100' : 'opacity-0'}`}
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedData={() => {
                        setQueueLoaded((prev) => {
                          const next = [...prev];
                          next[originalIndex] = true;
                          return next;
                        });
                      }}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-primary/80 transition-colors">
                        <span className="text-white text-base leading-none">▶</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="font-display text-xs font-semibold text-white truncate">
                        {video.title}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;