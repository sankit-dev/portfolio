"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { DEPTHS, currentHole } from "@/data/rabbit-holes";
import { NAV, PROJECTS, SITE } from "@/data/site";
import { isTypingIn, TERMINAL_EVENT, toggleSource } from "@/lib/overlays";
import { commonPrefix, complete, type CompletionSource } from "@/lib/terminal-complete";
import { isDark, switchTheme } from "@/lib/theme-switch";

type Line = { id: number; kind: "in" | "out" | "err"; text: ReactNode };

const PROMPT = "~ $";
const DIRS: Record<string, string> = { "~": "/", home: "/", "rabbit-holes": "/rabbit-holes", ...Object.fromEntries(NAV.map((n) => [n.href.slice(1), n.href])) };
const COMMANDS = ["help", "whoami", "ls", "cat", "cd", "open", "theme", "source", "date", "echo", "sudo", "clear", "exit"];
// Commands that take an argument get a trailing space when completed, ready for the next word.
const TAKES_ARG = new Set(["ls", "cat", "cd", "open", "theme", "echo", "sudo"]);
const DIR_NAMES = Object.keys(DIRS).filter((d) => d !== "~");
const SOURCE: CompletionSource = {
  commands: COMMANDS,
  dirs: DIR_NAMES,
  args: { cd: DIR_NAMES, open: DIR_NAMES, cat: ["now.txt", "contact.txt"], ls: ["projects"], theme: ["light", "dark"], sudo: ["hire"], "sudo hire": ["ankit"] },
};

// While Tab cycles through options, the list stays frozen; any other key unfreezes it.
type Cycle = { head: string; options: string[]; index: number };

const HELP = `available commands:
  whoami            who is this guy
  ls [projects]     look around
  cat <file>        now.txt, contact.txt
  cd <dir>          go to a page (work, projects, blog, books, rabbit-holes)
  theme [light|dark]
  source            show what powers each section
  date              my local time
  sudo hire ankit   you know you want to
  clear, exit

tab completes (press again to cycle), → accepts the grey suggestion.
a bare page name like "work" works like cd.`;

const WELCOME = `ankit's portfolio, terminal edition. type \`help\` to start.`;

