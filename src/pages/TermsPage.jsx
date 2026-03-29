import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms & Conditions</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. About LetzComply</h2>
            <p className="text-sm leading-relaxed text-foreground">
              LetzComply is a Luxembourg fund compliance platform, currently operated pending formal company incorporation under Luxembourg law. Full entity details will be published upon incorporation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed text-foreground">
              By accessing or using the LetzComply platform, you agree to be bound by these Terms. If you do not agree, do not use the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Platform Access</h2>
            <p className="text-sm leading-relaxed text-foreground">
              LetzComply grants you a limited, non-exclusive, non-transferable right to access the platform for internal compliance and fund onboarding purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. Beta / Early Access</h2>
            <p className="text-sm leading-relaxed text-foreground">
              The platform is currently in early access. Features may change without notice. No service level agreement (SLA) applies during this period. LetzComply does not guarantee uninterrupted availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Acceptable Use</h2>
            <p className="text-sm leading-relaxed text-foreground">
              You may not misuse the platform, attempt to circumvent security measures, scrape data, reverse-engineer the software, or use it for any unlawful purpose. You are responsible for all activity under your account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-foreground">
              All content, software, algorithms, and materials on LetzComply are owned by or licensed to LetzComply. You may not reproduce, distribute, or create derivative works without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Confidentiality</h2>
            <p className="text-sm leading-relaxed text-foreground">
              You agree to keep any non-public information accessed through the platform strictly confidential and not disclose it to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
            <p className="text-sm leading-relaxed text-foreground">
              The platform is provided on an "as is" basis. LetzComply makes no warranties, express or implied, including as to accuracy, completeness, or fitness for a particular purpose. Nothing on this platform constitutes legal or regulatory advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-foreground">
              To the maximum extent permitted by applicable law, LetzComply shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">10. Governing Law</h2>
            <p className="text-sm leading-relaxed text-foreground">
              These Terms are governed by the laws of the Grand Duchy of Luxembourg. Any disputes shall be subject to the exclusive jurisdiction of the courts of Luxembourg City.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">11. Changes to Terms</h2>
            <p className="text-sm leading-relaxed text-foreground">
              We may update these Terms at any time. Continued use of the platform following any changes constitutes your acceptance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">12. Contact</h2>
            <p className="text-sm leading-relaxed text-foreground">
              For questions about these Terms, contact us at <a href="mailto:legal@letz-comply.com" className="text-primary hover:underline">legal@letz-comply.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}