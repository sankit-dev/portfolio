// Completion for the terminal easter egg. Pure functions: given what's typed, what could come next.

export type CompletionSource = {
  commands: string[];
  dirs: string[];
  // Argument choices per command, e.g. cat -> ["now.txt", "contact.txt"].
  args: Record<string, string[]>;
};

export type Completion = {
  // Everything typed before the word being completed, kept as is.
  head: string;
  // The partial word under the cursor.
  word: string;
  // Full candidates for that word, in display order.
  options: string[];
};

export const complete = (value: string, source: CompletionSource): Completion => {
  const lastSpace = value.lastIndexOf(" ");
  const head = value.slice(0, lastSpace + 1);
  const word = value.slice(lastSpace + 1);
  const before = head.trim();
  const atCommand = !before;

  // At the start, a bare directory name works too (it acts like `cd`), so offer both.
  // Later words look up the full phrase first ("sudo hire"), then just the command ("cd").
  const pool = atCommand ? [...source.commands, ...source.dirs] : (source.args[before] ?? source.args[before.split(/\s+/)[0]] ?? []);
  const options = [...new Set(pool)].filter((option) => option.startsWith(word) && (option !== word || !atCommand));
  return { head, word, options };
};

// Longest prefix shared by every option, so one Tab fills in what's unambiguous.
export const commonPrefix = (options: string[]) =>
  options.reduce((prefix, option) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === option[i]) i += 1;
    return prefix.slice(0, i);
  }, options[0] ?? "");
