import roboticsVisionHtml from "../../site/robotics-vision.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(roboticsVisionHtml);
}
