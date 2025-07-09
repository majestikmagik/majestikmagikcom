"use client";

import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';

// Import custom hook
import useMediaQuery from './hooks/useMediaQuery';

import {
  HeroSection,
  ServicesSection,
  PricingSection,
  TeamSection,
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
    name: "Starter Spark",
    description: "Ideal for launching a basic online presence. Get a simple, responsive website (up to 3 sections) with essential features like a contact form, basic SEO, and analytics to get you started.",
    bestFor: "Simple Landing Pages, Small Businesses",
    features: [
      "Custom Website Design: Up to 3 Sections",
      "Responsive Design: Included",
      "Secure CDN / Cloudflare Integration: Included",
      "AWS / Google Cloud Integration: Included (Instance fees may apply outside of scope)",
      "Content Integration: Basic Text & Images",
      "SEO Optimization: Included On-Page & Technical",
      "Mobile Optimization: Included",
      "Social Media Integration: Basic Icons",
      "Analytics Setup: Basic Google Analytics",
      "CMS Integration: Headless CMS (Sanity.IO, Contentful, etc.)",
      "Technology Framework: React, Next.js, TypeScript",
      "E-commerce Ready: Optional (Simple Setup)",
      "Revisions: 1 Round",
      "AI Chatbot (Optional)",
      "Initial Consultation: Included",
      "Software & Security Updates",
      "24/7 Performance & Uptime Monitoring",
      "Critical Issue Email Support",
      "Site Maintenance: $80.00 per month - features Post Launch Support, Security Updates, and Performance Monitoring",
      "Estimated Timeline: 3-10+ days",

    ],
    price: "$700",
    buttonText: "Buy Now",
    highlight: false,
    url: "https://buy.stripe.com/eVqdR83E41eJdhI4vJf7i01",
  },
  {
    name: "Magik Weaver",
    description: "Perfect for growing businesses needing a more engaging online presence. Includes a modern, responsive website (up to 7 sections), comprehensive API & content integration, enhanced SEO, social media integration, and basic e-commerce capabilities.",
    bestFor: "Growing Businesses, Custom Features",
    features: [
      "Custom Website Design: Modern, Up to 7 Sections",
      "Responsive Design: Included",
      "Secure CDN / Cloudflare Integration: Included",
      "AWS / Google Cloud Integration: Included (Instance fees may apply outside of scope)",
      "Content Integration: Comprehensive Content Integration",
      "SEO Optimization: Enhanced On-Page & Technical",
      "Mobile Optimization: Included",
      "Social Media Integration: Enhanced Integration",
      "Analytics Setup: Advanced Analytics & Tracking",
      "CMS Integration: Headless CMS (Sanity.IO, Contentful, etc.)",
      "Technology Framework: React, Next.js, TypeScript",
      "E-commerce Integration: Shopify or WooCommerce (Up to 10 Products)",
      "Custom Features: Up to 3 Basic Features",
      "Revisions: 3 Rounds",
      "AI Chatbot / Agent (Optional)",
      "Initial Consultation: Included",
      "Monthly Analytics: Basic Summary Report",
      "Ongoing SEO: Keyword Rank Monitoring",
      "Content Support: 2 Hours per month",
      "Email & Phone Support",
      "Site Maintenance: $250.00 per month - features Post Launch Support, Security Updates, and Performance Monitoring",
      "Estimated Timeline: 7-20+ days",
    ],
    price: "$2,200",
    buttonText: "Buy Now",
    highlight: true,
    url: "https://buy.stripe.com/00w5kCeiI6z32D49Q3f7i02",
  },
  {
    name: "Grand Architect",
    description: "For complex projects and businesses requiring a fully customized and scalable online solution. Offers a bespoke, responsive website with unlimited sections, advanced content management options (including Headless CMS), in-depth SEO strategy, full social media integration, and ongoing priority support.",
    bestFor: "Complex Projects, Ongoing Support",
    features: [
      "Custom Website Design: Bespoke, Unlimited Sections",
      "Responsive Design: Included",
      "AWS / Google Cloud Integration: Included (Instance fees may apply outside of scope)",
      "Content Integration: Advanced Content Migration & Setup",
      "SEO Optimization: Advanced SEO Strategy & Implementation",
      "Mobile Optimization: Included",
      "Contact Form: Included",
      "Social Media Integration: Full Platform Integration",
      "Analytics Setup: Custom Reporting & Insights",
      "CMS Integration: Headless CMS (Sanity.IO, Contentful, etc.)",
      "Technology Framework: React, Next.js, TypeScript",
      "E-commerce Integration: Shopify or WooCommerce (Up to 10 Products)",
      "Custom Features: Unlimited & Complex Features",
      "Revisions: Unlimited Small Revisions",
      "AI Chatbot / Agent (Optional)",
      "Initial Consultation: Included",
      "Monthly Analytics: Custom KPI Dashboard & Insights",
      "Ongoing SEO: Proactive Strategy & Content Gap Analysis",
      "Content Support: 5 Hours / month",
      "Email & Phone Support",
      "Site Maintenance: $600.00 per month - features Post Launch Support, Security Updates, and Performance Monitoring",
      "Estimated Timeline: 12-30+ days",
    ],
    price: "$6,000",
    buttonText: "Buy Now",
    highlight: false,
    url: "https://buy.stripe.com/8x2fZg6QgaPj4Lcgerf7i03",
  },
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

    let systemPrompt = `You are an AI Concept Template Generator. This is a free service.
The user wants a conceptual template based on their description.
Keep all links clickable but not linked to anything using only an <a> tag no href (e.g. <a href="#">Link</a> or for buttons <button type="button">Button</button>). If using <a> tags for button-like behavior, add onclick="event.preventDefault();"
Use modern, clean design principles.
Do not use navigation links going back to the Majestik Magik website. Keep the buttons anchor links blank.
Use placeholder text and images (e.g., using https://placehold.co/ for images, like https://placehold.co/400x300?text=Concept+Placeholder).
Focus on delivering a clear, simple, and functional concept that the user can quickly understand or adapt.
Since this is a free concept generator, the output should be less comprehensive than a full website preview. It's more like a "starter idea" or a "block template".
For example, if the user asks for "a hero section for a startup", generate only that hero section. If they ask for "a product card layout", generate a few example cards in a responsive grid. If "a simple contact form structure", generate the HTML form elements with basic styling.
Make it clean and functional. Use semantic HTML5 tags where appropriate.
Tailor the actual output to the user's specific prompt.
Your entire response must be ONLY the code block. Do not include any surrounding text, explanations, or markdown fences like \\\`\\\`\\\`language ... \\\`\\\`\\\`. Just the raw code.`;

    if (outputFormat === 'html') {
      systemPrompt += `
Generate a single, self-contained HTML file that provides a *modern conceptual layout* or a *single key section* as a template.
The HTML should include embedded CSS for structure and styling within a <style> tag in the <head>. 
For clickable elements like buttons or links that should not navigate, use <button type="button">...</button> or <a href="#" onclick="event.preventDefault();">...</a>.
If a full page or navigation is implied for mobile, you can include a simple hamburger menu structure (visuals can be basic ASCII or placeholders, actual icon images are not required for the HTML preview logic). Any mobile view/media queries should be within the embedded <style> tag.
The output must be ONLY the HTML code, starting with <!DOCTYPE html> and ending with </html>.
The body tag should include oncontextmenu="event.preventDefault(); return false;" to prevent inspect element on right click in the iframe.`;
    } else if (outputFormat === 'react-tsx') {
      systemPrompt += `
Generate a single React functional component using TypeScript (TSX syntax). Name the component 'GeneratedConcept'.
The component must be self-contained. All necessary React imports (like useState, useEffect) should be included if used, but DO NOT import 'React' itself like 'import React from "react";' as it will be globally available in the preview environment.
Styles should be embedded using inline JSX style objects (e.g., style={{ color: 'blue' }}) for simplicity.
If the concept is more complex and implies multiple elements, structure it within the single 'GeneratedConcept' component.
For clickable elements like buttons or links that should not navigate, use <button type="button">...</button> or <a href="#" onClick={(e) => e.preventDefault()}>...</a>.
The output must be ONLY the TSX code for the component itself. It should not be wrapped in markdown fences.
Example structure (do not include the 'import React from "react";' line):
\`\`\`tsx
// import React, { useState, useEffect } from 'react'; <--- DO NOT INCLUDE THIS LINE

// Define any interfaces or types needed by the component here, if any.
// interface GeneratedConceptProps { /* ... */ }

const GeneratedConcept: React.FC<any> = (props) => { // Use 'any' for props if not specified
  // Component logic and JSX. For example:
  // const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: '10px', border: '1px solid gray' }}>
      <h1 style={{ color: 'navy' }}>AI Generated React Concept</h1>
      <p>This is a preview of a React component.</p>
      <img src="https://placehold.co/100x50?text=React+IMG" alt="Placeholder" />
      <button type="button" onClick={() => alert('Button clicked!')}>Click Me</button>
      <a href="#" onClick={(e) => { e.preventDefault(); alert('Link clicked!'); }}>Example Link</a>
    </div>
  );
};

// Do NOT include 'export default GeneratedConcept;'
\`\`\`
Ensure your response is ONLY the TSX code block (the component definition) as shown in the example, without any markdown fences or 'export default'. The component will be named 'GeneratedConcept'.`;
    }

    const userRequestPrompt = `User request: "${conceptUserPrompt}"`;

    try {
      if (!geminiAi) {
        throw new Error("Gemini AI client is not initialized.");
      }
      const fullPrompt = `${systemPrompt}\n\n${userRequestPrompt}`;
      const response: GenerateContentResponse = await geminiAi.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
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
    <div>
  

      
        <main>
          <HeroSection onWatchCommercial={() => setIsVideoModalOpen(true)} onGetStarted={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} />

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
          <ServicesSection />
          <PricingSection
            pricingPlans={pricingTier === 'high' ? pricingPlans : lowTierPricingPlans}
            lowTierPricingPlans={lowTierPricingPlans}
            pricingTier={pricingTier}
            setPricingTier={setPricingTier}
            handleNavClick={handleNavClick} // Replace with your actual handleNavClick function
          />
          <TeamSection />
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
        videoSrc="/img/MajestikMagik_commercial_final.webm"
      />
    </div>
  );
};

export default App;