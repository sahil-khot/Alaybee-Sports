# 🏆 Alaybee Sports — Full-Stack E-Commerce & Club Services Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, responsive full-stack sports equipment e-commerce platform built with **React (Vite)**, **Bootstrap 5**, **React Icons**, **Node.js/Express**, and **MongoDB Atlas** with JWT authentication and role-based privileges.

---

## ✨ Features

- **🎯 7 Sports Categories with 70+ Verified Items**:
  - Cricket, Football, Basketball, Tennis, Badminton, Cycling, and Fitness.
  - Complete with real images, INR pricing, original prices, discount tags, ratings, and specifications.
- **🔍 Seamless Category Navigation**:
  - Direct 1-click filtering from Home "Shop By Categories" into specific sport catalogs.
  - Category page displays 3 featured items per sport with direct click-through redirection.
- **⭐ Interactive Product Details & Customer Reviews**:
  - Click any product card to launch a full-detail modal.
  - View verified customer reviews, star breakdown, key highlights, and submit live reviews.
- **🛒 Dynamic Shopping Cart & Wishlist**:
  - Real-time quantity adjustments, price calculations, shipping, and persistent wishlist saving.
- **🔐 JWT Authentication & Demo Accounts**:
  - 1-click instant login buttons for pre-seeded test accounts.
  - Role-based authorization for **Club Members** and **Pro Athletes**.
- **📱 Clean, Consistent & Modern UI**:
  - Tailored color palette, Inter typography, rich React Icons, and responsive design.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM v6
- **UI & Icons**: Bootstrap 5, React Icons (`react-icons`)
- **Styling**: Vanilla CSS Design System with Inter typography

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Security & Auth**: JSON Web Tokens (JWT), bcryptjs password hashing, CORS, Dotenv

---

## 📁 Project Architecture

```text
Alaybee-Sports/
├── public/                 # Static assets (logo, favicon)
├── src/                    # Frontend React Application
│   ├── assets/             # Media and styling assets
│   ├── components/         # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/            # AuthContext for user state
│   ├── data/               # 70-product sports catalog
│   │   └── products.js
│   ├── pages/              # Route pages (Home, Shop, Categories, Cart, Wishlist, etc.)
│   ├── App.jsx             # Main routing and global state
│   ├── index.css           # Global typography and design system
│   └── main.jsx
├── server/                 # Node.js + Express Backend
│   ├── config/             # MongoDB connection & auto-seeder
│   ├── controllers/        # Auth & user controllers
│   ├── data/               # Pre-seeded dummy accounts
│   ├── middleware/         # JWT auth middleware
│   ├── models/             # Mongoose schemas (User, Order)
│   ├── routes/             # Express API routes
│   ├── .env.example        # Server environment template
│   └── server.js           # Server entry point
├── .env.example            # Client environment template
├── .gitignore              # Git ignore rules for node_modules and .env
├── package.json            # Client dependencies & scripts
├── vite.config.js          # Vite configuration with API proxy
└── README.md
```

---

## ⚙️ Environment Variables Setup

### 1. Client Environment (`.env`)
Create a `.env` file in the root directory (or copy from `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Server Environment (`server/.env`)
Create a `server/.env` file inside the `server/` directory (or copy from `server/.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

> **Note**: Both `.env` files are configured in `.gitignore` to prevent leaking private credentials and database secrets.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sahil-khot/Alaybee-Sports.git
cd Alaybee-Sports
```

### 2. Install Dependencies

#### Client Dependencies (Root):
```bash
npm install
```

#### Server Dependencies:
```bash
cd server
npm install
cd ..
```

### 3. Run the Development Servers

Open two terminal windows:

#### Terminal 1 — Start Backend Server:
```bash
npm run server
```
*Backend runs on `http://localhost:5000`*

#### Terminal 2 — Start Frontend Application:
```bash
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## ⚡ 1-Click Test Accounts

On the `/login` page, you can click either quick-login button to test:

| Role | Name | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- | :--- |
| **Club Member** | Rahul Sharma | `member@alaybee.com` | `password123` | Member pricing, checkout, order history |
| **Pro Athlete** | Arjun Verma | `athlete@alaybee.com` | `password123` | Exclusive Pro Lounge, 25% discount, priority dispatch |

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server on port 5173.
- `npm run server`: Starts the Express backend on port 5000.
- `npm run build`: Builds the production bundle with Vite.
- `npm run preview`: Locally previews the production build.

---

## 👨‍💻 Author

- **Sahil Khot** — [GitHub Profile](https://github.com/sahil-khot)
- Repository: [Alaybee-Sports](https://github.com/sahil-khot/Alaybee-Sports)
