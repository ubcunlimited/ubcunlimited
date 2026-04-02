import PageLayout from "@/components/layout/PageLayout";
export default function CookiePolicy() {
  return (
    <PageLayout>
      <section className="bg-[#080808] py-14"><div className="container"><h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Cookie Policy</h1><p className="text-white/70 mt-2 text-sm">Last updated: January 1, 2025</p></div></section>
      <section className="py-12 bg-white"><div className="container max-w-3xl"><div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>What Are Cookies?</h2><p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>How We Use Cookies</h2><p>We use cookies for analytics (to understand how visitors use our site), functionality (to remember your preferences), and marketing (to show relevant content). We do not use cookies to collect sensitive personal information.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Managing Cookies</h2><p>You can control cookies through your browser settings. Disabling cookies may affect the functionality of our website.</p></div>
        <div><h2 className="text-lg font-bold text-[#080808] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Contact</h2><p>Questions? Email us at info@ubcunlimited.com.</p></div>
      </div></div></section>
    </PageLayout>
  );
}
