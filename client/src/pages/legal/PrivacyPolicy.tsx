import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <SEO
        title="Privacy Policy | UBC Unlimited"
        description="Read UBC Unlimited's privacy policy to understand how we collect, use, and protect your personal information when you use our merchant services."
        canonical="/legal/privacy-policy"
        noIndex={true}
      />
      <section className="bg-[#080808] py-14">
        <div className="container">
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Privacy Policy</h1>
          <p className="text-white/70 mt-2 text-sm">Last updated: January 1, 2025</p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <div className="prose-legal space-y-6 text-gray-600 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>1. Information We Collect</h2>
              <p>UBC Unlimited collects information you provide directly to us, such as when you fill out a contact form, request a quote, or book a consultation. This may include your name, email address, phone number, business name, and payment processing information.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services; communicate with you about our services; send you marketing communications (with your consent); and comply with legal obligations.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>3. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>5. Cookies</h2>
              <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>6. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at info@ubcunlimited.com.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
