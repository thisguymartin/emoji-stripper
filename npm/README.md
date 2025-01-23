# emoji-stripper

A lightweight utility to remove Unicode emojis from text strings while preserving specified characters.

## Installation

```bash
npm install strip-emojis 
# or 
yarn add strip-emojis
```

## Usage

```typescript
import { stripEmojis } from 'strip-emojis';

// Basic usage
stripEmojis('Hello 👋 World 🌍'); // Returns: 'Hello  World '

// Preserve specific emojis
stripEmojis('Hello 👋 World 🌍', {
  preserve: ['👋']
}); // Returns: 'Hello 👋 World '

// Replace with custom string
stripEmojis('Hello 👋 World 🌍', {
  replaceWith: ' [emoji] '
}); // Returns: 'Hello [emoji] World [emoji] '
```

## API

### stripEmojis(text: string, options?: StripOptions): string

Strips emojis from text based on provided options.

#### Parameters

- `text` (string): Input text to process
- `options` (StripOptions, optional): Configuration options

#### StripOptions

```typescript
interface StripOptions {
  // Remove Unicode emojis when true
  removeEmojis?: boolean; // default: true
  
  // List of emojis to preserve
  preserve?: string[]; // default: []
  
  // String to replace removed emojis
  replaceWith?: string; // default: ''
}
```

## Features

- Comprehensive Unicode 15.0 emoji support
- Configurable preservation of specific emojis
- Custom replacement strings
- TypeScript support
- Zero dependencies

## License

MIT