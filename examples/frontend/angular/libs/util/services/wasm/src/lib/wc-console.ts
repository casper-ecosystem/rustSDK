/**
 * Styled console lines for `[wc:boot]` (OT ot-console shape).
 * Fluorescent tag, wall-clock, nav-relative ms, flat key=value — no raw Object dumps.
 */

export type WcConsoleNamespace = 'wc:boot';

const NS_TAG_COLOR: Record<WcConsoleNamespace, string> = {
  'wc:boot': '#00ff9c',
};

const STYLE_LABEL = 'color:#e8f7ff;font-weight:600';
const STYLE_CLOCK = 'color:#80cbc4;font-weight:600';
const STYLE_MS = 'color:#ffea00;font-weight:700';
const STYLE_KV = 'color:inherit;font-weight:normal;background:transparent';

function tagStyle(ns: WcConsoleNamespace): string {
  const fg = NS_TAG_COLOR[ns];
  return `color:${fg};font-weight:700;background:#0a0a0a;padding:0.1em 0.35em;border-radius:0.2em`;
}

export function wcFormatKvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return String(value);
  }
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return String(value);
  }
  return JSON.stringify(value);
}

export function wcFormatKv(kv?: Record<string, unknown>): string {
  if (!kv || Object.keys(kv).length === 0) {
    return '';
  }
  return Object.entries(kv)
    .map(([k, v]) => `${k}=${wcFormatKvValue(v)}`)
    .join(' ');
}

export function wcNowMs(): number {
  if (typeof performance === 'undefined') {
    return 0;
  }
  return performance.now();
}

function pad2(n: number, width = 2): string {
  return String(Math.trunc(n)).padStart(width, '0');
}

export function wcClockStamp(date: Date = new Date()): string {
  return (
    `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ` +
    `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}.` +
    `${pad2(date.getMilliseconds(), 3)}`
  );
}

export type WcConsoleWriteOptions = {
  ns: WcConsoleNamespace;
  topic: string;
  ms?: number;
  kv?: Record<string, unknown>;
  level?: 'log' | 'warn' | 'info';
};

/** One styled `[wc:boot] topic clock N.Nms key=value…` line. */
export function wcConsoleWrite(options: WcConsoleWriteOptions): void {
  const { ns, topic, kv, level = 'log' } = options;
  const ms = options.ms ?? wcNowMs();
  const clock = wcClockStamp();
  const kvStr = wcFormatKv(kv);
  const suffix = kvStr.length > 0 ? ` ${kvStr}` : '';
  console[level](
    `%c[${ns}]%c ${topic} %c${clock}%c %c${ms.toFixed(1)}ms%c${suffix}`,
    tagStyle(ns),
    STYLE_LABEL,
    STYLE_CLOCK,
    STYLE_KV,
    STYLE_MS,
    STYLE_KV,
  );
}
