# Livestream E-commerce Platform

A real-time e-commerce platform where influencers can showcase products through live streams and customers can make purchases and track deliveries.

## Features

- Real-time live streaming for product showcases
- Secure payment processing
- Product catalog management
- Order tracking system
- User authentication and profiles
- Chat functionality during live streams
- Delivery tracking system

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Real-time Communication: Socket.io
- Payment Processing: Stripe
- Authentication: JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev:full
   ```

## Project Structure

```
livestream-ecommerce/
├── client/                 # React frontend
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── middleware/        # Custom middleware
├── .env                   # Environment variables
└── package.json           # Project dependencies
```

## API Endpoints

- Authentication
  - POST /api/auth/register
  - POST /api/auth/login
- Products
  - GET /api/products
  - POST /api/products
  - GET /api/products/:id
- Orders
  - POST /api/orders
  - GET /api/orders/:id
  - GET /api/orders/user/:userId
- Live Streams
  - POST /api/streams
  - GET /api/streams
  - GET /api/streams/:id 