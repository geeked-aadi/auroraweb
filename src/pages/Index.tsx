import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryHighlight from "@/components/CategoryHighlight";
import ServicesSection from "@/components/ServicesSection";
import Gallery from "@/components/Gallery";
import OffersSection from "@/components/OffersSection";
import AcademySection from "@/components/AcademySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const sections = [
  { id: "hero", component: HeroSection },
  { id: "categories", component: CategoryHighlight },
  { id: "services", component: ServicesSection },
  { id: "gallery", component: Gallery },
  { id: "offers", component: OffersSection },
  { id: "academy", component: AcademySection },
  { id: "testimonials", component: TestimonialsSection },
  { id: "contact", component: ContactSection },
  { id: "footer", component: Footer },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);

  // Listen for hash changes from navbar
  useEffect(() => {
    if (!isMobile) return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const sectionMap: Record<string, number> = {
        "": 0,
        hero: 0,
        categories: 1,
        services: 2,
        gallery: 3,
        offers: 4,
        academy: 5,
        testimonials: 6,
        contact: 7,
        footer: 8,
      };
      if (hash in sectionMap) {
        setActiveSection(sectionMap[hash]);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isMobile]);

  // Desktop: normal scrolling
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <CategoryHighlight />
        <ServicesSection />
        <Gallery />
        <OffersSection />
        <AcademySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppFloat />
      </div>
    );
  }

  // Mobile: locked sections, only active one visible
  const ActiveComponent = sections[activeSection].component;

  return (
    <div className="h-screen bg-background overflow-hidden relative">
      <Navbar
        onMobileNavigate={setActiveSection}
        onMobileVisibilityChange={setIsMobileNavVisible}
      />
      <div
        className={`h-full overflow-y-auto transition-all duration-300 ${
          isMobileNavVisible ? "pt-16" : "pt-0"
        }`}
      >
        <ActiveComponent />
        {/* Render Testimonials immediately after Academy on Mobile */}
        {activeSection === 5 && <TestimonialsSection />}
      </div>
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
