// Comprehensive emoji ranges based on Unicode 15.0
const EMOJI_RANGES = [
    "\u{1F300}-\u{1F9FF}", // Miscellaneous Symbols and Pictographs, Emoticons, etc.
    "\u{1FA00}-\u{1FA6F}", // Extended-A
    "\u{1FA70}-\u{1FAFF}", // Extended-B
    "\u{2600}-\u{26FF}", // Miscellaneous Symbols
    "\u{2700}-\u{27BF}", // Dingbats
    "\u{2B50}\u{2B55}", // Star and Circle
    "\u{FE00}-\u{FE0F}", // Variation Selectors
    "\u{1F1E6}-\u{1F1FF}", // Regional Indicator Symbols
    "\u{2300}-\u{23FF}", // Miscellaneous Technical
    "\u{2460}-\u{24FF}", // Enclosed Alphanumerics
    "\u{25A0}-\u{25FF}", // Geometric Shapes
    "\u{2600}-\u{26FF}", // Miscellaneous Symbols
    "\u{2700}-\u{27BF}", // Dingbats
    "\u{2900}-\u{297F}", // Supplemental Arrows-B
    "\u{2B00}-\u{2BFF}", // Miscellaneous Symbols and Arrows
    "\u{3030}\u{303D}\u{3297}\u{3299}", // Other symbols
];
// Enhanced emoticon patterns
// const EMOTICON_PATTERNS = [
//   // Base patterns with optional nose variations
//   ':[\\-\\^]\\)',   // :) :-) :^)
//   ':[\'-\\^]\\(',   // :( :-( :^(
//   ';[\\-\\^]\\)',   // ;) ;-) ;^)
//   ':[\'-\\^]D',     // :D :-D :^D
//   ':[\'-\\^]P',     // :P :-P :^P
//   ':[\'-\\^]\\|',   // :| :-| :^|
//   ':[\'-\\^]\\*',   // :* :-* :^*
//   // Basic emoticons
//   'XD', 'xD',
//   '<3',
//   '\\^_\\^',
//   '>\\.<',
//   'T_T',
//   'o\\.o', 'O\\.O',
//   'o_O', 'O_o',
//   '-_-', 'u_u', 'v_v',
//   ':3', ':B', ':J',
//   ':\\}', ':\\{',
//   '=\\)', '=\\(',
// ].map(pattern => `(${pattern})`).join('|');
/**
 * Default options for the stripEmojis function
 */
const DEFAULT_OPTIONS = {
    removeEmojis: true,
    // removeEmoticons: false,
    preserve: [],
    replaceWith: "",
};
/**
 * Creates a placeholder for preserved content
 */
const createPlaceholder = (index) => `__PRESERVED_${index}_${Math.random().toString(36).slice(2)}__`;
/**
 * Strips emojis and/or emoticons from text based on provided options
 */
export function stripEmojis(text, options = {}) {
    // Input validation
    if (typeof text !== "string") {
        throw new TypeError("Input text must be a string");
    }
    // Merge options with defaults, ensuring preserve is an array
    const finalOptions = {
        ...DEFAULT_OPTIONS,
        ...options,
        preserve: Array.isArray(options.preserve)
            ? options.preserve
            : DEFAULT_OPTIONS.preserve,
    };
    if (!finalOptions.removeEmojis) {
        return text;
    }
    // Store preserved content with placeholders
    const preservedItems = new Map();
    let modifiedText = text;
    if (finalOptions.preserve.length > 0) {
        finalOptions.preserve.forEach((item, index) => {
            if (typeof item === "string" && item.length > 0) {
                const placeholder = createPlaceholder(index);
                preservedItems.set(placeholder, item);
                // Escape special regex characters in the preserved item
                const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                modifiedText = modifiedText.replace(new RegExp(escapedItem, "g"), placeholder);
            }
        });
    }
    // Process Unicode emojis
    if (finalOptions.removeEmojis) {
        const emojiPattern = EMOJI_RANGES.join("");
        const emojiRegex = new RegExp(`[${emojiPattern}]`, "gu");
        modifiedText = modifiedText.replace(emojiRegex, finalOptions.replaceWith);
    }
    // // Process ASCII emoticons
    // if (finalOptions.removeEmoticons) {
    //   const emoticonRegex = new RegExp(EMOTICON_PATTERNS, 'g');
    //   console.log(emoticonRegex);
    //   modifiedText = modifiedText.replace(emoticonRegex, finalOptions.replaceWith);
    //   console.log(modifiedText);
    // }
    // Restore preserved items
    if (preservedItems.size > 0) {
        for (const [placeholder, original] of preservedItems) {
            modifiedText = modifiedText.replace(new RegExp(placeholder, "g"), original);
        }
    }
    return modifiedText;
}
