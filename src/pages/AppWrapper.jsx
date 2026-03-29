import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import FunctionSelector from "@/components/onboarding/FunctionSelector.jsx";
import ChatBot from "@/components/chat/ChatBot";

export default function AppWrapper() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wizardAnswers, setWizardAnswers] = useState(null); // BUGFIX: Store wizard answers for pre-filling

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await base44.auth.me();
        if (user?.function) {
          setUserProfile({
            entityType: user.entityType || "",
            jobTitle: user.jobTitle || "",
            function: user.function,
            segment: user.segment || "",
            seniority: user.seniority || "",
            xp: user.xp || 0,
            streak: user.streak || 0,
          });
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleOnboarding = async (profile) => {
    setUserProfile(profile);
    await base44.auth.updateMe({
      entityType: profile.entityType,
      jobTitle: profile.jobTitle,
      function: profile.function,
      segment: profile.segment,
      seniority: profile.seniority,
    });
  };

  const handleFunctionChange = async (newFunction) => {
    setUserProfile(prev => ({ ...prev, function: newFunction }));
    await base44.auth.updateMe({ function: newFunction });
  };

  const handleXPChange = (newXP) => {
    setUserProfile(prev => ({ ...prev, xp: newXP }));
  };

  const handleRestartOnboarding = async () => {
    // BUGFIX: Store current profile as wizard answers before clearing
    if (userProfile) {
      setWizardAnswers({
        entityType: userProfile.entityType,
        jobTitle: userProfile.jobTitle,
        function: userProfile.function,
        segment: userProfile.segment,
        seniority: userProfile.seniority,
      });
    }
    setUserProfile(null); // BUGFIX: Reset flag to show onboarding
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-lux-blue/20 border-t-lux-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-lux-red" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-lux-blue" />
        </div>
        {/* BUGFIX: Pass pre-filled answers and clear after use */}
        <FunctionSelector onComplete={(profile) => {
          setWizardAnswers(null); // BUGFIX: Reset answers after completion
          handleOnboarding(profile);
        }} initialAnswers={wizardAnswers} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Outlet context={{ userProfile, onFunctionChange: handleFunctionChange, onXPChange: handleXPChange, onRestartOnboarding: handleRestartOnboarding }} />
      </div>
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <p className="text-xs text-muted-foreground">© 2026 LetzComply. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <Link to="/legal/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/legal/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}

export function useAppContext() {
  return useOutletContext();
}