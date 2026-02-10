import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["Technical University of Kenya", "Haile Selassie Avenue", "Nairobi, Kenya"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+254 797 457762", "+254 704 949187"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["technicaluniversityrhsf@gmail.com"],
  },
  {
    icon: Clock,
    title: "Meeting Times",
    details: ["Monday: 4:00 PM - 6:00 PM", "Thursday: 4:00 PM - 6:00 PM", "Saturday: 8:00 AM - 10:00 AM (Worship Practice)"],
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to learn more about our fellowship? 
              We'd love to hear from you.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-card rounded-2xl p-6 shadow-soft hover-lift text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {info.title}
                </h4>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden bg-secondary/50 aspect-[16/6] flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Technical University of Kenya
              </p>
              <p className="text-muted-foreground">
                Haile Selassie Avenue, Nairobi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
