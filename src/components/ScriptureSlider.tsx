import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { getScriptures, Scripture } from "@/lib/store";

const ScriptureSlider = () => {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const loadScriptures = () => {
      const allScriptures = getScriptures();
      const activeScriptures = allScriptures.filter(s => s.isActive);
      setScriptures(activeScriptures);
    };

    loadScriptures();
    const interval = setInterval(loadScriptures, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scriptures.length > 1) {
      const timer = setInterval(() => {
        nextSlide();
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, scriptures.length]);

  const nextSlide = () => {
    if (isAnimating || scriptures.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % scriptures.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || scriptures.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + scriptures.length) % scriptures.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (scriptures.length === 0) {
    return null;
  }

  const currentScripture = scriptures[currentIndex];

  return (
    <div className="w-full max-w-3xl mx-auto my-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
      <div className="relative bg-gradient-to-br from-primary/5 to-gold/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft border border-gold/20">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
        </div>

        {/* Scripture Content */}
        <div className={`text-center transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <p className="text-sm font-medium text-gold mb-3 tracking-wider uppercase">
            Daily Scripture
          </p>
          <blockquote className="text-lg md:text-xl text-foreground font-serif italic mb-4 leading-relaxed">
            "{currentScripture.text}"
          </blockquote>
          <cite className="text-sm md:text-base font-semibold text-muted-foreground not-italic">
            — {currentScripture.reference}
          </cite>
        </div>

        {/* Navigation Arrows - Only show if multiple scriptures */}
        {scriptures.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous scripture"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next scripture"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {scriptures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gold w-8'
                      : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                  aria-label={`Go to scripture ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScriptureSlider;
