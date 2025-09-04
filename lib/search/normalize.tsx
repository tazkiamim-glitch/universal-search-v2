export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]+/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(input: string): string[] {
  const n = normalize(input);
  return n.length ? n.split(" ") : [];
}

// Script helpers (no cross-script fuzzy)
export function isBengaliToken(token: string): boolean {
  return /[\u0980-\u09FF]/.test(token);
}

export function isLatinToken(token: string): boolean {
  return /[A-Za-z]/.test(token);
}

export function highlight(text: string, tokens: string[]): JSX.Element {
  const ntext = text ?? "";
  if (!tokens.length) return <>{ntext}</>;
  const pattern = new RegExp(`(${tokens.map(t => escapeRegExp(t)).join("|")})`, "gi");
  const parts = ntext.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        tokens.some(t => part.toLowerCase().includes(t.toLowerCase())) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


