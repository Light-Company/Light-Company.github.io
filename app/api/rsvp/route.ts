import { getDb } from "../../../db";
import { rsvps } from "../../../db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function returnTo(request: Request, state: "thanks" | "invalid" | "error") {
  return Response.redirect(new URL(`/?rsvp=${state}#rsvp`, request.url), 303);
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const honeypot = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim().toLowerCase();

    if (honeypot) {
      return returnTo(request, "thanks");
    }

    if (!emailPattern.test(email) || email.length > 254) {
      return returnTo(request, "invalid");
    }

    const db = getDb();
    await db
      .insert(rsvps)
      .values({ email, source: "august-20-public-demo" })
      .onConflictDoNothing({ target: rsvps.email });

    return returnTo(request, "thanks");
  } catch {
    return returnTo(request, "error");
  }
}
