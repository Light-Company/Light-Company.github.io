import html from "../../../site/benchmark.html?raw";
import { withSiteChrome } from "../../../lib/company-site.mjs";
import { htmlResponse } from "../../html-response";

// One shell for every benchmark; the page reads the id from the path.
export function GET() {
  return htmlResponse(withSiteChrome(html, "/benchmarks/"));
}
