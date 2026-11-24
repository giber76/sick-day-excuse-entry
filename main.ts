import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Sick-Day Excuse.
// The joke is a back injury with paperwork: a sneeze so violent it
// throws the sender's back out, and the spine responds the way an
// office would — by filing a workers' compensation claim. HR then
// keeps the sender home while the case is pending, so the excuse
// enforces itself. Sneezing your back out is something a boss has
// heard of and half believes; the claim, and the case that still has
// to be dropped, is the part the office will quote back.
// The punch word ("case") is the last word of the line.
const LINE =
  "I sneezed so hard my spine filed for workers' comp, and HR says I have to stay home until it drops the case.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// The gate for this bounty allows 1-200 characters of UTF-8 text,
// a single line, not only white space. Refuse to write anything
// rather than hand the grader an entry that fails the gate.
function checkLine(line: string): void {
  const length = [...line].length;
  if (length < 1 || length > 200) {
    throw new Error(`excuse line is ${length} characters, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("excuse line must not be only white space");
  }
}

checkLine(LINE);

// The grader supplies the output directory; default to ./output
// for a local run. Never chmod the directory itself: on the grader
// it is a bind mount and chmod fails EPERM.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
