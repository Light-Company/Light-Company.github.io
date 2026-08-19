import galleryHtml from "../../site/gallery.html?raw";
import { htmlResponse } from "../html-response";

export function GET() {
  return htmlResponse(galleryHtml);
}
