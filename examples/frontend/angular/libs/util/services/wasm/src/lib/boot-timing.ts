/**
 * DEBUG_MODE-gated boot marks (OT bootDiagnostics shape).
 * When disabled, mark/measure are no-ops.
 */

import { wcConsoleWrite, wcNowMs } from './wc-console';

interface WcBootState {
  enabled: boolean;
  t0: number;
}

const state: WcBootState = {
  enabled: false,
  t0: 0,
};

declare global {
  interface Window {
    __bootT0?: number;
    __APP_CONFIG__?: {
      cors_anywhere_url?: string;
      network_rpc_url?: string;
      network_node_url?: string;
      app_version?: string;
      git_sha?: string;
      allow_secret_key_load?: boolean;
      debug_mode?: boolean;
    };
  }
}

function resolveT0(): number {
  if (state.t0 > 0) {
    return state.t0;
  }
  if (typeof performance !== 'undefined') {
    const fromWindow =
      typeof globalThis !== 'undefined' &&
      'window' in globalThis &&
      (globalThis as Window & typeof globalThis).window?.__bootT0;
    state.t0 =
      typeof fromWindow === 'number' && Number.isFinite(fromWindow)
        ? fromWindow
        : performance.now();
  }
  return state.t0;
}

/** Resolve DEBUG_MODE from __APP_CONFIG__ (Docker env) or non-production default. */
export function resolveWcBootEnabled(production: boolean): boolean {
  if (
    typeof window !== 'undefined' &&
    window.__APP_CONFIG__?.debug_mode === true
  ) {
    return true;
  }
  return !production;
}

/** Marks named boot steps when DEBUG_MODE enables `wc:boot`. */
export const wcBoot = {
  configure(config: { enabled: boolean }): void {
    state.enabled = config.enabled;
    if (config.enabled && state.t0 === 0) {
      resolveT0();
    }
  },

  isEnabled(): boolean {
    return state.enabled;
  },

  mark(phase: string, kv?: Record<string, unknown>): void {
    if (!state.enabled) {
      return;
    }
    const elapsed = wcNowMs() - resolveT0();
    wcConsoleWrite({
      ns: 'wc:boot',
      topic: phase,
      ms: elapsed,
      kv,
    });
  },

  async measure<T>(
    phase: string,
    work: () => Promise<T>,
    kv?: Record<string, unknown>,
  ): Promise<T> {
    if (!state.enabled) {
      return work();
    }
    this.mark(`${phase}_start`, kv);
    try {
      const result = await work();
      this.mark(`${phase}_done`, kv);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.mark(`${phase}_error`, { ...(kv ?? {}), error: message });
      throw err;
    }
  },
};
