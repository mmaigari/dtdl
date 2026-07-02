// Toggle the maintenance screen on/off.
// When true:
//   - Navbar, Footer, FloatingContact are hidden globally
//   - All routes except `/` are redirected to `/` (see proxy.ts)
//
// You can BYPASS the maintenance screen without flipping this flag by
// visiting any URL with `?preview=<PREVIEW_TOKEN>` once — the proxy
// sets a `dtdl-preview` cookie and you'll see the real site until you
// clear cookies (or delete the cookie manually in DevTools).
//
// When you're ready to launch the full site, flip this to `false`
// and restore the original homepage:
//   mv app/page.tsx app/page.maintenance.tsx
//   mv app/page.home.bak.tsx app/page.tsx
export const MAINTENANCE_MODE = true;

// Secret used by `?preview=<token>` to bypass maintenance. Change this
// before sharing the URL with anyone you don't want bypassing the lock.
export const PREVIEW_TOKEN = "dtdl-2026-preview";

// Name of the cookie that records a successful preview bypass.
export const PREVIEW_COOKIE = "dtdl-preview";
