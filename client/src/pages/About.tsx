import { Link } from "wouter";
import { ArrowRight, MapPin, Users, Award, Heart } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import CTABanner from "@/components/sections/CTABanner";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import { SITE } from "@/lib/config";

const CONSULT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396807781/BUvnwzJnwMZHoEGpybj36j/team-consultation_77637e8d.jpg";

const values = [
  { icon: MapPin, title: "Utah First", desc: "We live and work in Utah. We understand the local business landscape and are invested in our community's success." },
  { icon: Users, title: "People Over Profit", desc: "We measure success by how much we save our clients, not by how much we charge them." },
  { icon: Award, title: "Transparent Pricing", desc: "No hidden fees, no confusing rate structures. We show you exactly what you pay and why." },
  { icon: Heart, title: "Long-Term Relationships", desc: "We're not looking for one-time customers. We build lasting partnerships with Utah businesses." },
];

export default function About() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-[#040c1c] py-20">
        <div className="container">
          <div className="max-w-2xl">
            <div className="stat-badge mb-5">About UBC Unlimited</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              Utah's Local Merchant Services Partner
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              UBC Unlimited was founded with a simple mission: help Utah businesses accept payments at lower costs with better technology and real local support. We're not a national call center — we're your neighbors.
            </p>
            <div className="flex gap-4">
              <Link href="/consultation" className="btn-teal">Book a Consultation <ArrowRight size={16} /></Link>
              <a href={SITE.phoneHref} className="btn-outline-white">Call Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="teal-divider mb-5" />
              <h2 className="text-3xl font-bold text-[#040c1c] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  UBC Unlimited was born out of frustration. Our founder, a Utah business owner himself, was tired of being overcharged by national payment processors who couldn't be bothered to explain their fees or pick up the phone.
                </p>
                <p>
                  We built UBC Unlimited to be the merchant services company we always wished existed — one that treats business owners like partners, not account numbers. One that shows you exactly what you're paying and why. One that's actually there when you need help.
                </p>
                <p>
                  Today, we serve hundreds of Utah businesses across every industry — from Salt Lake City restaurants to Provo medical offices to St. George retail shops. Our mission hasn't changed: save you money, give you better tools, and be a partner you can actually count on.
                </p>
              </div>
            </div>
            <div>
              <img
                src={CONSULT_IMG}
                alt="UBC Unlimited team"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container">
          <div className="text-center mb-10">
            <div className="teal-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#040c1c] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Our Values</h2>
            <p className="text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#169fa8]/30 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#169fa8]/10 flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-[#169fa8]" />
                </div>
                <h3 className="font-bold text-[#040c1c] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialBlock />
      <CTABanner title="Ready to Work with a Local Partner?" subtitle="Join hundreds of Utah businesses who trust UBC Unlimited for their payment processing needs." />
    </PageLayout>
  );
}
