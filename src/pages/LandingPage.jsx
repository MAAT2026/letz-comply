import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavigationBar from "@/components/marketing/NavigationBar";
import HeroSection from "@/components/marketing/HeroSection";
import FeedPreview from "@/components/marketing/FeedPreview";
import AISummaryShowcase from "@/components/marketing/AISummaryShowcase";
import MoreFeaturesSection from "@/components/marketing/MoreFeaturesSection";
import FeatureHighlights from "@/components/marketing/FeatureHighlights";
import PricingSection from "@/components/marketing/PricingSection";
import SoftGateBanner from "@/components/marketing/SoftGateBanner";
import SoftGateModal from "@/components/marketing/SoftGateModal";

export default function LandingPage() {
  const [expandedCount, setExpandedCount] = useState(() => {
    return parseInt(localStorage.getItem("letzcomply_explored_count") || "0", 10);
  });
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);

  const handleItemExpand = () => {
    setExpandedCount(prev => {
      const next = prev + 1;
      localStorage.setItem("letzcomply_explored_count", next);
      if (next >= 3 && !bannerDismissed) setShowBanner(true);
      if (next >= 5 && !modalDismissed) setShowModal(true);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <NavigationBar />

      <main className="pt-1.5">
        <HeroSection />

        <section id="explore" className="py-16 md:py-20 bg-secondary/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Live Feed</span>
              <h2 className="text-3xl font-bold text-foreground mb-3">Live Regulation Feed</h2>
              <p className="text-muted-foreground">Browse real updates from CSSF, ESMA, ALFI, and LPEA. Click any item to explore — no signup needed.</p>
            </div>
            <FeedPreview onItemExpand={handleItemExpand} />
          </div>
        </section>

        <AISummaryShowcase />
        <MoreFeaturesSection />
        <FeatureHighlights />
        <PricingSection />
      </main>

      <footer className="bg-card border-t border-border py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="LetzComply" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <span className="font-bold text-sm text-foreground block">LetzComply</span>
              <span className="text-[10px] text-muted-foreground">Luxembourg Fund Regulations</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 LetzComply. Built for Luxembourg fund professionals.</p>
        </div>
      </footer>

      <AnimatePresence>
        {showBanner && <SoftGateBanner onDismiss={() => { setShowBanner(false); setBannerDismissed(true); }} />}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && <SoftGateModal onDismiss={() => { setShowModal(false); setModalDismissed(true); }} />}
      </AnimatePresence>
    </div>
  );
}