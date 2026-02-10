import { ArrowRight, Heart, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const HeroSection = () => {
  const scrollToJoin = () => {
    const element = document.querySelector("#join");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl animate-glow" />
              <img
                src={logo}
                alt="Repentance and Holiness Logo"
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-elevated border-4 border-white"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4 mb-8">
            <p className="text-gold font-medium tracking-wider uppercase text-sm animate-fade-up">
              Technical University of Kenya
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Repentance & Holiness
              <span className="block text-gradient-gold">Student Fellowship</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Walking in the path of righteousness, growing in faith, and building a community of believers at TU-K
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={scrollToJoin}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-soft hover:shadow-elevated transition-all"
            >
              Join Fellowship
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={scrollToAbout}
              variant="outline"
              size="lg"
              className="border-gold/50 text-foreground hover:bg-gold/10 hover:border-gold transition-all"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <Heart className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">150+</p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">Weekly</p>
              <p className="text-sm text-muted-foreground">Bible Studies</p>
            </div>
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <Users className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">14+</p>
              <p className="text-sm text-muted-foreground">Years of Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
