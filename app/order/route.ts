import orderHtml from "../../site/order.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(orderHtml);
}
