import projectedIntelligenceHtml from "../../site/projected-intelligence.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(projectedIntelligenceHtml);
}
