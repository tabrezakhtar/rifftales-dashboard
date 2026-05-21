# RiffTales Dashboard

An admin dashboard built with Next.js 16, TypeScript, MongoDB, and Material-UI for managing users, equipment, and comments.

## Table of Contents

- [RiffTales Dashboard](#rifftales-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
  - [Testing](#testing)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
      - [POST `/api/login`](#post-apilogin)
      - [POST `/api/logout`](#post-apilogout)
    - [Users](#users)
      - [GET `/api/users`](#get-apiusers)
      - [GET `/api/users/:userId`](#get-apiusersuserid)
    - [Comments](#comments)
      - [GET `/api/comments?search=query`](#get-apicommentssearchquery)
      - [GET `/api/comments/:commentId`](#get-apicommentscommentid)
    - [Equipment](#equipment)
      - [GET `/api/equipment?search=query`](#get-apiequipmentsearchquery)
      - [GET `/api/equipment/:equipmentId`](#get-apiequipmentequipmentid)

## Features

- JWT-based authentication with secure password hashing
- User management (view, search, ban/unban, featured users)
- Equipment management (browse, view details, CRUD operations)
- Comment management and moderation
- Responsive Material-UI design

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Material-UI v7, SWR
- **Backend:** Node.js, MongoDB, Mongoose, Jose (JWT), bcryptjs
- **Testing:** Jest, React Testing Library

## Prerequisites

- Node.js v20+
- MongoDB v7.0+

## Installation

```bash
git clone <repository-url>
cd rifftales-dashboard
npm install
```

## Environment Variables

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

## Database Setup

Create an admin user:

```bash
npm run seed:user
```

## Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

## API Documentation

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

#### GET `/api/comments?search=query`
Fetch all comments with optional search.

#### GET `/api/comments/:commentId`
Fetch a specific comment by ID.

### Equipment

#### GET `/api/equipment?search=query`
Fetch all equipment with optional search.

#### GET `/api/equipment/:equipmentId`
Fetch specific equipment by ID.
