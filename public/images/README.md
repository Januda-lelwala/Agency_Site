# Images

The current design is fully CSS-driven (gradient + grid backgrounds), so **no
image assets are required** for it to look complete.

If you want to add your own branding:

| File | Suggested use |
| --- | --- |
| `logo.svg` | Replace the gradient "N" mark in `components/Navbar.jsx` / `Footer.jsx` |
| `og-image.png` | Social share preview (wire into `app/layout.jsx` `openGraph.images`) |

Optional: you can reintroduce hero photography by adding a `backgroundImage`
layer behind the grid in any hero section.
