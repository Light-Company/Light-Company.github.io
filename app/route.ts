import mainHtml from "../site/main.html?raw";
import prismVisionHtml from "../site/prism-vision.html?raw";
import { publishedVisionHtml } from "../lib/published-vision.mjs";
import { htmlResponse } from "./html-response";

export function GET() {
  return htmlResponse(publishedVisionHtml(prismVisionHtml, mainHtml));
}
