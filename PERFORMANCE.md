# Performance Optimization Guide

## Database Optimizations

### Indexes
Add the following indexes to improve query performance:

```sql
-- Bookings table indexes
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Products table indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_bestseller ON products(is_bestseller) WHERE is_bestseller = true;

-- Services table index
CREATE INDEX idx_services_name ON services(name);
```

### Query Optimizations

1. Join Optimization for Bookings:
```sql
-- Instead of separate queries, use JOIN
SELECT b.*, s.name as service_name, s.duration
FROM bookings b
JOIN services s ON b.service_id = s.id
WHERE b.booking_date = $1
ORDER BY b.booking_time;
```

2. Pagination for Large Results:
```sql
-- Add to products and bookings queries
SELECT * FROM products
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;
```

3. Partial Indexes for Commonly Filtered Data:
```sql
-- For active bookings only
CREATE INDEX idx_active_bookings ON bookings(booking_date)
WHERE status = 'confirmed';
```

## Backend Performance

### Connection Pooling
Update `db.js`:
```javascript
const pool = new Pool({
  // ... existing config
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Caching Strategy
Implement Redis caching for:
- Service catalog
- Product listings
- Static content

Example implementation:
```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Cache service list
async function getServices() {
  const cached = await redis.get('services');
  if (cached) return JSON.parse(cached);
  
  const result = await pool.query('SELECT * FROM services');
  await redis.set('services', JSON.stringify(result.rows), 'EX', 3600);
  return result.rows;
}
```

### Request Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);
```

## Frontend Optimizations

### API Request Batching
```typescript
// Instead of multiple requests
async function getBatchedData() {
  const [services, products] = await Promise.all([
    fetch('/api/services'),
    fetch('/api/products')
  ]);
  return {
    services: await services.json(),
    products: await products.json()
  };
}
```

### Implement Service Worker
```javascript
// Public/service-worker.js
const CACHE_NAME = 'jolash-salon-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/bundle.js',
  '/api/services',
  '/api/products'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### Image Optimization
1. Implement responsive images:
```jsx
<img
  srcSet={`
    ${image.url}?w=400 400w,
    ${image.url}?w=800 800w
  `}
  sizes="(max-width: 600px) 400px, 800px"
  src={image.url}
  alt={image.alt}
/>
```

2. Use next/image for automatic optimization:
```jsx
import Image from 'next/image';

<Image
  src={productImage}
  width={800}
  height={600}
  alt="Product"
  placeholder="blur"
  priority={isHero}
/>
```

## Monitoring & Metrics

### Backend Monitoring
```javascript
const prometheus = require('prom-client');
const counter = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests'
});

app.use((req, res, next) => {
  counter.inc();
  next();
});
```

### Performance Metrics to Track
1. Response Times:
```javascript
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });
  next();
});
```

2. Database Query Times:
```javascript
const logQuery = async (query, params) => {
  const start = Date.now();
  try {
    return await pool.query(query, params);
  } finally {
    const duration = Date.now() - start;
    console.log(`Query took ${duration}ms:`, query);
  }
};
```

## Load Testing
```javascript
// loadtest.js using k6
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function() {
  const res = http.get('http://localhost:5000/api/services');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200
  });
  sleep(1);
}
```

Run with:
```bash
k6 run --vus 10 --duration 30s loadtest.js
```

## Deployment Checklist

1. Enable Compression:
```javascript
const compression = require('compression');
app.use(compression());
```

2. Set Cache Headers:
```javascript
app.use('/static', express.static('public', {
  maxAge: '1d',
  etag: true
}));
```

3. Use PM2 for Node.js Clustering:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'jolash-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true
  }]
};
```