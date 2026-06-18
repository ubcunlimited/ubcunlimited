import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
export default function TermsOfService() {
  return (
    <PageLayout>
      <SEO
        title="Terms of Service"
        description="Review the terms of service governing your use of UBC Unlimited's website and merchant services, including payment processing agreements."
        canonical="/legal/terms-of-service"
        noIndex={true}
      />
      <section className="bg-[#080808] py-14"><div className="container"><h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Terms of Service — UBC Unlimited Merchant Services</h1><p className="text-white/70 mt-2 text-sm">Last updated: January 1, 2025</p></div></section>
      <section className="py-12 bg-white"><div className="container max-w-3xl"><div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>1. Acceptance of Terms</h2><p>By accessing and using the UBC Unlimited website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>2. Use of Website</h2><p>You may use our website for lawful purposes only. You agree not to use the website in any way that violates applicable laws or regulations, or that infringes on the rights of others.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>3. Intellectual Property</h2><p>The content, features, and functionality of this website are owned by UBC Unlimited and are protected by copyright, trademark, and other intellectual property laws.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>4. Disclaimer of Warranties</h2><p>This website is provided on an "as is" basis without warranties of any kind. UBC Unlimited does not warrant that the website will be uninterrupted or error-free.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>5. Contact</h2><p>Questions about these Terms? Contact us at info@ubcunlimited.com.</p></div>
      </div></div></section>
    </PageLayout>
  );
}
