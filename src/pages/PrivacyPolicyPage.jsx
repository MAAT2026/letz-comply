import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">1. Data Controller</h2>
            <p className="text-sm leading-relaxed text-foreground">
              LetzComply (company in process of incorporation in Luxembourg). Contact: <a href="mailto:privacy@letz-comply.com" className="text-primary hover:underline">privacy@letz-comply.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">2. Data We Collect</h2>
            <ul className="text-sm leading-relaxed text-foreground space-y-2 list-disc list-inside">
              <li><strong>Account data:</strong> name, email address, company name</li>
              <li><strong>Fund and mandate data:</strong> data you enter into the platform</li>
              <li><strong>Usage data:</strong> login times, features used, session duration</li>
              <li><strong>Technical data:</strong> IP address, browser type, device information</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">3. Legal Basis for Processing (GDPR Art. 6)</h2>
            <ul className="text-sm leading-relaxed text-foreground space-y-2 list-disc list-inside">
              <li><strong>Contract performance:</strong> to provide you with access to the platform</li>
              <li><strong>Legitimate interests:</strong> to ensure security and improve our services</li>
              <li><strong>Legal obligation:</strong> to comply with applicable regulations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">4. How We Use Your Data</h2>
            <ul className="text-sm leading-relaxed text-foreground space-y-2 list-disc list-inside">
              <li>To provide and operate the LetzComply platform</li>
              <li>To send service and account notifications</li>
              <li>To improve platform features and user experience</li>
              <li>To comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">5. Data Retention</h2>
            <p className="text-sm leading-relaxed text-foreground">
              Account data is retained for the duration of your subscription plus 2 years. Fund and mandate data is retained as long as your account is active. You may request deletion at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">6. Your Rights Under GDPR</h2>
            <ul className="text-sm leading-relaxed text-foreground space-y-2 list-disc list-inside">
              <li><strong>Right of access (Art. 15):</strong> request a copy of your data</li>
              <li><strong>Right to rectification (Art. 16):</strong> correct inaccurate data</li>
              <li><strong>Right to erasure (Art. 17):</strong> request deletion of your data</li>
              <li><strong>Right to restrict processing (Art. 18):</strong> limit how we use your data</li>
              <li><strong>Right to data portability (Art. 20):</strong> receive your data in a portable format</li>
              <li><strong>Right to object (Art. 21):</strong> object to certain processing</li>
            </ul>
            <p className="text-sm leading-relaxed text-foreground pt-2">
              To exercise any of these rights, contact <a href="mailto:privacy@letz-comply.com" className="text-primary hover:underline">privacy@letz-comply.com</a>. We will respond within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">7. Data Sharing</h2>
            <p className="text-sm leading-relaxed text-foreground">
              We do not sell your personal data. We may share data with:
            </p>
            <ul className="text-sm leading-relaxed text-foreground space-y-2 list-disc list-inside">
              <li>Infrastructure and hosting providers</li>
              <li>Analytics service providers</li>
              <li>As required by law or regulatory authority</li>
            </ul>
            <p className="text-sm leading-relaxed text-foreground pt-2">
              All third-party processors are bound by data processing agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">8. International Transfers</h2>
            <p className="text-sm leading-relaxed text-foreground">
              Your data is stored and processed within the European Union / European Economic Area.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">9. Cookies</h2>
            <p className="text-sm leading-relaxed text-foreground">
              We use cookies to operate the platform. See our <Link to="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">10. Supervisory Authority</h2>
            <p className="text-sm leading-relaxed text-foreground">
              You have the right to lodge a complaint with the Luxembourg data protection authority: <strong>Commission Nationale pour la Protection des Données (CNPD)</strong>, <a href="https://www.cnpd.lu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnpd.lu</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">11. Contact</h2>
            <p className="text-sm leading-relaxed text-foreground">
              <a href="mailto:privacy@letz-comply.com" className="text-primary hover:underline">privacy@letz-comply.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}