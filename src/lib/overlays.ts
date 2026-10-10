// The command palette and the terminal open each other, and the header button opens the palette.
// They talk through window events so neither has to know where the other is mounted.

export const PALETTE_EVENT = "site:open-palette";
export const TERMINAL_EVENT = "site:open-terminal";

export const openPalette = () => window.dispatchEvent(new Event(PALETTE_EVENT));
export const openTerminal = () => window.dispatchEvent(new Event(TERMINAL_EVENT));

// "View source" mode: a data-source attribute on <html> makes CSS label every [data-src] section.
export const SOURCE_EVENT = "site:source-changed";

export const toggleSource = (force?: boolean) => {
  const on = document.documentElement.toggleAttribute("data-source", force);
  window.dispatchEvent(new Event(SOURCE_EVENT));
  return on;
};

// Shortcuts must not fire while the visitor is typing somewhere.
export const isTypingIn = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
