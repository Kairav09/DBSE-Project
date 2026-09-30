import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { getBotReply, getQuickReplies, getGreeting } from "../data/chatbotBrain";
import "./Chatbot.css";

// Minimal rich-text renderer: **bold**, "- " bullets, blank-line spacing.
function renderRich(text) {
  const lines = String(text).split("\n");
  const out = [];
  let list = [];
  const flushList = () => {
    if (list.length) {
      out.push(
        <ul key={`ul-${out.length}`} className="cb-list">
          {list}
        </ul>
      );
      list = [];
    }
  };
  const inline = (s, keyBase) =>
    s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
        <strong key={`${keyBase}-${i}`}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={`${keyBase}-${i}`}>{part}</span>
      )
    );
  lines.forEach((line, i) => {
    if (line.startsWith("- ")) {
      list.push(<li key={`li-${i}`}>{inline(line.slice(2), `li-${i}`)}</li>);
    } else {
      flushList();
      if (line.trim() === "") {
        out.push(<div key={`gap-${i}`} className="cb-gap" />);
      } else {
        out.push(
          <p key={`p-${i}`} className="cb-para">
            {inline(line, `p-${i}`)}
          </p>
        );
      }
    }
  });
  flushList();
  return out;
}

export default function Chatbot({ role = "donor" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const greetedRef = useRef(false);
  const timerRef = useRef(null);
  const goToTimerRef = useRef(null);

  const pushBot = (reply) =>
    setMessages((m) => [...m, { from: "bot", text: reply.text, actions: reply.actions || [] }]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && !greetedRef.current) {
      greetedRef.current = true;
      pushBot(getGreeting(role));
    }
  };

  const send = (raw) => {
    const text = String(raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = getBotReply(text, role);
    // Deterministic-feeling variation in the typing pause (kept pure for lint).
    const delay = 650 + ((text.length * 37) % 400);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      pushBot(reply);
      if (reply.goTo) {
        goToTimerRef.current = setTimeout(() => {
          setOpen(false);
          navigate(reply.goTo);
        }, 900);
      }
    }, delay);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") send();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open ]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (goToTimerRef.current) clearTimeout(goToTimerRef.current);
    };
  }, []);

  const quickReplies = getQuickReplies(role);

  return (
    <div className="cb-root">
      {open && (
        <section className="cb-panel" role="dialog" aria-label="Setu assistant chat">
          <header className="cb-header">
            <div className="cb-bot-avatar">
              <Sparkles size={18} strokeWidth={2.4} />
            </div>
            <div className="cb-header-text">
              <div className="cb-title">Setu</div>
              <div className="cb-sub">
                <span className="cb-dot" /> Blood bank assistant
              </div>
            </div>
            <button className="cb-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={17} strokeWidth={2.4} />
            </button>
          </header>

          <div className="cb-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cb-msg cb-msg--${msg.from}`}>
                <div className="cb-bubble">
                  {msg.from === "bot" ? renderRich(msg.text) : msg.text}
                  {msg.from === "bot" && msg.actions?.length > 0 && (
                    <div className="cb-actions">
                      {msg.actions.map((a, j) => (
                        <button
                          key={j}
                          className="cb-action"
                          onClick={() => {
                            setOpen(false);
                            navigate(a.to);
                          }}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="cb-msg cb-msg--bot">
                <div className="cb-bubble cb-typing" aria-label="Setu is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="cb-quick">
            {quickReplies.map((q) => (
              <button key={q} className="cb-chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>

          <div className="cb-inputbar">
            <input
              ref={inputRef}
              className="cb-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask Setu anything…"
              aria-label="Message Setu"
              maxLength={300}
            />
            <button
              className="cb-send"
              onClick={() => send()}
              disabled={!input.trim() || typing}
              aria-label="Send message"
            >
              <Send size={16} strokeWidth={2.4} />
            </button>
          </div>
        </section>
      )}

      <button
        className={`cb-fab${open ? " is-open" : ""}`}
        onClick={toggle}
        aria-label={open ? "Close Setu chat" : "Open Setu chat"}
      >
        {open ? <X size={22} strokeWidth={2.4} /> : <MessageCircle size={22} strokeWidth={2.4} />}
      </button>
    </div>
  );
}
