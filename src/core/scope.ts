/**
 * scope 模式匹配——与 server internal/reconcile/reconcile.go 的 scopeMatch 逐字对齐：
 * `re:<正则>` 锚定 ^、忽略大小写、非法正则退化字面前缀；其余路径段前缀。
 * 两端同语义是对账正确性的前提（restrict 在服务端执行，排除清单由客户端生成）。
 */
import type { Scope } from "./types";

const regexCache = new Map<string, RegExp | null>();

function compile(pattern: string): RegExp | null {
  if (regexCache.has(pattern)) {
    return regexCache.get(pattern) ?? null;
  }
  let re: RegExp | null;
  try {
    re = new RegExp("^(?:" + pattern + ")", "i");
  } catch {
    re = null;
  }
  regexCache.set(pattern, re);
  return re;
}

/** 路径段前缀："a/b" 匹配 "a/b" 与 "a/b/..."，不匹配 "a/bx" */
export function prefixMatch(prefix: string, path: string): boolean {
  const p = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  return path === p || path.startsWith(p + "/");
}

/** 单个模式匹配（语法见文件头） */
export function scopeMatch(pattern: string, path: string): boolean {
  if (pattern.startsWith("re:")) {
    const rest = pattern.slice(3);
    const re = compile(rest);
    if (re === null) {
      return prefixMatch(rest, path);
    }
    return re.test(path);
  }
  return prefixMatch(pattern, path);
}

export function scopeMatchAny(patterns: string[] | undefined, path: string): boolean {
  if (!patterns) return false;
  for (const p of patterns) {
    if (scopeMatch(p, path)) return true;
  }
  return false;
}

function scopeType(path: string, isNote: boolean): "note" | "attachment" | "config" {
  if (path.startsWith(".obsidian/")) return "config";
  return isNote ? "note" : "attachment";
}

/** 条目是否落在声明范围内（null scope = 全量） */
export function scopeAllows(
  scope: Scope | null | undefined,
  path: string,
  isNote: boolean
): boolean {
  if (!scope) return true;
  if (scope.exclude && scope.exclude.length > 0 && scopeMatchAny(scope.exclude, path)) {
    return false;
  }
  if (scope.include && scope.include.length > 0 && !scopeMatchAny(scope.include, path)) {
    return false;
  }
  if (scope.types && scope.types.length > 0 && !scope.types.includes(scopeType(path, isNote))) {
    return false;
  }
  return true;
}
