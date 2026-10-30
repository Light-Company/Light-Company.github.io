import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolveOffer, validateStripePaymentLink } from "../public/site/order/checkout.mjs";

const liveLink = "https://buy.stripe.com/abc123XYZ";
const inquiryUrl = "mailto:hi@lightcompany.ai?subject=Order%20Prism";
// Synthetic test fixtures only; these do not define the customer offer.
const activeOffer = {
  productName: "Prism",
  currency: "USD",
  unitAmount: 12345,
  paymentLink: liveLink,
  active: true,
  kind: "hardware",
  maxQuantity: 1,
};

test("the published config offers either a complete checkout or the contact fallback", async () => {
  const offer = JSON.parse(await readFile(new URL("../public/site/order/offer.json", import.meta.url), "utf8"));
  assert.equal(typeof offer.active, "boolean");
  assert.equal(offer.productName, "Prism");
  assert.ok(Array.isArray(offer.includes));
  const result = resolveOffer(offer);
  assert.equal(result.available, offer.active);
  assert.equal(result.url, offer.active ? validateStripePaymentLink(offer.paymentLink) : inquiryUrl);
  assert.ok(Object.keys(offer).every((key) => !/secret|password|token|api.?key/i.test(key)));
});

test("an unconfigured offer shows contact to order without an invented price", () => {
  assert.deepEqual(resolveOffer({ ...activeOffer, active: false, unitAmount: null, paymentLink: null }), {
    available: false,
    url: inquiryUrl,
    formattedPrice: "Talk to our team",
    label: "Contact to order",
    reason: "inactive",
  });
});

test("missing and malformed offer data safely resolves to an inquiry", () => {
  for (const config of [undefined, null, false, 1, "", [], {}]) {
    const result = resolveOffer(config, null);
    assert.equal(result.available, false);
    assert.equal(result.url, inquiryUrl);
    assert.equal(result.label, "Contact to order");
    assert.equal(result.formattedPrice, "Talk to our team");
  }
  assert.equal(resolveOffer({ ...activeOffer, active: "true" }).available, false);
  assert.equal(resolveOffer({ ...activeOffer, active: false }).available, false);
});

test("requires a known positive integer price in cents before enabling payment", () => {
  for (const unitAmount of [null, undefined]) {
    assert.equal(resolveOffer({ ...activeOffer, unitAmount }).reason, "missing-price");
  }
  for (const unitAmount of [0, -1, 1.5, "12345", NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    const result = resolveOffer({ ...activeOffer, unitAmount });
    assert.equal(result.reason, "invalid-price");
    assert.equal(result.available, false);
    assert.equal(result.url, inquiryUrl);
  }
});

test("checks the offer type, currency, product identity, and quantity configuration", () => {
  for (const patch of [
    { kind: "subscription" },
    { currency: "EUR" },
    { currency: null },
    { productName: " " },
    { productName: null },
    { maxQuantity: 0 },
    { maxQuantity: 1.5 },
  ]) {
    const result = resolveOffer({ ...activeOffer, ...patch });
    assert.equal(result.reason, "invalid-offer");
    assert.equal(result.available, false);
    assert.equal(result.url, inquiryUrl);
  }
});

test("rejects external destinations and URL parser normalization tricks", () => {
  const invalidLinks = [
    undefined, null, {}, "", "/checkout", "//buy.stripe.com/abc", "javascript:alert(1)",
    "http://buy.stripe.com/abc", "https://checkout.stripe.com/abc", "https://buy.stripe.com/",
    "https://buy.stripe.com", "https://buy.stripe.com.evil.example/abc",
    "https://buy.stripe.com@evil.example/abc", "https://user@buy.stripe.com/abc",
    "https://user:password@buy.stripe.com/abc", "https://buy.stripe.com:443/abc",
    "https://buy.stripe.com:8443/abc", "https://buy.stripe.com./abc",
    "https://buy.stripe.com\\@evil.example/abc", " https://buy.stripe.com/abc",
    "https://buy.stripe.com/ab\nc", "https://buy.stripe.com/a/../abc",
    "https://buy.stripe.com/%74est_abc", "https://buy.stripe.com/a%2fb",
    "https://buy.stripe.com/abc#https://evil.example",
    "https://buy.stripe.com/abc?redirect=https://evil.example",
    "https://buy.stripe.com/abc?unit_amount=1",
    "https://buy.stripe.com/abc?utm_source=one&utm_source=two",
  ];
  for (const paymentLink of invalidLinks) {
    assert.equal(validateStripePaymentLink(paymentLink), null, String(paymentLink));
    const result = resolveOffer({ ...activeOffer, paymentLink });
    assert.equal(result.reason, "invalid-payment-link");
    assert.equal(result.url, inquiryUrl);
  }
});

test("accepts exact Stripe Payment Links and supported tracking parameters", () => {
  assert.equal(validateStripePaymentLink(liveLink), liveLink);
  const tracked = `${liveLink}?utm_source=encore&utm_campaign=prism`;
  assert.equal(validateStripePaymentLink(tracked), tracked);
  assert.deepEqual(resolveOffer(activeOffer), {
    available: true,
    url: liveLink,
    formattedPrice: "$123.45",
    label: "Order now",
    reason: "ready",
  });
  assert.equal(resolveOffer({ ...activeOffer, unitAmount: 10000 }).formattedPrice, "$100");
  assert.equal(resolveOffer({ ...activeOffer, unitAmount: 1 }).formattedPrice, "$0.01");
  assert.equal(resolveOffer({ ...activeOffer, kind: "preorder" }).label, "Preorder now");
});

test("test-mode links require an explicit code-level opt-in", () => {
  const paymentLink = "https://buy.stripe.com/test_abc123XYZ";
  assert.equal(validateStripePaymentLink(paymentLink), null);
  assert.equal(validateStripePaymentLink(paymentLink, { live: true }), null);
  assert.equal(validateStripePaymentLink(paymentLink, null), null);
  assert.equal(validateStripePaymentLink(paymentLink, { live: false }), paymentLink);
  assert.equal(resolveOffer({ ...activeOffer, paymentLink, live: false }).available, false);
  assert.equal(resolveOffer({ ...activeOffer, paymentLink }, { live: false }).available, true);
});
