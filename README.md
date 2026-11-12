# Glam Room

A premium, full-stack-frontend luxury salon & grooming web application built with React and Vite. Glam Room delivers a cinematic landing page experience combined with a complete multi-role management system — all running entirely client-side with zero backend dependency.

---

## Table of Contents

- [Overview](#overview)
- [Contact Details & Locations](#contact-details--locations)
- [Live Demo Credentials](#live-demo-credentials)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Role-Based Access](#role-based-access)
- [Data Persistence](#data-persistence)
- [Key Components](#key-components)
- [Configuration](#configuration)
- [License](#license)

---

## Overview

**Glam Room** is a bespoke salon and grooming landing page paired with an appointment booking and management platform designed for luxury salons and modern barber concepts. The application caters to three distinct user groups:

- **Clients** discover curated grooming services, browse artisan stylist profiles, and self-book multi-service appointments online.
- **Staff Members** track assigned appointments, monitor commission earnings, inspect daily schedules, and manage profile credentials.
- **Administrators** oversee salon operations — including revenue analytics, staff roster CRUD, appointment scheduling, and admin configuration — from a dedicated dashboard.

All application state is managed and persisted directly in the browser via `localStorage`, making the application fully deployable to static hosting platforms such as Vercel, Netlify, or GitHub Pages.

---

## Contact Details & Locations

Glam Room provides comprehensive direct contact channels, including primary and alternative communication lines and store locations:

### Direct Communication Channels

| Channel | Primary Detail | Alternative Detail | Notes |
| :--- | :--- | :--- | :--- |
| **Phone** | `+92 300 1234567` | `+92 321 7654321` | Available Mon–Fri (10am–8pm), Sat–Sun (11am–7pm) |
| **Email** | `info@glamroom.com` | `support@glamroom.com` | 24/7 client inquiries and concierge support |
| **WhatsApp** | `+92 300 1234567` | `+92 321 7654321` | Instant chat booking and VIP reservation desk |

### Physical Salon Locations

- **Flagship Salon (Main Branch):**  
  `123 Main Street, Gulberg III, Lahore, Punjab 54000, Pakistan`
- **Alternative Studio (Clifton Branch):**  
  `Suite 402, Main Clifton Road, Block 4, Karachi, Sindh 75600, Pakistan`

### Operating Hours

- **Monday – Friday:** 10:00 AM – 8:00 PM
- **Saturday – Sunday:** 11:00 AM – 7:00 PM
- **VIP & After-Hours Services:** Available 24/7 upon prior appointment request

---

## Live Demo Credentials

| Role | Email | Password | Access Path |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@admin.com` | `admin` | `/admin/dashboard` |
| **Staff** | `john@glamroom.com` | `staff123` | `/staff/dashboard` |
| **Client** | Self-register an account | Chosen at registration | `/account` |

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Build Tool** | Vite 7 with Fast HMR |
| **Runtime** | Node.js (>= 18) / Bun |
| **UI Library** | React 18.3 |
| **Routing** | React Router DOM v7 (`createBrowserRouter`) |
| **Styling** | Tailwind CSS 4 with `@tailwindcss/vite` |
| **Animations** | GSAP 3.14 + `@gsap/react`, Framer Motion 12.26 |
| **Smooth Scroll** | `@studio-freight/react-lenis` |
| **3D Graphics** | Three.js 0.183 (WebGL ambient particle system) |
| **Icons** | Lucide React, FontAwesome Free 6/7 |
| **Linting** | ESLint 9 with `eslint-plugin-react-hooks` |

---

## Features

### Public-Facing Experience
- **Cinematic WebGL Particle Hero** — Three.js ambient particle field rendered on a background `<canvas>`, pausing automatically when out of viewport via `IntersectionObserver`.
- **GSAP ScrollTrigger Choreography** — Multi-phase reveal animations, scrubbed parallax headings, and editorial image mask slides.
- **Magnetic CTA Interaction** — Custom `useMagnetic` hook applies cursor-tracking magnetic physics to primary call-to-action buttons.
- **Hardware-Accelerated Smooth Scroll** — Global Lenis integration for fluid, luxury-grade scroll response.
- **Curated Service Catalogue** — Six comprehensive categories (Haircuts, Styling, Coloring, Treatments, Shaving, Grooming) with dynamic pricing tables.
- **Artisan Profile Pages (`/artisan/:id`)** — Individual portfolio views for each stylist showcasing their specialties, ratings, experience, weekly schedule, and customer testimonials.
- **Interactive Multi-Service Booking Form** — Dropdown service selector with multi-selection support, real-time total price calculation, date/time pickers, and automated staff availability assignment.
- **Contact Hub (`/contact`)** — Detailed contact page featuring primary and alternative phone, email, WhatsApp details, dual branch listings, and an interactive dark-styled Google Maps embed.

### Multi-Role Management Engines

#### 1. Admin Dashboard (`/admin/*`)
- **Executive Analytics:** Real-time statistics including total gross revenue, total completed bookings, active staff count, and inventory statuses.
- **Appointment Management:** Filterable, searchable, and sortable appointment tables with status lifecycle tracking (`pending`, `confirmed`, `completed`, `cancelled`) and edit/view modals.
- **Staff Roster Management:** Full CRUD operations to recruit, modify, or archive staff members with specialty tags, commission rates, and working schedules.
- **Configuration Hub:** Admin profile settings, contact info updates, and security/password management.

#### 2. Staff Panel (`/staff/*`)
- **Personal Dashboard:** Real-time metrics on assigned appointments, commission-based earnings, and today's appointment itinerary.
- **Appointment Registry:** Viewport-aware portal action menus (`createPortal` with automated flip logic) to manage client appointments.
- **Staff Profile:** Self-service profile updates and credential updates.

#### 3. Client Account Portal (`/account`)
- **Profile Tab:** View and update registered profile details and phone number.
- **Bookings Tab:** Complete appointment history with instant reschedule and cancellation workflows.
- **Feedback Tab:** Testimonial submission system with rating and experience reviews.

---

## Project Architecture

### Context Layer State Management

```
┌────────────────────────────────────────────────────────┐
│                      AuthProvider                      │
│     (User sessions, role gates, credentials sync)      │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                   AppointmentProvider                  │
│       (Booking engine, auto-assignment, storage)       │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                      StaffProvider                     │
│    (Staff roster, schedule validation, availability)   │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                     MessageProvider                    │
│           (Global toast notification system)           │
└────────────────────────────────────────────────────────┘
```

### Application Routing

```
/                        → Landing Page (Home)
/contact                 → Contact & Direct Inquiries
/login                   → User & Staff Login
/register                → New Client Registration
/artisan/:id             → Artisan Stylist Portfolio
/account                 → Client Portal (Protected: client)
/admin/dashboard         → Admin Overview (Protected: admin)
/admin/appointments      → Appointment Ledger (Protected: admin)
/admin/staffs            → Staff Management (Protected: admin)
/admin/configuration     → Admin Settings (Protected: admin)
/staff/dashboard         → Staff Overview (Protected: staff)
/staff/appointments      → Staff Appointments (Protected: staff)
/staff/profile           → Staff Profile (Protected: staff)
```

---

## Directory Structure

```
Glam-Room/
├── index.html                     # HTML5 entry with SEO schema and Google Fonts
├── vite.config.js                 # Vite + Tailwind configuration
├── package.json                   # Dependencies and npm run scripts
├── public/
│   ├── favicon.svg                # Glam Room monogram SVG favicon
│   └── *.webp                     # Partner brand logos and showcase assets
└── src/
    ├── main.jsx                   # Application bootstrap, routing, and providers
    ├── index.css                  # Tailwind 4 theme tokens, obsidian/champagne palette
    ├── Layout.jsx                 # Public layout wrapper (Header + Lenis + Footer)
    ├── AdminLayout.jsx            # Admin layout (AdminSidebar + Notifications)
    ├── StaffLayout.jsx            # Staff layout (StaffSidebar + Notifications)
    │
    ├── assets/                    # Media assets (WebP format)
    │   ├── services/              # Category imagery
    │   ├── reviews/               # Client avatars
    │   └── gallery/               # Work portfolio images
    │
    ├── Components/
    │   ├── Header.jsx             # Luxury brand header with responsive navigation
    │   ├── Footer.jsx             # Brand footer with links and social icons
    │   ├── HeroCanvas.jsx         # WebGL 3D particle hero effect
    │   ├── AppointmentForm.jsx    # Booking form with auto staff assignment
    │   ├── AppointmentFormContact.jsx # Contact-variant booking form
    │   ├── ConfirmModal.jsx       # Portal-based confirmation modal
    │   ├── ProtectedRoute.jsx     # Role-aware authentication guard
    │   ├── AdminPanel Components/ # Admin metric cards, modals, and sidebar
    │   ├── StaffPanel Components/ # Staff dashboard components and viewport menus
    │   └── UserPanel Components/  # Client profile, appointment cards, and feedback
    │
    ├── Context/
    │   ├── AuthContext.jsx        # Authentication and session state
    │   ├── AppointmentContext.jsx # Bookings and auto-assignment state
    │   ├── StaffContext.jsx       # Staff roster and schedule state
    │   └── MessageContext.jsx     # Toast notification state
    │
    ├── data/                      # Static catalogues (services, reviews, brands)
    ├── hooks/                     # Custom hooks (e.g. useMagnetic)
    └── Pages/                     # Public and role-protected view components
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended) **or** [Bun](https://bun.sh/)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hassanwaheedali/Glam-Room.git
cd Glam-Room

# 2. Install dependencies
npm install
# or: bun install

# 3. Start development server
npm run dev
# or: bun run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

```bash
npm run build
# or: bun run build
```

The compiled, production-ready assets will be generated in `dist/`.

### Preview Production Build

```bash
npm run preview
# or: bun run preview
```

---

## Role-Based Access

Role enforcement is handled by `ProtectedRoute.jsx`, which inspects `currentUser.accountRole`:

| Role | Authorized Routes |
| :--- | :--- |
| `client` | `/account` |
| `staff` | `/staff/dashboard`, `/staff/appointments`, `/staff/profile` |
| `admin` | `/admin/dashboard`, `/admin/appointments`, `/admin/staffs`, `/admin/configuration` |

---

## Data Persistence

State is persisted locally via `localStorage`:

| Key | Purpose |
| :--- | :--- |
| `allUsers` | Client and administrator account profiles |
| `GlamRoomStaff` | Staff roster with specialties, schedules, and commission rates |
| `Appointments` | All submitted bookings with service assignments and timestamps |
| `currentUser` | Current authenticated session (synced with `sessionStorage`) |

---

## Key Components

### `HeroCanvas.jsx`
A Three.js canvas rendering 5,000 amber-tinted particles with additive blending (`THREE.AdditiveBlending`). It continuously rotates smoothly via `THREE.Timer` and pauses when scrolled out of view to preserve GPU cycles.

### `AppointmentForm.jsx` & `AppointmentFormContact.jsx`
Multi-selection booking engines that calculate total cost, validate date/time schedules, and invoke `getAvailableStaff()` to automatically assign qualified stylists for each selected service.

### `Header.jsx` & `Footer.jsx`
Brand header and footer built with the Obsidian and Champagne design system, featuring custom typography, responsive desktop/mobile menus, and quick-access contact links.

---

## License

This project is open-source and available under the **MIT License**.
