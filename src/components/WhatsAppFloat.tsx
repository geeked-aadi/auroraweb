import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { createWhatsAppUrl, generalInquiryMessage } from "@/lib/whatsapp";

const WhatsAppFloat = () => {
  return (
    <motion.a
      href={createWhatsAppUrl(generalInquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg backdrop-blur-md animate-gold-pulse"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
};

export default WhatsAppFloat;
