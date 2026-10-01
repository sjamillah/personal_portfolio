import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { brand } from "@/lib/brand";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "assets/fonts");
  const [regular, italic] = await Promise.all([
    readFile(join(fonts, "InstrumentSerif-Regular.ttf")),
    readFile(join(fonts, "InstrumentSerif-Italic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: brand.light.paper,
          color: brand.light.ink,
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, fontFamily: "monospace", color: brand.light.inkFaint }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: brand.accent }} />
          {profile.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 1, letterSpacing: -2 }}>
          <span>{profile.headline.lead}</span>
          <span style={{ color: brand.light.accent, fontStyle: "italic" }}>{profile.headline.accent}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, borderTop: `1px solid ${brand.light.line}`, paddingTop: 24 }}>
          <span>{profile.name}</span>
          <span style={{ color: brand.light.inkFaint }}>Backend · Full-stack · Cloud · AI/ML · Accessibility</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
