export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]+/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // Keep Unicode marks (\p{M}) so Bengali matras/hasants are preserved; otherwise words look spaced
    .replace(/[^\p{L}\p{N}\p{M}\s]+/gu, " ")
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
  
  // Use word-level matching to properly handle cross-language highlighting
  const words = ntext.split(/(\s+)/);
  
  // Also create a space-free version for matching multi-word terms
  const ntextNoSpace = ntext.replace(/\s+/g, "");
  
  return (
    <>
      {words.map((word, i) => {
        if (!word.trim()) return <span key={i}>{word}</span>; // preserve whitespace
        
        const wordLower = word.toLowerCase();
        let shouldHighlight = false;
        
        for (const token of tokens) {
          const tokenLower = token.toLowerCase();
          const tokenTranslit = transliterateBnToLatin(token).toLowerCase();
          
          // Direct match
          if (wordLower === tokenLower || wordLower.includes(tokenLower) || tokenLower.includes(wordLower)) {
            shouldHighlight = true;
            break;
          }
          
          // Cross-language via transliteration
          const wordTranslit = transliterateBnToLatin(word).toLowerCase();
          
          // Check if word's transliteration matches token
          if (wordTranslit && (
            wordTranslit === tokenLower || 
            wordTranslit.includes(tokenLower) || 
            tokenLower.includes(wordTranslit)
          )) {
            shouldHighlight = true;
            break;
          }
          
          // Check if word matches token's transliteration
          if (tokenTranslit && (
            wordLower === tokenTranslit || 
            wordLower.includes(tokenTranslit) || 
            tokenTranslit.includes(wordLower)
          )) {
            shouldHighlight = true;
            break;
          }
          
          // Check if word is part of a multi-word match (e.g., "আলোক" in "আলোক সংশ্লেষণ")
          const tokenNoSpace = tokenLower.replace(/\s+/g, "");
          const wordInTextNoSpace = ntextNoSpace.toLowerCase();
          if (tokenNoSpace && wordInTextNoSpace.includes(tokenNoSpace)) {
            shouldHighlight = true;
            break;
          }
          
          // CRITICAL FIX: Use synonym mapping for common English words
          // This makes "biology" highlight "জীববিজ্ঞান"
          const synonyms = getBanglaSynonyms(token);
          for (const synonym of synonyms) {
            // Check if word directly includes the synonym
            if (word.includes(synonym)) {
              shouldHighlight = true;
              break;
            }
            // Check if this specific word is part of the synonym when spaces are removed
            const synonymNoSpace = synonym.replace(/\s+/g, "");
            const wordNoSpace = word.replace(/\s+/g, "");
            if (synonymNoSpace && wordNoSpace && (
              synonymNoSpace.includes(wordNoSpace) || 
              wordNoSpace.includes(synonymNoSpace)
            )) {
              shouldHighlight = true;
              break;
            }
          }
          
          // Also check reverse: if token is Bengali, check if it's in the synonyms list
          for (const synonym of synonyms) {
            const synonymNoSpace = synonym.replace(/\s+/g, "");
            const wordNoSpace = word.replace(/\s+/g, "");
            if (synonymNoSpace && wordNoSpace && (
              synonymNoSpace.includes(wordNoSpace) ||
              wordNoSpace.includes(synonymNoSpace)
            )) {
              shouldHighlight = true;
              break;
            }
          }
          
          if (shouldHighlight) break;
        }
        
        return shouldHighlight ? (
          <mark key={i}>{word}</mark>
        ) : (
          <span key={i}>{word}</span>
        );
      })}
    </>
  );
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Basic Bengali → Latin transliteration to support Banglish search.
// This is heuristic and optimized for discoverability, not linguistic perfection.
const BN_TO_LATIN: Record<string, string> = {
  // independent vowels
  "অ": "o", "আ": "a", "ই": "i", "ঈ": "ii", "উ": "u", "ঊ": "uu", "ঋ": "ri",
  "এ": "e", "ঐ": "oi", "ও": "o", "ঔ": "ou",
  // consonants
  "ক": "k", "খ": "kh", "গ": "g", "ঘ": "gh", "ঙ": "ng",
  "চ": "ch", "ছ": "chh", "জ": "j", "ঝ": "jh", "ঞ": "ny",
  "ট": "t", "ঠ": "th", "ড": "d", "ঢ": "dh", "ণ": "n",
  "ত": "t", "থ": "th", "দ": "d", "ধ": "dh", "ন": "n",
  "প": "p", "ফ": "ph", "ব": "b", "ভ": "bh", "ম": "m",
  "য": "j", "র": "r", "ল": "l", "শ": "sh", "ষ": "sh", "স": "s", "হ": "h",
  "ক্ষ": "kkh", "ত্র": "tr", "জ্ঞ": "ggya",
  // vowel signs (matras)
  "া": "a", "ি": "i", "ী": "i", "ু": "u", "ূ": "u", "ে": "e", "ৈ": "oi", "ো": "o", "ৌ": "ou",
  // diacritics and special marks
  "ং": "ng", "ঃ": "h", "ঁ": "n", "্": "", "়": "",
  // digits
  "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  // space-like
  "\u200c": "", "\u200d": "",
};

export function transliterateBnToLatin(text: string): string {
  if (!text) return "";
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    // Try two-char ligatures first (e.g., ক্ষ)
    const two = i + 1 < text.length ? ch + text[i + 1] : "";
    if (two && BN_TO_LATIN[two]) {
      out += BN_TO_LATIN[two];
      i++;
      continue;
    }
    out += BN_TO_LATIN[ch] ?? ch;
  }
  return normalize(out);
}

// Build reverse map for English words to common Bengali translations
// This is used for highlighting when searching "biology" in Bengali text
const COMMON_SYNONYMS: Record<string, string[]> = {
  "biology": ["জীববিজ্ঞান", "জীববিদ্যা"],
  "photosynthesis": ["আলোক সংশ্লেষণ", "আলোকসংশ্লেষণ"],
  "light": ["আলো", "আলোক"],
  "photosynthesispro": ["photosynthesispro"],
  "class": ["ক্লাস", "শ্রেণী"],
  "exam": ["পরীক্ষা"],
  "test": ["টেস্ট", "পরীক্ষা"],
  "live": ["লাইভ"],
  "admission": ["ভর্তি"],
};

export function getBanglaSynonyms(word: string): string[] {
  const lowerWord = word.toLowerCase();
  return COMMON_SYNONYMS[lowerWord] || [];
}


