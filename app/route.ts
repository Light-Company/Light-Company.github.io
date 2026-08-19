import mainHtml from "../site/main.html?raw";
import { htmlResponse } from "./html-response";

export function GET() {
  return htmlResponse(mainHtml);
}
