// Toggle the maintenance screen on/off.
// When true:
//   - Navbar, Footer, FloatingContact are hidden globally
//   - All routes except `/` are redirected to `/` (see middleware.ts)
//
// When you're ready to launch the full site, flip this to `false`
// and restore the original homepage:
//   mv app/page.tsx app/page.maintenance.tsx
//   mv app/page.home.bak.tsx app/page.tsx
export const MAINTENANCE_MODE = true;
