# Backend Documentation: Authentication System

This document explains the workings of the authentication system in the backend of the **StatForge** project. It covers the **auth functions**, **routes**, and **server setup** to help teammates understand the implementation.

---

## 1. Server Setup (`server.ts`)

The `server.ts` file initializes the Express server and sets up middleware and routes.

### Key Points:

- **Environment Variables**:

     - Loaded using `dotenv` from the `.env` file.
     - Example: `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`.

- **Database Connection**:

     - `connectDB()` establishes a connection to MongoDB.

- **Routes**:
     - `/api/auth`: Handles authentication-related requests (signup, login, logout, refresh token).

### Code Overview:

```typescript
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.ts';
import authRoutes from './routes/auth.route.ts';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use('/api/auth', authRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
```

## 2. Authentication Routes (`auth.route.ts`)

The `auth.route.ts` file defines the endpoints for authentication.

### Routes:

- **POST `/signup`**:
     - Registers a new user.
     - Route: `/api/auth/signup`
- **POST `/login`**:
     - Logs in an existing user.
     - Route: `/api/auth/login`
- **POST `/logout`**:
     - Logs out the user and clears tokens.
     - Route: `/api/auth/logout`
- **POST `/refresh-token`**:
     - Refreshes the access token using a valid refresh token.
     - Route: `/api/auth/refresh-token`

```typescript
import express from 'express';
import { signup, login, logout, refreshToken } from '../controllers/auth.controller.ts';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;
```

## 3. Authentication Controller (`auth.controller.ts`)

The `auth.controller.ts` file contains the logic for handling authentication requests.

### Functions:

1. **`signup`**:

      - Registers a new user with full name, email, and password.
      - Hashes the password before saving.
      - Generates access and refresh tokens.
      - Stores the refresh token in `Redis` and sets cookies.

2. **`login`**:

      - Authenticates a user by verifying their email and password.
      - Generates access and refresh tokens.
      - Stores the refresh token in `Redis` and sets cookies.

3. **`logout`**:

      - Deletes the refresh token from `Redis`.
      - Clears cookies for `accessToken` and `refreshToken`.

4. **`refreshToken`**:
      - Validates the refresh token.
      - Checks if the refresh token matches the one stored in `Redis`.
      - Generates a new access token and sets it in cookies.
