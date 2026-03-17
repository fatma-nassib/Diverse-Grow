# DIVERSE GROW

**Smart Agricultural Cooperative Platform**

A full-stack prototype built for the YouthTeamUp 4th Deep Virtual Exchange (DVE) Cycle — empowering smallholder farmers in Zambia and Tanzania through integrated digital tools for farm management, cooperative coordination, market access, and agricultural education.

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Platform Modules](#platform-modules)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Team](#team)
- [Partner Institutions](#partner-institutions)
- [Alignment with SDGs](#alignment-with-sdgs)
- [License](#license)

---

## Overview

DIVERSE GROW is a mobile-first responsive web application designed specifically for agricultural cooperatives in Sub-Saharan Africa. It brings together four interconnected tools — farm management, cooperative governance, a digital marketplace, and an education hub — into a single, low-bandwidth-optimised platform accessible from any device without installation.

The platform was developed as a Minimum Viable Product (MVP) within a 12-week implementation sprint under the YouthTeamUp consortium, co-funded by the European Union under the Erasmus+ programme (Project ID: 101112172).

---

## The Problem

Smallholder farmers in Zambia and Tanzania face compounding challenges that limit their productivity and income:

- **No digital farm management tools** — farmers cannot track crop cycles, input costs, or yield patterns
- **Inefficient cooperative operations** — manual record-keeping, poor communication, and weak governance undermine member trust
- **Exploitative market structures** — middlemen capture 30–50% of farm income, leaving farmers with a fraction of the market value
- **Limited agricultural knowledge** — inadequate access to extension services prevents adoption of sustainable and profitable farming practices

Fewer than 10% of cooperatives in Zambia and Tanzania have adopted any form of digital solution, despite mobile phone penetration exceeding 70%.

---

## The Solution

DIVERSE GROW addresses all four challenges in a single integrated platform, purpose-built for cooperative structures rather than individual farmers. Key design principles:

- **Zero-friction access** — accessible via URL or QR code, no app store account or installation required
- **Mobile-first** — optimised for small smartphone screens, tested at 320px width and above
- **Low-bandwidth friendly** — minimal asset sizes, optimised load times for rural connectivity
- **Cooperative-centred** — built around collective action, not just individual farm management
- **Progressive Web App ready** — can be installed from the browser for an app-like experience in Phase 2

---

## Platform Modules

### Dashboard
The central hub providing a real-time overview of the farmer's operation. Displays active crop statuses with progress tracking, an 8-month yield and income bar chart, recent farm activity, and cooperative announcements — all at a glance.

### Farm Management
Full crop lifecycle tracking from planting to harvest. Farmers manage multiple plots and crops simultaneously, log field activities (watering, fertilising, spraying, observations), monitor growth stages with visual progress indicators, and review historical yield and income records. Supports add-crop and log-activity workflows with full form validation.

### Digital Marketplace
A peer-to-peer produce marketplace connecting farmers directly with buyers across Zambia and Tanzania. Farmers list produce with full quality and delivery details; buyers submit inquiries directly through the platform. Eliminates exploitative intermediaries and gives farmers full control over their pricing. Includes category filtering, keyword search, and a guided listing creation flow.

### Education Hub
A curated library of long-form agricultural articles written by domain experts and development organisations. Topics span soil health, integrated pest management, post-harvest handling, market access strategies, cooperative governance, and irrigation. Articles are fully readable in-app with formatted headings, bullet points, reading time estimates, and read-count statistics.

### Cooperative Hub
A complete cooperative management interface with four sections:

- **Overview** — key cooperative statistics and leadership committee directory
- **Members** — searchable member register with roles, farm areas, contact details, and status tracking; supports adding new pending members
- **Announcements** — post and view cooperative-wide notices with low, medium, and high priority levels
- **Documents** — shared document repository for constitutions, financial reports, meeting minutes, and templates

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 8 |
| Icons | Lucide React |
| Styling | Inline CSS with CSS custom properties |
| State Management | React useState (local component state) |
| Routing | Custom Screen union type — no external router |

No external CSS frameworks, no UI component libraries, and no state management dependencies beyond React itself. This keeps the bundle lean (under 300 KB uncompressed) and the codebase fully transparent and auditable.

---

## Project Structure

```
diverse-grow/
├── src/
│   ├── main.tsx                  # Application entry point
│   ├── App.tsx                   # Root component and screen router
│   ├── types.ts                  # All TypeScript interfaces and type definitions
│   ├── index.css                 # Global CSS reset and CSS custom properties
│   ├── components/
│   │   ├── Layout.tsx            # Sidebar navigation, topbar, breadcrumb trail
│   │   ├── ui.tsx                # Shared UI primitives: Card, Button, Badge,
│   │   │                         #   ProgressBar, Input, Select, Textarea, Grid, Tag
│   │   ├── Dashboard.tsx         # Overview dashboard with live stats and charts
│   │   ├── FarmManagement.tsx    # Crop tracking, activity logging, yield history
│   │   ├── Marketplace.tsx       # Browse listings, post listings, contact sellers
│   │   ├── EducationHub.tsx      # Article library with full in-app reader
│   │   └── CooperativeHub.tsx    # Members, announcements, documents, overview
│   └── data/
│       └── mockData.ts           # Typed seed data for all platform modules
├── public/
│   └── favicon.svg
├── dist/                         # Production build output — ready to deploy
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts
```

### Type Architecture

All data models are defined centrally in `src/types.ts`. Core types include:

```
User, UserRole
Crop, CropStatus, Plot, YieldRecord, ActivityLog
Listing, ListingStatus, ProduceCategory, NewListingForm
Article, ArticleCategory
CoopMember, MemberRole, MemberStatus, Cooperative, Announcement, CoopDocument
Screen  (union type driving all navigation)
```

Every component and mock data entry is fully typed — no implicit `any` anywhere in the codebase.

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
cd diverse-grow

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### First run

The application loads with a pre-populated demo session for Ashley Ntaimo (Lusaka, Zambia) with realistic sample data across all five modules:

- 3 active crops across 3 plots with growth progress and activity logs
- 8 months of yield and income history
- 6 marketplace listings from cooperatives across Zambia and Tanzania
- 6 full-length agricultural education articles
- A 48-member cooperative with announcements and shared documents

All interactions within a session are live — adding crops, logging field activities, posting marketplace listings, adding cooperative members, and posting announcements all update state immediately and reflect across the dashboard.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Run TypeScript type-checking and produce an optimised production build in `dist/` |
| `npm run preview` | Serve the production build locally to verify it before deployment |
| `npm run lint` | Run ESLint across all TypeScript source files |

---

## Deployment

The `dist/` folder produced by `npm run build` is a fully self-contained static site. It can be deployed to any static hosting provider without a backend server.

### Vercel (recommended — free tier)

```bash
npm install -g vercel
vercel --prod
```

### Hostinger / cPanel

Upload the entire contents of the `dist/` folder to your `public_html` directory via FTP or the cPanel File Manager. Ensure the `.htaccess` file below is present to handle client-side routing:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Netlify

Drag and drop the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop). Netlify handles client-side routing automatically.

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/diverse-grow/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
}
```

> All hosting configurations must serve `index.html` for all routes. This is required because DIVERSE GROW uses client-side navigation — the server must not 404 on deep links.

---

## Roadmap

### Phase 2 — Backend Integration (Months 3–6)

- Node.js + Express REST API replacing mock data
- MongoDB Atlas database for persistent storage
- JWT-based user authentication with role-based access control (farmer, cooperative admin, buyer)
- Real marketplace transactions with negotiation and order tracking
- Push notifications via browser Web Push API
- Progressive Web App (PWA) manifest and service worker for offline access

### Phase 3 — Advanced Features (Months 7–12)

- Native mobile apps for Android and iOS via React Native
- SMS notifications through Africa's Talking API for feature phone users
- IoT sensor integration for soil moisture, temperature, and weather data
- AI-powered crop disease detection from photo uploads
- Weather forecast integration linked to planting and irrigation calendars
- Financial services partnerships: crop insurance, microloans, mobile money (M-Pesa, Airtel Money)

### Long-Term Vision (Year 2–5)

- Expansion to 50,000–100,000 smallholder farmers across East and Southern Africa
- 1,000+ cooperatives onboarded
- White-label licensing to NGOs, national governments, and regional farmer unions
- Aggregated data analytics dashboards for agribusinesses, researchers, and development organisations
- Integration with national agricultural extension systems

---

## Team

| Name | Role | Nationality | Institution |
|---|---|---|---|
| Ashley Ntaimo | Agricultural Lead | Zambian | TBD |
| Fatma Nassib Abdallah | IT Lead | Tanzanian | University of Dar es Salaam (UDSM) |

**Ashley Ntaimo** brings deep knowledge of Zambian agricultural systems and cooperative structures. She leads all user research, content development, stakeholder engagement, pilot cooperative partnerships, and user acceptance testing. Her understanding of smallholder farmer challenges ensures the platform addresses real needs with culturally appropriate solutions.

**Fatma Nassib Abdallah** is a third-year Computer Science student at the University of Dar es Salaam. She leads all technical aspects of the project — system architecture, frontend and backend development, database design, security implementation, and production deployment. Her expertise in React and Node.js forms the technical foundation of the platform.

**Contact:**

Ashley Ntaimo — ntaimoashley140@gmail.com  
Fatma Nassib Abdallah — fattenacious2714@gmail.com

---

## Partner Institutions

This project is developed under the YouthTeamUp consortium, co-funded by the European Union Erasmus+ programme.

| Code | Institution | Country | Role |
|---|---|---|---|
| CUB | Constructor University Bremen | Germany | Technical and academic mentor |
| WAZIUP | WAZIUP e.V. | Germany | IoT and platform partner |
| CBU | The Copperbelt University | Zambia | Academic mentor |
| DTBi | Dar Teknohoma Business Incubator | Tanzania | Business mentor |
| UDSM | University of Dar es Salaam | Tanzania | Academic mentor |
| BH | Bongohive Innovations Limited | Zambia | Innovation and technology mentor |
| FE | Fondazione Edulife | Italy | Education and training partner |

---

## Alignment with SDGs

### SDG 8 — Decent Work and Economic Growth
DIVERSE GROW increases farmer income by eliminating exploitative middlemen and providing direct market access. It streamlines cooperative operations, reducing administrative overhead by an estimated 50–70%. The platform creates technology-enabled economic opportunities for rural youth and supports the growth of stronger, more transparent cooperative enterprises.

### SDG 9 — Industry, Innovation and Infrastructure
The platform delivers digital infrastructure to underserved rural communities that have historically lacked access to agricultural technology. By building an affordable, low-bandwidth web application that works on basic smartphones, DIVERSE GROW demonstrates a replicable model for technology-driven development across Sub-Saharan Africa.

**Expected Impact:**
- 15–25% increase in farm productivity through data-driven decision-making
- 10–20% increase in farmer income through improved market access
- 30–40% reduction in input costs through cooperative bulk purchasing
- 50–70% reduction in cooperative administrative time

---

## Acknowledgements

Funded by the European Union Erasmus+ programme, ERASMUS-EDU-2022-VIRT-EXCH-NDICI, Project ID 101112172. Views and opinions expressed are those of the authors only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.

Agricultural content informed by:

- Food and Agriculture Organization of the United Nations (FAO) — *Smallholder Farmers in Sub-Saharan Africa*, 2021
- International Fund for Agricultural Development (IFAD) — *Strengthening Agricultural Cooperatives in East Africa*, 2022
- World Bank — *Digital Agriculture in Africa: Opportunities and Challenges*, 2023
- Tanzania Ministry of Agriculture — Agricultural Sector Development Programme II, 2023
- Zambia Ministry of Agriculture — National Agricultural Policy 2023–2028

---

## License

This project is submitted as part of the YouthTeamUp 4th Deep Virtual Exchange programme. All rights reserved by the DIVERSE GROW team. For licensing enquiries, please contact the team directly.

---

*DIVERSE GROW — Empowering smallholder farmers through technology, cooperation, and knowledge.*
