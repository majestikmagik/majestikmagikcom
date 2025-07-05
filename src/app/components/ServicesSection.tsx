import React from 'react';

// Define an interface for the service data
interface Service {
  title: string;
  description: string;
  icon: React.ReactElement; // Type for React elements like SVG icons
}

const techStackLogos = [
  { name: "React", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", alt: "React Logo", className: "lazy-logo" },
  { name: "Python", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", alt: "Python Logo", className: "lazy-logo"   },
  { name: "Three.js", imgSrc: "https://seeklogo.com/images/T/three-js-logo-07A32307F1-seeklogo.com.png", alt: "Three.js Logo", className: "lazy-logo"  }, // Using a PNG as a good SVG was not immediately available
  { name: "Node.js", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", alt: "Node.js Logo", className: "lazy-logo"  },
  { name: "GitHub Actions", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", alt: "GitHub Logo (for Actions)", className: "lazy-logo"  },
  { name: "AWS", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", alt: "AWS Logo", className: "lazy-logo"  },
  { name: "Gemini AI", imgSrc: "./img/gemini-brand.webp", alt: "Gemini AI Logo", className: "lazy-logo"  },
  { name: "OpenAI", imgSrc: "./img/openai.svg", alt: "Open AI Logo", className: "lazy-logo"  },
  { name: "Tailwind CSS", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS Logo", className: "lazy-logo"  },
  { name: "TypeScript", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/500px-Typescript_logo_2020.svg.png", alt: "TypeScript Logo", className: "lazy-logo"  },
  { name: "PostgreSQL", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg", alt: "PostgreSQL Logo", className: "lazy-logo"  },
];

const servicesData: Service[] = [
  {
    title: "AI Growth Infrastructure Solutions",
    description: "Unlock exponential growth with intelligent foundations. We conjure robust AI systems, seamless data pipelines, and optimized cloud architectures, empowering your business to scale and innovate with AI-driven precision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lazy-logo w-8 h-8 mb-4 text-purple-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    )
  },  {
    title: "Custom Website Development", description: "From concept to launch, we build bespoke websites that are beautiful, functional, and tailored to you.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lazy-logo w-8 h-8 mb-4 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
  },
  {
    title: "SEO (Search Engine Optimization)",
    description: "Boost your search engine rankings and organic traffic with our data-driven SEO strategies.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lazy-logo w-8 h-8 mb-4 text-sky-400"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
  },
  {
    title: "Digital Marketing Campaigns",
    description: "Engage your audience and drive growth with targeted digital marketing campaigns across various channels.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lazy-logo w-8 h-8 mb-4 text-orange-400"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z\" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 md:py-24 bg-slate-900">
      <div className="container px-6 mx-auto">
        <div className="mb-12 text-center">
          <h2 id="services-heading" className="mb-4 text-3xl text-slate-100 font-bold scroll-animate md:text-4xl">Our Magical Services</h2>
          <p className="max-w-xl mx-auto font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.3s' }}>
            We offer a variety of solutions that seems like magic in every digital solution we craft.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 scroll-animate">
          {servicesData.map((service, index) => (
            <div
              key={service.title}
              className="p-6 transition-shadow duration-300 transform bg-slate-800 rounded-lg services-card-hover-animate shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 scroll-animate"
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              {service.icon}
              <h3 className="mb-2 text-xl font-semibold text-indigo-300">{service.title}</h3>
              <p className="text-sm text-slate-400">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <div className="mt-20 text-center scroll-animate" style={{ transitionDelay: '0.4s' }}>
          <h3 className="mb-10 text-md font-semibold text-slate-200 md:text-xl">
            Tech Stack We Use
          </h3>
          <div className="scrolling-logos-wrapper">
            <div className="scrolling-logos-container-services">
              {[...techStackLogos, ...techStackLogos].map((tech, index) => ( // Duplicate for seamless scroll
                <div
                  key={`${tech.name}-${index}`}
                  title={tech.name}
                  className="flex items-center justify-center flex-shrink-0 mx-4 sm:mx-6 tooltip" // Added tooltip class if you want to add custom tooltips later
                  data-tip={tech.name} // For potential CSS/JS tooltip libraries
                >
                  <img
                    src={tech.imgSrc}
                    alt={tech.alt}
                    className="lazy-logo h-10 sm:h-12 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;