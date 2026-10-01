# ITZ FIZZ — Scroll-Driven Supercar Hero Section Animation

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A high-performance, responsive scroll-driven hero section animation inspired by [car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation). Built for fluidity, 60 FPS motion rendering, and luxury automotive styling.

---

## 🌟 Live Demo & Repository

- **Live Webpage**: Hosted on GitHub Pages via automated GitHub Actions CI/CD.
- **Reference Inspiration**: [car-scroll-animation Live Demo](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🎯 Functional Requirements Implemented

### 1. Hero Section Layout (Above the Fold)
- Occupies the first screen (`100vh` sticky pinned viewport).
- Bold, letter-spaced headline across the track:
  ```
  W  E  L  C  O  M  E     I  T  Z  F  I  Z  Z
  ```
- 4 High-Impact Metric / Statistics cards matching the reference color scheme:
  - **Box 1 (#def54f - Lime/Yellow)**: `58%` — Increase in pick up point use
  - **Box 2 (#6ac9ff - Cyan)**: `23%` — Decreased customer phone calls
  - **Box 3 (#1f2129 - Slate/Carbon)**: `27%` — Increase in pick up point use
  - **Box 4 (#fa7328 - Safety Orange)**: `40%` — Decreased customer phone calls

### 2. Initial Load Animation
- Staggered initial entrance timeline on page mount:
  - Headline characters reveal smoothly with upward translation and stagger.
  - Impact metric cards slide into place with subtle bounce easing (`back.out(1.4)`).
  - McLaren 720S accelerates onto the starting line.
  - Number counters roll up smoothly from 0% to target percentages.

### 3. Scroll-Based Animation (Core Feature)
- **Tied to Scroll Progress**: Pinned viewport along a `280vh` scroll track. The vehicle's motion is strictly driven by scroll progress (`progress * endX`) rather than time-based autoplay.
- **Fluid Easing / Scrub**: Synchronized with `scrub: 1.2` in GSAP ScrollTrigger for realistic deceleration and momentum physics.
- **Dynamic Neon Trail**: Green neon speed trail (`#45db7d`) expands directly behind the vehicle diffuser in real time.
- **Letter Collision Wipe Reveal**: Real-time bounding collision detection between the car front bumper and individual characters. Letters light up into vibrant illuminated lime (`#def54f`) with electric glow as the car passes over them!
- **Dynamic Metric Card Elevation**: Cards elevate and scale as the car reaches their respective track sectors.

### 4. Motion, Performance & Audio
- **Transform Only**: Hardware GPU accelerated transitions (`transform: translateX()`, `will-change: transform`).
- **Zero Layout Thrashing**: Dimension calculations are cached and only recalculated on window resize events.
- **Lenis Smooth Scroll**: Butter-smooth inertial scrolling integrated with GSAP ticker.
- **Web Audio API V8 Supercar Engine Synth**: Procedural audio synthesizer that ramps throttle frequency and filter resonance based on scroll velocity (with sound toggle in Navbar).

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19 & TypeScript** | Component architecture, type safety, modular design |
| **GSAP 3 + ScrollTrigger** | High-performance scrub interpolation, pinning, and timeline coordination |
| **Lenis** | Inertial smooth scrolling layer |
| **Tailwind CSS** | Styling, responsive layout, glassmorphic UI |
| **Vite** | Blazing-fast development and optimized production bundling |
| **Web Audio API** | Real-time procedural engine audio generation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/itsfizz-scroll-car-animation.git

# Navigate into the project directory
cd itsfizz-scroll-car-animation

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
```
The output will be placed in the `dist/` directory with relative asset paths configured for easy deployment on GitHub Pages.

---

## 📦 Deployment to GitHub Pages

### Option 1: Automated GitHub Actions (Recommended)
This repository includes `.github/workflows/deploy.yml`. When you push to `main`:
1. Go to your GitHub Repository -> **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. Push to `main`, and your site will be deployed automatically!

### Option 2: Using `npm run deploy`
```bash
npm run deploy
```
This automatically builds the project and deploys the `dist/` folder to the `gh-pages` branch.

---

## 📄 License
MIT License. Created for the ItzFizz Frontend Animation Assignment.
