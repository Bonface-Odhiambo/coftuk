import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Cross } from "lucide-react";
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

  const gradients = [
    "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    "from-amber-500/20 via-orange-500/20 to-red-500/20",
    "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
  ];

  const currentGradient = gradients[currentIndex % gradients.length];

  return (
    <div className="relative h-full">
      <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${currentGradient} overflow-hidden transition-all duration-700 shadow-elevated`}>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className={`text-center transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="w-20 h-20 bg-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm">
              <Cross className="w-10 h-10 text-gold" />
            </div>
            <blockquote className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed mb-4">
              "{currentScripture.text}"
            </blockquote>
            <p className="text-muted-foreground font-medium">— {currentScripture.reference}</p>
          </div>
        </div>

        {/* Navigation Arrows - Only show if multiple scriptures */}
        {scriptures.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label="Previous scripture"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              aria-label="Next scripture"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2">
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
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gold w-8 shadow-md'
                      : 'bg-white/50 w-2 hover:bg-white/70'
                  }`}
                  aria-label={`Go to scripture ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-2xl -z-10" />
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-xl -z-10" />
    </div>
  );
};

export default ScriptureSlider;
