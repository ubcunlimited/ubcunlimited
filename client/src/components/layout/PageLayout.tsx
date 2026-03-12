import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#169fa8] text-white px-4 py-2 rounded z-[100]">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-[88px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
