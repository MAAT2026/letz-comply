import React from "react";
import FeedPreviewCard from "./FeedPreviewCard";
import { SAMPLE_FEED_ITEMS } from "@/lib/sampleFeedData";

export default function FeedPreview({ onItemExpand }) {
  return (
    <div className="space-y-3">
      {SAMPLE_FEED_ITEMS.map(item => (
        <FeedPreviewCard key={item.id} item={item} onExpand={onItemExpand} />
      ))}
    </div>
  );
}