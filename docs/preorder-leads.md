# Prism preorder interest

The `/order` page continues the main Robotics design and collects interest rather than payment. Required fields are full name, email, and company/lab. Use case, role, robot/platform, station quantity, and product-update opt-in are optional. Product-update consent is unchecked by default.

`POST /api/preorder` validates the request and writes to the existing private D1 binding `DB`, table `preorder_interest`. One row is retained per normalized email. The first submission is canonical: anonymous resubmission cannot change its personal details, product-update consent, or metadata. New and duplicate submissions receive the same acknowledgment without revealing whether an email was already registered. Corrections and consent changes require a verified follow-up with the team; this public form does not perform them. The server sets source, timestamps, and consent-version metadata. The browser never stores leads in local storage, and there is no public endpoint to list them.

Owners can inspect the table in the Site's Settings database viewer. The Sites database tools can also inspect it using the site owner's existing access. No customer email is sent automatically by this change.

Schema changes append a Drizzle migration. The Sites build packages it, and publication applies it before uploading the Worker. Local D1 is separate from the hosted database. Use synthetic `example.com` records for verification and label their company `TEST — not a customer` so they are excluded from follow-up.

The form displays success only after the database confirms that the record was inserted or the normalized email already exists. It does not claim that a duplicate submission changed the saved details. Validation or network/database failures retain the fields and show a retry message. Native form submissions receive a server-rendered receipt after the same database acknowledgment. No success query parameter is trusted.

The current production host is Sites. A static GitHub Pages export cannot run the form endpoint; retain the Worker or deploy a server endpoint before any hosting cutover.

The earlier Stripe Payment Link module remains available for a future confirmed paid offer, but this page does not initiate payment or reserve inventory. No current price or shipping date is implied.

The projection illustration and downloadable PDF come from the approved October 1 Prism product sheet. The workcell drawing is illustrative; the embedded lab video shows operating hardware.
