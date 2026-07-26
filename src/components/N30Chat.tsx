import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import n30Asset from "@/assets/n30.png";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "> N30 online. Ask me about the Summit — hackathon, schedule, venue, speakers, or registration.",
};

export function N30Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("/api/n30-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await resp.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ||
        data.error ||
        "> Signal unstable. Try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "> Signal lost. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open N30 chat"
          className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00ff9c] bg-black shadow-lg transition-transform hover:scale-105"
          style={{ boxShadow: "0 0 20px rgba(0,255,156,0.55)" }}
        >
          <img
            src={n30Asset}
            alt="N30"
            className="h-14 w-14 rounded-full object-cover object-top"
            draggable={false}
          />
          <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-[#00ff9c]" />
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-6 right-6 z-40 flex h-[520px] w-[92vw] max-w-sm flex-col rounded-md border border-[#00ff9c]/70 bg-black/95 font-mono text-xs text-[#00ff9c] animate-fade-in"
          style={{ boxShadow: "0 0 30px rgba(0,255,156,0.35)" }}
          role="dialog"
          aria-label="N30 chat"
        >
          <header className="flex items-center justify-between border-b border-[#00ff9c]/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <img
                src={n30Asset}
                alt=""
                className="h-8 w-8 rounded-full border border-[#00ff9c]/50 object-cover object-top"
              />
              <div>
                <div className="text-sm uppercase tracking-widest">N30</div>
                <div className="text-[10px] opacity-70">Summit guide · online</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded p-1 text-[#00ff9c]/70 hover:text-[#00ff9c]"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded border border-[#00ff9c]/40 bg-[#00ff9c]/10 px-2 py-1.5 text-[#c6ffe4]"
                    : "mr-auto max-w-[90%] whitespace-pre-wrap text-[#00ff9c]"
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto text-[#00ff9c]">
                <span className="opacity-80">&gt; </span>
                <span className="caret" aria-hidden="true" />
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-[#00ff9c]/40 px-2 py-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <span className="text-[#00ff9c]">&gt;</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the Summit..."
              className="flex-1 bg-transparent text-[#00ff9c] placeholder:text-[#00ff9c]/40 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="rounded border border-[#00ff9c]/60 p-1.5 text-[#00ff9c] transition hover:bg-[#00ff9c]/10 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
