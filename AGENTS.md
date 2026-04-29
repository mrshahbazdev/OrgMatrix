# OrgMatrix — Agents / Development Guide

## Project Overview

**OrgMatrix** is an organizational intelligence platform built by **Allocore**. It helps leadership teams visualize org structures, manage roles & people, plan succession, and identify organizational risks — all in one powerful, multi-language platform.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|--------------------------------------------------|
| Backend    | PHP 8.1+, Laravel 10                             |
| Frontend   | Vue 3 (Composition API), Inertia.js              |
| Styling    | Tailwind CSS 3                                   |
| i18n       | vue-i18n 9 (EN / DE)                             |
| Database   | SQLite (dev) / PostgreSQL (production)            |
| Org Chart  | D3.js v7                                         |
| Auth       | Laravel Breeze (session-based)                   |
| Build      | Vite 5                                           |
| Routing    | Ziggy (Laravel routes in JS)                     |

---

## Setup

```bash
# Install dependencies
composer install
npm install

# Copy environment
cp .env.example .env
php artisan key:generate

# Database (SQLite for dev)
touch database/database.sqlite
# Set DB_CONNECTION=sqlite in .env
php artisan migrate

# Build & serve
npm run dev          # Vite dev server
php artisan serve    # Laravel dev server on :8000
```

---

## Project Structure

```
app/
├── Http/Controllers/
│   ├── OrganizationController.php   # Org CRUD
│   ├── RoleController.php           # Role CRUD (nested under org)
│   ├── PersonController.php         # Person CRUD (nested under org)
│   ├── RoleAssignmentController.php # Assign people to roles
│   ├── OrgChartController.php       # Tree builder for D3.js
│   └── LanguageController.php       # EN/DE locale switch
├── Http/Middleware/
│   └── SetLocale.php                # Session-based locale
├── Models/
│   ├── Organization.php
│   ├── Role.php                     # Self-referential (parent_role_id)
│   ├── Person.php
│   └── RoleAssignment.php           # Pivot: role ↔ person
resources/js/
├── i18n/
│   ├── index.js                     # vue-i18n setup
│   ├── en.json                      # English translations
│   └── de.json                      # German translations
├── Components/
│   └── LanguageSwitcher.vue         # EN/DE toggle
├── Layouts/
│   ├── AuthenticatedLayout.vue      # Sidebar + header
│   └── GuestLayout.vue              # Split-screen auth layout
├── Pages/
│   ├── Welcome.vue                  # Landing page
│   ├── Dashboard.vue                # Org overview cards
│   ├── Auth/                        # Login, Register, ForgotPassword
│   ├── Organizations/               # Index, Create, Show, Edit
│   ├── Roles/                       # Index, Create, Edit
│   ├── Persons/                     # Index, Create, Edit
│   ├── Assignments/                 # Create (assign person to role)
│   └── OrgChart/                    # D3.js tree visualization
```

---

## Database Schema

```
users
├── id, name, email, password

organizations
├── id, user_id (FK), name, description, industry, logo

roles
├── id, organization_id (FK), parent_role_id (self FK, nullable)
├── name, description, department
├── criticality (enum: low/medium/high/critical)
├── is_active, sort_order

people
├── id, organization_id (FK)
├── first_name, last_name, email, phone
├── title, department, avatar, notes, is_active

role_assignments
├── id, role_id (FK), person_id (FK)
├── is_primary (bool), start_date, end_date, notes
├── UNIQUE(role_id, person_id)
```

---

## Internationalization (i18n)

- **Languages**: English (`en`), German (`de`)
- **Frontend**: vue-i18n 9 with Composition API (`useI18n()`)
- **Backend**: Session-based locale via `SetLocale` middleware
- **Switch**: `GET /language/{locale}` route → stores in session
- **Translation files**: `resources/js/i18n/en.json` and `de.json`
- All UI text uses `t('key')` — never hardcoded strings

---

## Routing Conventions

- Landing: `GET /`
- Auth: `/login`, `/register`, `/forgot-password`
- Dashboard: `GET /dashboard`
- Organizations: `/organizations` (resource)
- Nested under org: `/organizations/{org}/roles`, `/organizations/{org}/persons`
- Assignments: `/organizations/{org}/roles/{role}/assign`
- Org Chart: `/organizations/{org}/chart`
- Language: `GET /language/{locale}`

---

## Full Roadmap

### Phase 1 — Core MVP (CURRENT)

**Goal**: Working organizational logic with visualization

