export const supabaseConfig = {
  url:
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    "https://adggcgotsldsvrwkmkua.supabase.co",
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "sb_publishable_9LGO32fxhY3QlJKVVzZ3Nw_cqO8kxjR",
} as const;
