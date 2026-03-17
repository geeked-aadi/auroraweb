import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryHighlight from "@/components/CategoryHighlight";
import ServicesSection from "@/components/ServicesSection";
import PremiumRooms from "@/components/PremiumRooms";
import OffersSection from "@/components/OffersSection";
import AcademySection from "@/components/AcademySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoryHighlight />
      <ServicesSection />
      <PremiumRooms />
      <OffersSection />
      <AcademySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
