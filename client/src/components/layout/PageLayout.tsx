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
      <Header />
      {/* pt-14 = 56px matches mobile nav h-14; lg:pt-[144px] = top bar 48px + nav h-24 96px */}
      {/* pb-[76px] on mobile reserves space so footer content isn't hidden behind the sticky call bar */}
      <main id="main-content" aria-label="Main content" className="flex-1 pt-14 lg:pt-[144px] pb-[76px] lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
