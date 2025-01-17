/**
 * Configuration options for text stripping functionality
 */
export interface StripOptions {
  /**
   * Remove Unicode emojis when true
   * @default true
   */
  removeEmojis?: boolean;
  
  /**
   * Remove ASCII emoticons when true
   * @default false
   */
  removeEmoticons?: boolean;
  
  /**
   * Preserve specified emojis/emoticons
   * @default []
   */
  preserve?: string[];
  
  /**
   * Replace stripped content with this string
   * @default ''
   */
  replaceWith?: string;
}

// Comprehensive emoji ranges based on Unicode 15.0
const EMOJI_RANGES = [
  // Core emoji ranges
  '\u{1F300}-\u{1F9FF}', // Miscellaneous Symbols, Emoticons, Transport & Map Symbols
  '\u{1FA00}-\u{1FA6F}', // Extended-A
  '\u{1FA70}-\u{1FAFF}', // Extended-B
  '\u{2600}-\u{26FF}',   // Miscellaneous Symbols
  '\u{2700}-\u{27BF}',   // Dingbats
  '\u{2B50}\u{2B55}',    // Star and Circle
  
  // Less common ranges - can be removed if performance is a concern
  '\u{FE00}-\u{FE0F}',   // Variation Selectors
  '\u{1F1E6}-\u{1F1FF}', // Regional Indicator Symbols
] as const;

// Common ASCII emoticons
const EMOTICON_PATTERNS = [
  // Basic emoticons
  ':\\)', ':\'\\)', ':\\(', ':\'\\(', ':D', ':P', ':\\|', ':\\*',
  ';\\)', ';D', 'XD', 'xD',
  '<3', '\\^_\\^', '>\\.<', 'T_T',
  'o\\.o', 'O\\.O', 'o_O', 'O_o',
  '-_-', 'u_u', 'v_v',
  
  // Advanced emoticons
  '\\(:|-\\)', // Nose variations
  '=\\)', '=\\(',
  ':}', ':{',
  ':3', ':B', ':J',
] as const;

/**
 * Default options for the stripEmojis function
 */
const DEFAULT_OPTIONS: Required<StripOptions> = {
  removeEmojis: true,
  removeEmoticons: false,
  preserve: [],
  replaceWith: '',
} as const;

/**
 * Strips emojis and/or emoticons from text based on provided options
 * @param text - The input text to process
 * @param options - Configuration options for stripping behavior
 * @returns Processed text with emojis/emoticons removed or replaced
 * @throws {TypeError} If input text is not a string
 */
export function stripEmojis(text: string, options: StripOptions = {}): string {
  // Input validation
  if (typeof text !== 'string') {
    throw new TypeError('Input text must be a string');
  }

  // Merge options with defaults
  const finalOptions: Required<StripOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (!finalOptions.removeEmojis && !finalOptions.removeEmoticons) {
    return text;
  }

  let result = text;

  // Process Unicode emojis
  if (finalOptions.removeEmojis) {
    const emojiPattern = EMOJI_RANGES.join('');
    const emojiRegex = new RegExp(`[${emojiPattern}]`, 'gu');
    result = result.replace(emojiRegex, finalOptions.replaceWith);
  }

  // Process ASCII emoticons
  if (finalOptions.removeEmoticons) {
    const emoticonPattern = EMOTICON_PATTERNS.join('|');
    const emoticonRegex = new RegExp(emoticonPattern, 'g');
    result = result.replace(emoticonRegex, finalOptions.replaceWith);
  }

  // Restore preserved items
  if (finalOptions.preserve.length > 0) {
    const preserved = new Set(finalOptions.preserve);
    for (const item of preserved) {
      // Escape special regex characters in the preserved item
      const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const placeholder = `__PRESERVED_${Math.random().toString(36).slice(2)}__`;
      result = result
        .replace(new RegExp(escapedItem, 'g'), placeholder)
        .replace(new RegExp(placeholder, 'g'), item);
    }
  }

  return result;
}
