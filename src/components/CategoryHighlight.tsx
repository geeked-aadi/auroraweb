import { motion } from "framer-motion";
import menImg from "@/assets/category-men.jpg";
import womenImg from "@/assets/category-women.jpg";
import childrenImg from "@/assets/category-children.jpg";

const categories = [
  { title: "Men", subtitle: "Grooming & Style", image: menImg },
  { title: "Women", subtitle: "Beauty & Elegance", image: womenImg },
  { title: "Children", subtitle: "Gentle & Fun", image: childrenImg },
];

const CategoryHighlight = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Family Salon
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-16 tracking-tight"
        >
          For Everyone
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.title}
              href="#services"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">
                  {cat.subtitle}
                </p>
                <h3 className="font-display text-3xl font-light text-foreground">
                  {cat.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlight;
