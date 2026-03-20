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
import BackToTop from "./components/BackToTop";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import SaltLakeCity from "./pages/locations/SaltLakeCity";
import Provo from "@/pages/locations/Provo";
import Orem from "@/pages/locations/Orem";
import Lehi from "@/pages/locations/Lehi";
import AmericanFork from "@/pages/locations/AmericanFork";
import Draper from "@/pages/locations/Draper";
import SouthJordan from "@/pages/locations/SouthJordan";
import WestJordan from "@/pages/locations/WestJordan";
import Sandy from "@/pages/locations/Sandy";
import Murray from "@/pages/locations/Murray";
import Layton from "@/pages/locations/Layton";
import Bountiful from "@/pages/locations/Bountiful";
import Ogden from "@/pages/locations/Ogden";
import Springville from "@/pages/locations/Springville";
import SpanishFork from "@/pages/locations/SpanishFork";
import ParkCity from "@/pages/locations/ParkCity";
import HeberCity from "@/pages/locations/HeberCity";
import SaltLakeCounty from "@/pages/locations/counties/SaltLakeCounty";
import UtahCounty from "@/pages/locations/counties/UtahCounty";
import DavisCounty from "@/pages/locations/counties/DavisCounty";
import WeberCounty from "@/pages/locations/counties/WeberCounty";
import WashingtonCounty from "@/pages/locations/counties/WashingtonCounty";
import CacheCounty from "@/pages/locations/counties/CacheCounty";
import SummitCounty from "@/pages/locations/counties/SummitCounty";
import TooeleCounty from "@/pages/locations/counties/TooeleCounty";
import BoxElderCounty from "@/pages/locations/counties/BoxElderCounty";
import IronCounty from "@/pages/locations/counties/IronCounty";
import SanpeteCounty from "@/pages/locations/counties/SanpeteCounty";
import SevierCounty from "@/pages/locations/counties/SevierCounty";
import CarbonCounty from "@/pages/locations/counties/CarbonCounty";
import EmeryCounty from "@/pages/locations/counties/EmeryCounty";
import GrandCounty from "@/pages/locations/counties/GrandCounty";
import SanJuanCounty from "@/pages/locations/counties/SanJuanCounty";
import KaneCounty from "@/pages/locations/counties/KaneCounty";
import GarfieldCounty from "@/pages/locations/counties/GarfieldCounty";
import BeaverCounty from "@/pages/locations/counties/BeaverCounty";
import MillardCounty from "@/pages/locations/counties/MillardCounty";
import JuabCounty from "@/pages/locations/counties/JuabCounty";
import PiuteCounty from "@/pages/locations/counties/PiuteCounty";
import WayneCounty from "@/pages/locations/counties/WayneCounty";
import RichCounty from "@/pages/locations/counties/RichCounty";
import MorganCounty from "@/pages/locations/counties/MorganCounty";
import WasatchCounty from "@/pages/locations/counties/WasatchCounty";
import DuchesneCounty from "@/pages/locations/counties/DuchesneCounty";
import UintahCounty from "@/pages/locations/counties/UintahCounty";
import DaggettCounty from "@/pages/locations/counties/DaggettCounty";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";

// Solutions
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";

// Industries
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";

// Blog
import Blog from "./pages/Blog";
import NewsUpdates from "./pages/NewsUpdates";
import AgentISO from "./pages/AgentISO";
import BlogPost from "./pages/BlogPost";

// Forms
import Consultation from "./pages/Consultation";
import StatementReview from "./pages/StatementReview";
import ThankYou from "./pages/ThankYou";

// Legal
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import AccessibilityStatement from "./pages/legal/AccessibilityStatement";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Disclaimer from "./pages/legal/Disclaimer";

// FAQ
import FAQPage from "./pages/FAQPage";

// POC
import RestaurantsPOC from "./pages/RestaurantsPOC";

