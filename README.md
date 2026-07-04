# Refresso — Bilingual Menu Website

A single-page, bilingual (English / Arabic) menu website for **Refresso**, a coffee shop in Riyadh.

## 📁 Folder structure

```
refresso-site/
├── index.html          → Main page (structure/content)
├── style.css           → All styling
├── script.js           → Menu data + interactivity (language switch, category toggle)
├── favicon.ico          → Browser tab icon (generated from the logo)
├── images/
│   ├── logo.png             → Transparent-background logo used in the site header
│   ├── logo-original.jpg    → Original uploaded logo file (reference)
│   └── menu-reference.jpg   → Original uploaded menu photo (reference)
└── README.md            → This file
```

## ▶️ How to view it

No build step or server needed — just open `index.html` directly in any browser
(double-click it, or right-click → Open with → your browser).

If you want to host it online, upload the **entire folder** (keeping the same
file names and structure) to any static host, for example:
- Netlify (drag-and-drop the folder)
- GitHub Pages
- Vercel
- Any regular web hosting / cPanel `public_html`

## ✏️ How to edit things

**To change menu items, prices, or add new items:**
Open `script.js` and edit the `menu` object near the top. Each item looks like this:

```js
{ en: "Spanish Latte", ar: "لاتيه إسباني", price: "15/18", cal: "180–270" }
```

- `price` — use `"15/18"` for two sizes (Regular/Large), or `"6"` for a single price.
- `cal` — calorie info shown under the item name. Leave as `""` to hide it.
- `isNew: true` — adds a "NEW" badge next to the item (used for Pistachio & Coffee Today).

To add a whole new category, copy one of the existing blocks (e.g. `tea: {...}`)
inside the `menu` object and give it a new key, icon, and item list — it will
automatically appear as a new category card.

**To change the 4 signature items shown at the top:**
Edit the `signature` array in `script.js`.

**To change colors / fonts / spacing:**
Everything is in `style.css`. The color palette is defined once at the top as
CSS variables:

```css
:root{
  --cream:#FBF6EF;
  --cream-2:#F3E9DB;
  --espresso:#2B1B14;
  --coffee:#4A2E22;
  --roast:#8B5A3C;
  --caramel:#C6873F;
}
```

Change a value there and it updates everywhere it's used.

**To replace the logo:**
Swap out `images/logo.png` with your new file (keep the same file name, or
update the `src` in `index.html`'s header).

**To update social links:**
Edit the two links inside the `<footer>` section in `index.html`
(Instagram: `@refresso.sa`, Snapchat: `refressosa`).

## 🌐 Language switching

The **EN / ع** buttons in the header toggle a class on `<body>`
(`lang-en` or `lang-ar`), which:
- Shows/hides `.en-text` / `.ar-text` spans throughout the page
- Switches the whole layout to right-to-left (RTL) for Arabic
- Swaps fonts (Fraunces/Manrope for English, Tajawal for Arabic)

## 📱 Responsive

The layout adapts down to mobile screens (category grid goes from 4 columns to 2,
type scales down, etc.).

---
Built for Refresso — Fresh Brews, Chill Vibes ☕
