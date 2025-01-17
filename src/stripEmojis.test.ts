import { describe, it, expect } from 'vitest';
import { stripEmojis } from './stripEmojis';

describe('stripEmojis', () => {
  describe('Basic Functionality', () => {
    it('should remove emojis when removeEmojis is true', () => {
      const text = 'Hello, world! 😀🌍';
      const result = stripEmojis(text, { removeEmojis: true, removeEmoticons: false });
      expect(result).toBe('Hello, world! ');
    });

    it('should not remove emojis when removeEmojis is false', () => {
      const text = 'Hello, world! 😀🌍';
      const result = stripEmojis(text, { removeEmojis: false, removeEmoticons: false });
      expect(result).toBe(text);
    });

    it('should remove emoticons when removeEmoticons is true', () => {
      const text = 'Hello :) World :(';
      const result = stripEmojis(text, { removeEmojis: false, removeEmoticons: true });
      expect(result).toBe('Hello  World ');
    });

    it('should not remove emoticons when removeEmoticons is false', () => {
      const text = 'Hello :) World :(';
      const result = stripEmojis(text, { removeEmojis: false, removeEmoticons: false });
      expect(result).toBe(text);
    });

    it('should remove both emojis and emoticons when both flags are true', () => {
      const text = 'Happy coding! 😄 :)';
      const result = stripEmojis(text, { removeEmojis: true, removeEmoticons: true });
      expect(result).toBe('Happy coding!  ');
    });
  });

  describe('Default Options', () => {
    it('should use default options when none provided', () => {
      const text = 'Hello 👋 World :)';
      const result = stripEmojis(text);
      expect(result).toBe('Hello  World :)');
    });

    it('should handle partial options object', () => {
      const text = 'Hello 👋 World :)';
      const result = stripEmojis(text, { removeEmoticons: true });
      expect(result).toBe('Hello  World ');
    });
  });

  describe('Preservation Feature', () => {
    it('should preserve specified emojis', () => {
      const text = 'Hello 👋 World 😊';
      const result = stripEmojis(text, { 
        removeEmojis: true, 
        preserve: ['👋']
      });
      expect(result).toBe('Hello 👋 World ');
    });

    it('should preserve specified emoticons', () => {
      const text = 'Hello :) World :( and :D';
      const result = stripEmojis(text, {
        removeEmoticons: true,
        preserve: [':)']
      });
      expect(result).toBe('Hello :) World  and ');
    });

    it('should handle multiple preserved items', () => {
      const text = 'Hi 👋 World 😊 :) <3';
      const result = stripEmojis(text, {
        removeEmojis: true,
        removeEmoticons: true,
        preserve: ['👋', ':)']
      });
      expect(result).toBe('Hi 👋 World  :) ');
    });
  });

  describe('Replacement Feature', () => {
    it('should replace emojis with specified string', () => {
      const text = 'Hello 👋 World 😊';
      const result = stripEmojis(text, {
        removeEmojis: true,
        replaceWith: '[emoji]'
      });
      expect(result).toBe('Hello [emoji] World [emoji]');
    });

    it('should replace emoticons with specified string', () => {
      const text = 'Hello :) World :( and :D';
      const result = stripEmojis(text, {
        removeEmoticons: true,
        replaceWith: '[emoticon]'
      });
      expect(result).toBe('Hello [emoticon] World [emoticon] and [emoticon]');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      expect(stripEmojis('')).toBe('');
    });

    it('should handle string with only emojis', () => {
      expect(stripEmojis('😀😃😄😁')).toBe('');
    });

    it('should handle string with only emoticons', () => {
      expect(stripEmojis(':):(:D:P', { removeEmoticons: true })).toBe('');
    });

    it('should handle null preserve array', () => {
      const text = 'Hello 👋 World';
      const result = stripEmojis(text, {
        removeEmojis: true,
        preserve: null as any
      });
      expect(result).toBe('Hello  World');
    });

    it('should handle complex emoticons', () => {
      const text = 'Hello :-) World :^) and :‑D';
      const result = stripEmojis(text, { removeEmoticons: true });
      expect(result).toBe('Hello  World  and ');
    });
  });

  describe('Error Handling', () => {
    it('should throw TypeError for non-string input', () => {
      expect(() => stripEmojis(123 as any)).toThrow(TypeError);
      expect(() => stripEmojis(null as any)).toThrow(TypeError);
      expect(() => stripEmojis(undefined as any)).toThrow(TypeError);
    });

    it('should handle invalid preserve items gracefully', () => {
      const text = 'Hello 👋 World 😊';
      const result = stripEmojis(text, {
        removeEmojis: true,
        preserve: ['invalid-emoji']
      });
      expect(result).toBe('Hello  World ');
    });
  });

  describe('Unicode Coverage', () => {
    it('should handle various Unicode emoji categories', () => {
      const text = `
        Smileys: 😀😃😄
        Animals: 🐶🐱🐭
        Food: 🍎🍐🍊
        Activities: ⚽️🏀🏈
        Travel: 🚗✈️🚢
        Objects: 💡📱⌚️
        Symbols: ❤️💔💌
        Flags: 🏳️🏴🏁
      `;
      const result = stripEmojis(text);
      expect(result).toBe(`
        Smileys: 
        Animals: 
        Food: 
        Activities: 
        Travel: 
        Objects: 
        Symbols: 
        Flags: 
      `);
    });

    it('should handle emoji variations and modifiers', () => {
      const text = '👍🏻👍🏼👍🏽👍🏾👍🏿';
      expect(stripEmojis(text)).toBe('');
    });

    it('should handle zero-width joiner (ZWJ) sequences', () => {
      const text = '👨‍👩‍👧‍👦 👨‍💻 👩‍🌾';
      expect(stripEmojis(text)).toBe('  ');
    });
  });
});