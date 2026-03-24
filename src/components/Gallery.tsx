import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    const newIndex = direction === 'next'
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;

    setSelectedImage(newIndex);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;

    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  React.useEffect(() => {
    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/room-bridal.jpg";
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal/Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  aria-label="Close gallery"
                >
                  <X size={32} />
                </button>

                {/* Navigation buttons */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Main image */}
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/room-bridal.jpg";
                  }}
                />

                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
