# PapaOS / Macara Legacy Terminal

Regalo digital familiar construido como una terminal moderna estilo Windows CMD. El flujo principal vive en `C:\FAMILIA\PAPAOS>` y cada comando abre una parte del legado familiar.

## Stack

- React + Vite + TypeScript
- React Router
- Motion
- Sonner
- Vaul preparado para drawers
- Supabase Auth, PostgreSQL, Storage y RLS preparados

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

No usar `service_role_key` en frontend.

## Primer acceso administrativo (Supabase Auth)

Las contraseñas se almacenan y verifican exclusivamente en Supabase Auth; nunca se agregan a este repositorio ni a una migración SQL.

1. Cree el proyecto en Supabase y copie solo la **Project URL** y la **anon/publishable key** a `.env` (este archivo está ignorado por Git).
2. Ejecute las migraciones `001_initial_schema.sql`, `002_auth_profiles.sql` y `003_admin_cms_policies.sql` en el SQL Editor o con la CLI de Supabase.
3. En **Authentication > Users**, cree cada cuenta administrativa con email y contraseña.
4. En el SQL Editor, asigne el rol admin a cada cuenta creada:

```sql
update public.profiles
set role = 'super_admin'
where email = 'tu-correo@ejemplo.com';
```

Solo los roles `admin` y `super_admin` pueden entrar a `/admin`. Las cuentas nuevas nacen como `visitor` y no pueden acceder al panel hasta recibir un rol.

## Rutas principales

- `/`: boot inicial
- `/terminal`: terminal CMD funcional
- `/libro`: recuerdos aprobados
- `/arbol`: ensenanzas aprobadas
- `/mensajes`: mensajes aprobados
- `/colaborar`: aportes familiares en estado `pending`
- `/admin/login`: acceso admin
- `/admin/dashboard`: panel inicial

## Supabase

La migracion inicial esta en:

```txt
supabase/migrations/001_initial_schema.sql
```

El seed inicial de comandos esta en:

```txt
supabase/seed.sql
```

Buckets esperados:

- `memory-media`
- `system-assets`

## Notas de seguridad

- El panel publico solo consulta contenido `status = approved`.
- Los aportes colaborativos entran como `pending`.
- La validacion de archivos permite JPG, PNG, WEBP y MP4.
- El panel admin actual es base local para MVP; debe conectarse a Supabase Auth/RLS para produccion.

## Pendientes

- Reemplazar login local por Supabase Auth real.
- Implementar acciones reales de aprobar/rechazar/ocultar/eliminar.
- Subir media a Supabase Storage.
- Agregar politicas RLS completas.
- Ejecutar `/impeccable init` y pulidos visuales posteriores.
