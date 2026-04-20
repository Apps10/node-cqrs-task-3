import Sentry from "@sentry/node"

export const SentryClient = Sentry.init({
  dsn: "http://e16df949171440449584f993186a9497@localhost:8000/1",
  tracesSampleRate: 0.01, // 1% of transactions — adjust to your needs
  // autoSessionTracking: false, // GlitchTip does not support sessions
})