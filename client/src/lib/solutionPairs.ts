// ─── Expanded challenge-solution pairs for all 11 solution pages ─────────────
// Each pair maps a specific business pain point to a concrete UBC Unlimited solution.
// Used by SolutionDetail.tsx to render the Option B paired card layout.

export interface SolutionChallengePair {
  challenge: string;
  challengeDetail: string;
  solution: string;
  solutionDetail: string;
  solutionTag: string;
  impact: string;
}

export const SOLUTION_PAIRS: Record<string, SolutionChallengePair[]> = {

  "credit-card-processing": [
    {
      challenge: "Paying 2.5–3.5% on every card transaction",
      challengeDetail: "Standard processing rates from banks and large processors eat directly into your margins. On $500K in annual card volume, that's $12,500–$17,500 per year in fees alone.",
      solution: "Interchange-optimized pricing tailored to your business",
      solutionDetail: "We analyze your current statement line-by-line and build a pricing structure designed for your specific card mix, volume, and business type. Most clients see meaningful savings within the first month.",
      solutionTag: "Rate Optimization",
      impact: "Meaningful savings vs. current rates",
    },
    {
      challenge: "Getting locked into long-term contracts with cancellation penalties",
      challengeDetail: "Many processors lock businesses into 3-year contracts with early termination fees of $300–$500 or more, leaving you stuck even if service deteriorates.",
      solution: "Flexible terms with no punitive cancellation fees*",
      solutionDetail: "We offer flexible contract terms and work hard to earn your business every month. If you're ever unhappy, we'll work to fix it — not hold you hostage. *Certain solutions may require a formal agreement, which will be clearly disclosed before you sign anything.",
      solutionTag: "Flexible Terms",
      impact: "No lock-in risk",
    },
    {
      challenge: "Slow funding and cash flow delays",
      challengeDetail: "Waiting 2–3 business days for funds to hit your account creates cash flow gaps, especially for businesses with tight operating margins.",
      solution: "Next-day and same-day funding options",
      solutionDetail: "Most of our clients receive next-business-day funding. Same-day funding options are available for qualifying businesses. Your money moves faster so you can pay vendors, staff, and expenses on time.",
      solutionTag: "Fast Funding",
      impact: "Next-day funding available",
    },
    {
      challenge: "Poor customer service from a large, impersonal processor",
      challengeDetail: "When something goes wrong — a batch that didn't settle, a terminal that stopped working, a chargeback you don't understand — you need a real person who knows your account.",
      solution: "Dedicated local Utah support team",
      solutionDetail: "You get a dedicated local rep who knows your business and answers when you call. Not a call center. Not a ticket queue. A real person in Utah who can resolve issues the same day.",
      solutionTag: "Local Support",
      impact: "Same-day issue resolution",
    },
  ],

  "pos-systems": [
    {
      challenge: "Your current POS is slow, crashes, or can't keep up with volume",
      challengeDetail: "An unreliable POS during a dinner rush or a busy Saturday costs you sales, frustrates staff, and drives customers away.",
      solution: "SkyTab POS — built for high-volume environments",
      solutionDetail: "SkyTab is engineered for reliability in demanding restaurant and retail environments. 4G LTE backup keeps you processing even when your internet goes down. Lifetime hardware warranty means you're never stuck with a broken terminal.",
      solutionTag: "SkyTab POS",
      impact: "Zero downtime during rushes",
    },
    {
      challenge: "Your POS doesn't integrate with online ordering or delivery platforms",
      challengeDetail: "Managing separate tablets for DoorDash, Uber Eats, and your own website creates order chaos, missed tickets, and inventory discrepancies.",
      solution: "Unified online ordering integration",
      solutionDetail: "All online orders flow directly into your kitchen display system as a single ticket stream. No separate tablets, no missed orders, no manual re-entry. One system for everything.",
      solutionTag: "Online Ordering",
      impact: "Zero missed online orders",
    },
    {
      challenge: "You're overpaying for a POS system that charges per-location or per-terminal",
      challengeDetail: "Many POS providers charge $100–$200/month per terminal or location, making multi-location expansion expensive.",
      solution: "Scalable pricing that grows with your business",
      solutionDetail: "SkyTab's pricing is designed to scale without punishing growth. Add terminals and locations without the per-unit fees that make other systems cost-prohibitive as you expand.",
      solutionTag: "Scalable Pricing",
      impact: "Lower cost as you grow",
    },
    {
      challenge: "You don't have real-time visibility into sales, inventory, and staff performance",
      challengeDetail: "Without real-time reporting, you're making business decisions based on yesterday's data — or no data at all.",
      solution: "Real-time cloud reporting and mobile app",
      solutionDetail: "Monitor sales, inventory levels, and staff performance from anywhere via the SkyTab mobile app. Real-time dashboards show you what's selling, what's not, and where your busiest hours are.",
      solutionTag: "Reporting & Analytics",
      impact: "Real-time business intelligence",
    },
    {
      challenge: "Your current POS doesn't support tip management or loyalty programs",
      challengeDetail: "Manual tip entry and punch-card loyalty programs are error-prone, easy to lose, and don't drive the repeat behavior you need.",
      solution: "Built-in tip management and loyalty program",
      solutionDetail: "Tip prompts on customer-facing screens, configurable tip pooling, and a points-based loyalty program that runs automatically at the POS. No separate system, no manual tracking.",
      solutionTag: "Tip & Loyalty",
      impact: "Higher tips, more repeat visits",
    },
  ],

  "surcharge-cash-discount": [
    {
      challenge: "Paying 2–3% in processing fees on every card transaction",
      challengeDetail: "For a business doing $1M in annual card volume, that's $20,000–$30,000 per year going to your processor instead of your bottom line.",
      solution: "Surcharge & Cash Discount Solutions",
      solutionDetail: "Display a cash price and a card price at the point of sale. Customers who pay by card cover the processing fee — you keep more of every sale. Fully compliant with card network rules, legal in all 50 states.",
      solutionTag: "Surcharge & Cash Discount Solutions",
      impact: "Up to 100% fee elimination",
    },
    {
      challenge: "Concern about customer pushback on card surcharges",
      challengeDetail: "Many business owners worry that customers will react negatively to a card price differential and choose competitors who don't charge extra.",
      solution: "Transparent pricing with compliant signage and staff training",
      solutionDetail: "We provide all required signage, staff talking points, and receipt language. When pricing is displayed clearly upfront, the vast majority of customers accept it without issue — especially when the cash discount is meaningful.",
      solutionTag: "Compliance & Training",
      impact: "Minimal customer pushback",
    },
    {
      challenge: "Uncertainty about whether surcharge & cash discount solutions is legal and compliant",
      challengeDetail: "Surcharging rules vary by state and card network. Implementing a non-compliant program can result in fines or processor termination.",
      solution: "Fully compliant program setup and ongoing support",
      solutionDetail: "Our surcharge & cash discount solutions is fully compliant with Visa, Mastercard, and Discover rules, and legal in all 50 states. We handle the setup, signage, and compliance documentation so you don't have to worry.",
      solutionTag: "Compliance",
      impact: "Zero compliance risk",
    },
    {
      challenge: "Your current POS doesn't support surcharge & cash discount solutions",
      challengeDetail: "Implementing surcharge & cash discount solutions requires a POS that can display both prices, print compliant receipts, and report correctly — not all systems support this.",
      solution: "Dual-pricing-ready POS and terminal hardware",
      solutionDetail: "We supply terminals and POS systems pre-configured for surcharge & cash discount solutions. Customer-facing screens show both prices clearly, receipts are compliant, and reporting separates cash and card transactions automatically.",
      solutionTag: "Hardware & Setup",
      impact: "Ready to go in 24–48 hours",
    },
  ],

  "high-risk-processing": [
    {
      challenge: "Your merchant account was terminated or you can't get approved",
      challengeDetail: "Standard processors terminate high-risk merchant accounts with little warning, leaving businesses scrambling for a payment solution and unable to accept cards.",
      solution: "Specialized high-risk merchant account placement",
      solutionDetail: "We work with a network of processors who specialize in high-risk industries — firearms, CBD, adult entertainment, travel, online gaming, and more. We find you a stable, long-term account even when standard processors say no.",
      solutionTag: "High-Risk Placement",
      impact: "Stable, uninterrupted processing",
    },
    {
      challenge: "Paying excessive rates due to high-risk categorization",
      challengeDetail: "High-risk businesses often pay 4–6% or more in processing fees because they accept the first offer they get, not knowing better options exist.",
      solution: "Competitive high-risk rates through our processor network",
      solutionDetail: "We leverage our relationships with multiple high-risk processors to negotiate competitive rates for your specific industry and risk profile. You don't have to accept the first rate you're offered.",
      solutionTag: "Rate Negotiation",
      impact: "Competitive rates for your industry",
    },
    {
      challenge: "High chargeback rates threatening your merchant account",
      challengeDetail: "Chargeback ratios above 1% can trigger account termination. High-risk businesses are more vulnerable to chargebacks and need proactive management.",
      solution: "Chargeback monitoring and dispute management",
      solutionDetail: "We monitor your chargeback ratio and alert you before it becomes a problem. Dispute support, fraud prevention tools, and best-practice guidance help you keep your ratio below processor thresholds.",
      solutionTag: "Chargeback Management",
      impact: "Protected merchant account",
    },
    {
      challenge: "Compliance requirements specific to your industry",
      challengeDetail: "High-risk industries often have specific regulatory requirements — CROA for credit repair, FFL for firearms, NABP for online pharmacies — that processors scrutinize closely.",
      solution: "Compliance-aware processor placement and guidance",
      solutionDetail: "We work with processors experienced in your specific industry's compliance requirements. We help you document your compliance posture and implement best practices that reduce processor risk.",
      solutionTag: "Compliance",
      impact: "Reduced regulatory risk",
    },
  ],

  "ach-echeck-processing": [
    {
      challenge: "Paying 2–3% credit card fees on large recurring payments",
      challengeDetail: "For rent collection, B2B invoices, and high-ticket recurring services, credit card fees are disproportionately expensive compared to the value of the transaction.",
      solution: "ACH bank transfer processing at a fraction of the cost",
      solutionDetail: "ACH typically runs between 0.35%–0.90% — compared to 2–3% for credit cards. On a $2,000 rent payment, that difference can be $40–$60 saved per transaction. For businesses with high volume or large average tickets, the annual savings are substantial.",
      solutionTag: "ACH Processing",
      impact: "Dramatic cost savings on large payments",
    },
    {
      challenge: "Manual invoice collection and late payment chasing",
      challengeDetail: "Sending invoices, following up on late payments, and reconciling who has and hasn't paid wastes significant time every month.",
      solution: "Automated ACH recurring billing",
      solutionDetail: "Set up automatic monthly ACH debits from customer or tenant bank accounts. Authorize once, collect automatically. Late payment rates drop significantly when payment is automatic.",
      solutionTag: "Recurring Billing",
      impact: "Fewer late payments, less chasing",
    },
    {
      challenge: "Returned check risk and funding delays",
      challengeDetail: "Paper checks can bounce days after acceptance, leaving you with a returned check fee and the hassle of re-collecting the payment.",
      solution: "ACH with check verification",
      solutionDetail: "ACH transfers include bank account verification that reduces the risk of returned transactions. Guarantee programs are also available to reimburse your business for returned items — so you get paid even when a payment fails.",
      solutionTag: "Check Replacement",
      impact: "Faster funding, lower return risk",
    },
    {
      challenge: "Customers who don't want to pay by credit card",
      challengeDetail: "Some customers — especially in B2B, property management, and professional services — prefer to pay by bank transfer rather than credit card.",
      solution: "ACH payment portal and payment links",
      solutionDetail: "Give customers a simple online payment portal where they can pay by bank transfer. Send payment links via email or SMS for one-click ACH payment. No card required.",
      solutionTag: "Customer Convenience",
      impact: "More payment options for customers",
    },
  ],

  "mobile-processing": [
    {
      challenge: "You can't accept card payments at events, markets, or job sites",
      challengeDetail: "Businesses that operate outside a fixed location — food trucks, contractors, market vendors, mobile services — lose sales when they can only accept cash.",
      solution: "Mobile card readers and portable POS systems",
      solutionDetail: "Accept Visa, Mastercard, Amex, and Discover anywhere with a mobile card reader connected to your smartphone or tablet. No WiFi required — 4G LTE connectivity keeps you processing wherever you are.",
      solutionTag: "Mobile Processing",
      impact: "Accept cards anywhere",
    },
    {
      challenge: "Your mobile payment solution charges too much per transaction",
      challengeDetail: "Flat-rate mobile processors typically charge 2.6–2.9% per swipe — significantly more than what's available through a dedicated merchant account.",
      solution: "Competitive mobile processing rates",
      solutionDetail: "A dedicated merchant account through UBC Unlimited typically offers lower per-transaction rates than flat-rate mobile processors for businesses with consistent monthly volume. We analyze your volume and recommend the most cost-effective solution.",
      solutionTag: "Rate Optimization",
      impact: "Lower cost than flat-rate processors",
    },
    {
      challenge: "No reporting or inventory management for mobile sales",
      challengeDetail: "Basic card readers don't give you sales reporting, inventory tracking, or customer data — you're flying blind.",
      solution: "Mobile POS with full reporting and inventory",
      solutionDetail: "Our mobile POS solutions include real-time sales reporting, inventory management, and customer tracking — all accessible from your phone or tablet. Know what's selling, what's not, and who your best customers are.",
      solutionTag: "Reporting",
      impact: "Full visibility into mobile sales",
    },
  ],

  "gift-loyalty": [
    {
      challenge: "No way to identify or reward your best customers",
      challengeDetail: "Without a loyalty program, you have no visibility into who your most valuable customers are, how often they visit, or what they spend.",
      solution: "Points-based loyalty program with customer database",
      solutionDetail: "Every purchase earns points. You get a growing database of customer names, emails, and purchase history that you can use for targeted email and SMS marketing campaigns.",
      solutionTag: "Loyalty Program",
      impact: "Know and reward your best customers",
    },
    {
      challenge: "Losing customers to competitors who offer rewards",
      challengeDetail: "When a competitor offers a loyalty program and you don't, customers who are on the fence will choose the business that rewards their loyalty.",
      solution: "Competitive loyalty program that drives repeat visits",
      solutionDetail: "A well-designed loyalty program increases visit frequency and average spend. Customers enrolled in a loyalty program visit 20–30% more often than non-enrolled customers.",
      solutionTag: "Loyalty Program",
      impact: "20–30% more frequent visits",
    },
    {
      challenge: "Gift cards that are hard to manage and easy to lose",
      challengeDetail: "Paper gift certificates are easy to lose, hard to track, and vulnerable to fraud. They also don't give you any customer data.",
      solution: "Digital and physical gift cards with real-time tracking",
      solutionDetail: "Branded physical and digital gift cards with real-time balance tracking, fraud protection, and automatic reporting. Digital gift cards can be sent by email or SMS — no physical card required.",
      solutionTag: "Gift Cards",
      impact: "No lost cards, no fraud",
    },
    {
      challenge: "Gift card revenue that doesn't show up until redemption",
      challengeDetail: "Gift cards are purchased upfront but redeemed later — often months later, or never. This creates positive cash flow and breakage income that many businesses don't fully account for.",
      solution: "Gift card program with breakage tracking",
      solutionDetail: "Our gift card program tracks outstanding balances, redemption rates, and breakage income. According to research from Capital One Shopping, 61% of consumers spend more than a gift card's face value when redeeming — an average of $31.75 more — making gift cards one of the highest-ROI marketing tools available to local businesses.",
      solutionTag: "Gift Cards",
      impact: "Higher spend at redemption",
    },
  ],

  "invoicing": [
    {
      challenge: "Waiting 30–60 days for invoice payments",
      challengeDetail: "Long payment cycles hurt cash flow and require significant time spent on follow-up calls and emails that could be spent on actual work.",
      solution: "Digital invoices with one-click payment links",
      solutionDetail: "Send professional invoices via email or SMS with a one-click payment link. Customers pay online in seconds by credit card or ACH bank transfer. Average payment time drops from 30+ days to 3–5 days.",
      solutionTag: "Digital Invoicing",
      impact: "Get paid in days, not weeks",
    },
    {
      challenge: "Manual invoice creation and tracking",
      challengeDetail: "Creating invoices in Word or Excel, tracking which ones are paid, and following up on overdue accounts is time-consuming and error-prone.",
      solution: "Automated invoicing with payment tracking",
      solutionDetail: "Create and send invoices in minutes. Automatic payment reminders go out before and after the due date. A dashboard shows you exactly which invoices are paid, pending, and overdue — no manual tracking required.",
      solutionTag: "Automation",
      impact: "Hours saved per week",
    },
    {
      challenge: "Customers who don't have a credit card or prefer not to use one",
      challengeDetail: "Some B2B customers prefer to pay by bank transfer. Forcing them to use a credit card creates friction and delays.",
      solution: "ACH bank transfer payment option on every invoice",
      solutionDetail: "Every invoice includes both credit card and ACH bank transfer payment options. Customers choose how they pay — you get paid either way, often faster than a check.",
      solutionTag: "ACH Option",
      impact: "More payment options, faster collection",
    },
    {
      challenge: "Collecting deposits and partial payments for large projects",
      challengeDetail: "Large projects often require deposits, milestone payments, and final invoices. Managing these manually is complex and creates cash flow risk.",
      solution: "Milestone billing and partial payment support",
      solutionDetail: "Create multi-stage invoices with deposit, milestone, and final payment amounts. Customers pay each stage via the same payment link. You get paid at each milestone, not just at the end.",
      solutionTag: "Milestone Billing",
      impact: "Better cash flow on large projects",
    },
  ],

  "virtual-terminals": [
    {
      challenge: "You need to accept card payments over the phone or by email",
      challengeDetail: "Businesses that take orders or bookings remotely — service companies, consultants, medical practices — need a way to accept card payments without the customer being present.",
      solution: "Browser-based virtual terminal",
      solutionDetail: "Accept credit and debit cards from any browser — no hardware required. Enter card details manually for phone orders, or send a secure payment link for email and SMS payments. Works on any computer, tablet, or phone.",
      solutionTag: "Virtual Terminal",
      impact: "Accept payment from anywhere",
    },
    {
      challenge: "Security concerns about handling card data over the phone",
      challengeDetail: "Manually entering card numbers creates PCI compliance risk if not handled properly. Staff need a secure, compliant way to process phone payments.",
      solution: "PCI DSS compliant virtual terminal",
      solutionDetail: "Our virtual terminal is PCI DSS compliant and designed to minimize the scope of cardholder data in your environment. Card data is tokenized and never stored on your systems.",
      solutionTag: "PCI Compliance",
      impact: "Reduced PCI compliance risk",
    },
    {
      challenge: "No way to send payment requests to customers remotely",
      challengeDetail: "Calling customers to collect payment over the phone is time-consuming and often results in phone tag and delayed collections.",
      solution: "Secure payment links via email and SMS",
      solutionDetail: "Send a secure payment link to any customer via email or SMS. They click the link, enter their card details on a secure page, and payment is processed instantly. No phone call required.",
      solutionTag: "Payment Links",
      impact: "Faster remote payment collection",
    },
    {
      challenge: "Recurring billing for clients you invoice monthly",
      challengeDetail: "Manually processing the same payment every month for recurring clients is inefficient and creates gaps when cards expire or clients forget to pay.",
      solution: "Recurring billing via virtual terminal",
      solutionDetail: "Store a card on file (with customer authorization) and charge it automatically on a recurring schedule. Automatic account updater refreshes expired cards so billing never stops.",
      solutionTag: "Recurring Billing",
      impact: "Automatic monthly collections",
    },
  ],

  "check-guarantee": [
    {
      challenge: "Accepting checks and getting stuck with returned check losses",
      challengeDetail: "A bounced check costs you the face value of the check, a returned check fee from your bank, and the time spent trying to re-collect. For high-value checks, this can be devastating.",
      solution: "Check guarantee — if it bounces, you still get paid",
      solutionDetail: "Our check guarantee service verifies and guarantees checks at the point of acceptance. If a guaranteed check is returned, we pay you the face value of the check — you're never out of pocket for a bad check again.",
      solutionTag: "Check Guarantee",
      impact: "Zero returned check losses",
    },
    {
      challenge: "Slow check clearing and cash flow delays",
      challengeDetail: "Paper checks can take 3–5 business days to clear, creating cash flow gaps that affect your ability to pay vendors and staff.",
      solution: "Electronic check conversion with faster clearing",
      solutionDetail: "Convert paper checks to electronic ACH transactions at the point of acceptance. Electronic checks clear in 1–2 business days — significantly faster than paper check clearing.",
      solutionTag: "Electronic Checks",
      impact: "Faster clearing than paper checks",
    },
    {
      challenge: "High-value check acceptance risk for automotive, real estate, and contractors",
      challengeDetail: "Businesses that regularly accept large checks — vehicle sales, real estate deposits, contractor payments — face significant exposure if a high-value check bounces.",
      solution: "High-limit check guarantee coverage",
      solutionDetail: "Our check guarantee program covers high-value checks up to your approved limit. Ideal for automotive dealers, real estate professionals, and contractors who regularly accept large checks.",
      solutionTag: "High-Value Coverage",
      impact: "Protected on large check transactions",
    },
    {
      challenge: "Customers who prefer to pay by check",
      challengeDetail: "Some customers — especially in B2B, real estate, and older demographics — prefer checks over cards or digital payments. Refusing checks means losing those customers.",
      solution: "Accept checks confidently with guarantee protection",
      solutionDetail: "With check guarantee, you can accept checks from any customer without worrying about returns. Expand your accepted payment methods without taking on risk.",
      solutionTag: "Payment Flexibility",
      impact: "Accept checks without risk",
    },
  ],

  "ecommerce-payments": [
    {
      challenge: "Cart abandonment from a slow or complicated checkout",
      challengeDetail: "Every extra step in your checkout flow costs you customers. A clunky payment experience is one of the top reasons shoppers abandon their carts — industry average is 70%.",
      solution: "Optimized, mobile-first checkout experience",
      solutionDetail: "A streamlined checkout with one-click payment options, saved card support, and fast page load times. Integrated with Shift4Shop, Shopify, WooCommerce, and custom platforms.",
      solutionTag: "Checkout Optimization",
      impact: "Lower cart abandonment rate",
    },
    {
      challenge: "Fraud and chargebacks eroding online revenue",
      challengeDetail: "Online businesses face higher fraud rates than brick-and-mortar. Each chargeback costs you the sale, the product, and a $25–$100 dispute fee.",
      solution: "Advanced fraud detection and chargeback management",
      solutionDetail: "Real-time fraud scoring, 3D Secure authentication, velocity checks, and AVS/CVV verification reduce fraudulent transactions before they happen. Chargeback dispute support included.",
      solutionTag: "Fraud Prevention",
      impact: "Fewer chargebacks, lower losses",
    },
    {
      challenge: "Getting approved for a payment gateway as a new or high-risk business",
      challengeDetail: "New eCommerce businesses and those in higher-risk categories often struggle to get approved for a reliable payment gateway.",
      solution: "eCommerce merchant account placement",
      solutionDetail: "We work with a network of gateways and processors to find the right fit for your business — whether you're a new startup or an established business in a higher-risk category.",
      solutionTag: "Merchant Account",
      impact: "Get approved and processing quickly",
    },
    {
      challenge: "Integration complexity with your existing platform",
      challengeDetail: "Switching payment processors shouldn't require rebuilding your entire store. Poor integration support means weeks of developer time and potential downtime.",
      solution: "Pre-built integrations for major platforms",
      solutionDetail: "Native integrations with Shift4Shop, Shopify, WooCommerce, Magento, BigCommerce, and custom platforms via REST API. Most integrations are live within 24–48 hours with no developer required.",
      solutionTag: "Platform Integration",
      impact: "Go live in 24–48 hours",
    },
    {
      challenge: "Recurring subscription billing and failed payment recovery",
      challengeDetail: "Subscription businesses lose significant revenue to failed payments — expired cards, bank declines, and insufficient funds that aren't automatically retried.",
      solution: "Subscription billing with dunning management",
      solutionDetail: "Automated retry logic, account updater services that refresh expired card numbers, and customer notification emails. Recover a significant portion of revenue that would otherwise be lost to involuntary churn.",
      solutionTag: "Subscription Billing",
      impact: "Recover failed subscription payments",
    },
  ],

};
