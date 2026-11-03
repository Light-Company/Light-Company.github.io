import html from "../../site/benchmarks.html?raw";
import { withSiteChrome } from "../../lib/company-site.mjs";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(withSiteChrome(html, "/benchmarks/"));
}
