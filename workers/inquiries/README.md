# lightcompany-inquiries

Catches every form post on lightcompany.ai (`/api/preorder`, `/api/inquiry`), stores it in Cloudflare D1, then emails it to jon@lightcompany.ai. Replying to the email replies to the person who asked.

Validation, the same-origin check and the D1 insert are the site's existing `lib/preorder.mjs` and `lib/preorder-store.mjs`. Nothing is reimplemented here.

## Why D1 + Resend

- The site is static, on GitHub Pages, so it can't run a backend. lightcompany.ai is already proxied by Cloudflare, so a Worker route sits in front of any host.
- Mail for lightcompany.ai is Google Workspace (MX smtp.google.com). Cloudflare's own Email Routing would need the MX moved to Cloudflare and would break Workspace. Resend sends through an API and only needs DNS records added. The free tier is 3,000 emails a month.
- The lead is written to D1 before any email is sent. A mail failure is logged and never loses the lead or shows the visitor an error.

## One-time setup (Jon)

```sh
cd workers/inquiries
npx wrangler login
npx wrangler d1 create lightcompany-inquiries        # paste the database_id into wrangler.toml
npx wrangler d1 migrations apply lightcompany-inquiries --remote
```

Resend:

1. Create an account at resend.com and add the domain `lightcompany.ai`.
2. Add the DNS records it shows (DKIM and SPF, on a `send.` subdomain) in Cloudflare DNS. Leave the Google MX alone.
3. Create an API key, then run `npx wrangler secret put RESEND_API_KEY`.

Deploy:

```sh
npx wrangler deploy
```

## Check it

```sh
curl -s https://lightcompany.ai/api/preorder -H 'Origin: https://lightcompany.ai' -H 'Content-Type: application/json' \
  -d '{"fullName":"Test","email":"test@example.com","company":"Test lab"}'
npx wrangler d1 execute lightcompany-inquiries --remote --command "select * from preorder_interest order by id desc limit 5"
```

Leads captured before this, by the old OpenAI Sites deployment, live in that deployment's database. Export them from there.
