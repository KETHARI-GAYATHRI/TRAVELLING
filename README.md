# ESCAPE — Travel Discovery Platform

> A premium, editorial travel discovery platform featuring real-time weather, dynamic imagery, location awareness, and AI-powered trip assistant and itinerary generation.

![ESCAPE Banner](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80)

---

## Overview

**ESCAPE** is an end-to-end, production-grade travel discovery application built for modern travelers. Inspired by luxury travel publications and modern digital experiences, ESCAPE seamlessly connects travelers with world-class destinations, real-time weather forecasts, location-based recommendations, and AI travel assistance powered by Google Gemini.

---

## Key Features

- 🌟 **Editorial Visual Aesthetics**: Warm natural color palette, Playfair Display + Inter typography pairing, smooth animations, and luxury layout design.
- 🎥 **Immersive Hero Section**: Looping video background with entrance animations and call-to-action triggers.
- 🧭 **Destination Explorer**: Interactive destination hub with live search, region filtering (Europe, Asia, Africa, Americas), and rich destination cards.
- 📍 **Browser Geolocation & Manual Search**: Detect user location via browser API with permission-denied fallback states and manual city search capability.
- 🌤️ **Real-Time Weather Integration**: Live weather conditions powered by OpenWeather API (temperature, feels-like, humidity, wind speed, weather icons) with graceful error fallbacks.
- 🏛️ **Famous Places for Every Destination**: Detailed landmark highlights with Unsplash dynamic image fetching.
- 🤖 **AI Travel Assistant (Google Gemini)**: Interactive, slide-up AI chat interface providing practical, destination-aware travel advice.
- 🗓️ **AI Itinerary Generator**: Custom day-by-day travel itinerary builder supporting 2, 3, 4, 5, or 7 days, formatted with morning, afternoon, and evening timelines.
- ♿ **Accessibility & Performance**: Built with semantic HTML5, keyboard navigation, visible focus indicators, screen reader labels, and `prefers-reduced-motion` support.
- 📱 **Fully Responsive**: Mobile-first architecture tested seamlessly across 320px, 375px, 768px, 1024px, and 1440px+ viewports.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, Vite 8 |
| **Routing** | React Router 7 |
| **Styling** | Vanilla CSS (CSS Custom Properties, Flexbox/Grid, Animations) |
| **Icons** | Lucide React |
| **Weather API** | OpenWeather Current Weather & Geocoding API |
| **Image API** | Unsplash Photos API (with fallback curation) |
| **AI Integration** | Google Gemini API (`@google/generative-ai` & REST) |

---

## Environment Variables

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

Define your API keys:

```env
# OpenWeather API Key (https://openweathermap.org/api)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# Unsplash Access Key (https://unsplash.com/developers)
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Google Gemini API Key (https://aistudio.google.com/apikey)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

*Note: If API keys are omitted or invalid, ESCAPE gracefully falls back to curated offline data and friendly error states without crashing.*

---

## Installation & Running Locally

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Production Build

To test or generate the optimized production bundle:

```bash
npm run build
```

To preview the built application locally:

```bash
npm run preview
```

---

## Deployment

### Vercel
1. Push project to GitHub.
2. Import project into Vercel.
3. Add environment variables (`VITE_OPENWEATHER_API_KEY`, `VITE_UNSPLASH_ACCESS_KEY`, `VITE_GEMINI_API_KEY`) in Project Settings.
4. Deploy!

### Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set Environment Variables under Site Settings -> Environment Variables.

---

## API Architecture & Reliability

- **OpenWeather API**: Handles current weather and reverse/forward geocoding. Falls back to OpenStreetMap (Nominatim) when needed.
- **Unsplash API**: Dynamically searches high-res travel photography with in-memory caching to eliminate redundant HTTP requests. Fallback to curated image assets on key rate limits or network issues.
- **Google Gemini API**: Utilizes `gemini-2.0-flash` for high-speed streaming response generation, formatted system prompts, and structured JSON itinerary parsing with regex fallbacks.

---

## Project Structure

```
src/
├── assets/         # Static media assets
├── components/     # Reusable UI components
│   ├── ChatAssistant.jsx
│   ├── DestinationCard.jsx
│   ├── DynamicImage.jsx
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   ├── FilterBar.jsx
│   ├── Footer.jsx
│   ├── ItineraryDisplay.jsx
│   ├── ItineraryGenerator.jsx
│   ├── LoadingState.jsx
│   ├── LocationDetector.jsx
│   ├── Navbar.jsx
│   ├── PlaceCard.jsx
│   ├── ScrollReveal.jsx
│   ├── SearchBar.jsx
│   └── WeatherCard.jsx
├── data/           # Destination datasets
│   └── destinations.js
├── hooks/          # Custom React hooks
│   ├── useChat.js
│   ├── useGeolocation.js
│   ├── useImages.js
│   ├── useItinerary.js
│   └── useWeather.js
├── pages/          # Page views
│   ├── DestinationPage.jsx
│   ├── ExplorePage.jsx
│   └── HomePage.jsx
├── services/       # API integration services
│   ├── geminiService.js
│   ├── imageService.js
│   ├── locationService.js
│   └── weatherService.js
├── App.jsx         # App shell & router
├── main.jsx        # Entry point
└── styles.css      # Design system & CSS custom properties
```

---

## License

Created for Front-End Developer Assessment. All rights reserved.
