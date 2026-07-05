# lonxanhvn.com

Landing page for **Lôn Xanh** (*Recycle for the future*) — a recyclables
collection service in Thủ Dầu Một. Lôn Xanh collects aluminium cans, plastic,
paper and other scrap that customers sort at source, and rewards them with
points they can redeem.

It's a single static page (no build step, no backend) hosted for free on
**GitHub Pages** and served at the custom domain `lonxanhvn.com`.

## What's on the page

- **Hero** — brand pitch, call/message CTAs, animated leaf-and-can emblem
- **Thu gom gì** — the material categories collected
- **Bảng điểm** — the rewards points board (receipt-style), driven by data in `js/main.js`
- **Quy trình** — the 3-step "sort → contact → earn points" flow
- **Về Lôn Xanh** — mission + impact stats
- **Liên hệ** — hotline, email, address, Facebook/TikTok, Google Maps embed

The page is fully responsive (mobile → desktop), SEO-optimized, and
social-share ready (Open Graph + Twitter card with a 1200×630 preview image).

## Tech

Plain **HTML + CSS + vanilla JS**. No frameworks, no dependencies. Fonts load
from Google Fonts; the map is a keyless Google Maps embed iframe.

```
index.html          # markup + meta tags (SEO / Open Graph / JSON-LD)
css/styles.css      # design system + all styles
js/main.js          # points board data, nav, scroll reveal
assets/             # logo, emblem, favicons, hero + og-image
CNAME               # custom domain for GitHub Pages
```

## Run locally

No build needed. Because the page loads an iframe and web fonts, serve it over
HTTP rather than opening the file directly (`file://` blocks the map embed):

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works just as well, e.g. `npx serve` or the VS Code
"Live Server" extension. Edit the files and refresh — changes are instant.

To update the rewards points, edit the `POINTS` array in `js/main.js`.

## Deploy (GitHub Pages)

1. Push this repo to GitHub (e.g. `knd/lonxanhvn.com`).
2. **Settings → Pages** → *Build and deployment* → Source: **Deploy from a branch**,
   Branch: `main` / `/ (root)`.
3. The `CNAME` file sets the custom domain to `lonxanhvn.com`.
4. Point DNS at GitHub Pages in GoDaddy:
   - Apex `@` → four **A** records: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `www` → **CNAME** → `knd.github.io`
5. Back in **Settings → Pages**, enable **Enforce HTTPS** once the certificate
   is issued.

DNS changes can take up to an hour (sometimes longer) to propagate.
