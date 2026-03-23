import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#080808'}}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#c9a84c] text-white px-4 py-2 rounded z-[100]">
        Skip to main content
      </a>
      <Header />
      {/* pt-16 = 64px matches mobile nav h-16; lg:pt-[120px] tightened nav-to-hero gap */}
      {/* pb-[76px] on mobile reserves space so footer content isn't hidden behind the sticky call bar */}
      <main id="main-content" className="flex-1 pt-16 lg:pt-[120px] pb-[76px] lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
