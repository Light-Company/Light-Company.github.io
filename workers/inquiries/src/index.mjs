// Cloudflare Worker: lightcompany.ai form posts -> D1 -> email to Jon.
import { handlePreorderRequest } from "../../../lib/preorder.mjs";
import { savePreorderInterest } from "../../../lib/preorder-store.mjs";
import { inquiryEmail } from "./email.mjs";

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname !== "/api/preorder" && pathname !== "/api/inquiry") return new Response("Not found", { status: 404 });
    return handlePreorderRequest(request, async (interest) => {
      // the lead is safe once it is in D1; a mail outage must never lose it or fail the visitor
      await savePreorderInterest(env.DB, interest);
      ctx.waitUntil(notify(env, interest).catch((error) => console.error("inquiry email failed", error)));
    });
  },
};

async function notify(env, interest) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  const mail = inquiryEmail(interest);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.NOTIFY_FROM, to: [env.NOTIFY_TO], reply_to: interest.email, ...mail }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
}
