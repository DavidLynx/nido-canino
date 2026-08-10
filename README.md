# nido-canino
Nido Canino es una propuesta de cuidado pensada para tutores que valoran la calma, la observación real y un entorno más estructurado que el de una guardería masiva.

## Aplicación Next.js

La aplicación principal usa Next.js App Router, React y TypeScript. La versión HTML anterior se conserva en la raíz y en `legacy-content/` como respaldo de paridad durante la migración controlada.

### Desarrollo local

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

### Validaciones

```bash
pnpm lint
pnpm build
pnpm start
```

### Variables públicas de Supabase

Copie `.env.example` como `.env.local` y configure:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

La clave `anon` es publicable, pero la seguridad de las tablas depende de políticas RLS correctas en Supabase.

### Despliegue en Vercel

Importe el repositorio en Vercel, seleccione el preset Next.js, use `pnpm build` y configure las dos variables públicas de Supabase. No se requiere modificar el dominio desde el código.
