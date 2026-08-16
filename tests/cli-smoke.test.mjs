/**
 * fns-cli 冒烟测试：inventory（哈希正确性/隐藏目录排除/排序）、status、reset。
 * 纯本地文件操作，不依赖服务器。运行产物：dist/fns-cli.mjs。
 */
import { promises as fs } from "node:fs";
import { execFileSync } from "node:child_process";
import * as path from "node:path";
import * as os from "node:os";
import { createHash } from "node:crypto";

const CLI = path.resolve("dist/fns-cli.mjs");
let passed = 0;

function ok(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    console.error(`  ✗ ${name} ${detail}`);
    process.exitCode = 1;
  }
}

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "fns-cli-smoke-"));
try {
  // ── 造树：常规笔记/附件、子目录、隐藏文件、.fns 状态目录 ─────────────────
  await fs.mkdir(path.join(tmp, "sub/deeper"), { recursive: true });
  await fs.writeFile(path.join(tmp, "a.md"), "# hello fns\n");
  await fs.writeFile(path.join(tmp, "sub/b.md"), "note in subdir\n");
  await fs.writeFile(path.join(tmp, "sub/deeper/blob.bin"), Buffer.from([0, 1, 2, 255]));
  await fs.writeFile(path.join(tmp, ".hidden.md"), "should be skipped\n");
  await fs.mkdir(path.join(tmp, ".hiddendir"), { recursive: true });
  await fs.writeFile(path.join(tmp, ".hiddendir/inside.md"), "skipped\n");
  await fs.mkdir(path.join(tmp, ".fns"), { recursive: true });
  await fs.writeFile(path.join(tmp, ".fns/baseline.json"), "{}");

  // ── inventory --json ──────────────────────────────────────────────────────
  const out = execFileSync("node", [CLI, "inventory", "--root", tmp, "--json"], { encoding: "utf8" });
  const inv = JSON.parse(out);
  const paths = inv.files.map((f) => f.path);

  ok("inventory: 隐藏文件/目录与 .fns 不入清单", !paths.includes(".hidden.md") && !paths.includes(".hiddendir/inside.md") && !paths.includes(".fns/baseline.json"));
  ok("inventory: 含子目录文件", paths.includes("sub/deeper/blob.bin"));
  ok("inventory: 按 path 排序", JSON.stringify(paths) === JSON.stringify([...paths].sort()));
  ok("inventory: 3 个文件", inv.count === 3 && inv.files.length === 3, `got ${inv.count}`);

  const expectA = createHash("sha256").update("# hello fns\n").digest("hex");
  const fileA = inv.files.find((f) => f.path === "a.md");
  ok("inventory: sha256 与 node:crypto 一致", fileA && fileA.hash === expectA);
  ok("inventory: size 正确", fileA && fileA.size === "# hello fns\n".length);

  // ── inventory TSV（tab 分隔、可 diff）─────────────────────────────────────
  const tsv = execFileSync("node", [CLI, "inventory", "--root", tmp], { encoding: "utf8" });
  const lines = tsv.trimEnd().split("\n");
  ok("tsv: 头部注释 + 数据行", lines[0].startsWith("# fns-inventory") && lines.length === 3 + 3);
  const cols = lines[3].split("\t");
  ok("tsv: hash\tsize\tpath", cols.length === 3 && /^[0-9a-f]{64}$/.test(cols[0]));

  // ── inventory --out 文件落盘 ──────────────────────────────────────────────
  const outFile = path.join(tmp, "inv.out.txt");
  execFileSync("node", [CLI, "inventory", "--root", tmp, "--out", outFile]);
  const written = await fs.readFile(outFile, "utf8");
  ok("inventory --out: 与 stdout 同内容", written === tsv);

  // ── status（无基线 → epoch 0）────────────────────────────────────────────
  const st = JSON.parse(execFileSync("node", [CLI, "status", "--root", tmp, "--json"], { encoding: "utf8" }));
  ok("status: 初始 epoch=0", st.epoch === 0 && st.knownPaths === 0);

  // ── reset（无基线也应成功）────────────────────────────────────────────────
  execFileSync("node", [CLI, "reset", "--root", tmp]);
  ok("reset: 幂等成功", !(await fs.stat(path.join(tmp, ".fns/baseline.json")).then(() => true, () => false)));

  // ── 参数校验 ──────────────────────────────────────────────────────────────
  let failed = false;
  try {
    execFileSync("node", [CLI, "sync", "--root", tmp], { stdio: "pipe" });
  } catch {
    failed = true;
  }
  ok("sync: 缺 server/token/vault 时失败退出", failed);

  console.log(`\ncli smoke: ${passed} assertions passed`);
} finally {
  await fs.rm(tmp, { recursive: true, force: true });
}
