import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { createWhatsAppUrl, offerClaimMessage } from "@/lib/whatsapp";

const offers = [
  {
    title: "The Aurora Edit",
    items: "Haircut + Beard + D-Tan",
    price: "₹999",
    originalPrice: "₹1,297",
    tag: "Most Popular",
    large: true,
  },
  {
    title: "Glow Up",
    items: "Gold Facial + Haircut",
    price: "₹1,199",
    originalPrice: "₹1,398",
    tag: "Exclusive Offer",
    large: false,
  },
  {
    title: "Quick Refresh",
    items: "Haircut + Beard Trim",
    price: "₹399",
    originalPrice: "₹698",
    tag: "Exclusive Offer",
    large: false,
  },
  {
    title: "Royal Treatment",
    items: "Keratin + Facial + Spa",
    price: "₹6,999",
    originalPrice: "₹8,497",
    tag: "Premium",
    large: true,
  },
];

const CountdownTimer = () => {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1 font-mono text-primary text-sm tabular-nums">
      <span>{pad(time.h)}</span>:<span>{pad(time.m)}</span>:<span>{pad(time.s)}</span>
    </div>
  );
};

const OffersSection = () => {
  return (
    <section id="offers" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary mb-4">
            Limited Time
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
            The Aurora Exclusives
          </h2>
          <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm">
            <span>Offers end in</span>
            <CountdownTimer />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`surface-elevated p-8 md:p-10 relative overflow-hidden group ${
                offer.large ? "md:col-span-1" : ""
              }`}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-all" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={14} className="text-primary" />
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-primary">
                    {offer.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  {offer.items}
                </p>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-4xl text-primary tabular-nums">
                    {offer.price}
                  </span>
                  <span className="text-muted-foreground line-through text-sm tabular-nums">
                    {offer.originalPrice}
                  </span>
                </div>

                <a
                  href={createWhatsAppUrl(offerClaimMessage(offer.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.15em] font-semibold hover:bg-primary/90 transition-colors"
                >
                  Claim Offer
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
