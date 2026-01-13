# Roaster Hub

A password-protected website for hosting strategic document analyses ("roasts") that expose the hidden insecurities in business documents.

**Live:** https://roaster-hub.vercel.app
**Password:** `roaster`
**Repo:** https://github.com/tomsuharto-git/roaster-hub

---

## What This Is

The Roaster analyzes RFPs, briefs, and strategy decks to find what's NOT being said—the unspoken insecurities, tensions, and real problems underneath the confident language. This hub hosts all completed analyses in a polished, themeable format.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Instrument Serif, DM Sans, JetBrains Mono
- **Deployment:** Vercel (auto-deploys on push to main)
- **Auth:** Simple cookie-based password gate

---

## Project Structure

```
roaster-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page (roast listings)
│   │   ├── login/page.tsx        # Password gate
│   │   ├── roast/[slug]/page.tsx # Individual roast pages
│   │   ├── layout.tsx            # Root layout with fonts
│   │   └── globals.css           # Global styles + CSS variables
│   ├── content/
│   │   └── roasts/
│   │       ├── index.ts          # Roast exports and helpers
│   │       ├── xrp.json          # XRP roast data
│   │       └── wb-games-sundance.json
│   ├── types/
│   │   └── roast.ts              # TypeScript interfaces
│   └── middleware.ts             # Password protection
└── public/
```

---

## Adding a New Roast

### Step 1: Run the Roaster Analysis

Use the global `/roaster` skill on any document:
```
/roaster path/to/brief.pdf
```

### Step 2: Create the JSON File

Create a new file at `src/content/roasts/[slug].json` following this schema:

```json
{
  "slug": "client-name",
  "client": "Client Name",
  "documentType": "RFP Type or Description",
  "date": "January 2026",
  "theme": {
    "accent": "#c41e3a",
    "accentDark": "#8b1528",
    "background": "#0a0a0a",
    "backgroundAlt": "#141414"
  },
  "heroTitle": {
    "line1": "First Line",
    "emphasis": "Emphasis Word",
    "line2": "Last Line"
  },
  "surfaceRead": "2-3 sentence summary of what they're asking for.",
  "unspokenInsecurity": "The core fear in one sentence.",
  "truths": [
    {
      "number": "01",
      "title": "Short truth title",
      "content": "Explanation of this truth..."
    }
  ],
  "insight": "The key insight that ties it together.",
  "tension": {
    "left": {
      "title": "One Side",
      "description": "What this side wants..."
    },
    "right": {
      "title": "Other Side",
      "description": "What this side wants..."
    }
  },
  "realProblem": {
    "headline": "The real problem statement.",
    "subtext": "Supporting explanation..."
  },
  "questionAvoiding": "The hard question they won't ask?",
  "wayThrough": {
    "headline": "The path forward.",
    "body": "Explanation of the opportunity...",
    "questions": [
      "Provocative question 1?",
      "Provocative question 2?",
      "Provocative question 3?"
    ]
  }
}
```

### Step 3: Register the Roast

Add to `src/content/roasts/index.ts`:

```typescript
import newRoast from './new-roast.json';

export const roasts: Roast[] = [
  newRoast as Roast,  // Add new roasts at the top
  wbGamesSundance as Roast,
  xrp as Roast,
];
```

### Step 4: Deploy

```bash
git add .
git commit -m "Add [client] analysis"
git push tomsuharto-git main
```

Vercel auto-deploys in ~30 seconds.

---

## Theme Presets

| Theme | Accent | Background | Best For |
|-------|--------|------------|----------|
| **Midnight** | `#c41e3a` (crimson) | `#0a0a0a` | Finance, tech, crypto |
| **Dawn** | `#e85d4c` (coral) | `#faf8f5` | CPG, lifestyle, F&B |
| **Slate** | `#0066ff` (blue) | `#1a1a2e` | B2B, enterprise, SaaS |
| **Forest** | `#4a7c59` (moss) | `#f5f5f0` | Sustainability, wellness |
| **Ember** | `#c9a227` (gold) | `#1a1520` | Luxury, automotive, spirits |

Custom themes: derive from brand colors, inverted to feel analytical rather than promotional.

---

## Password Protection

- Middleware at `src/middleware.ts` checks for `roaster-auth` cookie
- Login page at `/login` validates password and sets cookie
- Cookie expires after 30 days
- To change password: edit `password === 'roaster'` in `src/app/login/page.tsx`

---

## Design System

### Typography
- **Headlines:** Instrument Serif (Google Fonts via HTML link)
- **Body:** DM Sans (next/font)
- **Labels:** JetBrains Mono, 0.7rem, uppercase, 0.3em letter-spacing

### CSS Variables
```css
--black: #0a0a0a;
--white: #f5f5f3;
--cream: #e8e6e1;
--gray: #6b6b6b;
--gray-light: #a3a3a3;
--red: #c41e3a;
--red-dark: #8b1528;
```

### Animations
- `animate-fade-up` - Entry animation for hero elements
- `delay-100` through `delay-500` - Stagger delays
- `.roast-card:hover` - Card lift effect

---

## Local Development

```bash
cd roaster-hub
npm install
npm run dev
```

Site runs at http://localhost:3000

---

## Deployment

Automatic via Vercel GitHub integration. Any push to `main` triggers a deploy.

Manual deploy:
```bash
npx vercel --prod
```

---

## Related

- **Global Roaster Skill:** `~/.claude/skills/roaster/SKILL.md` - The analysis methodology
- **Parent Project:** `/Users/tomsuharto/Documents/Obsidian Vault/Claude Code/Roaster/` - Contains standalone HTML roasts and the skill source
