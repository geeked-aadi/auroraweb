import { motion } from "framer-motion";

const transition = { duration: 0.7, ease: [0.2, 0, 0, 1] as const };

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center ">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/hero-section-desktop.jpg"
        >
          <source media="(max-width: 767px)" src="/hero-section-mobile.mp4" type="video/mp4" />
          <source src="/hero-section-desktop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-6"
        >
          Premium Salon • Advanced Beauty Academy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground mb-6 text-balance"
        >
          Where Style Meets
          <br />
          <span className="text-gold-gradient">Perfection</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.6 }}
          className="font-body text-base md:text-lg text-white max-w-xl mx-auto mb-10"
        >
          Experience the intersection of luxury spa treatments and elite beauty
          education. 
          Men • Women • Children
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-10 py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-all animate-gold-pulse"
          >
            Book Appointment
          </a>
          <a
            href="#services"
            className="px-10 py-4 border border-primary/40 text-primary font-body text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary/10 transition-all"
          >
            View Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;