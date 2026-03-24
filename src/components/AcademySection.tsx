import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import academyImg from "@/assets/academy-small.jpg";

const courses = [
  { name: "Makeup Artistry (Basic to Advanced)", duration: "3 Months", fee: "₹30,000" },
  { name: "Hairstyling Professional", duration: "2 Months", fee: "₹25,000" },
  { name: "Saree Draping Masterclass", duration: "2 Weeks", fee: "₹5,000" },
  { name: "Nail Art Workshop", duration: "1 Week", fee: "₹3,000" },
  { name: "Mehendi Design Workshop", duration: "1 Week", fee: "₹3,000" },
  { name: "Photography Skills", duration: "1 Month", fee: "₹10,000" },
  { name: "Portfolio Shoot Training", duration: "2 Weeks", fee: "₹8,000" },
  { name: "Social Media Marketing", duration: "1 Month", fee: "₹7,000" },
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
          Professional Mastery
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
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {course.duration} • {course.fee}
                  </p>
                </div>
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.a
                      href="https://wa.me/916361388923"
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
                alt="Aurora Academy Training"
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
