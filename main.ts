// Funniest Time Machine Warning Label — make.fun entry
// Writes one warning label (1-120 chars) to /output/entry.txt.
// The entry text is embedded in this file: no file reads, no network, no secrets.
// Judge brief: a real time-travel hazard (the grandfather paradox) turned into
// the joke, phrased like a genuine safety notice, surprise saved for the end.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "WARNING: Do not kill your grandfather. He has not finished your paperwork yet.";

// Resolve the output directory from the environment; the entry file itself is
// the only source of the text, so no path resolution can fail on another cwd.
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`entry length ${chars} is outside the 1-120 gate`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt: ${chars} chars`);
}

main();
