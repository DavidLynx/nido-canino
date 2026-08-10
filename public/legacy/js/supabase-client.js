(function () {
    const config = window.NIDO_CONFIG || {};

    function hasSupabaseLibrary() {
        return Boolean(window.supabase && typeof window.supabase.createClient === "function");
    }

    function hasConfig() {
        return Boolean(config.supabaseUrl && config.supabaseAnonKey);
    }

    function createClient() {
        if (!hasSupabaseLibrary() || !hasConfig()) return null;

        return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }

    window.NidoSupabase = {
        client: createClient(),
        isReady() {
            return Boolean(this.client);
        },
        isConfigured: hasConfig,
        hasLibrary: hasSupabaseLibrary
    };
})();
