# Jolash Salon API Documentation

## Authentication

### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Bookings

### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "service_id": 1,
  "booking_date": "2025-10-15",
  "booking_time": "14:30:00",
  "notes": "First time client"
}
```

Response:
```json
{
  "id": 1,
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "service_id": 1,
  "booking_date": "2025-10-15",
  "booking_time": "14:30:00",
  "notes": "First time client",
  "status": "pending",
  "created_at": "2025-10-10T12:00:00Z"
}
```

### List Bookings
```http
GET /api/bookings
```

Response:
```json
[
  {
    "id": 1,
    "customer_name": "John Doe",
    "service_id": 1,
    "booking_date": "2025-10-15",
    "booking_time": "14:30:00",
    "status": "pending"
  }
]
```

### Update Booking Status
```http
PATCH /api/bookings/1
Content-Type: application/json

{
  "status": "confirmed"
}
```

## Services

### List Services
```http
GET /api/services
```

Response:
```json
[
  {
    "id": 1,
    "name": "Haircut & Styling",
    "description": "Professional haircut with styling consultation",
    "price": 65.00,
    "duration": 60,
    "image_url": "https://..."
  }
]
```

### Get Service
```http
GET /api/services/1
```

## Products

### List Products
```http
GET /api/products
```

Response:
```json
[
  {
    "id": 1,
    "name": "Luxury Shampoo",
    "description": "Premium moisturizing shampoo for all hair types",
    "price": 32.00,
    "category": "hair-care",
    "image_url": "https://...",
    "stock": 50,
    "is_bestseller": true
  }
]
```

### Get Products by Category
```http
GET /api/products/category/hair-care
```

## Payments

### Process Payment
```http
POST /api/payments/process
Content-Type: application/json

{
  "amount": 65.00,
  "cardNumber": "4111111111111111",
  "expirationDate": "12/25",
  "cardCode": "123"
}
```

Response:
```json
{
  "success": true,
  "transactionId": "TRANSACTION_ID",
  "message": "Payment processed successfully"
}
```

## Chat

### Get Messages
```http
GET /api/chat/messages
```

Response:
```json
[
  {
    "id": 1,
    "user_name": "John Doe",
    "message": "Hello, I have a question about hair coloring",
    "is_admin": false,
    "created_at": "2025-10-10T12:00:00Z"
  }
]
```

### Send Message
```http
POST /api/chat/messages
Content-Type: application/json

{
  "user_name": "John Doe",
  "message": "Hello, I have a question about hair coloring"
}
```

## Best Practices

1. Authentication:
   - Always include the JWT token in the Authorization header:
     ```http
     Authorization: Bearer your_jwt_token_here
     ```
   - Tokens expire after 24 hours - handle refresh flow in your client

2. Error Handling:
   All endpoints return error responses in the format:
   ```json
   {
     "error": "Error message description"
   }
   ```

3. Date/Time Format:
   - Dates: YYYY-MM-DD
   - Times: HH:MM:SS
   - Timestamps: ISO 8601 format

4. Testing:
   - Use test card number 4111111111111111 for payment testing
   - Always test booking flow end-to-end with service selection
   - Validate JWT token handling in protected routes

5. Rate Limiting:
   - API has basic rate limiting - implement exponential backoff
   - Chat API limited to 100 most recent messages