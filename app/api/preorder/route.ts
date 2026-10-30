import { getDb } from "../../../db";
import type { preorderInterest } from "../../../db/schema";
import { handlePreorderRequest } from "../../../lib/preorder.mjs";
import { savePreorderInterest } from "../../../lib/preorder-store.mjs";

export function POST(request: Request) {
  return handlePreorderRequest(request, async (interest: typeof preorderInterest.$inferInsert) => {
    await savePreorderInterest(getDb().$client, interest);
  });
}
