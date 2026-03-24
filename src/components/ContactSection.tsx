import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

const ContactSection = () => {
  const instagramUrl = "https://www.instagram.com/aaurora2024/";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Aurora Studio! I'd like to book:\nName: ${form.name}\nService: ${form.service}\nDate: ${form.date}\nPhone: ${form.phone}`
    );
    window.open(`https://wa.me/916361388923?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs uppercase tracking-[0.4em] text-primary text-center mb-4"
        >
          Get in Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl font-light text-center text-foreground mb-16 tracking-tight"
        >
          Book Your Visit
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
              { key: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
              { key: "service", label: "Service", type: "text", placeholder: "e.g. Haircut, Facial, Bridal" },
              { key: "date", label: "Preferred Date", type: "date", placeholder: "" },
            ].map((field) => (
              <div key={field.key}>
                <label className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  required
                  className="w-full bg-card border border-border px-4 py-3 text-foreground text-sm focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground/50"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-colors"
            >
              Send via WhatsApp
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Location */}
            <div className="flex gap-4">
              <MapPin size={20} className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-lg text-foreground mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Aurora Makeup Studio<br />
                  College Rd, opp. JH Patel College<br />
                  Siddaveerappa Badavane, BIET<br />
                  Davanagere, Karnataka 577004
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone size={20} className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-lg text-foreground mb-1">Call Us</h3>
                <a
                  href="tel:+916361388923"
                  className="text-sm text-primary hover:underline"
                >
                  +91 63613 88923
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Instagram size={20} className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-lg text-foreground mb-1">Instagram</h3>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  @aaurora2024
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <Clock size={20} className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-lg text-foreground mb-1">Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Mon – Sat: 10:00 AM – 9:00 PM<br />
                  Sunday: 10:00 AM – 7:00 PM
                </p>
              </div>
            </div>

            {/* MAP (NO ANIMATION HERE — IMPORTANT) */}
            <div className="bg-card border border-border overflow-hidden rounded-xl">
  <iframe
    src="https://www.google.com/maps?q=Aurora+Makeup+Studio+Davanagere&z=17&output=embed"
    className="w-full h-[400px] border-0"
    loading="eager"
    referrerPolicy="no-referrer-when-downgrade"
    title="Aurora Makeup Studio Location"
  />
</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;