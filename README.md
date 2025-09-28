# Hypex Landing Page

<div align="center">
  <h1>🚀 Hypex - Digital Marketing Landing Page</h1>
  <p>Modern Next.js landing page for social media services, premium subscriptions, and Google optimization</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-13.5.6-black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8)
  ![Stripe](https://img.shields.io/badge/Stripe-13.11.0-635bff)
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

Hypex is a comprehensive landing page for a digital marketing agency offering:

- **Social Media Services**: Instagram, TikTok, Twitch, Telegram, Discord growth
- **Premium Subscriptions**: 12-month Spotify, YouTube Premium, Disney+, etc.
- **Google Services**: Maps reviews, Knowledge Panel creation
- **24/7 Support**: Multi-channel customer support

## ✨ Features

### 🎨 Design & UX
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Glassmorphism, gradients, smooth animations
- **Dark/Light Theme**: Automatic theme switching
- **Accessibility**: WCAG 2.1 compliant

### 💳 Payment Integration
- **Stripe Checkout**: Secure payment processing
- **Multiple Payment Methods**: Cards, PayPal, SEPA
- **Webhook Handling**: Real-time order processing
- **Success/Cancel Pages**: Complete user journey

### 🔧 Technical Features
- **TypeScript**: Full type safety
- **SEO Optimized**: Meta tags, structured data
- **Performance**: Lighthouse score 90+
- **Error Handling**: Comprehensive error boundaries

### 📊 Business Features
- **Service Catalog**: Organized by platform
- **Pricing Tables**: Clear, competitive pricing
- **Trust Indicators**: Reviews, testimonials, guarantees
- **Contact System**: Multiple support channels

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13.5.6 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form

### Backend & Services
- **Payments**: Stripe 13.11.0
- **Email**: SMTP integration ready
- **Analytics**: Google Analytics 4 ready
- **Hosting**: Vercel optimized

### Development
- **Package Manager**: npm
- **Linting**: ESLint + Next.js config
- **Type Checking**: TypeScript strict mode
- **CSS**: PostCSS + Autoprefixer

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LandingCata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
vercel               # Deploy to Vercel
```

## 📁 Project Structure

```
LandingCata/
├── app/
│   ├── api/                    # API routes
│   │   └── stripe/
│   │       ├── checkout/       # Payment session creation
│   │       └── webhook/        # Payment webhooks
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation
│   │   ├── HeroSection.tsx     # Main hero
│   │   ├── SocialMediaServices.tsx
│   │   ├── AboServices.tsx
│   │   ├── GoogleServices.tsx
│   │   ├── WhyHypex.tsx
│   │   ├── CustomerReviews.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── lib/                    # Utilities
│   │   └── stripe.ts           # Stripe configuration
│   ├── success/                # Success page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind config
├── tsconfig.json              # TypeScript config
└── next.config.js             # Next.js config
```

## 🔧 Environment Setup

Create `.env.local` with the following variables:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Domain
NEXT_PUBLIC_DOMAIN=https://hypex.de

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact & Support
TELEGRAM_SUPPORT=https://t.me/HypexSupport
WHATSAPP_SUPPORT=https://wa.me/49xxxxxxxxx
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Stripe Setup

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Create account and verify

2. **Get API Keys**
   - Dashboard → Developers → API Keys
   - Copy publishable and secret keys

3. **Set up Webhooks**
   - Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.payment_failed`

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Custom Domain** (Optional)
   - Project Settings → Domains
   - Add your domain
   - Configure DNS

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to your hosting provider**
   - Upload `out/` folder to web server
   - Configure environment variables on server

## 📚 API Documentation

### Stripe Checkout

**POST** `/api/stripe/checkout`

Create a new checkout session for payment processing.

```typescript
// Request Body
{
  items: Array<{
    name: string
    description: string
    price: number
    quantity?: number
    images?: string[]
  }>
  customerEmail?: string
  metadata?: Record<string, string>
}

// Response
{
  sessionId: string
  url: string
}
```

**Example Usage:**
```typescript
const response = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [{
      name: 'Instagram Follower - 1K',
      description: '1000 echte Instagram Follower',
      price: 9.99
    }],
    metadata: {
      platform: 'Instagram',
      service: 'Follower'
    }
  })
})
```

### Stripe Webhook

**POST** `/api/stripe/webhook`

Handles Stripe webhook events for payment processing.

**Supported Events:**
- `checkout.session.completed` - Payment successful
- `payment_intent.payment_failed` - Payment failed

## 🎨 Customization

### Colors

Update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf'
        },
        secondary: {
          600: '#764ba2'
        }
      }
    }
  }
}
```

### Services

Update `app/components/SocialMediaServices.tsx`:

```typescript
const services = [
  {
    platform: 'Instagram',
    icon: '📸',
    color: 'from-pink-500 to-purple-600',
    services: [
      { 
        name: 'Follower', 
        price: 'ab 9.99€', 
        priceNum: 9.99,
        description: '1000 echte Instagram Follower' 
      }
      // Add more services
    ]
  }
  // Add more platforms
]
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **TypeScript Errors**
   ```bash
   # Check for type errors
   npx tsc --noEmit
   ```

3. **Stripe Webhook Issues**
   - Verify webhook secret in Stripe dashboard
   - Check webhook endpoint URL
   - Review webhook event selection

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Restart development server after changes

### Performance Issues

1. **Slow Loading**
   - Optimize images (use next/image)
   - Enable compression
   - Check bundle size with `npm run build`

2. **Large Bundle Size**
   - Use dynamic imports for heavy components
   - Remove unused dependencies
   - Enable tree shaking

### Debug Mode

Add to `.env.local`:
```env
DEBUG=true
NODE_ENV=development
```

## 📈 Analytics & Monitoring

### Google Analytics

Add GA4 to `app/layout.tsx`:

```typescript
import Script from 'next/script'

// Add in head section
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### Error Monitoring

Recommended tools:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Performance monitoring

## 🔐 Security Checklist

- [ ] Environment variables secured
- [ ] Stripe webhook signature verification
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] Input validation on all forms
- [ ] Rate limiting on API routes

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/new-feature
   ```
5. **Create Pull Request**

### Development Guidelines

- Use TypeScript for all new code
- Follow ESLint rules
- Write meaningful commit messages
- Test on multiple devices
- Update documentation

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

- **Email**: support@hypex.de
- **Telegram**: [@HypexSupport](https://t.me/HypexSupport)
- **WhatsApp**: [+49 xxx xxx xxxx](https://wa.me/49xxxxxxxxx)

---

<div align="center">
  <p>Made with ❤️ for Hypex</p>
  <p>© 2024 Hypex. All rights reserved.</p>
</div>