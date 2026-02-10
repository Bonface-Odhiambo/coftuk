import { useState, useEffect } from "react";
import { Users, Mail, Phone, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLeaders, Leader } from "@/lib/store";

const Leadership = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    setLeaders(getLeaders());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-gold/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold-dark">Our Executive Team</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Meet Our <span className="text-gradient-gold">Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dedicated servants of God committed to nurturing spiritual growth and 
              fostering a vibrant community of believers at TU-K.
            </p>
          </div>
        </div>
      </section>

      {/* Leaders Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div
                key={leader.id}
                className="group bg-card rounded-2xl shadow-soft hover:shadow-gold transition-all duration-500 overflow-hidden hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image with Gold Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gold text-gold-dark text-xs font-semibold rounded-full shadow-gold">
                    {leader.role}
                  </div>
                  
                  {/* Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl font-bold text-white mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-white/80 text-sm">{leader.course}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {leader.quote && (
                    <p className="text-muted-foreground italic mb-4 flex items-start gap-2">
                      <span className="text-gold text-2xl leading-none">"</span>
                      {leader.quote}
                    </p>
                  )}
                  
                  <div className="space-y-2 pt-4 border-t border-border">
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors group/link"
                      >
                        <Mail className="w-4 h-4 text-gold" />
                        <span className="group-hover/link:underline">{leader.email}</span>
                      </a>
                    )}
                    {leader.phone && (
                      <a
                        href={`tel:${leader.phone}`}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors group/link"
                      >
                        <Phone className="w-4 h-4 text-gold" />
                        <span className="group-hover/link:underline">{leader.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {leaders.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No leaders available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Join */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary to-royal-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Users className="w-12 h-12 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Want to Serve?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We believe in empowering every member to discover and use their spiritual gifts. 
            Join a ministry team and make a difference in our fellowship.
          </p>
          <a
            href="/#join"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-foreground font-semibold rounded-full transition-all duration-300 shadow-gold hover:shadow-lg"
          >
            Get Involved
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;
