import React from 'react';
import { GithubIcon } from './Icons'; // Assuming GithubIcon is exported from Icons.tsx

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  social: { name: string; url: string; icon: JSX.Element }[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Jamil Matheny",
    title: "Founder & Web Developer",
    bio: "Jamil bridges the gap between fantastical ideas and tangible AI realities, ensuring every pixel aligns with the user\'s vision. \" Our vision is to empower individuals and businesses, with AI-powered tools, to turn their ideas into a reality. \"",
    imageUrl: "https://avatars.githubusercontent.com/u/36749450?v=4",
    social: [
      { name: "GitHub", url: "https://github.com/jmathtech", icon: <GithubIcon className="w-5 h-5" /> },
    ]
  },
  {
    name: "Amos Miller",
    title: "AI Automation Specialist & Web Developer",
    bio: "Amos crafts user interfaces that are not just functional but enchantingly beautiful. He believes good design is magic you can interact with. Master of Figma, AI Automation, and color theory. \"We can harness AI to build a better society, improve our quality of life, enhance work performance, and more.\"",
    imageUrl: "./img/0-amos.jpg",
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
            <img
              src="https://www.svgrepo.com/show/500929/magic.svg"
              className="lazy-logo w-8 h-8 mr-2 filter brightness-0 invert"
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
              className="flex flex-col items-center p-6 text-center transition-transform team-card-hover-animate  duration-300 transform bg-slate-800 rounded-xl shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 h-full hover:scale-105 scroll-animate"
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
            >
              <img
                src={member.imageUrl}
                alt={`Portrait of ${member.name}`}
                className="object-cover w-32 h-32 mb-6 border-4 rounded-full shadow-lg border-slate-700 md:w-40 md:h-40"
                loading="lazy"
              />
              <h3 className="mb-1 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600">{member.name}</h3>
              <p className="mb-3 font-semibold text-indigo-300">{member.title}</p>
              <p className="flex-grow px-2 mb-4 text-sm text-slate-400">{member.bio}</p>
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