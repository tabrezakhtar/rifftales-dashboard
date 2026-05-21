# RiffTales Dashboard

An admin dashboard built with Next.js 16, TypeScript, MongoDB, and Material-UI for managing users, equipment, and comments.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Authentication
- Secure JWT-based authentication using Jose
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Login/logout functionality

### User Management
- View all users with pagination and search
- Individual user profiles
- Ban/unban user functionality
- Featured user management
- User statistics and analytics

### Equipment Management
- Browse equipment catalog
- Detailed equipment information
- Equipment CRUD operations
- Equipment listing and filtering

### Comment Management
- View all comments with search capabilities
- Individual comment details
- Comment moderation features
- User comment history

### UI/UX
- Modern, responsive design with Material-UI
- Client-side and server-side rendering
- Optimized performance with SWR for data fetching
- Real-time search functionality
- Mobile-friendly interface

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI) v7
- **Styling:** Emotion CSS-in-JS
- **Data Fetching:** SWR
- **Icons:** Material Icons

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Jose (JWT)
- **Password Security:** bcryptjs

### Development & Testing
- **Testing Framework:** Jest
- **Testing Library:** React Testing Library
- **Linting:** ESLint
- **Type Checking:** TypeScript

## 📁 Project Structure

```
rifftales-dashboard/
├── app/                      # Next.js App Router pages
│   ├── actions/             # Server actions
│   │   ├── comments.ts
│   │   ├── equipment.ts
│   │   └── users.ts
│   ├── api/                 # API routes
│   │   ├── comments/
│   │   ├── equipment/
│   │   ├── login/
│   │   ├── logout/
│   │   └── users/
│   ├── comment/             # Comment detail pages
│   ├── comments/            # Comments list page
│   ├── equipment/           # Equipment pages
│   ├── user/                # User detail pages
│   ├── users/               # Users list page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Login page
│   └── providers.tsx        # React providers
├── components/              # Reusable React components
│   ├── comments/
│   ├── equipment/
│   ├── users/
│   ├── DashboardLayout.tsx
│   └── SearchInput.tsx
├── lib/                     # Utility libraries
│   ├── comments.ts
│   ├── equipment.ts
│   ├── mongodb.ts
│   └── users.ts
├── models/                  # Mongoose models
│   ├── Comment.ts
│   ├── Equipment.ts
│   └── User.ts
├── types/                   # TypeScript type definitions
│   ├── client/
│   └── server/
├── scripts/                 # Utility scripts
│   ├── seed-data.ts
│   └── seed-user.ts
├── __mocks__/              # Jest mocks
└── tests/                  # Test files

```

## 📦 Prerequisites

- **Node.js:** v20 or higher
- **npm:** v9 or higher (or yarn/pnpm/bun)
- **MongoDB:** v7.0 or higher (local or cloud instance)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rifftales-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
DATABASE_URI=mongodb://localhost:27017/rifftales
# or for MongoDB Atlas:
# DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/rifftales

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 💾 Database Setup

### Option 1: Seed Initial User

Create an admin user to access the dashboard:

```bash
npm run seed:user
```

This will prompt you to enter user details (username, email, password).

### Option 2: Seed Complete Database

For development purposes, you can seed the database with sample data:

```bash
npx tsx --env-file=.env.local scripts/seed-data.ts
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### View Coverage Report

After running tests, open `coverage/lcov-report/index.html` in your browser.

## 📡 API Documentation

### Authentication

#### POST `/api/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "username": "...",
    "email": "..."
  }
}
```

#### POST `/api/logout`
Logout the current user.

### Users

#### GET `/api/users`
Fetch all users with optional search.

**Query Parameters:**
- `search` (optional): Search users by username or email

#### GET `/api/users/:userId`
Fetch a specific user by ID.

### Comments

#### GET `/api/comments`
Fetch all comments with optional search.

**Query Parameters:**
- `search` (optional): Search comments by content

#### GET `/api/comments/:commentId`
Fetch a specific comment by ID.

### Equipment

#### GET `/api/equipment`
Fetch all equipment items with optional search.

**Query Parameters:**
- `search` (optional): Search equipment by name or description

#### GET `/api/equipment/:equipmentId`
Fetch specific equipment by ID.

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js application:

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables in the Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Other Platforms

This application can be deployed on any platform that supports Node.js:
- AWS (EC2, ECS, Lambda with Serverless Next.js)
- Google Cloud Platform (Cloud Run, App Engine)
- Azure (App Service)
- DigitalOcean (App Platform)
- Railway
- Render

**Important:** Ensure your MongoDB instance is accessible from your deployment platform and update the `DATABASE_URI` accordingly.

## 🔧 Development Tools

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript type checking is integrated with the build process. For manual type checking:

```bash
npx tsc --noEmit
```

## 📝 Key Files and Configurations

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add some amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use semicolons at the end of statements
- Indent code using 2 spaces
- Prefer double quotes for strings and imports
- Follow TypeScript best practices
- Write tests for new features

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Material-UI](https://mui.com/) - React component library
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Hosting platform

---

**Built with ❤️ for RiffTales**
