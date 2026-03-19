import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useLayoutEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Core pages
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";
import LiveChat from "./components/LiveChat";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Solutions
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";

// Industries
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";

// Blog
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Forms
import Consultation from "./pages/Consultation";
import StatementReview from "./pages/StatementReview";
import ThankYou from "./pages/ThankYou";

// Legal
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Disclaimer from "./pages/legal/Disclaimer";

// FAQ
import FAQPage from "./pages/FAQPage";

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    // Use both methods for maximum browser compatibility
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Core */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />

        {/* Solutions */}
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/credit-card-processing">{() => <SolutionDetail slug="credit-card-processing" />}</Route>
        <Route path="/solutions/ach-echeck-processing">{() => <SolutionDetail slug="ach-echeck-processing" />}</Route>
        <Route path="/solutions/check-guarantee">{() => <SolutionDetail slug="check-guarantee" />}</Route>
        <Route path="/solutions/pos-systems">{() => <SolutionDetail slug="pos-systems" />}</Route>
        <Route path="/solutions/ecommerce-payments">{() => <SolutionDetail slug="ecommerce-payments" />}</Route>
        <Route path="/solutions/mobile-processing">{() => <SolutionDetail slug="mobile-processing" />}</Route>
        <Route path="/solutions/virtual-terminals">{() => <SolutionDetail slug="virtual-terminals" />}</Route>
        <Route path="/solutions/invoicing">{() => <SolutionDetail slug="invoicing" />}</Route>
        <Route path="/solutions/gift-loyalty">{() => <SolutionDetail slug="gift-loyalty" />}</Route>
        <Route path="/solutions/dual-pricing">{() => <SolutionDetail slug="dual-pricing" />}</Route>
        <Route path="/solutions/high-risk-processing">{() => <SolutionDetail slug="high-risk-processing" />}</Route>

        {/* Industries */}
        <Route path="/industries" component={Industries} />
        <Route path="/industries/restaurants">{() => <IndustryDetail slug="restaurants" />}</Route>
        <Route path="/industries/bars-nightclubs">{() => <IndustryDetail slug="bars-nightclubs" />}</Route>
        <Route path="/industries/retail">{() => <IndustryDetail slug="retail" />}</Route>
        <Route path="/industries/medical">{() => <IndustryDetail slug="medical" />}</Route>
        <Route path="/industries/ecommerce">{() => <IndustryDetail slug="ecommerce" />}</Route>
        <Route path="/industries/automotive">{() => <IndustryDetail slug="automotive" />}</Route>
        <Route path="/industries/professional-services">{() => <IndustryDetail slug="professional-services" />}</Route>
        <Route path="/industries/salons-spas">{() => <IndustryDetail slug="salons-spas" />}</Route>
        <Route path="/industries/property-management">{() => <IndustryDetail slug="property-management" />}</Route>
        <Route path="/industries/firearms">{() => <IndustryDetail slug="firearms" />}</Route>
        <Route path="/industries/cbd-hemp">{() => <IndustryDetail slug="cbd-hemp" />}</Route>
        <Route path="/industries/nutraceuticals">{() => <IndustryDetail slug="nutraceuticals" />}</Route>
        <Route path="/industries/non-profit">{() => <IndustryDetail slug="non-profit" />}</Route>
        <Route path="/industries/adult-entertainment">{() => <IndustryDetail slug="adult-entertainment" />}</Route>
        <Route path="/industries/travel">{() => <IndustryDetail slug="travel" />}</Route>
        <Route path="/industries/online-gaming">{() => <IndustryDetail slug="online-gaming" />}</Route>

        {/* Blog */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug">{(params) => <BlogPost slug={params.slug} />}</Route>

        {/* Forms */}
        <Route path="/consultation" component={Consultation} />
        <Route path="/quote" component={Consultation} />
        <Route path="/statement-review" component={StatementReview} />
        <Route path="/thank-you" component={ThankYou} />

        {/* Legal */}
        <Route path="/legal/privacy-policy" component={PrivacyPolicy} />
        <Route path="/legal/terms-of-service" component={TermsOfService} />
        <Route path="/legal/cookie-policy" component={CookiePolicy} />
        <Route path="/legal/disclaimer" component={Disclaimer} />

        {/* Locations */}
        <Route path="/locations" component={Locations} />
        <Route path="/locations/:slug" component={LocationDetail} />

        {/* Company */}
        <Route path="/faq" component={FAQPage} />

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
      <LiveChat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
