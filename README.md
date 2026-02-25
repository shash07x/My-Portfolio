# Shashvath P — Portfolio Website

A modern, animated portfolio website built with pure HTML, CSS, and JavaScript.
No frameworks, no build tools needed — just open and deploy.

---

## 📁 Project Structure

```
portfolio-shashvath/
├── index.html          ← Main HTML file (all sections)
├── css/
│   └── style.css       ← All styles, variables, animations
├── js/
│   └── main.js         ← Particle BG, canvas animations, nav logic
├── assets/             ← (Optional) Add images/icons here
└── README.md           ← This file
```

---

## 🚀 Deploying with VS Code + GitHub Pages

### Step 1 — Open in VS Code
1. Extract the ZIP file
2. Open VS Code → **File > Open Folder** → select `portfolio-shashvath`

### Step 2 — Initialize Git
Open the **VS Code terminal** (`Ctrl + `` ` ``) and run:

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
```

### Step 3 — Push to GitHub
1. Go to [github.com](https://github.com) → **New Repository**
2. Name it `portfolio` (or anything you like)
3. **Do NOT** initialize with README (leave empty)
4. Copy the remote URL shown (e.g. `https://github.com/shash07x/portfolio.git`)

Back in your VS Code terminal:

```bash
git remote add origin https://github.com/shash07x/portfolio.git
git branch -M main
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your GitHub repository → **Settings**
2. Scroll to **Pages** (left sidebar)
3. Under **Source**, select `main` branch → `/ (root)` folder
4. Click **Save**

Your site will be live at:
```
https://shash07x.github.io/portfolio/
```
(may take ~1-2 minutes to go live)

---

## ✏️ Customising Content

| What to change | Where |
|---|---|
| Name, title, bio | `index.html` — Hero & About sections |
| Skills & percentages | `index.html` — Skills section |
| Projects (links, descriptions) | `index.html` — Projects section |
| Work experience | `index.html` — Experience section |
| Certificates & links | `index.html` — Education section |
| Contact links | `index.html` — Contact & Footer |
| Colors & fonts | `css/style.css` — `:root` variables |
| Canvas animations | `js/main.js` — `initCanvas1/2/3/4` functions |

---

## 🔗 Current Links

| Item | URL |
|---|---|
| GitHub | https://github.com/shash07x |
| LinkedIn | https://www.linkedin.com/in/shash-383b803aa |
| Email | shash.07x@gmail.com |
| Juriscentra (Live) | https://juriscentra-x.vercel.app/ |

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations, grid, flexbox
- **JavaScript (Vanilla)** — Canvas API, IntersectionObserver
- **Google Fonts** — Syne + DM Sans
- No npm, no build step, no dependencies

---

## 📄 License

© 2025 Shashvath P. All rights reserved.
