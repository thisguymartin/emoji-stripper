// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "emoji-stripper-ts",
    version: Deno.args[0],
    description: "Remove Unwated Emoji's From Your Text",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/thisguymartin/emoji-stripper-ts.git",
    },
    bugs: {
      url: "https://github.com/thisguymartin/emoji-stripper-ts/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync("LICENSE", "npm/LICENSE");
    // Deno.copyFileSync("README.md", "npm/README.md");
  },
});
