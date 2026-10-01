import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const italic = await readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Italic.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: brand.violet,
          borderRadius: 14,
          color: brand.mist,
          fontFamily: "Instrument Serif",
          fontStyle: "italic",
          fontSize: 40,
          paddingBottom: 6,
        }}
      >
        js
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 9,
            height: 9,
            borderRadius: 9,
            background: brand.signal,
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: italic, style: "italic", weight: 400 }] },
  );
}
