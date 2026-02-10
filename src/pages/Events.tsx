import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsSection from "@/components/EventsSection";
import CurrentEvents from "@/components/CurrentEvents";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <CurrentEvents />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
