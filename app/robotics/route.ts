import roboticsHtml from "../../site/robotics.html?raw";
import roboticsVisionHtml from "../../site/robotics-vision.html?raw";
import { publishedVisionHtml } from "../../lib/published-vision.mjs";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(publishedVisionHtml(roboticsVisionHtml, roboticsHtml));
}
