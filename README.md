# Gusify — website

Next.js 15 (App Router), exported as a static site and hosted on **Cloudflare Pages**.
The contact form runs on a Cloudflare Pages Function (`functions/api/contact.ts`).

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy to Cloudflare Pages

**Option A — connect GitHub (recommended)**
1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: **Framework preset:** Next.js (Static HTML Export) · **Build command:** `npm run build` · **Output directory:** `out`
4. Deploy. Every push redeploys automatically. The `functions/` folder is picked up automatically.
5. Custom domain: Pages project → Custom domains → add `gusify.com`.

**Option B — deploy from your computer**
```bash
npx wrangler login
npm run deploy       # builds, then uploads /out + /functions to the "gusify" Pages project
```

## Contact form email

The form posts to `/api/contact`, which emails you through [Resend](https://resend.com) (free tier).
In Cloudflare → Pages project → Settings → Environment variables, add:

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | `re_…` |
| `CONTACT_TO` | `you@gmail.com` |
| `CONTACT_FROM` | `Gusify <hello@gusify.com>` (domain verified in Resend) |

Until those are set, the form still works for visitors but nothing is emailed.

## Live portfolio previews (Marler Enterprises, 2KD Hood Cleaning)

The Work tiles show each client's **real, live site**, scaled down and locked so visitors can't click or scroll it.
Clicking one opens the case study, where the browser "opens" the site and it **scrolls itself**. Two small changes on each client site make that work:

**1. Allow the site to be shown inside gusify.com.**
If a client site sends `X-Frame-Options: DENY/SAMEORIGIN` or a `Content-Security-Policy` with `frame-ancestors`, the preview will be blank.
Allow Gusify instead — for example, add this response header on the client site:

```
Content-Security-Policy: frame-ancestors 'self' https://gusify.com https://www.gusify.com https://*.pages.dev
```
(Vercel: `vercel.json` → `headers`. Netlify / Cloudflare Pages: a `_headers` file. If neither header is set today, you don't need to do anything.)

**2. Paste the auto-scroll snippet** from `client-sites/gusify-preview.js` into each client site, just before `</body>`.
It does nothing for normal visitors — it only runs when the page is framed with `?gusify-preview=1` (the Gusify case study),
then slowly scrolls the homepage top to bottom, glides back up and loops.
Without the snippet, the case study still shows the live site — it just won't scroll by itself.

## Editing content

- **Prices, package contents, projects, services:** `lib/data.ts`
- **Email / phone in the footer & contact page:** top of `lib/data.ts`
- **Your photo (About):** put `gus.jpg` in `public/` and replace the placeholder in `app/about/page.tsx`
- **Placeholders to fill:** `[Phone number]`, `[Instagram]`, `[LinkedIn]`, `[payment terms]`, your story on About
- **Colors & animation:** `app/globals.css`

## Structure

```
app/            pages: / · /work · /services · /about · /contact
components/     Nav, Footer, Cursor, Diamond (3D), LiveChart, ServiceShowcase (floating previews),
                ProjectTiles + CaseStudy + LivePreview, Packages (3D pillars + price modal),
                Values (3D panels), ContactForm (+ send animation, Confetti)
lib/            data.ts (content) · raw.ts (decorative SVG art) · canvas.ts (animation loop helpers)
functions/      Cloudflare Pages Function for the contact form
client-sites/   snippet to paste into client websites for auto-scrolling previews
```
