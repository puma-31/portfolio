# puravmahesh.github.io

Personal portfolio website — designed after [Brittany Chiang's v4](https://brittanychiang.com), adapted and built by Purav Mahesh.

## Stack

React (JavaScript) + Vite.

### Local dev

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (5 minutes)

### Option A — Dedicated user site (recommended)

1. Create a new GitHub repo named exactly `<your-username>.github.io`
2. Clone it locally: `git clone https://github.com/<your-username>/<your-username>.github.io`
3. Build the site: `npm run build`
4. Deploy the contents of `dist/` to your repo root (or to a `gh-pages` branch)
5. Push:
   ```bash
   git add .
   git commit -m "init: portfolio"
   git push
   ```
6. Go to **Settings → Pages** and point it at whatever branch/folder you deployed `dist/` into
7. Live at `https://<your-username>.github.io` within ~60 seconds

### Option B — Deploy from any repo

1. Build the site: `npm run build`
2. Deploy the contents of `dist/` to GitHub Pages
3. Live at `https://<your-username>.github.io/<repo-name>`

## Deploy to Vercel (even faster)

```bash
npm i -g vercel
vercel --prod
```

Or drag-and-drop `index.html` at [vercel.com/new](https://vercel.com/new).

## Adding a photo

Replace the initials circle in the About section with:

```html
<img src="photo.jpg" alt="Purav Mahesh" style="width:100%;height:100%;object-fit:cover;border-radius:4px;filter:grayscale(20%);" />
```

Drop `photo.jpg` in the same folder as `index.html`.

## Updating content

All content is in `index.html` — ctrl+F the section names (HERO, ABOUT, EXPERIENCE, PROJECTS, CONTACT) to jump straight to each section.

## Credit

Original design by [Brittany Chiang](https://brittanychiang.com). Please link back to her if you fork this.
