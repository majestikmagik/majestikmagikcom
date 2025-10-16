import Image from 'next/image';

type Testimonial = {
  name: string;
  image?: string;
  testimonial: string;
  stars: 1 | 2 | 3 | 4 | 5;
  source?: string;
  location?: string;
  date?: string;
};

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-slate-600'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Noel Customs',
      image: '/img/noel_customs.webp',
      testimonial:
        'OMG you are the freaking best!! The changes have made my life so much easier. I will definitely be in contact when I need someone.',
      stars: 5,
      source: 'Majestik Magik Client',
    },
    {
      name: 'Parris Gainer',
      image: '/img/parrisgainer.webp',
      testimonial:
        'Majestik Magik didn’t just build a website — they built a platform that empowers my voice and mission.',
      stars: 5,
      source: 'Majestik Magik Client',
    },
    {
      name: 'Janice G',
      testimonial:
        'Jamil did a great job cleaning our home. I will definitely recommend him to our friends and family!',
      stars: 5,
      source: 'Homeaglow — Verified Cleaning',
      location: 'Ford, VA',
      date: '5 days ago',
    },
    {
      name: 'John M',
      testimonial:
        "Jamil was magnificent. He's got a winning personality and really delivered on cleaning our place.",
      stars: 5,
      source: 'Homeaglow — Verified Cleaning',
      location: 'Henrico, VA',
      date: '1 week ago',
    },
    {
      name: 'Melissa C',
      testimonial:
        'He always does a very thorough cleaning. Very friendly and easy going. A+ highly recommended.',
      stars: 5,
      source: 'Homeaglow — Verified Cleaning',
      location: 'Richmond, VA',
      date: '5 months ago',
    },
    {
      name: 'Dèsirèe (Sarai) A',
      testimonial:
        'Jamil is an excellent professional and I trust him to return on the regular.',
      stars: 5,
      source: 'Homeaglow — Verified Cleaning',
      location: 'Fort Gregg-Adams, VA',
      date: '4 months ago',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 scroll-animate">
          What Do The Clients Say
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <article
              key={`${t.name}-${index}`}
              className="flex h-full flex-col rounded-lg bg-slate-800 p-6 shadow-xl border border-slate-700/40 hover:shadow-indigo-500/30 hover:-translate-y-1 transition scroll-animate"
              style={{ transitionDelay: `${0.2 + index * 0.06}s` }}
            >
              <header className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-slate-700/40">
                  {t.image ? (
                    <Image src={t.image} alt={t.name} width={48} height={48} />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-slate-300 text-sm">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                  <div className="flex items-center gap-1" aria-label={`${t.stars} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} filled={n <= t.stars} />
                    ))}
                  </div>
                </div>
              </header>

              <p className="text-slate-100 leading-relaxed mb-4">“{t.testimonial}”</p>

              <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-400">
                {t.source && (
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                    </svg>
                    {t.source}
                  </span>
                )}
                {t.location && <span>• {t.location}</span>}
                {t.date && <span>• {t.date}</span>}
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="https://www.homeaglow.com/jamilmat" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
          >
            See more reviews on Homeaglow →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
