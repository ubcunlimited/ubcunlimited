import { Link } from "wouter";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { SITE } from "@/lib/config";

export default function ThankYou() {
  return (
    <PageLayout>
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#169fa8]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-[#169fa8]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#040c1c] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Thank You!
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              We've received your request and a local Utah expert will be in touch within 1 business hour.
            </p>
            <div className="bg-[#f8fafc] rounded-xl p-6 border border-gray-100 mb-8">
              <p className="text-sm text-gray-600 mb-3">In the meantime, feel free to reach us directly:</p>
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 text-[#169fa8] font-bold text-lg hover:text-[#0f6b72] transition-colors">
                <Phone size={18} /> {SITE.phone}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-teal py-2.5 px-6">
                Back to Home <ArrowRight size={16} />
              </Link>
              <Link href="/blog" className="btn-outline-teal py-2.5 px-6">
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
