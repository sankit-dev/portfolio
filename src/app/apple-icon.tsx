import { renderMark } from "./icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so the square fills edge to edge.
export default function AppleIcon() {
  return renderMark(size.width, false);
}
