import { Cross, Heart, BookOpen, Sun } from "lucide-react";

const values = [
  {
    icon: Cross,
    title: "Faith in Christ",
    description: "Centered on the teachings of Jesus Christ and the Holy Scriptures",
  },
  {
    icon: Heart,
    title: "Love & Fellowship",
    description: "Building genuine relationships and supporting one another in faith",
  },
  {
    icon: BookOpen,
    title: "Biblical Truth",
    description: "Committed to studying and living according to God's Word",
  },
  {
    icon: Sun,
    title: "Holiness",
    description: "Pursuing a life of righteousness and sanctification daily",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Our Fellowship
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are a vibrant community of Christian students at the Technical University of Kenya, 
              united in our pursuit of spiritual growth and godly living.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Image/Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Cross className="w-10 h-10 text-gold" />
                    </div>
                    <blockquote className="font-serif text-xl md:text-2xl text-foreground italic">
                      "If my people, who are called by my name, will humble themselves and pray..."
                    </blockquote>
                    <p className="text-muted-foreground mt-4">— 2 Chronicles 7:14</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-xl -z-10" />
            </div>

            {/* Right: Text Content */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The Repentance and Holiness Student Fellowship exists to nurture the spiritual 
                lives of students at TU-K. We provide a welcoming space where students can encounter 
                God's love, grow in their faith, and develop lasting friendships with fellow believers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through weekly worship services, Bible studies, prayer meetings, and community 
                outreach programs, we aim to equip students to live as lights in the university 
                and beyond.
              </p>
              <div className="pt-4">
                <p className="font-medium text-foreground">Our Activities Include:</p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Weekly fellowship meetings and worship
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Bible study groups and discipleship
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Prayer gatherings and fasting programs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                    Community outreach and evangelism
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 shadow-soft hover-lift card-shine"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
