import privacyHtml from "../../site/privacy.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(privacyHtml);
}
