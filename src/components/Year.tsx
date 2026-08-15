"use client";

import { useSyncExternalStore } from "react";

const sub = () => () => {};
/** Current year, client-resolved so cached server output never reads the clock. */
export function Year() {
  const y = useSyncExternalStore(sub, () => new Date().getFullYear(), () => 2026);
  return <>{y}</>;
}
