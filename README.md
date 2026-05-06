# ResmiGunler.com — Turkey Public Holidays & Leave Planner

> Plan your vacations smarter. Know exactly which days to take off to maximize your time away.

[resmigunler.com](https://resmigunler.com) is a free, public-service web app for Turkey's official holiday calendar with a smart leave calculator, AI-powered suggestions, and offline PWA support.

<table align="center">
  <tr>
    <td align="center" width="70%">
      <a href="https://resmigunler.com">
        <img src="docs/screenshot.webp" alt="ResmiGunler.com — desktop view, holiday planner with live countdown">
      </a>
      <br><sub><b>Desktop</b> — hero + live next-holiday countdown</sub>
    </td>
    <td align="center" width="30%">
      <a href="https://resmigunler.com">
        <img src="docs/screenshot-mobile.webp" alt="ResmiGunler.com — mobile view">
      </a>
      <br><sub><b>Mobile</b> — installable PWA</sub>
    </td>
  </tr>
</table>

## Features

- **Full Holiday Calendar** — all official Turkish public holidays for 2024/2025 with individual detail pages
- **Smart Leave Calculator** — input your available leave days and get optimized vacation plans
- **AI Suggestions** — recommended leave combinations that maximize consecutive days off
- **Blog** — plain-language answers to common holiday questions in Turkish
- **PWA + Offline** — installable as a mobile/desktop app, works without internet
- **Lite Mode** — auto-detects slow connections and reduces animations
- **Feedback System** — per-page feedback collected via Supabase

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Routing | React Router v6 |
| Backend | Supabase |
| PWA | Service Worker |

## Getting Started

```bash
git clone https://github.com/mmeekh/resmigunler.com.git
cd resmigunler.com
npm install
npm run dev
```

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
resmigunler.com/
├── pages/              # Home, HolidaysList, HolidayDetail, LeaveCalculator, Blog, About
├── components/         # Header, Footer, Calendar, SmartSuggestions, FeedbackPanel
├── lib/supabase.ts     # Supabase client
└── constants.ts        # Holiday data and config
```

## Motivation

Most Turkish holiday calendar sites are cluttered with ads or require sign-ups. This is a clean, fast, free alternative built for people who want to plan their leave days intelligently.

---

Built by [Muhammet Emin Kilic](https://linkedin.com/in/emin-kilic-250b14210) — free and open source.
