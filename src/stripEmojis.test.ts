import { assertEquals, assertThrows } from "@std/assert";
import { stripEmojis } from "./stripEmojis.ts";

Deno.test("stripEmojis - should remove emojis by default", () => {
  const text = "Hello, world! 😀🌍";
  const result = stripEmojis(text);
  assertEquals(result, "Hello, world! ");
});

Deno.test("stripEmojis - should remove emojis when removeEmojis is true", () => {
  const text = "Hello, world! 😀🌍";
  const result = stripEmojis(text, { removeEmojis: true });
  assertEquals(result, "Hello, world! ");
});

Deno.test("stripEmojis - should not remove emojis when removeEmojis is false", () => {
  const text = "Hello, world! 😀🌍";
  const result = stripEmojis(text, { removeEmojis: false });
  assertEquals(result, text);
});

Deno.test("stripEmojis - should preserve specified emojis", () => {
  const text = "Hello 👋 World 🌍";
  const result = stripEmojis(text, { preserve: ["👋"] });
  assertEquals(result, "Hello 👋 World ");
});

Deno.test("stripEmojis - should replace emojis with custom string", () => {
  const text = "Hello 👋 World 🌍";
  const result = stripEmojis(text, { replaceWith: "[emoji]" });
  assertEquals(result, "Hello [emoji] World [emoji]");
});

Deno.test("stripEmojis - should handle multiple preserved emojis", () => {
  const text = "Hello 👋 World 🌍 Test 🚀";
  const result = stripEmojis(text, { preserve: ["👋", "🌍"] });
  assertEquals(result, "Hello 👋 World 🌍 Test ");
});

Deno.test("stripEmojis - should handle flag emojis", () => {
  const text = "USA 🇺🇸 and UK 🇬🇧";
  const result = stripEmojis(text);
  assertEquals(result, "USA  and UK ");
});

Deno.test("stripEmojis - should handle complex emoji sequences", () => {
  const text = "Family 👨‍👩‍👧‍👦 and heart ❤️";
  const result = stripEmojis(text);
  assertEquals(result, "Family  and heart ");
});

Deno.test("stripEmojis - should throw error for non-string input", () => {
  assertThrows(
    () => stripEmojis(123 as any),
    TypeError,
    "Input text must be a string",
  );
});

Deno.test("stripEmojis - should handle empty string", () => {
  const result = stripEmojis("");
  assertEquals(result, "");
});

Deno.test("stripEmojis - should handle string with no emojis", () => {
  const text = "Hello, world!";
  const result = stripEmojis(text);
  assertEquals(result, "Hello, world!");
});

Deno.test("stripEmojis - should handle string with only emojis", () => {
  const text = "😀🌍👋🚀";
  const result = stripEmojis(text);
  assertEquals(result, "");
});

Deno.test("stripEmojis - should combine preserve and replaceWith options", () => {
  const text = "Hello 👋 World 🌍 Test 🚀";
  const result = stripEmojis(text, {
    preserve: ["👋"],
    replaceWith: "[removed]",
  });
  assertEquals(result, "Hello 👋 World [removed] Test [removed]");
});
