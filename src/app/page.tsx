"use client";

import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';


// Import custom hook
import useMediaQuery from './hooks/useMediaQuery';

import {
  HeroSection,
  ServicesSection,
  PricingSection,
  LabsSection,
  TeamSection,
  TestimonialsSection,
  AIConceptTemplateSection,
  Chatbot,
  VideoModal
} from './components';

import './globals.css';


const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;


interface ChatMessage {
  id: string;
  text: string | undefined;
  sender: 'user' | 'ai';
}

type OutputFormat = 'html' | 'react-tsx';




// --- High-Tier Pricing Plans ---
const pricingPlans = [
  {
    name: "🚀 The Local Launchpad: Get Your Business Online, FAST!",
    tagline: "Professional Web Presence in Days, Not Weeks. Zero Tech Headaches.",
    description: "Imagine launching your local business online with a stunning, high-converting website – not in months, but in days. The Local Launchpad is your turnkey solution designed specifically for service providers, consultants, solo entrepreneurs, and small brick-and-mortar shops who need to establish instant credibility, attract more customers, and work smarter, not harder.",
    bestFor: "Perfect for: Service Providers, Consultants, Solo Entrepreneurs, Small Brick-and-Mortar Shops, and anyone needing a professional online presence without the fuss or massive upfront cost.",
    coreBenefits: [
      "Instant Credibility & Trust: Ditch the DIY look. Launch with a professionally designed site that positions you as a leader in your local market.",
      "Attract More Customers 24/7: Your business becomes findable online, converting visitors into leads and inquiries around the clock—even while you sleep!",
      "Zero Tech Stress, Maximum Focus: We handle everything. From design to hosting to security, you can focus 100% on serving your clients and growing your business.",
      "Lightning-Fast Launch: Get online in 5-10 business days. Stop waiting, start selling.",
      "Affordable & Transparent: Get big-agency quality without the big-agency price tag. Clear, upfront costs with no hidden fees."
    ],
    whatYouGet: [
      "Custom 3-Page Website: Home, About, and Contact pages, designed to perfectly match your brand and clearly communicate your value.",
      "Mobile-First Design: Your site will look and perform flawlessly on any device—phones, tablets, and desktops.",
      "High-Speed Hosting & SSL Security: Blazing fast, secure cloud hosting with an SSL certificate included for visitor trust.",
      "Content Integration: We load your provided images and text, so your site is ready to go live.",
      "Local SEO Foundation: On-page SEO optimization and Google Maps integration to ensure local customers find you easily.",
      "Social Media Connections: Seamless integration with your key platforms (Facebook, Instagram, LinkedIn).",
      "Google Analytics Setup: Track visitor traffic and behavior to make informed business decisions.",
      "Personalized Strategy Session: A dedicated call to align your website with your specific business goals.",
      "One Round of Revisions: We'll fine-tune your site to ensure you're absolutely thrilled with the final result."
    ],
    timeline: "5–10 Business Days from Content Submission",
    investment: {
      setupFee: "$700 (One-Time Setup Fee)",
      monthlyPlan: {
        name: "Your 'Worry-Free Growth' Plan",
        price: "$80/month",
        includes: [
          "🔐 Proactive Security & Monitoring: We keep your site safe from threats, 24/7.",
          "🚀 Performance Optimization: Your site stays fast, reliable, and always online.",
          "🛠️ Hands-Free Maintenance & Updates: We handle the tech so you don't have to.",
          "💬 Ongoing Support: Minor content changes & Q&A when you need it."
        ]
      }
    },
    optionalAddOns: [
      {
        name: "🛒 E-commerce Ready Add-On",
        description: "Add simple selling functionality like a product page or 'Buy Now' buttons—perfect if you're ready to sell directly from your site.",
         
      },
      {
        name: "🤖 24/7 AI Chatbot Integration",
        description: "Engage site visitors with an AI assistant that answers FAQs, captures leads, and keeps people engaged—even after hours!",       
      },
      {
        name: "📝 CMS Access (Sanity.io, Contentful)",
        description: "Want to update content or run a blog yourself without coding? Get access to a simple, intuitive content management system.",
      }
    ],
    buttonText: "Launch My Business Now!",
    url: "https://buy.stripe.com/6oU9ATd8y5KC1hs11ddEs00"
  },
  {
    name: "✨ Magik Weaver: Your Digital Growth Engine",
    tagline: "STOP building a website. START building a digital asset that drives revenue.",
    description: "The Magik Weaver package is designed for ambitious founders who are past the basic brochure site and ready to transform their online presence into a high-performance lead generation and sales machine.",
    bestFor: "Growing businesses that want to dominate their niche with a scalable, high-converting, and strategically-built website that functions as a digital growth engine.",
    coreBenefits: [
      "Conversion-Driven Design: Not just a pretty face — your site is built to convert visitors into leads and customers.",
      "Built for Growth: Your platform scales with your business using enterprise-level tech.",
      "Strategic Execution: We’re not just designers; we’re growth partners focused on your success.",
      "Performance + Security: Fast load times, built-in security, and bulletproof infrastructure.",
      "Advanced Integrations: SEO, social media, analytics, CMS — fully integrated from the start."
    ],
    whatYouGet: [
      "Custom Design (Up to 7 Sections): A unique and modern layout that reflects your brand and drives user action.",
      "Fully Responsive & Mobile Optimized: Seamless experience across all devices.",
      "Enterprise Hosting (AWS/GCP) + CDN (Cloudflare): Lightning-fast, secure, and scalable infrastructure.",
      "Built with React, Next.js, TypeScript: Cutting-edge tech stack ensures long-term flexibility and performance.",
      "API & Content Integration: Connects smoothly with your tools and content sources.",
      "Advanced SEO Implementation: Technical and on-page strategies to boost your rankings from day one.",
      "Social Media Integration: Drive more traffic and engagement from your social platforms.",
      "Analytics & Conversion Tracking: Set up to monitor KPIs and user behavior effectively.",
      "Headless CMS (Sanity.io or Contentful): Easily manage and update your site content.",
      "E-Commerce Integration (Shopify/WooCommerce): Sell up to 10 products with a robust storefront.",
      "Up to 3 Basic Custom Features: Tailored features that give you a competitive edge.",
      "Optional AI Chatbot: Convert visitors into leads around the clock with AI assistance.",
      "Initial Consultation + Strategy: Align the website with your business goals from the beginning.",
      "3 Rounds of Revisions: We work with you until it's perfect.",
      "Dedicated Email & Phone Support: For peace of mind throughout the project."
    ],
    timeline: "10–25 Business Days from Content Submission",
    investment: {
      setupFee: "$2,200 (One-Time Build)",
      monthlyPlan: {
        name: "Ongoing Performance & Security Partnership",
        price: "$250/month",
        includes: [
          "🛡️ Post-Launch Support: Peace of mind with continued technical help.",
          "🔐 Security Updates: Ongoing protection against threats.",
          "⚡ Performance Monitoring & Optimization: Keep your site fast and reliable.",
          "📈 Monthly Analytics Summary: Get insights into traffic and performance.",
          "📊 Keyword Rank Monitoring: Track SEO improvements and opportunities.",
          "✍️ Content Updates (2 Hours/Month): Keep your content fresh and effective."
        ]
      }
    },
    optionalAddOns: [
      {
        name: "🤖 AI Chatbot / Agent",
        description: "Engage visitors and capture leads 24/7 using an AI-powered assistant.",
        price: "Included if selected during build phase"
      }
    ],
    highlight: true,
    buttonText: "Build My Growth Engine",
    url: "https://buy.stripe.com/3cI00j4C24Gy0dobFRdEs01"
  },
  {
    "name": "🏛️ Grand Architect: Your Ultimate Digital Empire Blueprint",
    "tagline": "Build the future of your business. Unleash a limitless digital ecosystem.",
    "description": "Stop letting digital limitations hold back your empire. Start building the future of your business with an unparalleled, fully customized digital solution. The Grand Architect package is for the visionary founder with complex demands and an insatiable appetite for market leadership.",
    "bestFor": "This is your definitive solution if you lead a high-growth enterprise with intricate operational and customer engagement needs. You require bespoke, fully integrated digital platform, uncompromising performance, and long-term strategic partner.",
    "coreBenefits": [
      "Limitless Customization & Scale: No design limits. No tech constraints. Just performance.",
      "Proactive AI-Driven SEO: A long-term search dominance strategy — not just optimization.",
      "Enterprise-Ready Infrastructure: Unshakeable reliability. Global scalability. Instant performance.",
      "Intelligent Reporting: Custom dashboards, KPIs, and insights to fuel decision-making.",
      "Dedicated Growth Partner: From strategy to support, you’re never left guessing."
    ],
    "whatYouGet": [
      "Custom-Engineered Website (Unlimited Sections): A fully tailored, high-converting experience built to scale.",
      "Enterprise Infrastructure (AWS / GCP): Blazing fast load times, global uptime, and seamless growth.",
      "Advanced Headless CMS (Sanity.IO, Contentful): Take full control of your content workflows.",
      "AI-Powered SEO & Content Strategy: Constantly adapting to rank, capture traffic, and convert.",
      "Custom Analytics & KPI Dashboards: Deep insights. Smarter decisions. Better outcomes.",
      "Unlimited Complex Features: From CRM, ERP, and proprietary tools — we’ll engineer it.",
      "Optional AI Chatbot/Agent: Convert more with intelligent 24/7 lead capture.",
      "Advanced Content Migration: Seamless, optimized transition of your existing content.",
      "Social Media Integration: Amplify every move with built-in channel connectivity.",
      "Robust E-commerce (Shopify/WooCommerce): Launch your store, ready for serious sales.",
      "Initial Strategic Consultation: Define goals and map a winning digital strategy.",
      "Unlimited Small Revisions: Continuous adaptation to your evolving business.",
      "Priority Support: Direct phone & email access — no delays, no gatekeepers."
    ],
    "timeline": "12–30 Business Days from Content Submission",
    "investment": {
      "setupFee": "$6,000 (One-Time Build)",
      "monthlyPlan": {
        "name": "Ongoing Digital Empire Management",
        "price": "$600/month",
        "includes": [
          "📈 Monthly Strategic Reporting & Insights: Understand growth levers and next steps.",
          "🔐 Advanced Security Monitoring & Updates: Protect your platform at the enterprise level.",
          "⚡ Continuous Performance Optimization: Never miss a lead due to slow speed or bugs.",
          "📊 Custom KPI Dashboards: Real-time metrics that matter most to your business.",
          "📚 Ongoing SEO + Content Gap Analysis: Proactive strategies to stay ahead of competitors.",
          "✍️ Content Support (5 Hours/Month): Keep your platform dynamic, relevant, and converting.",
          "📞 Direct Email & Phone Support: Instant help when it matters most.",
          "🛠️ Post-Launch Platform Evolution: Ongoing enhancements and new feature rollouts."
        ]
      }
    },
    "optionalAddOns": [
      {
        "name": "🤖 AI Chatbot / Agent",
        "description": "Deploy an intelligent lead-generating assistant that works 24/7 to engage, inform, and convert.",
        "price": "Included if selected during onboarding"
      }
    ],
    "buttonText": "Build My Digital Empire",
    "url": "https://buy.stripe.com/00w4gz5G6c90d0a6lxdEs02"
  }
];

