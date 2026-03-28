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
    <section className="py-10 md:py-24 bg-background" id='categoryHighlight'>
      <div className="container mx-auto px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary text-center mb-2"
        >
          Family Salon
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-light text-center text-foreground mb-8 md:mb-16"
        >
          For Everyone
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.title}
              href="#services"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden aspect-[4/3] md:aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-primary mb-1">
                  {cat.subtitle}
                </p>
                <h3 className="font-display text-2xl text-foreground">
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