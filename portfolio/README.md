# Abhay Pratap Singh — Portfolio

High-performance, interactive developer portfolio built with React + TypeScript + Framer Motion + Tailwind CSS.

---

## 🚀 Deploy to Vercel (Recommended — 2 minutes)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — no config needed
5. Click **Deploy** ✅

`vercel.json` is already included for SPA routing and cache headers.

---

## 🌐 Deploy to Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy** ✅

`public/_redirects` is already included for SPA routing.

---

## 💻 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔧 Customization Checklist

| What | Where |
|---|---|
| Your name, bio, email, phone | `src/data/resumeData.ts` |
| Profile photo | Replace `public/abhay.png` |
| CV / Resume | Replace `public/Abhay_Pratap_Singh_CV.pdf` |
| Project live URLs | `resumeData.ts` → `liveUrl` per project |
| Project GitHub URLs | `resumeData.ts` → `githubUrl` per project |
| Project images | `public/projects/` (ecommerce.png, spotify.png, etc.) |
| LinkedIn URL | `resumeData.ts` → `linkedin` |
| Admin panel PIN | `src/hooks/useProfile.tsx` line ~58, change `'2026'` |
| OG/Social preview URL | `index.html` → `og:url` meta tag |

---

## 📦 Build for Production

```bash
npm run build
```

Output is in `/dist`. Chunks are split for optimal caching:
- `react-core` — React + ReactDOM (cached separately)
- `framer` — Framer Motion (cached separately)
- `icons` — react-icons + lucide-react (cached separately)

---

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Framer Motion** — animations & interactions
- **Tailwind CSS v4** — styling
- **Vite 8** — build tool
- **react-icons** — brand icons
- **react-easy-crop** — profile photo crop in admin panel
