<<<<<<< HEAD
# Jolash Salon - Modern Online Salon Platform

A comprehensive full-stack salon platform featuring online booking, e-commerce, customer care chat, and payment processing.

![Jolash Salon](https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=400&fit=crop)

## 🌟 Features

### Frontend (Next.js + React + Tailwind CSS)
- **Responsive Navigation** with 9 main sections
- **Dark Mode Toggle** with persistent theme
- **Online Booking System** with calendar and time selection
- **E-commerce Shop** with multiple categories
- **Customer Care Live Chat** widget
- **Cookie Consent Banner** with privacy controls
- **VIP Membership Program** with tiered benefits
- **Promotions & Special Offers** page
- **Terms & Conditions** and **Privacy Policy** pages

### Backend (Node.js + Express + PostgreSQL)
- RESTful API for all operations
- User authentication with JWT
- Booking management system
- Product catalog with categories
- Live chat message handling
- Authorize.net payment integration (API keys configurable)
- PostgreSQL database for data persistence

### Pages Included
1. **HOME** - Hero section with featured services and best sellers
2. **FEATURE** - Complete services catalog with booking
3. **SHOP BY CONCERN** - Products organized by beauty concerns
4. **BEST SELLERS** - Top-rated products
5. **WIGS** - Premium wig collection
6. **EXTENSIONS & HAIR CARE** - Hair extensions and care products
7. **PROMOTIONS** - Current deals and special offers
8. **JOLASH VIP** - Membership program with benefits
9. **ABOUT JOLASH** - Company story and mission
10. **BOOKING** - Appointment scheduling system
11. **TERMS** - Terms and conditions
12. **PRIVACY** - Privacy policy

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd jolash-salon
```

2. **Setup Frontend**
```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The frontend will run on `http://localhost:3000`

3. **Setup Backend**
```bash
cd backend

# Install dependencies
npm install

# Create PostgreSQL database
createdb -h localhost jolash_salon

# Initialize database with sample data
psql -h localhost -d jolash_salon -f init-db.sql

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start backend server
npm start
```

The backend API will run on `http://localhost:5000`

## 📁 Project Structure

```
jolash-salon/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── features/            # Services page
│   ├── shop-by-concern/     # Shop by concern page
│   ├── best-sellers/        # Best sellers page
│   ├── wigs/                # Wigs page
│   ├── extensions/          # Extensions & hair care page
│   ├── promotions/          # Promotions page
│   ├── jolash-vip/          # VIP program page
│   ├── about/               # About page
│   ├── booking/             # Booking page
│   ├── terms/               # Terms & conditions
│   ├── privacy/             # Privacy policy
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── header.tsx           # Navigation header
│   ├── footer.tsx           # Footer
│   ├── chat-widget.tsx      # Live chat widget
│   ├── cookie-consent.tsx   # Cookie consent banner
│   ├── theme-provider.tsx   # Dark mode provider
│   └── ui/                  # shadcn/ui components
├── backend/                 # Backend API
│   ├── server.js            # Express server
│   ├── routes/              # API routes
│   │   ├── bookings.js
│   │   ├── products.js
│   │   ├── services.js
│   │   ├── users.js
│   │   ├── chat.js
│   │   └── payments.js
│   ├── init-db.sql          # Database schema & seed data
│   ├── .env.example         # Environment variables template
│   └── package.json
└── README.md
```

## 🎨 Customization

### Upload Your Logo
Replace the logo text in `components/header.tsx`:
```tsx
// Current:
<span className="text-primary">JOLASH</span>
<span className="text-foreground"> SALON</span>

// Replace with:
<Image src="/logo.png" alt="Jolash Salon" width={200} height={50} />
```

Then add your logo file to the `public/` directory.

### Configure Authorize.net Payment
Add your Authorize.net credentials to `backend/.env`:
```env
AUTHORIZENET_API_LOGIN_ID=your_api_login_id
AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
AUTHORIZENET_ENVIRONMENT=sandbox  # or 'production'
```

### Customize Colors
Edit the primary color in `app/globals.css`:
```css
:root {
  --primary: oklch(0.55 0.2 300); /* Change this */
}
```

## 🗄️ Database Schema

- **users** - Customer accounts
- **services** - Salon services catalog
- **products** - E-commerce products
- **bookings** - Appointment bookings
- **chat_messages** - Live chat messages
- **cookie_consents** - Cookie consent tracking

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jolash_salon
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key
AUTHORIZENET_API_LOGIN_ID=
AUTHORIZENET_TRANSACTION_KEY=
AUTHORIZENET_ENVIRONMENT=sandbox
```

## 📦 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Heroku, Railway, or DigitalOcean)
```bash
# Example for Heroku
heroku create jolash-salon-api
heroku addons:create heroku-postgresql
git subtree push --prefix backend heroku main
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Payment**: Authorize.net
- **Authentication**: JWT
- **Styling**: Tailwind CSS, Radix UI
- **Icons**: Lucide React

## 📝 API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id` - Update booking

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user

### Chat
- `GET /api/chat` - Get messages
- `POST /api/chat` - Send message

### Payments
- `POST /api/payments/process` - Process payment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or support:
- Email: info@jolashsalon.com
- Phone: (555) 123-4567

---

Built with ❤️ for the beauty industry
=======
# jolash-salon-system
>>>>>>> 0879ae6399dc4b3ef7786dfec30f15f041bbb2f1
