import investorsHtml from "../../site/investors.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(investorsHtml);
}
