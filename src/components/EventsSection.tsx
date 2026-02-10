
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "10:00 AM - 12:00 PM",
    location: "University Chapel",
    description: "Join us for praise, worship, and the Word of God",
    featured: true,
  },
  {
    title: "Mid-Week Bible Study",
    date: "Every Wednesday",
    time: "5:00 PM - 7:00 PM",
    location: "Room 201, Academic Block",
    description: "Deep dive into scriptures and group discussions",
    featured: false,
  },
  {
    title: "Morning Glory Prayer",
    date: "Every Friday",
    time: "6:00 AM - 7:00 AM",
    location: "University Grounds",
    description: "Start your day with powerful prayers and devotion",
    featured: false,
  },
  {
    title: "Monthly Overnight Kesha",
    date: "Last Friday of Month",
    time: "9:00 PM - 5:00 AM",
    location: "University Chapel",
    description: "A night of worship, prayer, and spiritual renewal",
    featured: true,
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
              Upcoming Events
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Join Our Gatherings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of our regular fellowship activities and special events designed to 
              strengthen your faith and build community.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div
                key={event.title}
                className={`rounded-2xl p-6 md:p-8 transition-all hover-lift ${
                  event.featured
                    ? "bg-gradient-to-br from-primary to-royal-dark text-primary-foreground"
                    : "bg-card border border-border shadow-soft"
                }`}
              >
                {event.featured && (
                  <span className="inline-block px-3 py-1 bg-gold/20 text-gold-light text-xs font-medium rounded-full mb-4">
                    Featured
                  </span>
                )}
                <h3
                  className={`font-serif text-xl md:text-2xl font-semibold mb-4 ${
                    event.featured ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`mb-6 ${
                    event.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {event.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar
                      className={`w-4 h-4 ${
                        event.featured ? "text-gold-light" : "text-gold"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        event.featured ? "text-primary-foreground/90" : "text-foreground"
                      }`}
                    >
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock
                      className={`w-4 h-4 ${
                        event.featured ? "text-gold-light" : "text-gold"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        event.featured ? "text-primary-foreground/90" : "text-foreground"
                      }`}
                    >
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin
                      className={`w-4 h-4 ${
                        event.featured ? "text-gold-light" : "text-gold"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        event.featured ? "text-primary-foreground/90" : "text-foreground"
                      }`}
                    >
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-gold/50 text-foreground hover:bg-gold/10 hover:border-gold gap-2"
            >
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
