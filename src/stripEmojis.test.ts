import { describe, it, expect } from 'vitest';
import stripEmojis from './stripEmojis'; // Adjust the import path as needed

describe('stripEmojis', () => {
  // Test for removing emojis
  it('should remove emojis when removeEmojis is true', () => {
    const text = 'Hello, world! 😀🌍';
    const result = stripEmojis(text, { removeEmojis: true, removeEmoticons: false });
    expect(result).toBe('Hello, world! ');
  });

  // Test for not removing emojis when removeEmojis is false
  it('should not remove emojis when removeEmojis is false', () => {
    const text = 'Hello, world! 😀🌍';
    const result = stripEmojis(text, { removeEmojis: false, removeEmoticons: false });
    expect(result).toBe(text);
  });

  // Test for removing emoticons
  it('should remove emoticons when removeEmoticons is true', () => {
    const text = 'Hello :) World :(';
    const result = stripEmojis(text, { removeEmojis: false, removeEmoticons: true });
    expect(result).toBe('Hello  World ');
  });

  // Test for not removing emoticons when removeEmoticons is false
  it('should not remove emoticons when removeEmoticons is false', () => {
    const text = 'Hello :) World :(';
    const result = stripEmojis(text, { removeEmojis: false, removeEmoticons: false });
    expect(result).toBe(text);
  });

  // Test for removing both emojis and emoticons
  it('should remove both emojis and emoticons when both flags are true', () => {
    const text = 'Happy coding! 😄 :)';
    const result = stripEmojis(text, { removeEmojis: true, removeEmoticons: true });
    expect(result).toBe('Happy coding!  ');
  });

  // Add more tests as needed for different scenarios
});
