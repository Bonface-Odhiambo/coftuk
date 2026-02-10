import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Play, Pause } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getGalleryImages, GalleryImage } from "@/lib/store";
import { cn } from "@/lib/utils";

const PhotoGallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGalleryImages(getGalleryImages());
  }, []);

  // Auto-scroll with pause on hover
  useEffect(() => {
    if (!isPlaying || isHovered || galleryImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, galleryImages.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
  }, [galleryImages.length]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const lightboxPrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  }, [selectedImage, galleryImages.length]);

  const lightboxNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  }, [selectedImage, galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (galleryImages.length === 0) return null;

  // Calculate visible slides for cinematic effect
  const getSlideStyle = (index: number) => {
    const totalSlides = galleryImages.length;
    let diff = index - currentIndex;
    
    // Handle wrap-around
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;

    const isActive = diff === 0;
    const isPrev = diff === -1;
    const isNext = diff === 1;
    const isVisible = Math.abs(diff) <= 2;

    if (!isVisible) {
      return {
        opacity: 0,
        transform: `translateX(${diff * 100}%) scale(0.6)`,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }

    return {
      opacity: isActive ? 1 : isPrev || isNext ? 0.7 : 0.4,
      transform: `translateX(${diff * 85}%) scale(${isActive ? 1 : isPrev || isNext ? 0.85 : 0.7})`,
      zIndex: isActive ? 30 : isPrev || isNext ? 20 : 10,
      pointerEvents: 'auto' as const,
    };
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
              <Camera className="w-4 h-4 text-gold" />
              <p className="text-gold font-medium tracking-wider uppercase text-sm">
                Photo Gallery
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Moments of Faith
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our fellowship activities, worship sessions, and
              the beautiful community we are building together in Christ.
            </p>
          </div>

          {/* Cinematic Slider */}
          <div 
            ref={sliderRef}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Slides Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {galleryImages.map((image, index) => {
                const style = getSlideStyle(index);
                const isActive = index === currentIndex;

                return (
                  <div
                    key={image.id}
                    onClick={() => isActive ? openLightbox(index) : goToSlide(index)}
                    className={cn(
                      "absolute w-[70%] md:w-[60%] lg:w-[55%] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer",
                      "transition-all duration-700 ease-out",
                      isActive && "shadow-2xl shadow-gold/20"
                    )}
                    style={style}
                  >
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={image.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700",
                        isActive && "scale-100",
                        !isActive && "scale-105"
                      )}
                    />
                    
                    {/* Golden border glow for active */}
                    <div 
                      className={cn(
                        "absolute inset-0 rounded-2xl transition-all duration-500",
                        isActive 
                          ? "ring-2 ring-gold/60 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" 
                          : "ring-1 ring-white/10"
                      )} 
                    />

                    {/* Gradient overlay */}
                    <div 
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-70"
                      )} 
                    />

                    {/* Content - only visible on active */}
                    <div 
                      className={cn(
                        "absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                    >
                      <span className="inline-block px-3 py-1.5 bg-gold text-white text-xs font-semibold rounded-full mb-3 shadow-lg">
                        {image.category}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/90 max-w-lg">
                        {image.description}
                      </p>
                    </div>

                    {/* Play icon hint on hover for active slide */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center backdrop-blur-sm">
                          <Camera className="w-7 h-7 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 bg-black/40 hover:bg-gold/80 backdrop-blur-sm rounded-full transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 bg-black/40 hover:bg-gold/80 backdrop-blur-sm rounded-full transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-gold/20 hover:bg-gold/40 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gold" />
              ) : (
                <Play className="w-4 h-4 text-gold" />
              )}
            </button>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: currentIndex === index ? '2rem' : '0.5rem' }}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="absolute inset-0 bg-gold/30" />
                  {currentIndex === index && (
                    <div 
                      className="absolute inset-0 bg-gold origin-left"
                      style={{
                        animation: isPlaying && !isHovered ? 'progress 5s linear' : 'none',
                        transform: 'scaleX(1)'
                      }}
                    />
                  )}
                  {currentIndex !== index && (
                    <div className="absolute inset-0 bg-gold/50 hover:bg-gold/70 transition-colors" />
                  )}
                </button>
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-sm text-muted-foreground font-medium">
              <span className="text-gold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              <span>{String(galleryImages.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="relative">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300",
                    currentIndex === index 
                      ? "ring-2 ring-gold scale-110 shadow-lg shadow-gold/30" 
                      : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for progress animation */}
      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black/95 border-gold/20">
          {selectedImage !== null && galleryImages[selectedImage] && (
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-gold/20 hover:bg-gold/40 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation - Previous */}
              <button
                onClick={lightboxPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gold/20 hover:bg-gold/40 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Navigation - Next */}
              <button
                onClick={lightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gold/20 hover:bg-gold/40 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <span className="inline-block px-3 py-1 bg-gold text-white text-xs font-medium rounded-full mb-2">
                  {galleryImages[selectedImage].category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-white/80 mt-1">
                  {galleryImages[selectedImage].description}
                </p>
              </div>

              {/* Thumbnail navigation */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-2 ring-gold scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoGallery;
