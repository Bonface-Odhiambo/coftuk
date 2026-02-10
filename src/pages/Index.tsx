import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CurrentEvents from "@/components/CurrentEvents";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import PhotoGallery from "@/components/PhotoGallery";
import JoinSection from "@/components/JoinSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CurrentEvents />
        <AboutSection />
        <PhotoGallery />
        <EventsSection />
        <JoinSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
