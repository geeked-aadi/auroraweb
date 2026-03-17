import { motion } from "framer-motion";
import bridalImg from "@/assets/room-bridal.jpg";
import keratinImg from "@/assets/room-keratin.jpg";
import spaImg from "@/assets/room-spa.jpg";

const rooms = [
  {
    title: "Bridal Suite",
    description: "An opulent private space for your most important day. Complete with Hollywood mirrors, luxury seating, and a dedicated makeup artist.",
    image: bridalImg,
  },
  {
    title: "Keratin Lounge",
    description: "State-of-the-art hair treatment room with premium products and climate control for perfect results every time.",
    image: keratinImg,
  },
  {
    title: "Private Spa",
    description: "Escape into tranquility. Candlelit ambiance, aromatherapy, and expert therapists for complete rejuvenation.",
    image: spaImg,
  },
];

const PremiumRooms = () => {
  return (
    <section id="rooms" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Exclusive Spaces
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-16 tracking-tight"
        >
          Premium Rooms
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <motion.div
              key={room.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group surface-elevated overflow-hidden"
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl text-foreground mb-3">
                  {room.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {room.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumRooms;
