
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Noel Customs',
      image: '/img/noel_customs.webp',
      testimonial: '"OMG you are the freaking best!! The changes has made my life so much easier. I will definitely be in contact when I need someone."',
      stars: 5,
    },
    {
      name: 'Parris Gainer',
      image: '/img/parrisgainer.webp',
      testimonial: 'Listed as a Google Review.',
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 scroll-animate">What Our Clients Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-sm bg-slate-800 rounded-lg p-8 services-card-hover-animate shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 scroll-animate" style={{ transitionDelay: `${0.2 + index * 0.1}s` }}>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <div className="flex">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
