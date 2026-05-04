# Project Instructions for Claude

## Project Overview
Personal portfolio website for Kajal Ranpise (Full Stack / MERN Developer).

## Tech Stack

### Frontend (`client/`)
- **React 18** with React Router v7
- **Redux Toolkit** for state management (slices: `profile`, `adminAuth`, `adminData`)
- **Bootstrap 5** + Bootstrap Icons
- **AOS**, **GLightbox**, **Swiper**, **Isotope** for UI effects
- Deployed via **GitHub Pages** (`npm run deploy` → `gh-pages`)

### Backend (`server/`)
- **Node.js** + **Express 4**
- **MongoDB** via **Mongoose 5**
- **JWT** (`jsonwebtoken`) for admin authentication
- **bcryptjs** for password hashing
- **dotenv** for environment config
- **cors** enabled

## Project Structure

```
/
├── client/               # React frontend
│   └── src/
│       ├── app/          # Redux store
│       ├── assets/       # Images, CSS, vendor libs
│       ├── components/   # Portfolio pages (about, resume, projects, services, contact…)
│       ├── features/     # Redux slices (profileSlice, adminAuthSlice, adminDataSlice)
│       └── admin/        # Admin panel (login, layout, dashboard, pages)
│           └── pages/    # AboutAdmin, SkillsAdmin, StatsAdmin, EducationAdmin,
│                         # ExperienceAdmin, ProjectsAdmin, ServicesAdmin
└── server/               # Node.js backend
    └── src/
        ├── controllers/  # authController, adminDataController, profileController
        ├── middleware/    # auth.js (JWT verification)
        ├── models/       # Admin, About, Skill, Stat, Education, Experience, Project, Service, Profile
        └── routes/       # authRoutes, adminRoutes, publicRoutes, profileRoutes
```

## API Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | — | Admin login → returns JWT |
| POST | `/api/auth/seed` | — | Creates first admin account (one-time) |
| GET/PUT | `/api/admin/about` | JWT | About singleton |
| CRUD | `/api/admin/skills` | JWT | Skills |
| CRUD | `/api/admin/stats` | JWT | Stats/Facts |
| CRUD | `/api/admin/education` | JWT | Education |
| CRUD | `/api/admin/experience` | JWT | Experience |
| CRUD | `/api/admin/projects` | JWT | Projects |
| CRUD | `/api/admin/services` | JWT | Services |
| GET | `/api/about`, `/api/skills`, etc. | — | Public read endpoints |

## Admin Panel
- URL: `http://localhost:3000/admin/login`
- Default credentials set in `server/.env` (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)
- JWT token stored in `localStorage` under key `adminToken`
- Protected via `PrivateRoute` component (redirects to login if no token)

## Environment Variables (`server/.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/my-mern-app
JWT_SECRET=your_jwt_secret_change_this_in_production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Running Locally
```bash
# Backend
cd server && npm run dev     # nodemon on port 5000

# Frontend
cd client && npm start       # CRA dev server on port 3000
```

## Key Conventions
- Server uses **CommonJS** (`require`/`module.exports`) throughout
- Client uses **ES Modules** (`import`/`export`)
- All admin data models include an `order` field for sorting
- Frontend data in portfolio components is currently **hardcoded** — the admin panel writes to MongoDB but the public pages do not yet fetch from the API (future work)
- Do not commit `server/.env` or `node_modules`
