import { DiveLog } from "@/components/site/dive-log";
import { RABBIT_HOLES } from "@/data/rabbit-holes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rabbit holes",
  description: "A dive log of everything I went way too deep on, and how far down I got.",
};

export default function RabbitHolesPage() {
  return (
    <section className="page" data-src="DiveLog ← RABBIT_HOLES">
      <div className="page-head">
        <h1 className="page-title">Rabbit holes <em>a dive log</em></h1>
        <span className="label">{RABBIT_HOLES.length} dives</span>
      </div>
      <p className="dim" style={{ margin: "10px 0 0", fontSize: 16 }}>
        Everything I went way too deep on, and how far down I got before coming up for air.
      </p>
      <DiveLog holes={RABBIT_HOLES} />
    </section>
  );
}