// Counties & Cities
import Counties from "./pages/Counties";
import CountyDetail from "./pages/CountyDetail";
import Cities from "./pages/Cities";
import CityDetail from "./pages/CityDetail";

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
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Core */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/testimonials" component={Testimonials} />
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

        {/* POC */}
        <Route path="/poc/restaurants" component={RestaurantsPOC} />

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
        <Route path="/industries/telemarketing">{() => <IndustryDetail slug="telemarketing" />}</Route>
        <Route path="/industries/credit-repair">{() => <IndustryDetail slug="credit-repair" />}</Route>
        <Route path="/industries/subscription-continuity">{() => <IndustryDetail slug="subscription-continuity" />}</Route>
        <Route path="/industries/vape-ecig">{() => <IndustryDetail slug="vape-ecig" />}</Route>
        <Route path="/industries/online-pharmacy">{() => <IndustryDetail slug="online-pharmacy" />}</Route>
        <Route path="/industries/cryptocurrency">{() => <IndustryDetail slug="cryptocurrency" />}</Route>

        {/* Blog */}
        <Route path="/blog" component={Blog} />
        <Route path="/news" component={NewsUpdates} />
        <Route path="/agent-iso" component={AgentISO} />
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
        <Route path="/accessibility" component={AccessibilityStatement} />
        {/* Alias routes — footer links use short paths */}
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/disclaimer" component={Disclaimer} />

        {/* Locations */}
        <Route path="/locations" component={Locations} />
        <Route path="/locations/salt-lake-city" component={SaltLakeCity} />
        <Route path="/locations/provo" component={Provo} />
        <Route path="/locations/orem" component={Orem} />
        <Route path="/locations/lehi" component={Lehi} />
        <Route path="/locations/american-fork" component={AmericanFork} />
        <Route path="/locations/draper" component={Draper} />
        <Route path="/locations/south-jordan" component={SouthJordan} />
        <Route path="/locations/west-jordan" component={WestJordan} />
        <Route path="/locations/sandy" component={Sandy} />
        <Route path="/locations/murray" component={Murray} />
        <Route path="/locations/layton" component={Layton} />
        <Route path="/locations/bountiful" component={Bountiful} />
        <Route path="/locations/ogden" component={Ogden} />
        <Route path="/locations/springville" component={Springville} />
        <Route path="/locations/spanish-fork" component={SpanishFork} />
        <Route path="/locations/park-city" component={ParkCity} />
        <Route path="/locations/heber-city" component={HeberCity} />
        <Route path="/locations/salt-lake-county" component={SaltLakeCounty} />
        <Route path="/locations/utah-county" component={UtahCounty} />
        <Route path="/locations/davis-county" component={DavisCounty} />
        <Route path="/locations/weber-county" component={WeberCounty} />
        <Route path="/locations/washington-county" component={WashingtonCounty} />
        <Route path="/locations/cache-county" component={CacheCounty} />
        <Route path="/locations/summit-county" component={SummitCounty} />
        <Route path="/locations/tooele-county" component={TooeleCounty} />
        <Route path="/locations/box-elder-county" component={BoxElderCounty} />
        <Route path="/locations/iron-county" component={IronCounty} />
        <Route path="/locations/sanpete-county" component={SanpeteCounty} />
        <Route path="/locations/sevier-county" component={SevierCounty} />
        <Route path="/locations/carbon-county" component={CarbonCounty} />
        <Route path="/locations/emery-county" component={EmeryCounty} />
        <Route path="/locations/grand-county" component={GrandCounty} />
        <Route path="/locations/san-juan-county" component={SanJuanCounty} />
        <Route path="/locations/kane-county" component={KaneCounty} />
        <Route path="/locations/garfield-county" component={GarfieldCounty} />
        <Route path="/locations/beaver-county" component={BeaverCounty} />
        <Route path="/locations/millard-county" component={MillardCounty} />
        <Route path="/locations/juab-county" component={JuabCounty} />
        <Route path="/locations/piute-county" component={PiuteCounty} />
        <Route path="/locations/wayne-county" component={WayneCounty} />
        <Route path="/locations/rich-county" component={RichCounty} />
        <Route path="/locations/morgan-county" component={MorganCounty} />
        <Route path="/locations/wasatch-county" component={WasatchCounty} />
        <Route path="/locations/duchesne-county" component={DuchesneCounty} />
        <Route path="/locations/uintah-county" component={UintahCounty} />
        <Route path="/locations/daggett-county" component={DaggettCounty} />
        <Route path="/locations/:slug" component={LocationDetail} />

        {/* Counties */}
        <Route path="/counties" component={Counties} />
        <Route path="/counties/:slug">{(params) => <CountyDetail />}</Route>

        {/* Cities */}
        <Route path="/cities" component={Cities} />
        <Route path="/cities/:slug">{(params) => <CityDetail />}</Route>

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
          <BackToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
