import roboticsHtml from "../../site/robotics.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(roboticsHtml);
}
