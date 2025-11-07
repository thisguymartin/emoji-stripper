# emoji-stripper

A lightweight, zero-dependency utility to remove Unicode emojis from text strings with flexible configuration options.

## Features

- 🚀 Zero dependencies
- 🎯 Comprehensive Unicode 15.0 emoji support
- 🔧 Configurable emoji preservation
- 🔄 Custom replacement strings
- 📘 Full TypeScript support
- 🌐 Dual runtime support (Deno and Node.js)

## Installation

### Node.js / npm

```bash
npm install emoji-stripper
# or
yarn add emoji-stripper
```

### Deno

```typescript
import { stripEmojis } from "https://deno.land/x/emoji_stripper/mod.ts";
```

## Usage

### Basic Usage

```typescript
import { stripEmojis } from 'emoji-stripper';

// Remove all emojis
const text = 'Hello 👋 World 🌍';
stripEmojis(text);
// Output: 'Hello  World '
```

### Preserve Specific Emojis

Keep certain emojis while removing others:

```typescript
const text = 'Hello 👋 World 🌍 Welcome 🚀';
stripEmojis(text, {
  preserve: ['👋', '🌍']
});
// Output: 'Hello 👋 World 🌍 Welcome '
```

### Custom Replacement String

Replace removed emojis with custom text:

```typescript
const text = 'Hello 👋 World 🌍';
stripEmojis(text, {
  replaceWith: '[emoji]'
});
// Output: 'Hello [emoji] World [emoji]'
```

### Combined Options

Use multiple options together:

```typescript
const text = 'Hello 👋 World 🌍 Test 🚀';
stripEmojis(text, {
  preserve: ['👋'],
  replaceWith: '[removed]'
});
// Output: 'Hello 👋 World [removed] Test [removed]'
```

### Disable Emoji Removal

```typescript
const text = 'Hello 👋 World 🌍';
stripEmojis(text, {
  removeEmojis: false
});
// Output: 'Hello 👋 World 🌍'
```

## API

### stripEmojis(text: string, options?: StripOptions): string

Strips emojis from text based on provided options.

#### Parameters

- **text** (string): Input text to process
- **options** (StripOptions, optional): Configuration options

#### StripOptions

```typescript
interface StripOptions {
  /**
   * Remove Unicode emojis when true
   * @default true
   */
  removeEmojis?: boolean;

  /**
   * List of emojis to preserve
   * @default []
   */
  preserve?: string[];

  /**
   * String to replace removed emojis
   * @default ''
   */
  replaceWith?: string;
}
```

#### Returns

Returns a new string with emojis removed according to the specified options.

#### Throws

- **TypeError**: If the input text is not a string

## Supported Emoji Categories

This library supports a comprehensive range of Unicode 15.0 emojis including:

- 😀 Emoticons and faces
- 🌍 Nature and places
- 🚀 Objects and symbols
- 🇺🇸 Flag emojis
- 👨‍👩‍👧‍👦 Complex emoji sequences (families, etc.)
- ❤️ Emojis with variation selectors
- And many more...

## Use Cases

- **Data sanitization**: Clean user input for databases
- **Text analysis**: Remove emojis before sentiment analysis
- **Content moderation**: Filter emoji content
- **API responses**: Ensure emoji-free text output
- **Legacy system compatibility**: Remove emojis for systems that don't support them

## Performance

The library is optimized for performance with:
- Efficient regex-based matching
- Smart placeholder system for preserved emojis
- Minimal memory footprint
- No external dependencies

## Examples

### Social Media Post Processing

```typescript
const post = "Just launched my new app! 🚀🎉 Check it out! 👇";
const cleanPost = stripEmojis(post);
// Output: "Just launched my new app!  Check it out! "
```

### Selective Emoji Filtering

```typescript
const message = "Great work! 👍 Keep it up! 🔥 You're amazing! ⭐";
const filtered = stripEmojis(message, {
  preserve: ['👍'],
  replaceWith: ''
});
// Output: "Great work! 👍 Keep it up!  You're amazing! "
```

### Database Preparation

```typescript
const userBio = "Developer 💻 | Coffee lover ☕ | Open source contributor 🌟";
const dbSafeBio = stripEmojis(userBio, {
  replaceWith: ' '
});
// Output: "Developer   | Coffee lover   | Open source contributor  "
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { stripEmojis, StripOptions } from 'emoji-stripper';

const options: StripOptions = {
  removeEmojis: true,
  preserve: ['✅'],
  replaceWith: ''
};

const result: string = stripEmojis('Task completed ✅', options);
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/thisguymartin/emoji-stripper](https://github.com/thisguymartin/emoji-stripper)

## Issues

Found a bug or have a feature request? [Open an issue](https://github.com/thisguymartin/emoji-stripper/issues)
