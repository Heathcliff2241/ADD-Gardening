import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { AskRobinChat } from "./components/AskRobinChat";
import { HomeView } from "./views/HomeView";
import { ServicesHubView } from "./views/ServicesHubView";
import { ServiceDetailView } from "./views/ServiceDetailView";
import { AreasView } from "./views/AreasView";
import { PricingView } from "./views/PricingView";
import { AboutView } from "./views/AboutView";
import { ContactView } from "./views/ContactView";
import { AdminView } from "./views/AdminView";
import { PrivacyView } from "./views/PrivacyView";
import { SERVICES } from "./data/siteData";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenChat = (prefill?: string) => {
    if (prefill) {
      setChatPrefill(prefill);
    }
    setIsChatOpen(true);
  };

  // Match routes
  const renderCurrentView = () => {
    // 1. Check if route is a silo service detail page: /services/:slug
    if (currentPath.startsWith("/services/")) {
      const slug = currentPath.replace("/services/", "").replace(/\/$/, "");
      const matchedService = SERVICES.find((s) => s.slug === slug);
      if (matchedService) {
        return (
          <ServiceDetailView
            service={matchedService}
            onNavigate={navigateTo}
            onOpenChat={handleOpenChat}
          />
        );
      }
    }

    // 2. Hub and top-level pages
    switch (currentPath) {
      case "/services":
        return (
          <ServicesHubView
            onNavigate={navigateTo}
            onOpenChat={handleOpenChat}
          />
        );
      case "/areas-we-cover":
        return (
          <AreasView
            onNavigate={navigateTo}
            onOpenChat={handleOpenChat}
          />
        );
      case "/pricing":
        return (
          <PricingView
            onNavigate={navigateTo}
            onOpenChat={handleOpenChat}
          />
        );
      case "/about":
        return (
          <AboutView
            onNavigate={navigateTo}
            onOpenChat={handleOpenChat}
          />
        );
      case "/contact":
        return <ContactView onOpenChat={handleOpenChat} />;
      case "/admin":
        return <AdminView />;
      case "/privacy":
        return <PrivacyView />;
      case "/":
      default:
        return (
          <HomeView
            onNavigate={navigateTo}
            onOpenChat={handleOpenChat}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#1F2A22] selection:bg-[#C9A227]/30 selection:text-[#1F4B34]">
      {/* Sticky header navigation */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenChat={handleOpenChat}
      />

      {/* Main page content view */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer with full NAP and links */}
      <Footer
        onNavigate={navigateTo}
        onOpenChat={handleOpenChat}
      />

      {/* Floating Ask Robin quote assistant docked bottom right on every page */}
      <AskRobinChat
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
        initialMessagePrefill={chatPrefill}
        clearPrefill={() => setChatPrefill(undefined)}
      />
    </div>
  );
}
