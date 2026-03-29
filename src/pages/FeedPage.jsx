import React from "react";
import Feed from "./Feed";
import { useAppContext } from "./AppWrapper";

export default function FeedPage() {
  const { userProfile, onFunctionChange } = useAppContext();
  return (
    <div>
      <div className="mb-4">
        <p className="text-xs text-gray-400">Feed content is AI-generated from public regulatory sources. For informational purposes only — not legal or regulatory advice.</p>
      </div>
      <Feed userProfile={userProfile} onFunctionChange={onFunctionChange} />
    </div>
  );
}