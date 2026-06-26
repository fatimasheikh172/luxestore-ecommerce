# LuxeStore - Premium E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 14, featuring AI-powered shopping assistance, premium fashion products, and secure payment processing.

![LuxeStore](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop)

## 🌟 Features

### Core E-Commerce Features
- **Product Catalog**: Browse 20+ premium fashion products across Men, Women, Accessories, and Sale categories
- **Advanced Filtering**: Filter by category, price range, size, color, and rating
- **Smart Search**: Real-time search with pagination
- **Product Details**: High-quality images, size/color selection, reviews, and specifications
- **Shopping Cart**: Persistent cart with Zustand and localStorage
- **Checkout Flow**: Multi-step checkout with shipping information
- **Secure Payments**: Stripe integration (test mode) with webhook support
- **User Authentication**: NextAuth.js with credentials provider
- **User Profile**: Order history and account management
- **Wishlist**: Save favorite products

### AI-Powered Features (Groq API)
- **AI Shopping Assistant**: Floating chat widget for product recommendations
- **Product Q&A**: Ask AI questions about specific products
- **Smart Search**: Natural language product search (e.g., "show me red dresses under $50")

### Admin Dashboard
- **Analytics**: Revenue, orders, products, and customer stats
- **Order Management**: View recent orders with status tracking
- **Product Management**: Quick add product form

### Design & UX
- **Premium Aesthetic**: Clean, minimal design with serif headings
- **Luxury Color Palette**: Black, white, and gold (#D4AF37) accent
- **Fully Responsive**: Mobile-first design
- **Smooth Animations**: Product card hover effects
- **Loading States**: Skeleton screens and spinners
- **Toast Notifications**: Real-time feedback with react-hot-toast

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **State Management**: Zustand (cart state)
- **Payments**: Stripe (test mode)
- **AI Features**: Groq API (Llama 3.3 70B)
- **Image Handling**: Next.js Image with Unsplash placeholders
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Inter (sans-serif)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)
- Stripe account (test mode)
- Groq API key

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd luxestore-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/luxestore
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxestore

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Groq API
GROQ_API_KEY=your_groq_api_key
```

4. **Seed the database**
```bash
npm run seed
```

This will populate your database with 20 sample products.

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

### Stripe Test Cards

Use these test card numbers for checkout:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Other Test Cards:**
- Declined: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

[Full list of test cards](https://stripe.com/docs/testing#cards)

### Test User Account

Create a test account through the signup page or use these credentials after seeding:
- Email: `test@example.com`
- Password: `password123`

## 📁 Project Structure

```
luxestore-ecommerce/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   ├── ai/            # AI features (chat, search, product Q&A)
│   │   ├── auth/          # Authentication endpoints
│   │   ├── checkout/      # Payment processing
│   │   ├── orders/        # Order management
│   │   ├── products/      # Product CRUD
│   │   └── wishlist/      # Wishlist management
│   ├── auth/              # Auth pages (signin, signup)
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   ├── products/          # Product listing and details
│   ├── profile/           # User profile and orders
│   ├── wishlist/          # Wishlist page
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   └── loading.tsx        # Loading state
├── components/
│   ├── AIChatWidget.tsx   # Floating AI assistant
│   ├── AuthProvider.tsx   # NextAuth session provider
│   ├── CheckoutForm.tsx   # Stripe payment form
│   ├── Footer.tsx         # Site footer
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProductCard.tsx    # Product grid item
│   ├── ProductFilters.tsx # Filter sidebar
│   └── ProductQAModal.tsx # AI product Q&A
├── lib/
│   ├── models/            # Mongoose schemas
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── store/             # Zustand stores
│   │   └── cart.ts
│   ├── groq.ts            # Groq API client
│   └── mongodb.ts         # MongoDB connection
├── scripts/
│   └── seed.ts            # Database seeding script
├── types/
│   └── next-auth.d.ts     # NextAuth type extensions
├── .env.example           # Environment variables template
└── README.md
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- `MONGODB_URI` - Your MongoDB connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret
- `GROQ_API_KEY` - Your Groq API key

### Stripe Webhooks

For production, set up a webhook endpoint:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Accent**: Gold (#D4AF37)
- **Background**: White (#FFFFFF)
- **Text**: Gray shades

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing
- Consistent 8px grid system
- Large whitespace for premium feel

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based session management
- CSRF protection with NextAuth
- Secure payment processing with Stripe
- Environment variable protection
- MongoDB injection prevention with Mongoose

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own use.

## 📄 License

MIT License - feel free to use this project for learning or your portfolio.

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- AI powered by [Groq](https://groq.com)
- Payments by [Stripe](https://stripe.com)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ as a full-stack portfolio project showcasing modern web development practices.**

"# luxestore-ecommerce" 
