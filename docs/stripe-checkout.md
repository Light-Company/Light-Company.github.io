# Prism orders and Stripe

The current order page collects preorder interest in the private site database and does not take payment. See [Preorder interest](preorder-leads.md) for the live form and storage behavior.

The Stripe Payment Link module is retained for a future confirmed paid offer. Its checked-in configuration is inactive: `active` is `false`, and `unitAmount` and `paymentLink` are `null`. The current page does not load this configuration; changing it alone will not enable checkout. The repository's older $250 pre-order label and $1,500 investor hardware price do not determine a new offer.

## Configure the actual offer

1. In the correct Stripe account, confirm the product, what the buyer receives, the USD price, and whether this is a hardware purchase or a pre-order. For a pre-order, state whether the payment is a deposit or the full price and explain the remaining balance if applicable.
2. Agree on delivery timing, supported destinations, shipping charges, cancellation/refund terms, and any warranty or software costs. Add the confirmed terms to the order page and relevant Stripe checkout fields. Do not use the current delivery summary as a promised ship date.
3. In Stripe Dashboard, create the Product and one-time Price for that offer. Create a Payment Link for that Price. Configure billing/shipping information, permitted destinations, shipping rates, taxes as applicable, customer contact details, and quantity limits in Stripe. The website does not override the price or quantity.
4. Configure the Stripe confirmation page and receipt settings. A website return page must not treat a URL parameter or a visit as evidence that payment succeeded. Use Stripe's payment record for manual fulfillment. If fulfillment is automated later, use verified webhook events with duplicate-event handling.
5. Exercise the flow in Stripe's test environment before activation. `resolveOffer(config, { live: false })` permits a `test_` Payment Link for a development test. When connecting checkout to the page, call `resolveOffer(config)` to require a live link; a `live` property in the public JSON cannot disable this check.
6. Copy the real live `https://buy.stripe.com/...` URL into `public/site/order/offer.json`. Set `unitAmount` to the price in integer cents, `currency` to `USD`, `kind` to `hardware` or `preorder`, and populate `includes` and `shippingSummary` from the confirmed offer. Keep `maxQuantity` consistent with the Stripe configuration. Set `active` to `true` only when the displayed offer and Stripe checkout match.
7. Run `npm test` and `npm run lint`, review the order page and the Stripe-hosted checkout, and publish through the normal branch/review process. Do not submit a live payment as a site verification step.

The config is public. Do not place Stripe secret keys, webhook secrets, customer records, or other credentials in it. A Payment Link URL is sufficient for this integration. Test fixtures use invented amounts and link IDs solely to test validation; they are not an offer.

## Module interface

`validateStripePaymentLink(value, options)` returns the normalized URL or `null`. It allows only HTTPS links to exactly `buy.stripe.com`, with a single alphanumeric/underscore path segment. It rejects credentials, explicit ports (including 443), fragments, path encoding, and test links by default. Optional query parameters are limited to `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`, each appearing once. Use the plain link copied from Stripe if another parameter is rejected.

`resolveOffer(config, options)` returns `{ available, url, formattedPrice, label, reason }` without side effects. Missing, malformed, inactive, or incomplete configuration returns the contact URL and `Contact to order`. A null price displays `Talk to our team`. A valid active hardware offer displays `Order now`; a pre-order displays `Preorder now`. Whole-dollar amounts omit cents; fractional amounts show two decimal places. The current integration accepts USD only.

Reason codes are `ready`, `inactive`, `missing-price`, `invalid-price`, `invalid-offer`, and `invalid-payment-link`. These are for application decisions; buyer-facing copy should describe the available action. Render configuration text using `textContent`, not `innerHTML`, and set a checkout destination only from the resolved `url`.

The validator checks URL structure and configuration completeness. It does not contact Stripe or verify that the Payment Link is active, belongs to the intended account, or charges the displayed amount. Compare the real Stripe checkout with the page when activating or changing an offer.

## Stripe references

- [Payment Links](https://docs.stripe.com/payment-links)
- [Create a Payment Link](https://docs.stripe.com/payment-links/create)
- [Collect addresses and customize checkout](https://docs.stripe.com/payment-links/customize)
- [Shipping charges](https://docs.stripe.com/payments/no-code/charge-shipping)
- [Receipts and post-payment actions](https://docs.stripe.com/payment-links/post-payment)
- [Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment)
