import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

type ServiceItem = {
  name: string;
  price: string;
  duration: string;
  category: string;
  gender: "men" | "women" | "all";
};

const services: ServiceItem[] = [
  { name: "Classic Haircut", price: "₹399", duration: "30 min", category: "Haircut & Styling", gender: "all" },
  { name: "Premium Styling", price: "₹799", duration: "45 min", category: "Haircut & Styling", gender: "all" },
  { name: "Hair Color", price: "₹1,499", duration: "90 min", category: "Haircut & Styling", gender: "all" },
  { name: "Beard Sculpting", price: "₹299", duration: "20 min", category: "Beard & Grooming", gender: "men" },
  { name: "Royal Shave", price: "₹499", duration: "30 min", category: "Beard & Grooming", gender: "men" },
  { name: "Gold Facial", price: "₹999", duration: "45 min", category: "Facial & Skin", gender: "all" },
  { name: "Diamond Facial", price: "₹1,999", duration: "60 min", category: "Facial & Skin", gender: "women" },
  { name: "D-Tan Treatment", price: "₹599", duration: "30 min", category: "Facial & Skin", gender: "all" },
  { name: "Aroma Therapy", price: "₹1,499", duration: "60 min", category: "Spa & Relaxation", gender: "all" },
  { name: "Hot Stone Massage", price: "₹2,499", duration: "90 min", category: "Spa & Relaxation", gender: "all" },
  { name: "Bridal Makeup", price: "₹15,000", duration: "120 min", category: "Bridal Makeup", gender: "women" },
  { name: "Pre-Bridal Package", price: "₹8,999", duration: "180 min", category: "Bridal Makeup", gender: "women" },
  { name: "Keratin Treatment", price: "₹4,999", duration: "120 min", category: "Keratin & Smoothening", gender: "all" },
  { name: "Hair Smoothening", price: "₹3,999", duration: "90 min", category: "Keratin & Smoothening", gender: "all" },
];

const categories = ["All", "Haircut & Styling", "Beard & Grooming", "Facial & Skin", "Spa & Relaxation", "Bridal Makeup", "Keratin & Smoothening"];
const genderFilters = ["All", "Men", "Women"] as const;

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGender, setActiveGender] = useState<string>("All");

  const filtered = services.filter((s) => {
    const catMatch = activeCategory === "All" || s.category === activeCategory;
    const genMatch = activeGender === "All" || s.gender === "all" || s.gender === activeGender.toLowerCase();
    return catMatch && genMatch;
  });

  return (
    <section id="services" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Our Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-12 tracking-tight"
        >
          Refined Treatments
        </motion.h2>

        {/* Gender filter */}
        <div className="flex justify-center gap-3 mb-6">
          {genderFilters.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGender(g)}
              className={`px-5 py-2 font-body text-xs uppercase tracking-[0.15em] transition-all border ${
                activeGender === g
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Category filter - scrollable */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2 justify-start md:justify-center scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-body text-xs uppercase tracking-[0.1em] whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
              <motion.div
                key={service.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                whileHover={{ y: -5 }}
                className="bg-background p-8 border-l-2 border-transparent hover:border-primary transition-all group"
              >
                <span className="font-body text-primary tabular-nums text-sm tracking-widest">
                  {service.price}
                </span>
                <h3 className="font-display text-xl text-foreground mt-2">
                  {service.name}
                </h3>
                <p className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                  <Clock size={12} /> {service.duration}
                </p>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-body text-xs uppercase tracking-widest text-foreground border-b border-border pb-1 hover:border-primary hover:text-primary transition-colors"
                >
                  Book Now
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
