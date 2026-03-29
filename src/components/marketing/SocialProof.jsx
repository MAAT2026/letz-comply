import React from "react";

const TESTIMONIALS = [
  {
    quote: "LetzComply saves me 30 minutes every morning. I used to check CSSF and ESMA manually — now it's all in one place.",
    name: "[Name]",
    title: "Compliance Officer",
    org: "[Fund Name]",
  },
  {
    quote: "The AI summaries are genuinely useful — they tell me what I need to do, not just what changed. That's the key difference.",
    name: "[Name]",
    title: "Legal Counsel",
    org: "[ManCo Name]",
  },
  {
    quote: "Finally, LPEA and ALFI updates in the same feed as CSSF circulars. I can't believe this didn't exist before.",
    name: "[Name]",
    title: "Partner",
    org: "[PE Firm]",
  },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-[#003DA5] uppercase tracking-wider mb-3">Social Proof</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by fund professionals across Luxembourg</h2>
          <p className="text-gray-500">Join 50+ professionals monitoring Luxembourg fund regulation</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">"{t.quote}"</p>
              <div>
                <p className="text-sm font-bold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-400">{t.title}, {t.org}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder logos */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">Trusted by teams at</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-28 h-10 bg-gray-200 rounded-lg opacity-40" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}