import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinSection from "@/components/JoinSection";

const Join = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
};

export default Join;
