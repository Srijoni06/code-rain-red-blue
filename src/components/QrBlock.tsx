import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export function QrBlock({
  value,
  caption,
  size = 140,
}: {
  value?: string;
  caption?: string;
  size?: number;
}) {
  const [url, setUrl] = useState(value ?? "");
  useEffect(() => {
    if (!value && typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, [value]);

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="rgb-border rounded-md bg-black p-3">
        {url ? (
          <QRCodeCanvas
            value={url}
            size={size}
            bgColor="#000000"
            fgColor="#ffffff"
            level="M"
            marginSize={1}
          />
        ) : (
          <div style={{ width: size, height: size }} className="bg-black" />
        )}
      </div>
      {caption && (
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}
