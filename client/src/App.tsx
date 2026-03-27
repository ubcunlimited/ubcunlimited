import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense, useLayoutEffect, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { installPhoneClickTracker } from "@/lib/pixel";

// ── Eagerly loaded (critical path) ──────────────────────────────────────────
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";
import FloatingLauncher from "./components/FloatingLauncher";

// ── Lazy-loaded pages (split into separate chunks) ───────────────────────────
// Core
const About = lazy(() => import("./pages/About"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));

// Solutions
const Solutions = lazy(() => import("./pages/Solutions"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));

// Industries
const Industries = lazy(() => import("./pages/Industries"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));

// Blog
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NewsUpdates = lazy(() => import("./pages/NewsUpdates"));

// Agent portal
const AgentISO = lazy(() => import("./pages/AgentISO"));
const AgentLogin = lazy(() => import("./pages/AgentLogin"));
const AgentAuthGate = lazy(() => import("./components/AgentAuthGate"));

// Forms
const Consultation = lazy(() => import("./pages/Consultation"));
const StatementReview = lazy(() => import("./pages/StatementReview"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

// Legal
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const AccessibilityStatement = lazy(() => import("./pages/legal/AccessibilityStatement"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer"));

// FAQ
const FAQPage = lazy(() => import("./pages/FAQPage"));

// Admin
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));

// POC
const RestaurantsPOC = lazy(() => import("./pages/RestaurantsPOC"));

// POS Configurator
const BuildAPOS = lazy(() => import("./pages/BuildAPOS"));

// Locations
const Locations = lazy(() => import("./pages/Locations"));
const LocationDetail = lazy(() => import("./pages/LocationDetail"));
const SaltLakeCity = lazy(() => import("./pages/locations/SaltLakeCity"));
const Provo = lazy(() => import("./pages/locations/Provo"));
const Orem = lazy(() => import("./pages/locations/Orem"));
const Lehi = lazy(() => import("./pages/locations/Lehi"));
const AmericanFork = lazy(() => import("./pages/locations/AmericanFork"));
const Draper = lazy(() => import("./pages/locations/Draper"));
const SouthJordan = lazy(() => import("./pages/locations/SouthJordan"));
const WestJordan = lazy(() => import("./pages/locations/WestJordan"));
const Sandy = lazy(() => import("./pages/locations/Sandy"));
const Murray = lazy(() => import("./pages/locations/Murray"));
const Layton = lazy(() => import("./pages/locations/Layton"));
const Bountiful = lazy(() => import("./pages/locations/Bountiful"));
const Ogden = lazy(() => import("./pages/locations/Ogden"));
const Springville = lazy(() => import("./pages/locations/Springville"));
const SpanishFork = lazy(() => import("./pages/locations/SpanishFork"));
const ParkCity = lazy(() => import("./pages/locations/ParkCity"));
const HeberCity = lazy(() => import("./pages/locations/HeberCity"));

// Counties
const SaltLakeCounty = lazy(() => import("./pages/locations/counties/SaltLakeCounty"));
const UtahCounty = lazy(() => import("./pages/locations/counties/UtahCounty"));
const DavisCounty = lazy(() => import("./pages/locations/counties/DavisCounty"));
const WeberCounty = lazy(() => import("./pages/locations/counties/WeberCounty"));
const WashingtonCounty = lazy(() => import("./pages/locations/counties/WashingtonCounty"));
const CacheCounty = lazy(() => import("./pages/locations/counties/CacheCounty"));
const SummitCounty = lazy(() => import("./pages/locations/counties/SummitCounty"));
const TooeleCounty = lazy(() => import("./pages/locations/counties/TooeleCounty"));
const BoxElderCounty = lazy(() => import("./pages/locations/counties/BoxElderCounty"));
const IronCounty = lazy(() => import("./pages/locations/counties/IronCounty"));
const SanpeteCounty = lazy(() => import("./pages/locations/counties/SanpeteCounty"));
const SevierCounty = lazy(() => import("./pages/locations/counties/SevierCounty"));
const CarbonCounty = lazy(() => import("./pages/locations/counties/CarbonCounty"));
const EmeryCounty = lazy(() => import("./pages/locations/counties/EmeryCounty"));
const GrandCounty = lazy(() => import("./pages/locations/counties/GrandCounty"));
const SanJuanCounty = lazy(() => import("./pages/locations/counties/SanJuanCounty"));
const KaneCounty = lazy(() => import("./pages/locations/counties/KaneCounty"));
const GarfieldCounty = lazy(() => import("./pages/locations/counties/GarfieldCounty"));
const BeaverCounty = lazy(() => import("./pages/locations/counties/BeaverCounty"));
const MillardCounty = lazy(() => import("./pages/locations/counties/MillardCounty"));
const JuabCounty = lazy(() => import("./pages/locations/counties/JuabCounty"));
const PiuteCounty = lazy(() => import("./pages/locations/counties/PiuteCounty"));
const WayneCounty = lazy(() => import("./pages/locations/counties/WayneCounty"));
const RichCounty = lazy(() => import("./pages/locations/counties/RichCounty"));
const MorganCounty = lazy(() => import("./pages/locations/counties/MorganCounty"));
const WasatchCounty = lazy(() => import("./pages/locations/counties/WasatchCounty"));
const DuchesneCounty = lazy(() => import("./pages/locations/counties/DuchesneCounty"));
const UintahCounty = lazy(() => import("./pages/locations/counties/UintahCounty"));
const DaggettCounty = lazy(() => import("./pages/locations/counties/DaggettCounty"));

// Counties & Cities index + detail
const Counties = lazy(() => import("./pages/Counties"));
const CountyDetail = lazy(() => import("./pages/CountyDetail"));
const Cities = lazy(() => import("./pages/Cities"));
const CityDetail = lazy(() => import("./pages/CityDetail"));

// ── Minimal page-level loading fallback ─────────────────────────────────────
function PageFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#080808]"
      aria-label="Loading page"
    >
      <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
    </div>
  );
}

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Switch>
          {/* Core — Home is eagerly loaded */}
          <Route path="/" component={Home} />
          <Route path="/about">{() => <About />}</Route>
          <Route path="/testimonials">{() => <Testimonials />}</Route>
          <Route path="/contact">{() => <Contact />}</Route>

          {/* Solutions */}
          <Route path="/solutions">{() => <Solutions />}</Route>
          <Route path="/solutions/credit-card-processing">{() => <SolutionDetail slug="credit-card-processing" />}</Route>
          <Route path="/solutions/ach-echeck-processing">{() => <SolutionDetail slug="ach-echeck-processing" />}</Route>
          <Route path="/solutions/check-guarantee">{() => <SolutionDetail slug="check-guarantee" />}</Route>
          <Route path="/solutions/pos-systems">{() => <SolutionDetail slug="pos-systems" />}</Route>
          <Route path="/solutions/ecommerce-payments">{() => <SolutionDetail slug="ecommerce-payments" />}</Route>
          <Route path="/solutions/mobile-processing">{() => <SolutionDetail slug="mobile-processing" />}</Route>
          <Route path="/solutions/virtual-terminals">{() => <SolutionDetail slug="virtual-terminals" />}</Route>
          <Route path="/solutions/invoicing">{() => <SolutionDetail slug="invoicing" />}</Route>
          <Route path="/solutions/gift-loyalty">{() => <SolutionDetail slug="gift-loyalty" />}</Route>
          <Route path="/solutions/surcharge-cash-discount">{() => <SolutionDetail slug="surcharge-cash-discount" />}</Route>
          <Route path="/solutions/high-risk-processing">{() => <SolutionDetail slug="high-risk-processing" />}</Route>

          {/* POS Configurator */}
          <Route path="/build-a-pos">{() => <BuildAPOS />}</Route>

          {/* POC */}
          <Route path="/poc/restaurants">{() => <RestaurantsPOC />}</Route>

          {/* Industries */}
          <Route path="/industries">{() => <Industries />}</Route>
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
          <Route path="/industries/telemarketing">{() => <IndustryDetail slug="telemarketing" />}</Route>
          <Route path="/industries/credit-repair">{() => <IndustryDetail slug="credit-repair" />}</Route>
          <Route path="/industries/subscription-continuity">{() => <IndustryDetail slug="subscription-continuity" />}</Route>
          <Route path="/industries/vape-ecig">{() => <IndustryDetail slug="vape-ecig" />}</Route>
          <Route path="/industries/online-pharmacy">{() => <IndustryDetail slug="online-pharmacy" />}</Route>
          <Route path="/industries/cryptocurrency">{() => <IndustryDetail slug="cryptocurrency" />}</Route>

          {/* Blog */}
          <Route path="/blog">{() => <Blog />}</Route>
          <Route path="/news">{() => <NewsUpdates />}</Route>
          <Route path="/agent-login">{() => <AgentLogin />}</Route>
          <Route path="/agent-iso">{() => <AgentAuthGate><AgentISO /></AgentAuthGate>}</Route>
          <Route path="/blog/:slug">{(params) => <BlogPost slug={params.slug} />}</Route>

          {/* Forms */}
          <Route path="/consultation">{() => <Consultation />}</Route>
          <Route path="/quote">{() => <Consultation />}</Route>
          <Route path="/statement-review">{() => <StatementReview />}</Route>
          <Route path="/thank-you">{() => <ThankYou />}</Route>

          {/* Legal */}
          <Route path="/legal/privacy-policy">{() => <PrivacyPolicy />}</Route>
          <Route path="/legal/terms-of-service">{() => <TermsOfService />}</Route>
          <Route path="/legal/cookie-policy">{() => <CookiePolicy />}</Route>
          <Route path="/legal/disclaimer">{() => <Disclaimer />}</Route>
          <Route path="/accessibility">{() => <AccessibilityStatement />}</Route>
          {/* Alias routes — footer links use short paths */}
          <Route path="/privacy-policy">{() => <PrivacyPolicy />}</Route>
          <Route path="/terms-of-service">{() => <TermsOfService />}</Route>
          <Route path="/cookie-policy">{() => <CookiePolicy />}</Route>
          <Route path="/disclaimer">{() => <Disclaimer />}</Route>

          {/* Locations */}
          <Route path="/locations">{() => <Locations />}</Route>
          <Route path="/locations/salt-lake-city">{() => <SaltLakeCity />}</Route>
          <Route path="/locations/provo">{() => <Provo />}</Route>
          <Route path="/locations/orem">{() => <Orem />}</Route>
          <Route path="/locations/lehi">{() => <Lehi />}</Route>
          <Route path="/locations/american-fork">{() => <AmericanFork />}</Route>
          <Route path="/locations/draper">{() => <Draper />}</Route>
          <Route path="/locations/south-jordan">{() => <SouthJordan />}</Route>
          <Route path="/locations/west-jordan">{() => <WestJordan />}</Route>
          <Route path="/locations/sandy">{() => <Sandy />}</Route>
          <Route path="/locations/murray">{() => <Murray />}</Route>
          <Route path="/locations/layton">{() => <Layton />}</Route>
          <Route path="/locations/bountiful">{() => <Bountiful />}</Route>
          <Route path="/locations/ogden">{() => <Ogden />}</Route>
          <Route path="/locations/springville">{() => <Springville />}</Route>
          <Route path="/locations/spanish-fork">{() => <SpanishFork />}</Route>
          <Route path="/locations/park-city">{() => <ParkCity />}</Route>
          <Route path="/locations/heber-city">{() => <HeberCity />}</Route>
          <Route path="/locations/salt-lake-county">{() => <SaltLakeCounty />}</Route>
          <Route path="/locations/utah-county">{() => <UtahCounty />}</Route>
          <Route path="/locations/davis-county">{() => <DavisCounty />}</Route>
          <Route path="/locations/weber-county">{() => <WeberCounty />}</Route>
          <Route path="/locations/washington-county">{() => <WashingtonCounty />}</Route>
          <Route path="/locations/cache-county">{() => <CacheCounty />}</Route>
          <Route path="/locations/summit-county">{() => <SummitCounty />}</Route>
          <Route path="/locations/tooele-county">{() => <TooeleCounty />}</Route>
          <Route path="/locations/box-elder-county">{() => <BoxElderCounty />}</Route>
          <Route path="/locations/iron-county">{() => <IronCounty />}</Route>
          <Route path="/locations/sanpete-county">{() => <SanpeteCounty />}</Route>
          <Route path="/locations/sevier-county">{() => <SevierCounty />}</Route>
          <Route path="/locations/carbon-county">{() => <CarbonCounty />}</Route>
          <Route path="/locations/emery-county">{() => <EmeryCounty />}</Route>
          <Route path="/locations/grand-county">{() => <GrandCounty />}</Route>
          <Route path="/locations/san-juan-county">{() => <SanJuanCounty />}</Route>
          <Route path="/locations/kane-county">{() => <KaneCounty />}</Route>
          <Route path="/locations/garfield-county">{() => <GarfieldCounty />}</Route>
          <Route path="/locations/beaver-county">{() => <BeaverCounty />}</Route>
          <Route path="/locations/millard-county">{() => <MillardCounty />}</Route>
          <Route path="/locations/juab-county">{() => <JuabCounty />}</Route>
          <Route path="/locations/piute-county">{() => <PiuteCounty />}</Route>
          <Route path="/locations/wayne-county">{() => <WayneCounty />}</Route>
          <Route path="/locations/rich-county">{() => <RichCounty />}</Route>
          <Route path="/locations/morgan-county">{() => <MorganCounty />}</Route>
          <Route path="/locations/wasatch-county">{() => <WasatchCounty />}</Route>
          <Route path="/locations/duchesne-county">{() => <DuchesneCounty />}</Route>
          <Route path="/locations/uintah-county">{() => <UintahCounty />}</Route>
          <Route path="/locations/daggett-county">{() => <DaggettCounty />}</Route>
          <Route path="/locations/:slug">{() => <LocationDetail />}</Route>

          {/* Counties */}
          <Route path="/counties">{() => <Counties />}</Route>
          <Route path="/counties/:slug">{() => <CountyDetail />}</Route>

          {/* Cities */}
          <Route path="/cities">{() => <Cities />}</Route>
          <Route path="/cities/:slug">{() => <CityDetail />}</Route>

          {/* Admin */}
          <Route path="/admin/testimonials">{() => <AdminTestimonials />}</Route>

          {/* Company */}
          <Route path="/faq">{() => <FAQPage />}</Route>

          {/* 404 */}
          <Route path="/404">{() => { const NotFound = lazy(() => import("./pages/NotFound")); return <NotFound />; }}</Route>
          <Route>{() => { const NotFound = lazy(() => import("./pages/NotFound")); return <NotFound />; }}</Route>
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  useEffect(() => {
    installPhoneClickTracker();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
          <FloatingLauncher />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
