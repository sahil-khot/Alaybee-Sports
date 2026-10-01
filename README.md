# 🏆 Alaybee Sports — Full-Stack E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

A modern, production-grade full-stack athletic gear and sports equipment e-commerce web application. Built with **React 18 (Vite)**, **Bootstrap 5**, **Node.js/Express**, and **MongoDB Atlas** with JWT authentication, role-based member privileges, simulated payment gateway processing, and real-time order tracking.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client (React 18 + Vite)                      │
│   • React Router v6 (SPA)     • Context API (Auth, Cart, Wishlist)      │
│   • Bootstrap 5 + Vanilla CSS • Dynamic Product Modals & Reviews        │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                             REST API (JSON / JWT)
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        Backend (Node.js + Express)                      │
│   • Express Router            • JWT Bearer Auth & bcryptjs Hashing       │
│   • Role-based Access Guard   • Input Validation & Unified Error Handler │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                             Mongoose 8 ODM
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                          Database (MongoDB Atlas)                       │
│   • Users Collection (Roles, Profiles, Avatars, Passwords)              │
│   • Auto-seeding for pre-configured athlete & member test accounts      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
Alaybee-Sports/
├── public/                     # Static assets & public icons
├── src/                        # Frontend React Application
│   ├── assets/                 # Brand assets & images
│   ├── components/             # Reusable UI components
│   │   ├── Footer.jsx          # Site-wide navigation footer
│   │   ├── Hero.jsx            # Dynamic homepage hero banner
│   │   ├── Navbar.jsx          # Navigation header with cart/wishlist counters
│   │   ├── ProductCard.jsx     # Catalog card with badge, rating & quick-actions
│   │   ├── ProductDetailModal.jsx # Full product modal with customer reviews
│   │   └── ProtectedRoute.jsx  # Route guard for authenticated paths
│   ├── context/                # Global React Context providers
│   │   └── AuthContext.jsx     # Authentication, sessions & avatar state
│   ├── data/                   # Catalog dataset
│   │   └── products.js         # 160 curated products across 10 sports
│   ├── pages/                  # Page-level route views
│   │   ├── About.jsx           # Company mission, stats & sports facilities
│   │   ├── BestSellers.jsx     # Top-rated gear (4.8+) with instant filter
│   │   ├── Cart.jsx            # Interactive cart with quantity steppers
│   │   ├── Categories.jsx      # Sport categories directory with featured items
│   │   ├── Checkout.jsx        # Multi-stage gateway loader & payment receipt
│   │   ├── Contact.jsx         # Support hub with balanced inquiry form
│   │   ├── Deals.jsx           # Promotional discount listings
│   │   ├── Home.jsx            # Landing page with hero, trends & categories
│   │   ├── Login.jsx           # Login with 1-click test credentials
│   │   ├── Orders.jsx          # Order history with 4-stage shipment tracker
│   │   ├── Profile.jsx         # User profile, role badges & avatar manager
│   │   ├── ProLounge.jsx       # Exclusive VIP zone for Pro Athletes
│   │   ├── Register.jsx        # Account registration with role selection
│   │   ├── Shop.jsx            # Full catalog with search, sort & filters
│   │   ├── TrackOrder.jsx      # Live parcel & tracking lookup tool
│   │   └── Wishlist.jsx        # Saved equipment & fast move-to-cart
│   ├── services/               # Client API integrations
│   │   └── api.js              # Centralized fetch client with bearer auth
│   ├── App.jsx                 # Route definitions and layout shell
│   ├── index.css               # Global typography, color tokens & animations
│   └── main.jsx                # React DOM root entry point
├── server/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB Atlas connection & auto-seeder
│   ├── controllers/
│   │   └── authController.js   # Auth controllers (register, login, me, profile)
│   ├── data/
│   │   ├── dummyAccounts.js    # Pre-configured test accounts
│   │   └── seedProducts.js     # Standalone product database seeder
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT token verification & role authorization
│   ├── models/
│   │   ├── Order.js            # Mongoose Order schema
│   │   └── User.js             # Mongoose User schema with bcrypt hooks
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints (/api/auth/*)
│   │   └── productRoutes.js    # Product catalog endpoints (/api/products/*)
│   ├── .env                    # Server environment variables (git-ignored)
│   ├── .env.example            # Server environment template
│   ├── package.json            # Server dependencies & scripts
│   └── server.js               # Express application entry point
├── .env                        # Client environment variables (git-ignored)
├── .env.example                # Client environment template
├── .gitignore                  # Git ignore rules for node_modules and .env
├── package.json                # Root client dependencies & scripts
├── vercel.json                 # Vercel deployment configuration & SPA rewrites
├── vite.config.js              # Vite build setup with proxy for local dev
└── README.md                   # Project documentation
```

---

## ✨ Features & Capabilities

- **10 Sports Disciplines & 160 Curated Products**:
  - Cricket, Football, Basketball, Tennis, Badminton, Cycling, Fitness, Running, Swimming, and Boxing.
  - 16 distinct products per category with 160 unique high-resolution images, real Indian Rupee (₹) pricing, discount badges, specifications, and verified customer reviews.
- **Natural Payment Experience**:
  - Realistic multi-stage payment gateway authorization simulation (`Connecting Gateway` &rarr; `Authorizing ₹ Amount` &rarr; `Generating Invoice`).
  - Polished post-payment receipt displaying transaction reference IDs, itemized totals, delivery address verification, and one-click shipment tracking.
- **Shipment Tracking & Order History**:
  - Visual 4-stage tracking timeline (`Order Placed` &rarr; `Confirmed` &rarr; `Packed` &rarr; `Delivered`) on every purchase.
- **Role-Based Privileges & Pro Lounge**:
  - **Club Member**: Standard athletic member pricing and regular order history.
  - **Pro Athlete**: VIP access to the Pro Athlete Lounge, automated 25% discount perks, priority courier dispatch, and special role badges.
- **Profile & Custom Avatar Management**:
  - Upload custom profile pictures, edit personal details, phone numbers, and city preferences with persistent cloud/local sync.
- **Tactile Cart & Shopping Experience**:
  - Circular quantity steppers, soft-danger item removal buttons, animated checkout call-to-actions, and live subtotal calculations.
- **Balanced Customer Support Hub**:
  - Direct customer care hotline, verified support email, corporate headquarters details, operating hours, and inquiry form with live submission feedback.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, React Router DOM 6, Bootstrap 5.3, React Icons (`react-icons`) |
| **State & Logic** | React Context API, LocalStorage persistence, custom hooks |
| **Styling** | Custom Design System (`index.css`), CSS keyframe animations, responsive flex/grid |
| **Backend** | Node.js, Express.js (v4), CORS |
| **Database** | MongoDB Atlas (Cloud Cluster), Mongoose (v8 ODM) |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` password hashing |
| **Deployment** | Vercel (Frontend & SPA configuration via `vercel.json`), Render / Railway (Backend) |

---

## ⚙️ Environment Variables

### 1. Client Environment (`.env`)
Create a `.env` file in the project root:
```env
# Local Development (proxied to local Express server)
VITE_API_URL=http://localhost:5000/api

# Production (when deployed to Vercel, set to your live backend URL)
# VITE_API_URL=https://your-alaybee-backend.onrender.com/api
```

### 2. Server Environment (`server/.env`)
Create a `.env` file in the `server/` directory:
```env
# Server Port
PORT=5000

# MongoDB Atlas Connection URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.alaybee.mongodb.net/alaybee_sports?retryWrites=true&w=majority

# JWT Authentication Secret & Token Expiration
JWT_SECRET=alaybee_sports_super_secret_jwt_key_2026_sports
JWT_EXPIRES_IN=7d

# Environment Mode
NODE_ENV=development
```

> **Security Note**: Both `.env` files are ignored in `.gitignore` to protect production database credentials and JWT secrets.

---

## 🚀 Local Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- Free MongoDB Atlas cluster or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/sahil-khot/Alaybee-Sports.git
cd Alaybee-Sports
```

### 2. Install Dependencies
```bash
# Install client dependencies (root)
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Configure Environments
Copy the templates to `.env`:
```bash
# In project root:
cp .env.example .env

# In server directory:
cp server/.env.example server/.env
```
*Update `server/.env` with your actual MongoDB Atlas connection URI.*

### 4. Run the Application
Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
npm run server
# Runs on http://localhost:5000
# Automatically connects to MongoDB Atlas and verifies test accounts
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev
# Runs on http://localhost:5173
```

---

## ⚡ Pre-configured Test Accounts

You can log in manually or click the **1-Click Test Login** buttons on the `/login` page:

| Role | Name | Email | Password | Access & Perks |
| :--- | :--- | :--- | :--- | :--- |
| **Club Member** | Rahul Sharma | `member@alaybee.com` | `password123` | Member pricing, checkout access, personal order history |
| **Pro Athlete** | Arjun Verma | `athlete@alaybee.com` | `password123` | Pro Lounge access, 25% automatic discount, priority dispatch badge |

---

## 📡 REST API Reference

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Server health check and timestamp | No |
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate user and return JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes (JWT) |
| `PUT` | `/api/auth/profile` | Update profile data and custom avatar | Yes (JWT) |
| `GET` | `/api/auth/demo-accounts` | List pre-configured demo account credentials | No |
| `GET` | `/api/auth/athlete-perks` | Retrieve Pro Athlete member exclusive benefits | Yes (Pro Role) |
| `GET` | `/api/products` | Fetch sports catalog items | No |

---

## 🚢 Complete All-in-One Vercel Deployment Guide

Alaybee Sports is pre-configured for a **complete, unified deployment on Vercel** — hosting both the **React 18 frontend** and the **Express/MongoDB serverless API** in a single Vercel project with zero extra hosting needed.

### Step 1: Whitelist MongoDB Atlas for Cloud Access
1. Open your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/).
2. Navigate to **Security** &rarr; **Network Access**.
3. Ensure `0.0.0.0/0` (**Allow Access from Anywhere**) is enabled so Vercel's serverless functions can connect to your database cluster.

### Step 2: Import Project on Vercel
1. Go to [Vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New... &rarr; Project**.
3. Select and import **`sahil-khot/Alaybee-Sports`**.

### Step 3: Configure Build & Environment Settings
1. Vercel automatically detects the project architecture:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
2. Expand **Environment Variables** and add the following 4 variables:
   - `MONGO_URI`: `mongodb+srv://sahilkhot1152005_db_user:QlFDeJ0iNRNYtr67@alaybeesports.huzlkea.mongodb.net/alaybee_sports?retryWrites=true&w=majority&appName=AlaybeeSports`
   - `JWT_SECRET`: `alaybee_sports_super_secret_jwt_key_2026_sports`
   - `JWT_EXPIRES_IN`: `7d`
   - `NODE_ENV`: `production`

> **Note on `VITE_API_URL`**: Because the frontend and backend are deployed together on the exact same domain, requests to `/api` work natively without setting `VITE_API_URL`.

### Step 4: Deploy & Verify
1. Click **Deploy**.
2. Within ~45 seconds, Vercel will build the frontend assets, bundle the serverless functions in `api/index.js`, and publish your application.
3. Test your live deployment:
   - **API Health Check**: `https://<your-project>.vercel.app/api/health`
   - **Frontend App**: `https://<your-project>.vercel.app/`
   - **Client Routing**: Refresh `/orders`, `/cart`, or `/categories` to verify clean SPA routing handled by `vercel.json`.
   - **Authentication**: Test 1-click login on `/login` to verify live MongoDB Atlas connectivity.

---

## 👨‍💻 Author & Repository

- **Author**: Sahil Khot
- **Repository**: [https://github.com/sahil-khot/Alaybee-Sports](https://github.com/sahil-khot/Alaybee-Sports)
