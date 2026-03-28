import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";

type ServiceItem = {
  name: string;
  price: string;
  category: string;
  gender: "men" | "women" | "all";
};

const services: ServiceItem[] = [
  { name: "Haircut Beared D-Tan", price: "₹399", category: "Haircut & Styling", gender: "men" },
  { name: "Haircut Beared", price: "₹199", category: "Haircut & Styling", gender: "men" },
  { name: "Haircut Bearded D-Tan Facial", price: "₹999", category: "Haircut & Styling", gender: "men" },
  { name: "Haircut,Hairspa,Beared Facial,D-Tan", price: "₹1,499", category: "Beard & Grooming", gender: "men" },
  { name: "Threading Cleanup D-Tan", price: "₹499", category: "Facial & Skin", gender: "women" },
  { name: "Threading Cleanup D-Tan Facial Haircut(With Setting)", price: "₹999", category: "Facial & Skin", gender: "women" },
  { name: "Threading,D-Tan,Facial,Hand wax,Leg wax,Underarms Wax", price: "₹1,399", category: "Facial & Skin", gender: "women" },
  { name: "Threading,Pedicure,Manicure,D-Tan", price: "₹999", category: "Facial & Skin", gender: "women" },
  { name: "Haircut,Hairspa,D-Tan,Threading", price: "₹1,499", category: "Spa & Relaxation", gender: "women" },
  { name: "Hydra Facial", price: "₹2,999", category: "Spa & Relaxation", gender: "women" },
  { name: "Koreana Facial", price: "₹3,499", category: "Bridal Makeup", gender: "women" },
  { name: "Botox Smoothening,Kerting", price: "₹4,999", category: "Bridal Makeup", gender: "women" },
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
                  href={createWhatsAppUrl(bookingMessage(`for ${service.name} (${service.price})`))}
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
