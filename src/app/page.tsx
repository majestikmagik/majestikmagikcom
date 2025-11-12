"use client";

import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse, Chat } from '@google/genai';


// Import custom hook
import useMediaQuery from './hooks/useMediaQuery';

import {
  HeroSection,
  PricingSection,
  ShopSection,
  TeamSection,
  TestimonialsSection,
  AIConceptTemplateSection,
  Chatbot,
  VideoModal
} from './components';

import './globals.css';
import ComparisonChart from './components/ComparisonChart';


const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;


interface ChatMessage {
  id: string;
  text: string | undefined;
  sender: 'user' | 'ai';
}

type OutputFormat = 'html' | 'react-tsx';

const pricingPlans = [
  {
    name: "Basic",
    tagline: "Professional web presence without the fuss.",
    description:
      "Launch a clean, mobile-friendly site with hosting handled for you.",
    bestFor:
      "Solo entrepreneurs and small local businesses needing a simple, credible site.",
    coreBenefits: ["Website Hosting", "Mobile-Friendly Design", "1 Update / Month"],
    whatYouGet: ["Website Hosting", "Mobile-Friendly Design", "1 Update / Month"],
    timeline: "5–10 business days from content submission",
    investment: {
      setupFee: "One-time $99 Launch Fee",
      monthlyPlan: {
        name: "Basic Plan",
        price: "$25/mo",
        includes: ["Website Hosting", "Mobile-Friendly Design", "1 Update / Month", "Security Monitoring & Updates", "Monthly Backups", "SEO Optimization", "Priority Support"]
      }
    },
    optionalAddOns: [],
    buttonText: "Get Started",
    url: "https://buy.stripe.com/6oU9ATd8y5KC1hs11ddEs00",
    highlight: false
  },
  {
    name: "Standard",
    tagline: "Most Popular — performance and essentials covered.",
    description:
      "Step up to ongoing enhancements and foundational SEO to help customers find you.",
    bestFor:
      "Growing businesses that want regular updates and basic SEO support.",
    coreBenefits: ["Everything in Basic", "3 Updates / Month", "Basic SEO Optimization"],
    whatYouGet: ["Everything in Basic", "3 Updates / Month", "Basic SEO Optimization", "Speed & Performance Monitoring", "Malware & Hack Protection", "Content Updates (text/images)", "Monthly Performance Report"],
    timeline: "7–15 business days from content submission",
    investment: {
      setupFee: "One-time $99 Launch Fee",
      monthlyPlan: {
        name: "Standard Plan",
        price: "$50/mo",
        includes: ["Everything in Basic", "3 Updates / Month", "Basic SEO Optimization", "Speed & Performance Monitoring", "Malware & Hack Protection", "Content Updates (text/images)", "Monthly Performance Report"]
      }
    },
    optionalAddOns: [],
    buttonText: "Scale My Business",
    url: "https://buy.stripe.com/3cI00j4C24Gy0dobFRdEs01",
    highlight: true
  },
  {
    name: "Premium",
    tagline: "Advanced growth, analytics, and priority support.",
    description:
      "Unlock unlimited updates, advanced SEO, and priority support for serious growth.",
    bestFor:
      "Businesses ready to scale with continuous improvements and deeper insights.",
    coreBenefits: [
      "Everything in Standard",
      "Unlimited Updates",
      "Advanced SEO + Analytics",
      "Priority Support",
      "Conversion Tracking (leads, sales, calls)",
      "Priority 24/7 Support (fastest response)",
      "E-commerce Support (if applicable)",
      "Quarterly Strategy Call (review + improvements)"
    ],
    whatYouGet: [
      "Everything in Standard",
      "Unlimited Updates",
      "Advanced SEO + Analytics",
      "Priority Support",
      "Conversion Tracking (leads, sales, calls)",
      "Priority 24/7 Support (fastest response)",
      "E-commerce Support (if applicable)",
      "Quarterly Strategy Call (review + improvements)"
    ],
    timeline: "10–20 business days from content submission",
    investment: {
      setupFee: "One-time $99 Launch Fee",
      monthlyPlan: {
        name: "Premium Plan",
        price: "$100/mo",
        includes: [
          "Everything in Standard",
          "Unlimited Updates",
          "Advanced SEO + Analytics",
          "Priority Support",
          "Conversion Tracking (leads, sales, calls)",
          "Priority 24/7 Support (fastest response)",
          "E-commerce Support (if applicable)",
          "Quarterly Strategy Call (review + improvements)"
        ]
      }
    },
    optionalAddOns: [],
    buttonText: "Go Premium",
    url: "https://buy.stripe.com/00w4gz5G6c90d0a6lxdEs02",
    highlight: false
  }
];


