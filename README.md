# Amharic Phrase Book

A free, offline-friendly Amharic phrasebook web app for travelers and learners.

# Preview
![Preview Screenshot 1](/public/images/screenshot-amharicphrasebook-webapp.png).

# Live Deployment
[https://amharic-phrase-book.vercel.app
]

## Tech Stack

- **React** (with functional components and hooks)
- **TypeScript**
- **Tailwind CSS** (for styling)
- **Create React App**
- **Service Worker** (for offline/PWA support)
- **Static JSON** (for phrase data, served from the `public` folder)
- **SVG Icons** (inline for social and UI icons)

## Features

- Browse 670+ essential Amharic phrases in 17 topics
- Search phrases by Amharic, English, or notes
- Category cards with unique placeholder background images
- Responsive, paginated category grid
- Phrase lists with "Scroll to Top" button for long lists
- Social links for Facebook, Twitter, and GitHub
- Works offline (static JSON data in `public/amharic_phrases.json`)
- No user tracking, no ads

## Recent Changes

- **Service Worker / Offline Support:**  
  The app now registers a service worker (`serviceWorkerRegistration.ts`) for offline/PWA support. Your static assets and phrase data are cached for offline use.
- **Category Card Images:**  
  Each category card displays a unique placeholder background image based on its category. The "Basic" category uses a custom image from `public/images/basic.png`. Other categories use color-coded placeholders.
- **Scroll to Top:**  
  A floating "Scroll to Top" button appears on long phrase lists (more than 8 phrases), allowing users to quickly return to the top.
- **Social Links:**  
  The Instagram link in the footer has been replaced with a GitHub link and icon.
- **Error Handling:**  
  Improved error handling for missing or malformed data and images.
- **TypeScript Improvements:**  
  Defensive coding for undefined fields and improved type safety.
- **SVG Icons:**  
  All SVG icons are now valid and accessible.

## Usage

1. Clone the repository.
2. Run `npm install`.
3. Run `npm start` to launch the app locally.
4. To add or update phrases, edit `public/amharic_phrases.json`.
5. To build for production and enable offline support, run `npm run build`.

## Folder Structure

- `src/components/CategoryCard.tsx` – Category card with background image logic
- `src/components/PhraseListPage.tsx` – Phrase list with scroll-to-top button
- `src/serviceWorkerRegistration.ts` – Service worker registration for offline/PWA support
- `public/images/` – Static images for categories
- `public/amharic_phrases.json` – Phrase data

## License

MIT

---

*Developed by Eyuel Getachew*