export const Terminal = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ id: 0, kind: "out", text: WELCOME }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyAt, setHistoryAt] = useState(-1);
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const nextId = useRef(1);
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.key === "`" || e.key === "~") && !isTypingIn(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(TERMINAL_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(TERMINAL_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    input.current?.focus();
  }, [open]);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [lines]);

  const print = (...out: { kind?: Line["kind"]; text: ReactNode }[]) =>
    setLines((prev) => [...prev, ...out.map((o) => ({ id: nextId.current++, kind: o.kind ?? "out", text: o.text }))]);

  const navigate = (dir: string) => {
    const href = DIRS[dir.replace(/\/$/, "")];
    if (!href) return print({ kind: "err", text: `cd: no such directory: ${dir}` });
    print({ text: `→ ${href}` });
    router.push(href);
    setTimeout(close, 250);
  };

  const execute = (raw: string) => {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    switch (cmd) {
      case "":
        return;
      case "help":
        return print({ text: HELP });
      case "whoami":
        return print({ text: `${SITE.name}. software engineer, backend tinkerer, professional rabbit-hole diver.` });
      case "ls":
        if (arg === "projects" || arg === "projects/") {
          return print({ text: PROJECTS.map((p) => `${p.status === "shipped" ? "✓" : "…"} ${p.name.padEnd(12)} ${p.summary}`).join("\n") });
        }
        return print({ text: "work/  projects/  blog/  books/  rabbit-holes/  now.txt  contact.txt" });
      case "cat": {
        if (arg === "now.txt") {
          const hole = currentHole();
          return print({ text: hole ? `digging into: ${hole.topic}\ndepth: ${DEPTHS[hole.depth].label}\nso far: ${hole.learned}` : "back at the surface. for now." });
        }
        if (arg === "contact.txt") {
          return print({ text: `email     ${SITE.email}\ngithub    ${SITE.socials.github}\nx         ${SITE.socials.x}\nlinkedin  ${SITE.socials.linkedin}` });
        }
        return print({ kind: "err", text: arg ? `cat: ${arg}: no such file` : "cat: which file? try now.txt" });
      }
      case "cd":
      case "open":
        return arg ? navigate(arg) : navigate("~");
      case "theme": {
        const next = arg === "light" || arg === "dark" ? arg : isDark() ? "light" : "dark";
        switchTheme(setTheme, next);
        return print({ text: `theme: ${next}` });
      }
      case "source": {
        const on = toggleSource();
        if (on) setTimeout(close, 400);
        return print({ text: on ? "source mode on. every section is labelled with its component and data." : "source mode off." });
      }
      case "date":
        return print({
          text: `${new Date().toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit", timeZone: SITE.timeZone })} in ${SITE.place}`,
        });
      case "echo":
        return print({ text: arg });
      case "sudo":
        if (arg.replace(/\s+/g, " ") === "hire ankit") {
          navigator.clipboard?.writeText(SITE.email).catch(() => undefined);
          return print({ text: `[sudo] permission granted.\nemail copied to clipboard: ${SITE.email}\ntalk soon.` });
        }
        return print({ kind: "err", text: "nice try." });
      case "clear":
        return setLines([]);
      case "exit":
        return close();
      default:
        // Bare directory names work like `cd`.
        if (DIRS[cmd.replace(/\/$/, "")]) return navigate(cmd);
        return print({ kind: "err", text: `command not found: ${cmd}. try \`help\`` });
    }
  };

  const live = complete(value, SOURCE);
  const options = cycle?.options ?? live.options;
  const typedPart = cycle ? "" : live.word;
  const showSuggestions = Boolean(cycle) || (value.trim() !== "" && live.options.length > 0);
  // Inline ghost text: the rest of the best match, shown after the cursor.
  const ghost = !cycle && value && live.options[0] ? live.options[0].slice(live.word.length) : "";

  const accept = (option: string) => {
    const completed = `${live.head}${option}`;
    // Add a space when another word is expected: after a command that takes an argument, or a phrase like "sudo hire".
    const expectsMore = (!live.head.trim() && TAKES_ARG.has(option)) || SOURCE.args[completed.trim()] !== undefined;
    setValue(expectsMore ? `${completed} ` : completed);
    setCycle(null);
    input.current?.focus();
  };

  const onTab = (backwards: boolean) => {
    if (cycle) {
      const index = (cycle.index + (backwards ? -1 : 1) + cycle.options.length) % cycle.options.length;
      setCycle({ ...cycle, index });
      setValue(`${cycle.head}${cycle.options[index]}`);
      return;
    }
    const { head, word, options: found } = live;
    if (found.length === 0) return;
    if (found.length === 1) return accept(found[0]);
    const shared = commonPrefix(found);
    // First Tab fills in what every option agrees on; once that's used up, Tab starts cycling.
    if (shared.length > word.length) return setValue(`${head}${shared}`);
    const index = backwards ? found.length - 1 : 0;
    setCycle({ head, options: found, index });
    setValue(`${head}${found[index]}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab(e.shiftKey);
      return;
    }
    if (e.key !== "Shift") setCycle(null);
    if (e.key === "Escape") {
      e.preventDefault();
      // First Escape backs out of cycling; the next one closes.
      if (cycle) setValue(cycle.head);
      else close();
    } else if (e.key === "Enter") {
      e.preventDefault();
      print({ kind: "in", text: value });
      if (value.trim()) setHistory((h) => [value, ...h]);
      setHistoryAt(-1);
      execute(value);
      setValue("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const at = Math.min(Math.max(historyAt + (e.key === "ArrowUp" ? 1 : -1), -1), history.length - 1);
      setHistoryAt(at);
      setValue(at === -1 ? "" : history[at]);
    } else if (e.key === "ArrowRight" && ghost && e.currentTarget.selectionStart === value.length) {
      e.preventDefault();
      accept(live.options[0]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  if (!open) return null;

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="terminal" role="dialog" aria-modal="true" aria-label="Terminal">
        <div className="terminal-bar">
          <button type="button" className="terminal-close" aria-label="Close terminal" onClick={close} />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <span className="label">ankit@portfolio: ~</span>
        </div>
        <div ref={screen} className="terminal-screen" onClick={() => input.current?.focus()}>
          {lines.map((line) => (
            <pre key={line.id} className={`terminal-line ${line.kind}`}>
              {line.kind === "in" && <span className="terminal-prompt">{PROMPT} </span>}
              {line.text}
            </pre>
          ))}
          <label className="terminal-input">
            <span className="terminal-prompt">{PROMPT}</span>
            <span className="terminal-field">
              {/* Ghost completion sits behind the input, lined up by rendering the typed text invisibly first. */}
              <span className="terminal-ghost" aria-hidden="true">
                <span>{value}</span>
                {ghost}
              </span>
              <input
                ref={input}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setCycle(null);
                }}
                onKeyDown={onKeyDown}
                aria-label="Command"
                aria-describedby="terminal-suggestions"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </span>
          </label>
          <div id="terminal-suggestions" className="terminal-suggestions" aria-live="polite">
            {showSuggestions &&
              options.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  className="terminal-chip"
                  data-selected={cycle?.index === i}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => accept(option)}
                >
                  <b>{option.slice(0, typedPart.length)}</b>
                  {option.slice(typedPart.length)}
                </button>
              ))}
            {showSuggestions && <span className="terminal-hint">tab to complete</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
