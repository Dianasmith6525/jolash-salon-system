# Component Analysis

## Frontend Architecture

### Core Components

1. Layout & Theme
```typescript
// components/theme-provider.tsx
// Handles dark/light theme with next-themes
// Used in app/layout.tsx as root wrapper
```

2. Navigation
```typescript
// components/Header.tsx
// Main navigation with responsive design
// Uses shadcn/ui components for dropdowns
```

3. Booking Flow
```typescript
// app/booking/page.tsx
// Main booking interface
// Integration points:
// - Services API for available services
// - Booking API for slot management
// - Payment API for processing
```

4. Product Catalog
```typescript
// app/shop-by-concern/page.tsx
// Product browsing and filtering
// Integration with products API
```

5. Chat Widget
```typescript
// components/chat-widget.tsx
// Real-time customer support
// Integration with chat API
```

### State Management
```typescript
// No global state management library
// Uses React context for theme and auth state
// API data managed with local state and fetch
```

### UI Component Library
```typescript
// Using shadcn/ui components from components/ui/
// Customized through Tailwind classes
// Extended with custom components as needed
```

## Backend Architecture

### Core Services

1. User Service
```javascript
// routes/users.js
// Handles:
// - Authentication
// - User management
// - Session control
```

2. Booking Service
```javascript
// routes/bookings.js
// Manages:
// - Appointment scheduling
// - Availability checking
// - Status updates
```

3. Product Service
```javascript
// routes/products.js
// Handles:
// - Product catalog
// - Category management
// - Inventory tracking
```

4. Payment Service
```javascript
// routes/payments.js
// Manages:
// - Payment processing
// - Transaction records
// - Authorize.net integration
```

### Database Schema

1. Core Tables
```sql
-- Users table: Authentication and profiles
-- Services table: Available salon services
-- Products table: Salon product catalog
-- Bookings table: Appointment management
```

2. Relationships
```sql
-- bookings.service_id → services.id
-- chat_messages → users (optional link)
```

3. Indexes
```sql
-- Primary keys: SERIAL
-- Foreign keys: Standard indices
-- Custom indices needed for:
--   - booking_date for scheduling
--   - product categories
--   - user email lookups
```

## Integration Points

### Frontend → Backend

1. Authentication Flow
```typescript
// Frontend
const login = async (email: string, password: string) => {
  const res = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const { token } = await res.json();
  // Store token in localStorage
  // Update auth context
};

// Backend
router.post('/login', async (req, res) => {
  // Verify credentials
  // Generate JWT
  // Return token
});
```

2. Booking Process
```typescript
// Frontend
const createBooking = async (booking: BookingData) => {
  // 1. Check availability
  // 2. Create booking
  // 3. Process payment
  // 4. Show confirmation
};

// Backend
// Multiple endpoints coordinate:
// - GET /api/services for selection
// - POST /api/bookings for creation
// - POST /api/payments for processing
```

3. Product Management
```typescript
// Frontend
const getProducts = async (category?: string) => {
  const url = category 
    ? `/api/products/category/${category}`
    : '/api/products';
  return fetch(url).then(r => r.json());
};

// Backend
router.get('/products', async (req, res) => {
  // Query products with optional filters
  // Return formatted response
});
```

## External Services

1. Payment Processing
```javascript
// Authorize.net Integration
// Current: Placeholder implementation
// Required: Full SDK integration
```

2. Email Service (To Be Added)
```javascript
// Recommended: SendGrid or AWS SES
// Use cases:
// - Booking confirmations
// - Reminders
// - Marketing campaigns
```

3. Image Storage (To Be Added)
```javascript
// Recommended: AWS S3 or Cloudinary
// Use cases:
// - Product images
// - Service photos
// - User avatars
```

## Development Workflow

1. Local Development
```bash
# Frontend (from root)
bun install
bun run dev

# Backend (from backend/)
npm install
npm run dev
```

2. Database Setup
```bash
# Initial setup
psql -U postgres
CREATE DATABASE jolash_salon;
\c jolash_salon
\i init-db.sql
```

3. Environment Configuration
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend (.env)
PORT=5000
DB_HOST=localhost
...
```

## Testing Strategy

1. Current State
```plaintext
- No automated tests
- Manual testing workflow:
  1. Test booking flow
  2. Verify payment processing
  3. Check product catalog
  4. Test chat functionality
```

2. Recommended Additions
```plaintext
- Unit tests for API endpoints
- Integration tests for booking flow
- E2E tests for critical paths
- Payment processing tests
```

## Deployment Architecture

1. Frontend (Vercel)
```plaintext
- Next.js application
- Environment variables set in Vercel
- Automatic builds on push
```

2. Backend (Railway/Heroku)
```plaintext
- Node.js environment
- PostgreSQL add-on
- Environment variables in platform
```

3. Database (Railway/Heroku PostgreSQL)
```plaintext
- Managed PostgreSQL instance
- Automatic backups
- Connection pooling
```