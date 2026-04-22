# Supabase Auth setup

Esta guia deja documentado el primer bloque de login con Google para Nido Canino.

## Valores que debe tener `js/config.js`

```js
window.NIDO_CONFIG = {
    supabaseUrl: "https://adggcgotsldsvrwkmkua.supabase.co",
    supabaseAnonKey: "sb_publishable_9LGO32fxhY3QlJKVVzZ3Nw_cqO8kxjR",
    authRedirectPath: "auth.html",
    postLoginPath: "profile.html",
    protectedPaths: ["profile.html", "pets.html", "requests.html"]
};
```

La anon key o publishable key puede vivir en frontend. Nunca pegues una `service_role` key en este proyecto.

## URLs que debes permitir en Supabase

En Supabase Dashboard:

1. Authentication.
2. URL Configuration.
3. Site URL:
   - Produccion: `https://nido-canino.vercel.app`
4. Redirect URLs:
   - `https://nido-canino.vercel.app/auth.html`
   - `http://localhost:3000/auth.html`
   - `http://localhost:5500/auth.html`
   - La URL preview de Vercel que vayas a usar, si pruebas previews.

## Google OAuth

En Google Cloud / Google Auth Platform crea un OAuth Client ID tipo Web application.

Authorized JavaScript origins:

- `https://nido-canino.vercel.app`
- `http://localhost:3000`
- `http://localhost:5500`

Authorized redirect URI:

- `https://adggcgotsldsvrwkmkua.supabase.co/auth/v1/callback`

Luego pega el Client ID y Client Secret en Supabase:

1. Authentication.
2. Providers.
3. Google.
4. Enable Google.
5. Save.

## Prueba local

Desde PowerShell, en la raiz del repo:

```powershell
python -m http.server 3000
```

Luego abre:

```text
http://localhost:3000/auth.html
```

## Flujo esperado

1. Entrar a `auth.html`.
2. Pulsar `Ingresar con Google`.
3. Google redirige a Supabase.
4. Supabase vuelve a `auth.html`.
5. La app muestra la sesion y permite ir a `profile.html`.
6. `profile.html`, `pets.html` y `requests.html` redirigen al login si no hay sesion.
