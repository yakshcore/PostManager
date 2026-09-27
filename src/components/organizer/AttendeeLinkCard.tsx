"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Icon } from "@/components/ui/Icon";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { eventSlug } from "@/lib/event-config";

interface AttendeeLinkCardProps {
  link: string;
  eventName: string;
}

export function AttendeeLinkCard({ link, eventName }: AttendeeLinkCardProps) {
  const { copied, copy } = useCopyToClipboard();
  const [qrSvg, setQrSvg] = useState("");

  useEffect(() => {
    if (!link.startsWith("http")) return;
    let cancelled = false;
    QRCode.toString(link, { type: "svg", margin: 0, errorCorrectionLevel: "L", color: { dark: "#131b2e", light: "#0000" } })
      .then((svg) => !cancelled && setQrSvg(svg))
      .catch(() => setQrSvg(""));
    return () => {
      cancelled = true;
    };
  }, [link]);

  const downloadQr = async () => {
    const url = await QRCode.toDataURL(link, { width: 1024, margin: 2, errorCorrectionLevel: "M" });
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventSlug(eventName)}-attendee-qr.png`;
    a.click();
  };

  const previewHref = link.replace(/^https?:\/\/[^/]+/, "");

  return (
    <div className="p-4 rounded-xl bg-surface-container space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
          <Icon name="share" className="text-primary-container text-[18px]" />
          Attendee Shareable Portal Link
        </span>
        <span className="text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container" />
          Active Link
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="w-full min-w-0 px-3 py-2 rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface truncate select-all focus:outline-none"
          readOnly
          type="text"
          value={link}
          aria-label="Attendee portal link"
          onFocus={(e) => e.target.select()}
        />
        <button
          className={`px-3 py-2 rounded-lg text-on-primary font-label-md text-label-md font-semibold transition-all shrink-0 flex items-center gap-1.5 active:scale-95 shadow-sm ${
            copied ? "bg-tertiary-container" : "bg-primary-container hover:bg-primary"
          }`}
          type="button"
          onClick={() => copy(link)}
        >
          <Icon name={copied ? "check" : "content_copy"} className="text-[16px]" />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <div
          className="w-14 h-14 bg-surface-container-lowest rounded-lg p-1.5 shrink-0 flex items-center justify-center shadow-sm [&>svg]:w-full [&>svg]:h-full"
          role="img"
          aria-label="QR code for the attendee link"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <div className="flex-1 space-y-1">
          <p className="font-body-sm text-body-sm text-on-surface font-medium leading-tight">Display on presenter slides</p>
          <button
            className="text-primary-container hover:text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 disabled:opacity-50"
            type="button"
            onClick={downloadQr}
            disabled={!qrSvg}
          >
            <Icon name="qr_code_2" className="text-[16px]" />
            Download QR for Slides / Badges
          </button>
        </div>
      </div>
      <Link
        className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary-container font-label-lg text-label-lg font-semibold hover:bg-primary-container hover:text-on-primary transition-all shadow-sm group"
        href={previewHref || "/attendee"}
      >
        <span>Preview Attendee Experience</span>
        <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
