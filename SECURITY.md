# Security & Production Deployment Guide

## Security Checklist

### 1. Authentication & Authorization

#### JWT Security
```javascript
// Environment Variables
JWT_SECRET=use_a_long_random_string_at_least_32_chars
JWT_EXPIRES_IN=24h

// Implementation
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN,
      algorithm: 'HS256'
    }
  );
};

// Middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
```

#### Password Security
```javascript
// Hash Configuration
const SALT_ROUNDS = 12;

// User Registration
const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // Store hashedPassword in database
};

// Password Validation
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
};
```

### 2. Data Protection

#### SQL Injection Prevention
```javascript
// Always use parameterized queries
const addBooking = async (booking) => {
  const query = `
    INSERT INTO bookings (
      customer_name, customer_email, service_id, 
      booking_date, booking_time
    ) VALUES ($1, $2, $3, $4, $5)
  `;
  
  const values = [
    booking.customerName,
    booking.customerEmail,
    booking.serviceId,
    booking.date,
    booking.time
  ];
  
  return pool.query(query, values);
};
```

#### XSS Prevention
```javascript
// Install security headers
const helmet = require('helmet');
app.use(helmet());

// Configure CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
}));
```

#### CORS Configuration
```javascript
const cors = require('cors');

// Production CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));
```

### 3. Payment Security

#### Authorize.net Integration
```javascript
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;

const processPayment = async (payment) => {
  const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(process.env.AUTHORIZENET_API_LOGIN_ID);
  merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZENET_TRANSACTION_KEY);

  const creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(payment.cardNumber);
  creditCard.setExpirationDate(payment.expirationDate);
  creditCard.setCardCode(payment.cardCode);

  const paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  const transactionRequestType = new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(payment.amount);

  const createRequest = new ApiContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

  return new Promise((resolve, reject) => {
    ctrl.execute(() => {
      const apiResponse = ctrl.getResponse();
      const response = new ApiContracts.CreateTransactionResponse(apiResponse);
      
      if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
        resolve({
          success: true,
          transactionId: response.getTransactionResponse().getTransId()
        });
      } else {
        reject(new Error(response.getMessages().getMessage()[0].getText()));
      }
    });
  });
};
```

### 4. Rate Limiting & DoS Protection
```javascript
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Speed limiting
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100
});

app.use('/api/', limiter);
app.use('/api/', speedLimiter);
```

## Production Deployment Checklist

### 1. Environment Configuration
```bash
# Required Environment Variables
NODE_ENV=production
PORT=5000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=jolash_salon
PGUSER=your-db-user
PGPASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-frontend-url
AUTHORIZENET_API_LOGIN_ID=your-api-login
AUTHORIZENET_TRANSACTION_KEY=your-transaction-key
```

### 2. SSL Configuration
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/path/to/private-key.pem'),
  cert: fs.readFileSync('/path/to/certificate.pem'),
  ca: fs.readFileSync('/path/to/chain.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
```

### 3. Database Security
```javascript
// Connection Pool with SSL
const pool = new Pool({
  // ... other config
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
    key: fs.readFileSync('/path/to/client-key.pem').toString(),
    cert: fs.readFileSync('/path/to/client-cert.pem').toString(),
  }
});
```

### 4. Logging Configuration
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### 5. Error Handling
```javascript
// Global error handler
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'An error occurred'
      : err.message
  });
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Unhandled rejection handler
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});
```

### 6. Health Monitoring
```javascript
const monitor = require('express-status-monitor');

app.use(monitor({
  title: 'Jolash Salon API Status',
  path: '/status',
  spans: [
    {
      interval: 1,     // Every second
      retention: 60    // Keep 60 datapoints in memory
    },
    {
      interval: 5,     // Every 5 seconds
      retention: 60
    },
    {
      interval: 15,    // Every 15 seconds
      retention: 60
    }
  ]
}));
```

## Deployment Steps

1. Database Migration:
```bash
# Backup existing data
pg_dump -U postgres jolash_salon > backup.sql

# Apply schema changes
psql -U postgres jolash_salon < init-db.sql
```

2. Application Deployment:
```bash
# Install dependencies
npm ci --production

# Build frontend
cd frontend
npm run build

# Start application with PM2
pm2 start ecosystem.config.js --env production
```

3. Monitoring Setup:
```javascript
// Configure application monitoring
require('newrelic');

// Set up health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

4. Backup Configuration:
```bash
# Automated database backup script
#!/bin/bash
BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U postgres jolash_salon > "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Rotate old backups (keep last 7 days)
find $BACKUP_DIR -type f -mtime +7 -delete
```