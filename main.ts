import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "petrichor";

// Gate mirror: entry.txt must be UTF-8 text of 1 to 24 characters,
// not only white space, and exactly one word.
if (!/^[^\s]+$/.test(WORD) || WORD.length < 1 || WORD.length > 24) {
  throw new Error("word fails the gate: must be one word of 1-24 characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, `.entry.txt.${process.pid}.tmp`);
writeFileSync(tmp, WORD + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
