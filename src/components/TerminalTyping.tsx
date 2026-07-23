import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TerminalTyping({
  text,
  speed = 45,
  className,
  startDelay = 0,
  showCaret = true,
}: {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
  showCaret?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          timeoutId = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeoutId!);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={cn("font-mono", showCaret && !done && "caret", className)}>
      {displayed}
      {showCaret && done && <span className="caret" aria-hidden="true" />}
    </span>
  );
}
