import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function CookiePolicyPage() {
  const cookies = [
    { name: "session_token", purpose: "Authentication and session management", duration: "Session", type: "Strictly Necessary" },
    { name: "user_preferences", purpose: "Remember your display preferences", duration: "1 year", type: "Functional" },
    { name: "_analytics", purpose: "Understand how users navigate the platform", duration: "2 years", type: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. What Are Cookies</h2>
            <p className="text-sm leading-relaxed text-foreground">
              Cookies are small text files placed on your device when you visit our platform. They help us provide a functioning and improved experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Cookies We Use</h2>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Cookie Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((cookie, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                      <td className="px-4 py-3 text-foreground font-medium">{cookie.name}</td>
                      <td className="px-4 py-3 text-foreground">{cookie.purpose}</td>
                      <td className="px-4 py-3 text-foreground">{cookie.duration}</td>
                      <td className="px-4 py-3 text-foreground">{cookie.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Strictly Necessary Cookies</h2>
            <p className="text-sm leading-relaxed text-foreground">
              These cookies are essential for the platform to function and cannot be disabled. They include authentication tokens and security cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Functional Cookies</h2>
            <p className="text-sm leading-relaxed text-foreground">
              These cookies remember your preferences and settings to improve your experience. You can disable them in your browser but some features may not work as intended.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Analytics Cookies</h2>
            <p className="text-sm leading-relaxed text-foreground">
              We use analytics to understand usage patterns and improve the platform. These cookies are optional. You can opt out at any time by adjusting your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Managing Cookies</h2>
            <p className="text-sm leading-relaxed text-foreground">
              You can control cookies through your browser settings. Note that disabling strictly necessary cookies will prevent you from using the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Updates</h2>
            <p className="text-sm leading-relaxed text-foreground">
              This Cookie Policy may be updated periodically. We encourage you to review it regularly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">8. Contact</h2>
            <p className="text-sm leading-relaxed text-foreground">
              <a href="mailto:privacy@letz-comply.com" className="text-primary hover:underline">privacy@letz-comply.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}