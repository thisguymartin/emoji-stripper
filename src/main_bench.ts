import { stripEmojis } from "./stripEmojis.ts";

Deno.bench(
  "My test description",
  () => {
    stripEmojis("hello 😄", { removeEmojis: true });
  },
);
