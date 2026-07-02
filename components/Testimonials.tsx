import AnimatedContainer from "@/components/AnimatedContainer";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Dantata Town Developers Limited is a name you can trust. Their commitment to delivering on promises, transparent communication, and adherence to timelines are commendable. Working with them has been a stress-free experience, and I have full confidence in their ability to turn visions into reality.",
    name: "Michael Gideon",
    title: "Homeowner",
  },
  {
    quote:
      "Dantata Town Developers was a game-changer. Their expertise in real estate and construction is evident in the seamless execution of projects. The return on investment exceeded my expectations. I look forward to more successful ventures with this exceptional team.",
    name: "Joseph Adeyemi",
    title: "Broker, NERF",
  },
  {
    quote:
      "Dantata Town Developers Limited sets the standard for excellence in the real estate industry. Their team demonstrated professionalism and dedication from the initial consultation to the final handover. The quality of construction and attention to client needs make them a standout choice.",
    name: "David Mojekwu",
    title: "Property Investor",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-dark">
            What Our Residents Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedContainer key={t.name} delay={i * 0.1}>
              <blockquote className="bg-white rounded-xl p-8 card-elevate h-full flex flex-col">
                <p className="text-body leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 pt-6 border-t border-light">
                  <cite className="not-italic">
                    <span className="block text-dark font-medium">
                      {t.name}
                    </span>
                    <span className="block text-sm text-body mt-1">
                      {t.title}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