// --- NEW Low-Tier Pricing Plans Data ---
const lowTierPricingPlans = [
  {
    name: "Static Spark",
    description: "The ultimate entry-level package, designed to get a professional online presence live as quickly and affordably as possible. It's a digital business card.",
    bestFor: "Freelancers, event promotions, or new businesses needing a simple, professional landing page.",
    features: [
      "Website Design: Single-Page Premium Template Customization",
      "Sections: Up to 4 sections on the single page",
      "Responsive Design: Included",
      "Initial Consultation: Included",
      "Mobile Optimization: Included",
      "Content Integration: Your Provided Text & Images",
      "SEO Optimization: On-Page SEO",
      "Mobile Optimization: Included",
      "Social Media: Basic Links/Icons",
      "Analytics Setup: Google Analytics Setup",
      "Technology Stack: Wordpress, Drupal or Shopify Store Setup",
      "Revisions: 1 Round of Content Swaps (before launch)",
      "Ongoing SEO: Proactive Strategy & Content Gap Analysis",
      "Email & Phone Support",
      "Essential Site Care Plan - $50 per month - features Post Launch Support, Security Updates, and Performance Monitoring",
      "Estimated Timeline: 1-3 days",
    ],
    price: "$250",
    buttonText: "Buy Now",
    highlight: false,
    url: "https://buy.stripe.com/4gM4gy8Yo3mR1z05zNf7i0d",
  },
  {
    name: "Ignition Kit",
    description: "This package is the 'standard' small business website. It expands on the Static Spark by offering separate pages for key information, creating a more complete and traditional user experience.",
    bestFor: "Small businesses, restaurants, or contractors needing a foundational web presence.",
    features: [
      "Website Design: Multi-Page Premium Template Customization",
      "Pages: Up to 3 Pages (e.g., Home, About, Contact)",
      "Responsive Design: Included",
      "Initial Consultation: Included",
      "Mobile Optimization: Included",
      "Content Integration: Your Provided Text & Images",
      "SEO Optimization: On-Page SEO (for all 3 pages)",
      "Mobile Optimization: Included",
      "Social Media: Basic Links/Icons",
      "Analytics Setup: Google Analytics Setup",
      "Features: Contact Form, Social Media Links",
      "Technology Stack: Wordpress, Drupal or Shopify Store Setup",
      "Revisions: Unlimited Rounds of Content & Layout Edits",
      "Ongoing SEO: Proactive Strategy & Content Gap Analysis",
      "Email & Phone Support",
      "Essential Site Care Plan - $50 per month - features Post Launch Support, Security Updates, and Performance Monitoring",
      "Estimated Timeline: 3-7 days",
    ],
    price: "$500",
    buttonText: "Buy Now",
    highlight: true,
    url: "https://buy.stripe.com/eVqbJ0caA8Hb2D4aU7f7i0e",
  },
  {
    name: "Voltage Pack",
    description: "The most comprehensive low-cost package. It offers more pages and features, including a simple blog setup, making it ideal for businesses focused on content marketing without the maintenance overhead of a traditional CMS.",
    bestFor: "Consultants, creatives, or established businesses wanting a larger static site with a blog.",
    features: [
      "Website Design: Multi-Page Template with More Branding",
      "Pages: Up to 5 Pages (e.g., Home, About, Contact)",
      "Responsive Design: Included",
      "Mobile Optimization: Included",
      "Content Integration: Your Provided Text & Images",
      "SEO Optimization: On-Page SEO (for all 3 pages)",
      "Social Media: Basic Links/Icons",
      "SEO Optimization: Enhanced On-Page SEO",
      "Features: Includes Photo Gallery & Static Blog Setup",
      "Analytics Setup: Google Analytics Setup",
      "Technology Stack: Wordpress, Drupal or Shopify Store Setup",
      "Revisions: Unlimited Rounds of Content & Layout Edits",
      "Initial Consultation: Included",
      "Ongoing SEO: Proactive Strategy & Content Gap Analysis",
      "Email & Phone Support",
      "Essential Site Care Plan - $50 per month - features Post Launch Support, Security Updates, and Performance Monitoring",
      "Estimated Timeline: 5-10 days",
    ],
    price: "$650",
    buttonText: "Buy Now",
    highlight: false,
    url: "https://buy.stripe.com/4gM5kC7Uk4qV5PgbYbf7i0f",
  },
];


