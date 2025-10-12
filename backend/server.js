const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
const bookingsRouter = require('./routes/bookings');
const productsRouter = require('./routes/products');
const servicesRouter = require('./routes/services');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');
const paymentsRouter = require('./routes/payments');

app.use('/api/bookings', bookingsRouter);
app.use('/api/products', productsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);
app.use('/api/chat', chatRouter);
app.use('/api/payments', paymentsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jolash Salon API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
