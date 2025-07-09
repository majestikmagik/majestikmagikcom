import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon } from './Icons'; // Assuming GithubIcon is exported from Icons.tsx

interface TeamMember {
  name: string;
  email: string;
  title: string;
  bio: string;
  imageUrl: string;
  url: string;
  social: { name: string; url: string; icon: React.ReactElement }[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Jamil Matheny",
    title: "Founder & Web Specialist",
    email: "jamil.matheny@majestikmagik.com",
    bio: "Jamil Matheny is the Founder of Majestik Magik, a digital solutions agency born from a lifelong passion for technology and a deep-seated desire to help businesses achieve their goals. He leads the company with a core mission: to create effective, purpose-driven websites that solve real-world business challenges.",
    imageUrl: "/img/0-jamil.jpg",
    url: "/about/jamil-matheny",
    social: [
      { name: "GitHub", url: "https://github.com/jmathtech", icon: <GithubIcon className="w-5 h-5" /> },
    ]
  },
  {
    name: "Amos Miller",
    title: "AI & Automation Engineer",
    email: "amos.miller@majestikmagik.com",
    bio: "As an AI & Automation Engineer at Majestik Magik, Amos Miller is dedicated to architecting intelligent systems that are scalable, efficient, and user-friendly. He specializes in bridging the gap between cutting-edge artificial intelligence and practical automation, creating solutions that empower businesses and bring complex ideas to life.",
    imageUrl: "/img/0-amos.jpg",
    url: "/about/amos-miller",
    social: [
      { name: "GitHub", url: "https://github.com/amos0312", icon: <GithubIcon className="w-5 h-5" /> },
    ]
  }
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" aria-labelledby="team-heading" className="py-16 md:py-24 bg-slate-900">
      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center">
          <h2 id="team-heading" className="flex items-center justify-center mb-4 text-3xl font-bold text-slate-100 scroll-animate md:text-4xl">
            <Image
              src="https://www.svgrepo.com/show/500929/magic.svg"
              className="lazy-logo w-8 h-8 mr-2 filter brightness-0 invert"
              width={24}
              height={24}
              alt="Majestik Magik team icon"
              loading="lazy"
            />
            Meet Our Tech Wizards
          </h2>
          <p className="max-w-xl mx-auto font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.3s' }}>
            The creative minds and technical wizards turning your digital dreams into reality.
          </p>
        </div>
        <div className="grid max-w-4xl gap-10 mx-auto md:grid-cols-2 lg:gap-16 scroll-animate">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="flex flex-col items-center p-6 transition-transform team-card-hover-animate  duration-300 transform bg-slate-800 rounded-xl shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 h-full hover:scale-105 scroll-animate"
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              <Image
                src={member.imageUrl}
                alt={`Portrait of ${member.name}`}
                className="object-cover w-32 h-32 mb-6 border-4 rounded-full shadow-lg border-slate-700 md:w-40 md:h-40"
                width={160}
                height={160}
                loading="lazy"
              />
              <h3 className="mb-1 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600">{member.name}</h3>
              <p className="mb-3 font-semibold text-indigo-300">{member.title}</p>
              <p className="mb-4 text-sm font-semibold text-slate-400">{member.email}</p>
              <p className="flex-grow px-2 mb-4 text-sm text-slate-400">{member.bio}
                <Link href={member.url} className="transition-colors duration-300 font-bold text-indigo-300 hover:text-indigo-500 mx-2"> Read More</Link>
              </p>
              <div className="flex mt-auto space-x-4">
                {member.social.map(socialLink => (
                  <a
                    key={socialLink.name}
                    href={socialLink.url}
                    title={socialLink.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 text-slate-500 hover:text-pink-400"
                    aria-label={`Connect with ${member.name} on ${socialLink.name}`}
                  >
                    {socialLink.icon}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;