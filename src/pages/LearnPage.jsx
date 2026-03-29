import React from "react";
import Learn from "./Learn";
import XPBar from "@/components/shared/XPBar";
import { useAppContext } from "./AppWrapper";

export default function LearnPage() {
  const { userProfile, onXPChange } = useAppContext();
  return (
    <div>
      <XPBar xp={userProfile?.xp || 0} streak={userProfile?.streak || 0} readCount={userProfile?.readCount || 0} />
      <div className="mt-4">
        <Learn userProfile={userProfile} onXPChange={onXPChange} />
      </div>
    </div>
  );
}