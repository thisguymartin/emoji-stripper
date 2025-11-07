# Changelog

All notable changes to this project will be documented in this file.

## [1.0.13] - 2025-11-07

### Fixed
- Fixed package name inconsistency in README (npm install command now shows correct package name: `emoji-stripper`)
- Fixed typo in package.json description ("Unwated Emoji's" → "Unwanted Emojis")
- Removed duplicate emoji Unicode ranges in EMOJI_RANGES array (lines 35 & 43, 36 & 44)

### Improved
- Enhanced placeholder generation security: replaced Math.random() with timestamp + counter approach for better uniqueness guarantees
- Significantly improved README with:
  - Better structure and organization
  - More comprehensive usage examples
  - Real-world use cases
  - Complete API documentation
  - TypeScript usage examples
  - Performance details

### Added
- Comprehensive test suite with 14 test cases covering:
  - Basic emoji removal
  - Emoji preservation
  - Custom replacement strings
  - Complex emoji sequences (flags, families)
  - Edge cases (empty strings, no emojis, only emojis)
  - Error handling
  - Combined options
- Added test task to deno.json

### Changed
- Converted test file from Vitest to Deno's native test framework
- Updated README to be more professional and informative

## [1.0.12] - Previous

- Package renamed to emoji-stripper
- Version bump and npm package updates
