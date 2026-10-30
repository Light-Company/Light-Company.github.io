import investorsHtml from "../../../site/robotics-investors.html?raw";
import { htmlResponse } from "../../html-response";

export function GET() {
  return htmlResponse(investorsHtml);
}