const App = () => {

  const [geminiAi, setGeminiAi] = useState<GoogleGenAI | null>(null);
  const [isGeminiInitialized, setIsGeminiInitialized] = useState<boolean>(false);

  const [conceptUserPrompt, setConceptUserPrompt] = useState<string>('');
  const [outputFormat] = useState<OutputFormat>('html');
  const [generatedCodeContent, setGeneratedCodeContent] = useState<string>('');
  const [generatedOutputType, setGeneratedOutputType] = useState<OutputFormat | null>(null);
  const [isConceptLoading, setIsConceptLoading] = useState<boolean>(false);
  const [conceptError, setConceptError] = useState<string | null>(null);

  const [currentPolicyPageId, setCurrentPolicyPageId] = useState<string | null>(null);

  // --- NEW STATE FOR PRICING TIER TOGGLE ---
  const [pricingTier, setPricingTier] = useState<'high' | 'low'>('high');

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Use the media query hook to detect if the screen is 'xl' (desktop) or larger.
  // Tailwind's 'xl' breakpoint is typically 1280px.
  const isDesktopView = useMediaQuery('(min-width: 1280px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // Define navigation items



  useEffect(() => {
    if (!GEMINI_API_KEY) {
      const errorMsg = "Gemini API key is not configured. AI features will be unavailable.";
      console.error(errorMsg);
      setConceptError(errorMsg);
      setChatError(errorMsg);
      setIsGeminiInitialized(false);
      return;
    }

    try {
      const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      setGeminiAi(genAI);
      setIsGeminiInitialized(true);
      setConceptError(null);
      setChatError(null);
    } catch (e: unknown) {
      let errorMsg = "An unknown error occurred during Gemini AI initialization.";
      if (e instanceof Error) {
        console.error("Failed to initialize GoogleGenAI:", e.message);
        errorMsg = `Failed to initialize Gemini AI: ${e.message || 'Unknown error'}`;
      } else {
        console.error("Unknown error occurred:", e);
      }
      setConceptError(errorMsg);
      setChatError(errorMsg);
      setIsGeminiInitialized(false);
    }
  }, []);

  useEffect(() => {
    // If the view changes to desktop and the mobile menu is open,
    // automatically close the mobile menu.
    if (isDesktopView && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktopView, isMobileMenuOpen]);


  useEffect(() => {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (!('IntersectionObserver' in window) || currentPolicyPageId) { // Disable on policy pages
      animatedElements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    return () => animatedElements.forEach(el => { if (observer && el) observer.unobserve(el); });
  }, [currentPolicyPageId, pricingTier]); // Re-run if policy page changes

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const cleanGeneratedCode = (responseText: string, format: OutputFormat): string => {
    let codeContent = responseText.trim();
    const fenceRegex = /^(W|S|N){5}$/;
    const match = codeContent.match(fenceRegex);
    if (match && match[2]) {
      codeContent = match[2].trim();
    }
    // For HTML, remove 'html' prefix if AI adds it (sometimes happens despite prompt)
    if (format === 'html' && codeContent.toLowerCase().startsWith('html') && !codeContent.toLowerCase().startsWith('<!doctype html>')) {
      const potentialDoctype = codeContent.substring(0, 15).toLowerCase();
      if (!potentialDoctype.includes('<!doctype')) {
        codeContent = codeContent.substring(4).trim();
      }
    }
    return codeContent;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    if (currentPolicyPageId) {
      handleClosePolicyPage(); // Navigate back to main content first
      // Wait for state to update and main content to render before scrolling
      setTimeout(() => {
        const sectionId = item.toLowerCase().replace(/\.\s*/g, '-').replace(/\s+/g, '-');
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      const sectionId = item.toLowerCase().replace(/\.\s*/g, '-').replace(/\s+/g, '-');
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleToggleChat = () => {
    setIsChatOpen(prev => !prev);
    if (!isChatOpen && chatMessages.length === 0 && geminiAi && isGeminiInitialized) {
      setChatMessages([{ id: Date.now().toString(), text: "Hello! I'm Majestik Magik's AI Assistant. How can I help you today?", sender: 'ai' }]);
    } else if (!geminiAi || !isGeminiInitialized) {
      setChatMessages([{ id: Date.now().toString(), text: "AI Assistant is currently unavailable. Please ensure Gemini API is configured and initialized.", sender: 'ai' }]);
    }
  };

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const handleSendChatMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const messageText = chatInput.trim();
    if (!messageText || !geminiAi || !isGeminiInitialized) return;

    const newUserMessage: ChatMessage = { id: Date.now().toString(), text: messageText, sender: 'user' };
    setChatMessages(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsChatLoading(true);
    setChatError(null);

    try {
      let currentChat = chatSession;
      if (!currentChat) {
        if (!geminiAi) throw new Error("Gemini AI client not available for chat.");
        currentChat = geminiAi.chats.create({
          model: 'gemini-1.5-flash',
          config: {
            systemInstruction: "You are a friendly and helpful AI assistant for Majestik Magik, a company specializing in AI-powered website design and digital systems solutions. Your goal is to answer user questions about Majestik Magik, its services (AI Concept Template Generator, Custom Web Development, SEO, Digital Marketing, Meet the Team, and help them navigate the website. Be concise and informative. We have an AI Concept Website Generator on the website - majestikmagik.com. If asked about the AI Concept Template Generator, politely state that more information can be found by visiting the relevant page. If asked about the pricing, politely state that more information can be found by visiting the relevant page. If a custom website inquiry is needed, politely state that an invoice may be issued for the service provided. If asked about pricing or specific features not detailed, politely state that more information can be found by contacting Majestik Magik directly through the contact options on the website or by visiting the relevant page.",
          },
        });
        setChatSession(currentChat);
      }

      const response: GenerateContentResponse = await currentChat.sendMessage({ message: messageText });
      const aiResponseText = response.text;
      const newAiMessage: ChatMessage = { id: (Date.now() + 1).toString(), text: aiResponseText, sender: 'ai' };
      setChatMessages(prev => [...prev, newAiMessage]);

    } catch (err) {
      console.error('Chat API error:', err);
      setChatError(`Sorry, I couldn't connect to the AI`);
      const errorAiMessage: ChatMessage = { id: (Date.now() + 1).toString(), text: "I'm having a little trouble connecting right now. Please try again in a moment.", sender: 'ai' };
      setChatMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };





  const handleGenerateConceptPreview = async () => {
    if (!isGeminiInitialized) {
      setConceptError('Gemini AI service is not initialized.');
      return;
    }
    if (!conceptUserPrompt.trim()) {
      setConceptError('Please describe your desired concept template.');
      return;
    }

    setIsConceptLoading(true);
    setConceptError(null);
    setGeneratedCodeContent('');
    setGeneratedOutputType(null);

    let systemPrompt = `You are an AI Concept Template Generator. This is a free service.\nThe user wants a conceptual template based on their description.\nKeep all links clickable but not linked to anything using only an <a> tag no href (e.g. <a href=\"#\">Link</a> or for buttons <button type=\"button\">Button</button>). If using <a> tags for button-like behavior, add onclick=\"event.preventDefault();\"\nUse modern, clean design principles.\nDo not use navigation links going back to the Majestik Magik website. Keep the buttons anchor links blank.\nUse placeholder text and images (e.g., using https://placehold.co/ for images, like https://placehold.co/400x300?text=Concept+Placeholder).\nFocus on delivering a clear, simple, and functional concept that the user can quickly understand or adapt.\nSince this is a free concept generator, the output should be less comprehensive than a full website preview. It's more like a \"starter idea\" or a \"block template\".\nFor example, if the user asks for \"a hero section for a startup\", generate only that hero section. If they ask for \"a product card layout\", generate a few example cards in a responsive grid. If \"a simple contact form structure\", generate the HTML form elements with basic styling.\nMake it clean and functional. Use semantic HTML5 tags where appropriate.\nTailor the actual output to the user's specific prompt.\nYour entire response must be ONLY the code block. Do not include any surrounding text, explanations, or markdown fences like \\\`\\\`\\\`language ... \\\`\\\`\\\`. Just the raw code.`

    if (outputFormat === 'html') {
      systemPrompt += `\nGenerate a single, self-contained HTML file that provides a *modern conceptual layout* or a *single key section* as a template.\nThe HTML should include embedded CSS for structure and styling within a <style> tag in the <head>. \nFor clickable elements like buttons or links that should not navigate, use <button type=\"button\">...</button> or <a href=\"#\" onclick=\"event.preventDefault();\">...</a>.\nIf a full page or navigation is implied for mobile, you can include a simple hamburger menu structure (visuals can be basic ASCII or placeholders, actual icon images are not required for the HTML preview logic). Any mobile view/media queries should be within the embedded <style> tag.\nThe output must be ONLY the HTML code, starting with <!DOCTYPE html> and ending with </html>.\nThe body tag should include oncontextmenu=\"event.preventDefault(); return false;\" to prevent inspect element on right click in the iframe.`
    } else if (outputFormat === 'react-tsx') {
      systemPrompt += `\nGenerate a single React functional component using TypeScript (TSX syntax). Name the component 'GeneratedConcept'.\nThe component must be self-contained. All necessary React imports (like useState, useEffect) should be included if used, but DO NOT import 'React' itself like 'import React from \"react\";' as it will be globally available in the preview environment.\nStyles should be embedded using inline JSX style objects (e.g., style={{ color: 'blue' }}) for simplicity.\nIf the concept is more complex and implies multiple elements, structure it within the single 'GeneratedConcept' component.\nFor clickable elements like buttons or links that should not navigate, use <button type=\"button\"></button> or <a href=\"#\" onClick={(e) => e.preventDefault()}></a>.\nThe output must be ONLY the TSX code for the component itself. It should not be wrapped in markdown fences.\nExample structure (do not include the 'import React from \"react\";' line):\n\\\`\\\`\\\`tsx\n// import React, { useState, useEffect } from 'react'; <--- DO NOT INCLUDE THIS LINE\n\n// Define any interfaces or types needed by the component here, if any.\n// interface GeneratedConceptProps { /* ... */ }\n\nconst GeneratedConcept: React.FC<any> = (props) => { // Use 'any' for props if not specified\n  // Component logic and JSX. For example:\n  // const [count, setCount] = React.useState(0);\n  return (\n    <div style={{ padding: '10px', border: '1px solid gray' }}>\n      <h1 style={{ color: 'navy' }}>AI Generated React Concept</h1>\n      <p>This is a preview of a React component.</p>\n      <img src=\"https://placehold.co/100x50?text=React+IMG\" alt=\"Placeholder\" />\n      <button type=\"button\" onClick={() => alert('Button clicked!')}>Click Me</button>\n      <a href=\"#\" onClick={(e) => { e.preventDefault(); alert('Link clicked!'); }}>Example Link</a>\n    </div>\n  );\n};\n\n// Do NOT include 'export default GeneratedConcept;'\n\\\`\\\`\\\`\nEnsure your response is ONLY the TSX code block (the component definition) as shown in the example, without any markdown fences or 'export default'. The component will be named 'GeneratedConcept'.`;
    }

    const userRequestPrompt = `User request: "${conceptUserPrompt}"`;

    try {
      if (!geminiAi) {
        throw new Error("Gemini AI client is not initialized.");
      }
      const fullPrompt = `${systemPrompt}\n\n${userRequestPrompt}`;
      const response: GenerateContentResponse = await geminiAi.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
      });
      if (!response || !response.text) {
        throw new Error("No response from Gemini AI.");
      }
      const cleanedCode = cleanGeneratedCode(response.text, outputFormat);
      setGeneratedCodeContent(cleanedCode);
      setGeneratedOutputType(outputFormat);

    } catch (e: unknown) {
      console.error(`Error generating concept preview with Gemini:`, e);
      setConceptError(`Failed to generate concept preview`);
      setGeneratedCodeContent('');
      setGeneratedOutputType(null);
    } finally {
      setIsConceptLoading(false);
    }
  }



  const handleClosePolicyPage = () => {
    setCurrentPolicyPageId(null);
    window.scrollTo(0, 0);
  };


  // Add the return statement here
  return (
    <>
      <div>

        <main>
          <HeroSection onWatchCommercial={() => setIsVideoModalOpen(true)} onGetStarted={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} />
          <ServicesSection />
          <AIConceptTemplateSection
            conceptUserPrompt={conceptUserPrompt}
            setConceptUserPrompt={setConceptUserPrompt}
            generatedCodeContent={generatedCodeContent}
            generatedOutputType={generatedOutputType}
            isConceptLoading={isConceptLoading}
            conceptError={conceptError}
            handleGenerateConceptPreview={handleGenerateConceptPreview}
            isGeminiInitialized={isGeminiInitialized}
          />
          <PricingSection
            pricingPlans={
              pricingTier === 'high'
                ? pricingPlans.map(plan => ({
                  name: plan.name,
                  description: plan.description,
                  bestFor: plan.bestFor,
                  features: plan.whatYouGet || [],
                  whatYouGet: plan.whatYouGet?.filter(feature => feature !== undefined) || [],
                  benefits: plan.coreBenefits || [],
                  price:
                    plan.investment?.setupFee && plan.investment?.monthlyPlan?.price
                      ? `${plan.investment.setupFee} + ${plan.investment.monthlyPlan.price}`
                      : '',
                  buttonText: plan.buttonText,
                  url: plan.url,
                  highlight: plan.highlight || false,
                  timeline : plan.timeline || '',
                  investment: plan.investment
                    ? {
                      setupFee: plan.investment.setupFee,
                      monthlyPlan: plan.investment.monthlyPlan || {
                        name: '',
                        price: '',
                        includes: [],
                      },
                    }
                    : {
                      setupFee: '',
                      monthlyFee: '',
                      monthlyPlan: {
                        name: '',
                        price: '',
                        includes: [],
                      },
                    },
                  optionalAddOns: plan.optionalAddOns || [],
                }))
                : []
            }
            lowTierPricingPlans={pricingTier === 'low' ? lowTierPricingPlans : []}
            pricingTier={pricingTier}
            setPricingTier={setPricingTier}
            handleNavClick={handleNavClick}
          />


          <LabsSection />
          <TeamSection />
          <TestimonialsSection />
        </main>



        {/* Chatbot is likely a fixed element */}
        <Chatbot
          isChatOpen={isChatOpen}
          handleToggleChat={handleToggleChat} // Correct prop name
          chatMessages={chatMessages}
          chatInput={chatInput}
          handleChatInputChange={handleChatInputChange}
          handleSendChatMessage={handleSendChatMessage}
          isChatLoading={isChatLoading}
          chatError={chatError}
          isGeminiInitialized={isGeminiInitialized}
          chatMessagesEndRef={chatMessagesEndRef as React.RefObject<HTMLDivElement>}

        />
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoSrc="/videos/MajestikMagik-Ad-Website.mp4"
        />
      </div>
    </>
  );
};

export default App;