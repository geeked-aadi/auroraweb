import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import academyImg from "@/assets/academy-small.jpg";
import { createWhatsAppUrl, enrollMessage } from "@/lib/whatsapp";

const courses = [
  { name: "Basic to Advanced Makeup"},
  { name: "Basic to Advanced Hairstyle"},
  { name: "All types of Draping"},
  { name: "Nail Art Workshop"},
  { name: "Floral workshop",},
  { name: "Photography Skills",},
  { name: "Portfolio Shoot Training" },
  { name: "Mehandi Workshop"},
  { name: "Client Management" },
  { name: "MUA Appearance" },
  { name: "Air Brush Makeup" },
];

const AcademySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="academy" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Aurora Academy
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-6 tracking-tight"
        >
          Beauty Academy & Courses in Davangere
        </motion.h2>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary text-xs uppercase tracking-widest font-body">
            <BadgeCheck size={14} /> All Products Provided
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary text-xs uppercase tracking-widest font-body animate-pulse">
            Batch Starting Soon
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Course list */}
          <div className="order-2 lg:order-1">
            {courses.map((course, i) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="border-b border-border py-6 flex items-center justify-between group hover:bg-foreground/[0.02] transition-colors px-4 -mx-4"
              >
                <div>
                  <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
                    {course.name}
                  </h3>
                  
                </div>
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.a
                      href={createWhatsAppUrl(enrollMessage(course.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-body text-xs uppercase tracking-widest whitespace-nowrap"
                    >
                      Enroll <ArrowRight size={12} />
                    </motion.a>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Academy image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
            className="order-1 lg:order-2 lg:sticky lg:top-32"
          >
            <div className="overflow-hidden gold-border-glow">
              <img
                src={academyImg}
                alt="Aurora Makeup Academy professional beauty courses in Davangere"
                className="w-full object-cover aspect-[4/5]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