**Features** (implemented):
- [x] Organization setup (CRUD)
- [x] Roles CRUD with hierarchy (parent_role_id)
- [x] Persons CRUD
- [x] Role assignments (many-to-many with pivot)
- [x] Primary representative per role
- [x] Interactive org chart (D3.js tree)
- [x] Criticality levels (low/medium/high/critical)
- [x] Multi-language (EN/DE) with switcher
- [x] Professional landing page
- [x] Modern auth UI (split-screen)
- [x] Responsive sidebar layout

---

### Phase 2 — Continuity Logic

**Goal**: Real representation & succession planning

**Features**:
- [ ] Multiple representatives per role (already supported via role_assignments)
- [ ] Succession horizons: short-term (0-6 mo), mid-term (6-18 mo), long-term (18+ mo)
- [ ] Readiness scoring per successor (1-5 scale with criteria)
- [ ] Role criticality dashboard
- [ ] Risk indicators on org chart
  - Roles without backup (single point of failure)
  - Successor readiness too low
  - Critical role with no succession plan

**UX**:
- [ ] Color-coded org chart nodes by risk level
- [ ] Filters: "Roles without backup", "Critical roles", "Low readiness"
- [ ] Risk summary cards on dashboard

**Database additions**:
```sql
ALTER TABLE role_assignments ADD COLUMN succession_horizon ENUM('short','mid','long');
ALTER TABLE role_assignments ADD COLUMN readiness_score TINYINT; -- 1-5

CREATE TABLE readiness_criteria (
    id, role_assignment_id, criterion, score, notes
);
```

---

### Phase 3 — Scenario & Insight Layer

**Goal**: Decision support for leadership

**Features**:
- [ ] Vacancy simulation ("What if X leaves?")
  - Select a person → show all affected roles
  - Display coverage gaps and succession candidates
- [ ] Impact analysis dashboard
  - Ripple effect visualization
  - Department-level impact scores
- [ ] Key role dashboard
  - Aggregate view of all critical/high roles
  - Coverage status, readiness heat map
- [ ] Export for board meetings
  - PDF export of org chart
  - Summary report with risk indicators
  - Export roles/people as CSV

**UX**:
- [ ] Simulation mode toggle on org chart
- [ ] Side panel with impact details
- [ ] Print-friendly views

---

### Phase 4 — Intelligence Layer (Optional)

**Goal**: Allocore differentiation through AI

**Features**:
- [ ] AI suggestions (via OpenAI/Anthropic API):
  - "This role should have a backup"
  - "Successor readiness score is too low for [Role]"
  - "Consider cross-training [Person] for [Role]"
- [ ] Pattern detection:
  - Departments with single points of failure
  - Roles with frequent turnover indicators
  - Knowledge concentration risks
- [ ] Org health score (0-100):
  - Weighted composite of coverage, readiness, criticality balance
  - Trend tracking over time

**Tech additions**:
- [ ] BYOK (Bring Your Own Key) for LLM providers
- [ ] Background analysis jobs (queued)
- [ ] Notification system for AI insights

---

### Phase 5 — Enterprise Readiness

**Goal**: Production-grade for organizations of all sizes

**Features**:
- [ ] Role-based access control (RBAC):
  - Admin, Manager, Viewer roles per organization
  - Granular permissions (view/edit/delete per module)
- [ ] Audit log:
  - Track all CRUD operations
  - Who changed what, when
  - Exportable audit trail
- [ ] Multi-organization support:
  - Users can belong to multiple orgs
  - Organization switching in sidebar
  - Org-level settings and branding
- [ ] API for HR systems:
  - RESTful API with token auth
  - Webhooks for role/person changes
  - Import/sync from SAP, Workday, BambooHR
- [ ] SSO integration (SAML/OIDC)
- [ ] Data encryption at rest
- [ ] Compliance exports (GDPR)

---

## Code Conventions

- **Vue**: Composition API with `<script setup>`
- **Styling**: Tailwind CSS utility classes only — no custom CSS
- **Components**: PascalCase filenames, single-file components
- **Controllers**: Resource controllers, nested routes for org-scoped entities
- **Authorization**: Inline `abort_unless()` checks (Phase 1), migrate to Policies (Phase 5)
- **Translations**: All user-facing text via `t('key')` — never hardcode
- **Models**: Eloquent with typed relationships, $fillable, $casts
- **Forms**: Inertia `useForm()` for all submissions
- **No raw SQL** — use Eloquent/Query Builder

## Commands

```bash
# Development
npm run dev              # Vite dev server with HMR
php artisan serve        # Laravel on localhost:8000

# Build
npm run build            # Production build (client + SSR)

# Database
php artisan migrate      # Run migrations
php artisan migrate:fresh --seed  # Reset + seed (when seeders exist)

# Testing
php artisan test         # PHPUnit tests
```
