import prismVisionHtml from "../../site/prism-vision.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(prismVisionHtml);
}
