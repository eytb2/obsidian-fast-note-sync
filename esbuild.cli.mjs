import esbuild from "esbuild";
import process from "process";

// fns-cli：打包为单文件 Node 脚本（无运行时依赖，Node ≥22 内置 WebSocket）
const prod = process.argv[2] === "production";

const context = await esbuild.context({
  // 入口首行的 #! 由 esbuild 原样保留在输出第 1 行（banner 会被挤到第 2 行导致语法错误）
  entryPoints: ["cli/fns-cli.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  logLevel: "info",
  sourcemap: false,
  treeShaking: true,
  outfile: "dist/fns-cli.mjs",
  minify: prod,
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
