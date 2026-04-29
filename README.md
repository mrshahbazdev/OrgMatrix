# OrgMatrix

**Organizational Intelligence Platform** by Allocore

Visualize org structures, manage roles & people, plan succession, and identify organizational risks — in English and German.

![Laravel](https://img.shields.io/badge/Laravel-10-FF2D20?style=flat-square&logo=laravel)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwind-css)

## Features

- **Organization Management** — Create and manage multiple organizations
- **Role Hierarchy** — Define roles with parent-child relationships and criticality levels
- **People Directory** — Full CRUD for team members with contact details
- **Role Assignments** — Assign people to roles with primary representative tracking
- **Interactive Org Chart** — D3.js powered hierarchical visualization with zoom/pan
- **Multi-Language** — Full English & German support with instant switching
- **Modern UI** — Professional landing page, split-screen auth, sidebar dashboard

## Tech Stack

- **Backend**: PHP 8.1+, Laravel 10, SQLite/PostgreSQL
- **Frontend**: Vue 3 (Composition API), Inertia.js, Tailwind CSS 3
- **Visualization**: D3.js v7
- **i18n**: vue-i18n 9
- **Auth**: Laravel Breeze
- **Build**: Vite 5

## Quick Start

```bash
# Clone & install
git clone https://github.com/mrshahbazdev/OrgMatrix.git
cd OrgMatrix
composer install
npm install

# Configure
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
# Edit .env: set DB_CONNECTION=sqlite

# Migrate & run
php artisan migrate
npm run dev &
php artisan serve
```

Visit `http://localhost:8000`

## Roadmap

See [AGENTS.md](AGENTS.md) for the full 5-phase roadmap.

| Phase | Goal | Status |
|-------|------|--------|
| 1 | Core MVP — Org chart, roles, people, assignments | Current |
| 2 | Continuity Logic — Succession planning, readiness scoring | Planned |
| 3 | Scenario & Insight — Vacancy simulation, impact analysis | Planned |
| 4 | Intelligence Layer — AI suggestions, org health score | Planned |
| 5 | Enterprise Ready — RBAC, audit log, multi-org, API | Planned |

## License

Proprietary — Allocore
