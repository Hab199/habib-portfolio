# Habib Abdu Ali — Developer Portfolio

A modern, responsive, frontend-only developer portfolio built with **HTML5**, **Tailwind CSS**, and **vanilla JavaScript**.

> No backend, no build step, no database. Works as a static website — perfect for GitHub Pages.

---

## Live structure

```
habib-portfolio/
│
├── index.html          ← all page content
├── css/
│   └── style.css       ← custom styles (on top of Tailwind)
├── js/
│   └── main.js         ← menu, scroll spy, animations, form
├── assets/
│   ├── favicon.svg
│   ├── images/         ← add project screenshots here
│   └── Habib-Abdu-Ali-CV.pdf   ← add your CV here
└── README.md
```

## Run it locally

Just open `index.html` in your browser, **or** serve it:

```bash
cd habib-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to update the site

All content lives in `index.html`. Search for the comment blocks — they explain everything.

### Add your CV
Put your real PDF at:
```
assets/Habib-Abdu-Ali-CV.pdf
```
The Download CV buttons will start working automatically.

### Add a project
1. Put the screenshot in `assets/images/`.
2. In `index.html`, find the **HOW TO ADD A PROJECT** comment inside the Projects section.
3. Copy the template, paste it, fill in your real details.
4. Delete the "Projects coming soon" placeholder when you have at least one project.

### Update your internship
Find the **HOW TO UPDATE THIS SECTION** comment in the Experience section and replace the placeholder values.

### Connect a real contact form (optional)
The form currently opens the visitor's email app (mailto). To use a free service like Formspree:

1. Sign up and get your form endpoint.
2. Change the `<form>` tag to:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
3. In `js/main.js`, set `const USE_MAILTO = false;`

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository (e.g. `hab199.github.io`).
2. Go to **Settings → Pages**.
3. Choose `main` branch, `/ (root)` folder, and save.
4. Your site will be live at `https://hab199.github.io/`.

## Accessibility & performance

- Semantic HTML and proper heading hierarchy
- Keyboard-navigable with visible focus states
- `prefers-reduced-motion` respected (animations disabled)
- No heavy libraries — loads fast
