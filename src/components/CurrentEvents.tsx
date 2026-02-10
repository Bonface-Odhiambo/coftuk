
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { getEvents, Event } from "@/lib/store";

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

const getDateLabel = (dateStr: string): string => {
  if (isToday(dateStr)) return "Today";
  if (isTomorrow(dateStr)) return "Tomorrow";
  return formatDate(dateStr);
};

const CurrentEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents = getEvents();
    // Sort by date (soonest first) and filter to show only upcoming events
    const sortedEvents = storedEvents
      .filter((e) => new Date(e.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setEvents(sortedEvents);
  }, []);

  const eventsWithHighlight = events.map((event) => ({
    ...event,
    isHighlight: isToday(event.date) || isTomorrow(event.date),
  }));

  const hasHighlight = eventsWithHighlight.some((e) => e.isHighlight);

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-r from-primary via-royal-dark to-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with animation */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-center">
              {hasHighlight ? "Happening Soon" : "Upcoming Events"}
            </h2>
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          </div>

          {/* Events scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {eventsWithHighlight.map((event) => (
              <div
                key={event.id}
                className={`flex-shrink-0 w-80 md:w-96 rounded-xl overflow-hidden transition-all ${
                  event.isHighlight
                    ? "ring-2 ring-gold-light shadow-gold"
                    : "bg-white/10 backdrop-blur-sm hover:bg-white/15"
                }`}
              >
                {/* Event Banner Image */}
                {event.image ? (
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    {event.isHighlight && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 bg-gold text-gold-dark text-xs font-bold rounded">
                        <Sparkles className="w-3 h-3" />
                        {isToday(event.date) ? "TODAY!" : "TOMORROW!"}
                      </span>
                    )}
                    {event.isRecurring && event.recurringPattern && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded">
                        {event.recurringPattern}
                      </span>
                    )}
                    {/* Title overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-lg font-semibold text-white drop-shadow-lg">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className={`p-5 ${event.isHighlight ? "bg-gold" : ""}`}>
                    {event.isHighlight && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold-dark/20 text-gold-dark text-xs font-bold rounded mb-3">
                        <Sparkles className="w-3 h-3" />
                        {isToday(event.date) ? "TODAY!" : "TOMORROW!"}
                      </span>
                    )}
                    <h3
                      className={`font-serif text-lg font-semibold mb-1 ${
                        event.isHighlight ? "text-gold-dark" : "text-primary-foreground"
                      }`}
                    >
                      {event.title}
                    </h3>
                    {event.isRecurring && event.recurringPattern && (
                      <span className={`text-xs ${event.isHighlight ? "text-gold-dark/70" : "text-gold-light"}`}>
                        {event.recurringPattern}
                      </span>
                    )}
                  </div>
                )}

                {/* Event Details */}
                <div className={`p-4 space-y-2 ${event.isHighlight && !event.image ? "bg-gold pt-0" : event.isHighlight ? "bg-gold" : ""}`}>
                  <div className="flex items-center gap-2">
                    <Calendar
                      className={`w-4 h-4 ${
                        event.isHighlight ? "text-gold-dark/70" : "text-gold-light"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        event.isHighlight
                          ? "text-gold-dark/90 font-medium"
                          : "text-primary-foreground/80"
                      }`}
                    >
                      {getDateLabel(event.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock
                      className={`w-4 h-4 ${
                        event.isHighlight ? "text-gold-dark/70" : "text-gold-light"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        event.isHighlight
                          ? "text-gold-dark/90"
                          : "text-primary-foreground/80"
                      }`}
                    >
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      className={`w-4 h-4 ${
                        event.isHighlight ? "text-gold-dark/70" : "text-gold-light"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        event.isHighlight
                          ? "text-gold-dark/90"
                          : "text-primary-foreground/80"
                      }`}
                    >
                      {event.location}
                    </span>
                  </div>
                  {event.description && (
                    <p
                      className={`text-xs mt-2 line-clamp-2 ${
                        event.isHighlight
                          ? "text-gold-dark/80"
                          : "text-primary-foreground/60"
                      }`}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollbar hide CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CurrentEvents;
