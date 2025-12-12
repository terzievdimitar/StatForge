<div align="center">

<a href="https://github.com/terzievdimitar/statforge" target="blank">
  <img src="./frontend/public/icons/statforge-logo-light.svg" width="90" alt="StatForge Logo" />
</a>

<h2>Project Name : StatForge – Agency Infrastructure Platform (Prototype)</h2>

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

<img src="./frontend/src/assets/landing-page/StatForge_Landing_Page.png" width="80%" alt="StatForge Dashboard Preview" />

</div>

## 💡 Overview

**StatForge** is a prototype of an agency-focused infrastructure platform.  
It aims to let digital agencies:

- deploy client websites from GitHub,
- manage hosting from a single dashboard,
- and later plug in privacy-friendly analytics and billing.

The current version is a **technical MVP** built for a university project. It focuses on:

- secure authentication with JWT and refresh tokens (MongoDB + Redis),
- GitHub App integration to fetch repositories,
- a deployment service that clones, builds, and runs projects into a local `deployments` folder,
- a React/Vite + Material UI dashboard for agencies.

Future work (described in the report) includes first-party analytics, edge/VPS hosting and Stripe-based subscription billing.

## ✨ Features (Prototype Scope)

- **🔐 Authentication & Sessions**
  - Email/password login.
  - Access tokens (JWT) stored on the client.
  - Refresh tokens stored in Redis (Upstash) for security.

- **🧩 GitHub Integration**
  - Connect a GitHub App installation.
  - Fetch repositories belonging to the connected account.
  - Select a repo and trigger deployment from the UI.

- **🚀 Deployment Service**
  - Clone repository into `/deployments/<repoName>`.
  - Install dependencies, run build command, and optionally start the app.
  - Supports custom `build`, `start`, `install` commands and `.env` variables.
  - Returns the deployment output path to the frontend.

- **📊 Basic Dashboard**
  - Overview of connected GitHub account and available repositories.
  - Form to configure deployment (commands, output directory, port, env vars).

- **🔮 Planned (Not Yet Implemented)**
  - First-party analytics collection and dashboard.
  - Edge/VPS hosting abstraction instead of local folder deployments.
  - Stripe-based subscriptions and usage-based billing for agencies.
  - White-label mode so agencies can resell StatForge under their own brand.

## 👩‍💻 Tech Stack

**Frontend**

- React + Vite (TypeScript)
- Material UI
- React Router

**Backend**

- Node.js + Express
- MongoDB (user and installation data)
- Redis / Upstash (refresh tokens, session cache)
- GitHub Apps / OAuth integration
- Stripe (planned for future billing module)

## 📦 Getting Started

To run the prototype locally:

### 🚀 Prerequisites

- **Node.js** (v20+ recommended)
- **npm** or **yarn**
- Access to:
  - a **MongoDB** instance (local or cloud),
  - an **Upstash Redis** database (or any Redis),
  - a **GitHub App** (for repo access).

### 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/terzievdimitar/statforge.git
   cd statforge
   ```
   
2. **Install dependencies:**

      Using Npm:

      ```bash
      cd frontend && npm install
      ```
      ```bash
      cd backend && npm install
      ```

3. **Set up environment variables:**

      Create a `.env.local` file in the root directory and add the following variables:

      ```env
        # Deployment used by `npx convex dev`
        CONVEX_DEPLOYMENT=

        NEXT_PUBLIC_CONVEX_URL=

        # Clerk configuration
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
        CLERK_SECRET_KEY=

        # Stripe configuration
        STRIPE_SECRET_KEY=
        STRIPE_WEBHOOK_SECRET=

        STRIPE_MONTHLY_PRICE_ID=
        STRIPE_YEARLY_PRICE_ID=

        # Upstash Redis configuration
        UPSTASH_REDIS_REST_URL=
        UPSTASH_REDIS_REST_TOKEN=

        # Next Public URL

        # Resend API Key for sending emails
        RESEND_API_KEY=

        NEXT_PUBLIC_APP_URL=
      ```

4. **Create a file for private key:**
   ```text
      -----BEGIN RSA PRIVATE KEY-----
      MIIE...
      -----END RSA PRIVATE KEY-----
   ```

5. **Run the development server:**

      ```bash
      cd frontend && npm run dev
      cd backend && npm run dev
      ```
      
## 📖 Usage

### ✔ Running the Website

- **Development mode:** `npm run dev`.
- **Production mode:** `npm run build && npm start`.

> Open [http://localhost:3000](http://localhost:5173) to view the app in your browser.

### 📃 API Documentation

Note: this is a simplified summary of the most important routes used in the prototype:

#### **Server Setup (`server.ts`)**

The `server.ts` file initializes the Express server and sets up middleware and routes.

### Key Points:

- **Environment Variables**:

     - Loaded using `dotenv` from the `.env` file.
     - Example: `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`.

- **Database Connection**:

     - `connectDB()` establishes a connection to MongoDB.

- **Routes**:
     - `/api/auth`: Handles authentication-related requests (signup, login, logout, refresh token).
     - `/api/github`: Handles installation of GitHub repositories inside StatForge, deploys them, and fetches them.

#### **Authentication**

- `POST /api/auth/register` – register a new user.
- `POST /api/auth/login` – log in and receive access + refresh tokens.
- `POST /api/auth/refresh` – issue a new access token using the refresh token.
- `POST /api/auth/logout` – invalidate the refresh token in Redis.

#### **GitHub & Deployments**

- `GET /api/github/install-url` – redirect user to install the GitHub App.
- `GET /api/github/app-callback` – handle GitHub App installation callback.
- `GET /api/github/repositories` – list repositories for the connected installation.
- `POST /api/github/deploy` – deploy a repository

## 📜 License

Distributed under the MIT License. See [License](/LICENSE) for more information.
