const inquiryUrl = "mailto:hi@lightcompany.ai?subject=Order%20Prism";
const trackingParameters = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

/** Return an allowed Stripe-hosted Payment Link, or null. Live links are required by default. */
export function validateStripePaymentLink(value, options = {}) {
  if (typeof value !== "string" || /[\s\\]/.test(value)) return null;
  // Check the unparsed authority too: URL parsing removes an explicit :443 port.
  if (!/^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+(?:\?[^#]*)?$/.test(value)) return null;

  try {
    const url = new URL(value);
    if (url.origin !== "https://buy.stripe.com" || url.username || url.password || url.port || url.hash) return null;
    if (options?.live !== false && url.pathname.startsWith("/test_")) return null;
    for (const key of url.searchParams.keys()) {
      if (!trackingParameters.has(key) || url.searchParams.getAll(key).length !== 1) return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

/** Resolve public offer data without fetching, redirecting, or handling payment details. */
export function resolveOffer(config, options = {}) {
  const offer = config && typeof config === "object" && !Array.isArray(config) ? config : {};
  const validAmount = Number.isSafeInteger(offer.unitAmount) && offer.unitAmount > 0;
  const validCurrency = offer.currency === "USD";
  const formattedPrice = validAmount && validCurrency
    ? new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: offer.unitAmount % 100 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(offer.unitAmount / 100)
    : "Talk to our team";
  const unavailable = (reason) => ({
    available: false,
    url: inquiryUrl,
    formattedPrice,
    label: "Contact to order",
    reason,
  });

  if (offer.active !== true) return unavailable("inactive");
  if (offer.unitAmount === null || offer.unitAmount === undefined) return unavailable("missing-price");
  if (!validAmount) return unavailable("invalid-price");
  if (!validCurrency || !["hardware", "preorder"].includes(offer.kind)
    || typeof offer.productName !== "string" || !offer.productName.trim()
    || !Number.isSafeInteger(offer.maxQuantity) || offer.maxQuantity < 1) {
    return unavailable("invalid-offer");
  }

  const url = validateStripePaymentLink(offer.paymentLink, options);
  if (!url) return unavailable("invalid-payment-link");

  return {
    available: true,
    url,
    formattedPrice,
    label: offer.kind === "preorder" ? "Preorder now" : "Order now",
    reason: "ready",
  };
}
