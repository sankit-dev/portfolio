import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Same mark as the home page avatar: an italic serif "A" on a black disc.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Subset of Instrument Serif Italic holding only the "A" glyph.
const FONT_PATH = join(process.cwd(), "public/fonts/InstrumentSerif-Italic-A.ttf");

export const renderMark = async (px: number, rounded: boolean) => {
  const font = await readFile(FONT_PATH);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          color: "#ffffff",
          borderRadius: rounded ? "50%" : 0,
          fontFamily: "Instrument Serif",
          fontStyle: "italic",
          fontSize: px * 0.62,
          paddingRight: px * 0.03,
          paddingBottom: px * 0.04,
        }}
      >
        A
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Instrument Serif", data: font, style: "italic", weight: 400 }] },
  );
};

export default function Icon() {
  return renderMark(size.width, true);
}
