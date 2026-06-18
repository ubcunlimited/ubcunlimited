import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
export default function Disclaimer() {
  return (
    <PageLayout>
      <SEO
        title="Disclaimer | UBC Unlimited"
        description="Read UBC Unlimited's disclaimer regarding the accuracy of information on our site, liability limitations, and third-party links."
        canonical="/legal/disclaimer"
        noIndex={true}
      />
      <section className="bg-[#080808] py-14"><div className="container"><h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Disclaimer — Limitations of Liability & Information Accuracy</h1><p className="text-white/70 mt-2 text-sm">Last updated: January 1, 2025</p></div></section>
      <section className="py-12 bg-white"><div className="container max-w-3xl"><div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>General Information</h2><p>The information provided on the UBC Unlimited website is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>No Professional Advice</h2><p>The content on this website does not constitute professional financial, legal, or business advice. You should consult with a qualified professional before making any business decisions.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Savings Estimates</h2><p>Any savings estimates or examples provided on this website are illustrative only. Actual savings will vary based on your business type, transaction volume, card mix, and current processing rates.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>External Links</h2><p>Our website may contain links to external websites. We have no control over the content of those sites and accept no responsibility for them.</p></div>
      </div></div></section>
    </PageLayout>
  );
}
