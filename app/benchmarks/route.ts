import benchmarkHtml from "../../site/benchmarks.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(benchmarkHtml);
}
