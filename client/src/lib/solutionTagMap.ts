/**
 * Maps solution tag labels (used on challenge-solution cards) to their
 * corresponding solution detail page slugs at /solutions/:slug
 * Tags without a matching solution page are mapped to null.
 */
export const SOLUTION_TAG_SLUG: Record<string, string | null> = {
  "Credit Card Processing": "credit-card-processing",
  "ACH Processing": "ach-echeck-processing",
  "ACH Option": "ach-echeck-processing",
  "Electronic Checks": "ach-echeck-processing",
  "Check Guarantee": "check-guarantee",
  "Check Replacement": "check-guarantee",
  "POS Systems": "pos-systems",
  "SkyTab POS": "pos-systems",
  "Hardware & Setup": "pos-systems",
  "eCommerce Payments": "ecommerce-payments",
  "Platform Integration": "ecommerce-payments",
  "Checkout Optimization": "ecommerce-payments",
  "Online Ordering": "ecommerce-payments",
  "Mobile Processing": "mobile-processing",
  "Virtual Terminal": "virtual-terminals",
  "Virtual Terminals": "virtual-terminals",
  "Invoicing": "invoicing",
  "Digital Invoicing": "invoicing",
  "Payment Links": "invoicing",
  "Milestone Billing": "invoicing",
  "Gift & Loyalty": "gift-loyalty",
  "Gift Cards": "gift-loyalty",
  "Loyalty Program": "gift-loyalty",
  "Tip & Loyalty": "gift-loyalty",
  "Dual Pricing": "dual-pricing",
  "Transparent Pricing": "dual-pricing",
  "Rate Optimization": "dual-pricing",
  "Rate Negotiation": "dual-pricing",
  "Scalable Pricing": "dual-pricing",
  "High-Risk Processing": "high-risk-processing",
  "High-Risk Placement": "high-risk-processing",
  "Merchant Account": "high-risk-processing",
  "Chargeback Management": "high-risk-processing",
  "Fraud Prevention": "high-risk-processing",
  "Recurring Billing": "invoicing",
  "Subscription Billing": "invoicing",
  // Tags with no direct solution page
  "Compliance": null,
  "Compliance & Training": null,
  "PCI Compliance": null,
  "Local Support": null,
  "Fast Funding": null,
  "Flexible Terms": null,
  "Payment Flexibility": null,
  "Customer Convenience": null,
  "Automation": null,
  "Reporting": null,
  "Reporting & Analytics": null,
  "High-Value Coverage": null,
};

/**
 * Returns the solution page path for a given tag, or null if no page exists.
 */
export function getSolutionPath(tag: string): string | null {
  const slug = SOLUTION_TAG_SLUG[tag];
  return slug ? `/solutions/${slug}` : null;
}
