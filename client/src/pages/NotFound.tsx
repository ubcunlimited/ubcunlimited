import { Link } from "wouter";
import { ArrowRight, Home } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <div className="text-8xl font-extrabold text-[#169fa8]/20 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>404</div>
            <h1 className="text-3xl font-extrabold text-[#040c1c] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Page Not Found
            </h1>
            <p className="text-gray-500 mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-teal py-2.5 px-6">
                <Home size={16} /> Back to Home
              </Link>
              <Link href="/contact" className="btn-outline-teal py-2.5 px-6">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
