# 🚀 Rahul Chaurasiya — Personal Portfolio Website

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0066?style=for-the-badge&logo=framer)

**A modern, high-performance personal portfolio built with Next.js 14, Tailwind CSS & Framer Motion**

</div>

---

## ✨ Features

- 🎨 **Glassmorphism Design** — Premium dark UI with glass-card components, gradient glows, and ambient lighting
- ⚡ **High Performance** — IntersectionObserver-based scroll-spy, passive event listeners, and Next.js static optimization
- 📱 **Fully Responsive** — Mobile-first layouts with breakpoints for all screen sizes
- 🎭 **Smooth Animations** — Framer Motion spring animations, entrance transitions, layout animations
- 🖱️ **Custom Interactive Cursor** — Smart cursor that detects interactive elements and scales dynamically
- 📖 **Reading Progress Bar** — Animated gradient scroll-progress indicator on the sticky navbar
- ♿ **Accessibility First** — ARIA landmarks, tablist semantics, screen-reader support, keyboard navigation
- 🎯 **Real-time Form Validation** — Dynamic color-coded input borders, touched-field validation, character counter
- 🌑 **Reduced Motion Support** — Respects `prefers-reduced-motion` system preference
- 🔡 **Google Font (Sora)** — Premium typography configured via Next.js font system
- 📄 **Resume PDF Preview** — Embedded iframe with mobile-friendly download fallback
- 🔝 **Animated Scroll-to-Top** — Framer Motion AnimatePresence button that fades in on scroll

---

## 🗂️ Sections

| Section | Description |
|---|---|
| 🏠 **Hero** | Name, typewriter effect, key stats, social links, CTA buttons |
| 👤 **About** | Professional summary, quick info, achievement cards |
| 🛠️ **Skills** | Filterable skill cards with animated progress bars |
| 🔬 **Projects** | Featured projects with live demo & GitHub links |
| 💼 **Experience** | Internship timeline with responsibilities & achievements |
| 🎓 **Education** | Academic timeline with connecting gradient line |
| 🏅 **Certifications** | Professional certifications & core competencies |
| 📄 **Resume** | PDF preview with mobile-responsive download card |
| 📞 **Contact** | Smart contact form with validation + social links |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | JavaScript (ES2022+) |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Font** | Sora (Google Fonts via next/font) |
| **PWA** | next-pwa |

---

## 📦 Getting Started

### Prerequisites

- Node.js `18.x` or higher
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rahulchaurasiya722003/Portfilo.git

# 2. Navigate to the project directory
cd Portfilo

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── public/
│   ├── images/           # Profile photo, logo
│   └── docs/             # Resume PDF
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles, custom utilities
│   │   ├── layout.js     # Root layout with font & metadata
│   │   └── page.jsx      # Home page (all sections)
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navbar with scroll-spy
│   │   ├── Hero.jsx          # Hero section with typewriter
│   │   ├── About.jsx         # About section
│   │   ├── Skills.jsx        # Skills with tab filtering & progress bars
│   │   ├── Projects.jsx      # Portfolio projects grid
│   │   ├── Experience.jsx    # Work experience timeline
│   │   ├── Education.jsx     # Education timeline
│   │   ├── Certifications.jsx# Professional certifications
│   │   ├── ResumeSection.jsx # PDF preview & download
│   │   ├── Contact.jsx       # Smart contact form
│   │   ├── Footer.jsx        # Footer with animated scroll-to-top
│   │   └── CustomCursor.jsx  # Interactive custom cursor
│   └── data/
│       └── portfolioData.js  # All personal data & content
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## 🚀 Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

---

## 🎨 Customization

All personal information is stored in a single file: **`src/data/portfolioData.js`**

Update the following exports to customize your portfolio:
- `personalDetails` — name, email, phone, location, social links
- `skillsData` — technical skills by category with proficiency levels
- `projectsData` — featured projects with links & tech stacks
- `experienceData` — work experience history
- `educationData` — academic background
- `certificationsData` — professional certifications

---

## ♿ Accessibility Highlights

- Skip to main content keyboard link
- ARIA landmarks (`role="banner"`, `role="navigation"`, `role="contentinfo"`)
- `aria-current="page"` on active nav items
- `aria-expanded` / `aria-controls` on mobile menu toggle
- `role="tablist"` / `role="tab"` on category filters
- `role="progressbar"` with `aria-valuenow` on skill bars
- `role="alert"` on form status banners
- `prefers-reduced-motion` media query support

---

## 📬 Contact

**Rahul Chaurasiya**

- 💼 LinkedIn: [linkedin.com/in/rahul-chaurasiya48290b281](https://www.linkedin.com/in/rahul-chaurasiya48290b281)
- 🐙 GitHub: [github.com/rahulchaurasiya722003](https://github.com/rahulchaurasiya722003)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by **Rahul Chaurasiya**

⭐ If you found this useful, please give it a star!

</div>