const App = () => {

  const [geminiAi, setGeminiAi] = useState<GoogleGenAI | null>(null);
  const [isGeminiInitialized, setIsGeminiInitialized] = useState<boolean>(false);

  const [conceptUserPrompt, setConceptUserPrompt] = useState<string>('');
  const [generatedCodeContent, setGeneratedCodeContent] = useState<string>('');
  const [generatedOutputType, setGeneratedOutputType] = useState<OutputFormat | null>(null);
  const [isConceptLoading, setIsConceptLoading] = useState<boolean>(false);
  const [conceptError, setConceptError] = useState<string | null>(null);

  const [currentPolicyPageId, setCurrentPolicyPageId] = useState<string | null>(null);

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
  }, [currentPolicyPageId]); // Re-run if policy page changes

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

  const handleClosePolicyPage = () => {
    setCurrentPolicyPageId(null);
    window.scrollTo(0, 0);
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

    // Content safety guardrail: Check for requests involving children's images
    const lowerPrompt = conceptUserPrompt.toLowerCase();

    const childRegex = /\b(child(ren)?|kid(s)?|toddler(s)?|baby|babies|infant(s)?)\b/i;
    if (childRegex.test(lowerPrompt) && (lowerPrompt.includes('image') || lowerPrompt.includes('picture'))) {
      setConceptError('⚠️ Safety Policy: We cannot generate or display images of minors. Please use an adult placeholder.');
      return;
    }

    const childrenImageKeywords = [
      'child', 'children', 'kid', 'kids', 'toddler', 'baby', 'babies', 'infant', 'infants',
      'young child', 'little boy', 'little girl', 'boy picture', 'girl picture',
      'profile picture of child', 'profile pic of kid', 'child avatar', 'kids avatar',
      'profile image child', 'profile image kid', 'generate child image', 'generate kid image'
    ];

    const hasChildrenImageRequest = childrenImageKeywords.some(keyword => lowerPrompt.includes(keyword));

    if (hasChildrenImageRequest && (lowerPrompt.includes('image') || lowerPrompt.includes('picture') || lowerPrompt.includes('profile') || lowerPrompt.includes('avatar') || lowerPrompt.includes('photo') || lowerPrompt.includes('generate'))) {
      setConceptError('⚠️ Safety Policy: We cannot generate images of children. Please request profile pictures with adult subjects, abstract patterns, initials, or icons instead.');
      return;
    }

    setIsConceptLoading(true);
    setConceptError(null);
    setGeneratedCodeContent('');
    setGeneratedOutputType(null);

    const systemPrompt = `You are an Expert Full-Stack Application Generator. Generate production-ready, full-featured applications using React/Next.js with TypeScript.\n\nCore Principles:\n1. ARCHITECTURE: Use modern, scalable patterns (component composition, custom hooks, context for state management)\n2. BEST PRACTICES: Implement proper error handling, loading states, accessibility (ARIA labels, semantic HTML)\n3. STYLING: Use Tailwind CSS with a professional color scheme (dark/light theme support)\n4. PERFORMANCE: Optimize with proper memoization, lazy loading, and efficient state management\n5. RESPONSIVENESS: Mobile-first design that works on all devices\n6. TYPE SAFETY: Full TypeScript with proper interfaces and type definitions\n7. USER EXPERIENCE: Smooth animations, transitions, intuitive interactions\n8. CODE QUALITY: Clean, well-organized, commented where necessary\n\n⚠️ CRITICAL CONTENT SAFETY GUIDELINES:\n- NEVER generate, reference, or include images, illustrations, or visual representations of children (minors under 18)\n- NEVER create profile picture generators that could generate children's images\n- NEVER include UI that would display or generate images of minors\n- If user asks for profile pictures, user avatars, or images in profile sections, use:\n  * Abstract geometric patterns\n  * Adult-focused stock photo placeholders\n  * Initials/monograms\n  * Icons or symbols\n  * Generic adult silhouettes only\n- If the concept involves images, explicitly exclude any possibility of generating or displaying children\n\nDeliverables Structure:\n- Custom hooks for reusable logic\n- Utility functions for common operations\n- Proper component composition and separation\n- Complete styling with Tailwind CSS\n- Form validation and error handling\n- Loading and empty states\n- Accessibility compliance\n- Mobile and desktop responsiveness\n\nGenerate a complete, functional application that demonstrates expert-level development practices. The output should be a fully working React/TSX component that can be directly integrated into a Next.js application.\n\nYour entire response must be ONLY the code. Do not include markdown fences, explanations, or surrounding text.`

    // Always generate HTML for preview display
    const previewSystemPrompt = systemPrompt + `\nGenerate a single, self-contained HTML file that provides a modern conceptual layout or a single key section as a template.\nThe HTML should include embedded CSS for structure and styling within a <style> tag in the <head>. \nFor clickable elements like buttons or links that should not navigate, use <button type=\"button\">...</button> or <a href=\"#\" onclick=\"event.preventDefault();\">...</a>.\nIf a full page or navigation is implied for mobile, you can include a simple hamburger menu structure (visuals can be basic ASCII or placeholders, actual icon images are not required for the HTML preview logic). Any mobile view/media queries should be within the embedded <style> tag.\nThe output must be ONLY the HTML code, starting with <!DOCTYPE html> and ending with </html>.\nThe body tag should include oncontextmenu=\"event.preventDefault(); return false;\" to prevent inspect element on right click in the iframe.`

    const userRequestPrompt = `User request: "${conceptUserPrompt}"`;

    try {
      if (!geminiAi) {
        throw new Error("Gemini AI client is not initialized.");
      }
      const fullPrompt = `${previewSystemPrompt}\n\n${userRequestPrompt}`;
      const response: GenerateContentResponse = await geminiAi.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
      });
      if (!response || !response.text) {
        throw new Error("No response from Gemini AI.");
      }
      const cleanedCode = cleanGeneratedCode(response.text, 'html');
      setGeneratedCodeContent(cleanedCode);
      setGeneratedOutputType('html');

    } catch (e: unknown) {
      console.error(`Error generating concept preview with Gemini:`, e);
      setConceptError(`Failed to generate concept preview`);
      setGeneratedCodeContent('');
      setGeneratedOutputType(null);
    } finally {
      setIsConceptLoading(false);
    }
  }

  // Add the return statement here
  return (
    <>
      <div>

        <main>
          <HeroSection
            onWatchCommercial={() => setIsVideoModalOpen(true)}
            onGetStarted={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            conceptUserPrompt={conceptUserPrompt}
            setConceptUserPrompt={setConceptUserPrompt}
            handleGenerateConceptPreview={handleGenerateConceptPreview}
            isConceptLoading={isConceptLoading}
            isGeminiInitialized={isGeminiInitialized}
            conceptError={conceptError}
            generatedCodeContent={generatedCodeContent}
            generatedOutputType={generatedOutputType}
          />
          <AIConceptTemplateSection />
          <ComparisonChart />
          <PricingSection
            pricingPlans={pricingPlans.map(plan => ({
              name: plan.name,
              tagline: plan.tagline,
              description: plan.description,
              bestFor: plan.bestFor,
              features: [], // This property is not used in the component but is in the interface.
              whatYouGet: plan.whatYouGet || [],
              coreBenefits: plan.coreBenefits || [],
              price:
                plan.investment?.setupFee && plan.investment?.monthlyPlan?.price
                  ? `${plan.investment.setupFee} + ${plan.investment.monthlyPlan.price}`
                  : '',
              buttonText: plan.buttonText,
              url: plan.url,
              highlight: plan.highlight || false,
              timeline: plan.timeline || '',
              investment: plan.investment,
              optionalAddOns: plan.optionalAddOns || [],
            }))}
            handleNavClick={handleNavClick}
          />

          <ShopSection />
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