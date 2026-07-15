// Generic error reporting stub — replace with your own error tracking
// service (e.g. Sentry, LogRocket) if needed.
export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[Error]", error, context);
}
