# Jolash Salon - Backend API

Backend API for Jolash Salon platform built with Node.js, Express, and PostgreSQL.

## Features

- RESTful API for salon services, products, bookings
- User authentication with JWT
- Authorize.net payment integration
- Live chat system
- PostgreSQL database

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create PostgreSQL database:
```bash
createdb -h localhost jolash_salon
```

3. Initialize database:
```bash
psql -h localhost -d jolash_salon -f init-db.sql
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. Start the server:
```bash
npm start
```

## API Endpoints

### Services
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get single service

### Products
- GET `/api/products` - Get all products
- GET `/api/products/category/:category` - Get products by category
- GET `/api/products/:id` - Get single product

### Bookings
- GET `/api/bookings` - Get all bookings
- POST `/api/bookings` - Create new booking
- PATCH `/api/bookings/:id` - Update booking status

### Users
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - Login user

### Chat
- GET `/api/chat` - Get chat messages
- POST `/api/chat` - Send chat message

### Payments
- POST `/api/payments/process` - Process payment via Authorize.net

## Authorize.net Configuration

Add your Authorize.net credentials to `.env`:
```
AUTHORIZENET_API_LOGIN_ID=your_api_login_id
AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
```

## Database Schema

- users
- services
- products
- bookings
- chat_messages
- cookie_consents
