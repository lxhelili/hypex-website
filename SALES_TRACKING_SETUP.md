# 📊 Sales Dashboard & Order Tracking Setup

## 🎯 Overview

Currently, your Hypex landing page has payment integration (Stripe + PayPal), but you need a system to track and manage orders. This guide explains how to set up complete sales tracking.

## 📍 Access Your Demo Dashboard

Visit: **`http://localhost:3000/admin`** or **`https://yourdomain.com/admin`**

This shows a demo dashboard with sample data. To make it functional, follow the steps below.

---

## 🏗️ Complete Setup Required

### 1. **Database Setup** (Choose One)

#### Option A: Supabase (Recommended - Easiest)

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Create account at supabase.com
# Create new project
# Get your API URL and anon key
```

**Create Orders Table:**

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_intent_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

#### Option B: MongoDB

```bash
npm install mongodb mongoose
```

#### Option C: Firebase

```bash
npm install firebase firebase-admin
```

---

### 2. **Webhook Processing**

Update your Stripe webhook to save orders to database:

```typescript
// app/api/stripe/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Save order to database
    const { data, error } = await supabase.from("orders").insert({
      order_id: `ORD-${Date.now()}`,
      customer_email: session.customer_email,
      customer_name: session.customer_details?.name,
      product_name: session.metadata?.product_name || "Unknown",
      amount: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase(),
      status: "completed",
      payment_method: "stripe",
      payment_intent_id: session.payment_intent as string,
      metadata: session.metadata,
    });

    if (error) {
      console.error("Error saving order:", error);
    }

    // TODO: Send confirmation email
    // TODO: Fulfill order (deliver service)
  }

  return NextResponse.json({ received: true });
}
```

**Similar for PayPal webhook:**

```typescript
// app/api/paypal/webhook/route.ts
// Save PayPal orders to database when captured
```

---

### 3. **Admin Dashboard with Real Data**

Update the admin dashboard to fetch from database:

```typescript
// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error) setOrders(data);
  }

  async function fetchStats() {
    // Fetch today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("orders")
      .select("amount, status")
      .gte("created_at", today.toISOString());

    if (!error && data) {
      const totalSales = data.reduce((sum, order) => sum + order.amount, 0);
      const pendingOrders = data.filter((o) => o.status === "pending").length;

      setStats({
        totalSales,
        totalOrders: data.length,
        pendingOrders,
      });
    }
  }

  // ... rest of component
}
```

---

### 4. **Authentication (Protect Admin Page)**

```bash
npm install next-auth
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check against environment variables
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email: "admin@hypex.cloud" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
```

```typescript
// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  // ... rest of dashboard
}
```

---

### 5. **Email Notifications**

```bash
npm install resend
```

```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: any) {
  await resend.emails.send({
    from: "Hypex <noreply@hypex.cloud>",
    to: order.customer_email,
    subject: `Bestellbestätigung - ${order.order_id}`,
    html: `
      <h1>Danke für deine Bestellung!</h1>
      <p>Bestellnummer: ${order.order_id}</p>
      <p>Produkt: ${order.product_name}</p>
      <p>Betrag: ${order.amount}€</p>
      <p>Wir bearbeiten deine Bestellung und melden uns in Kürze.</p>
    `,
  });
}
```

---

## 📦 Environment Variables Needed

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Auth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Email
RESEND_API_KEY=your_resend_api_key
```

---

## 🚀 Quick Start (Minimal Setup)

If you want to get started quickly without a database:

### Option: Log to File (Temporary)

```typescript
// app/api/stripe/webhook/route.ts
import fs from "fs";
import path from "path";

// After successful payment
const orderData = {
  orderId: `ORD-${Date.now()}`,
  email: session.customer_email,
  product: session.metadata?.product_name,
  amount: session.amount_total,
  date: new Date().toISOString(),
};

// Append to file
const logPath = path.join(process.cwd(), "orders.log");
fs.appendFileSync(logPath, JSON.stringify(orderData) + "\n");
```

---

## 📊 Alternative: Use Stripe Dashboard

Without setting up a database, you can track orders directly in:

- **Stripe Dashboard**: https://dashboard.stripe.com/payments
- **PayPal Dashboard**: https://www.paypal.com/activity

Both show:

- Customer emails
- Order amounts
- Payment status
- Metadata (product names, etc.)

---

## 🎯 Recommended Next Steps

1. **Start with Stripe/PayPal dashboards** for immediate tracking
2. **Set up Supabase** (free tier available) for proper order management
3. **Add authentication** to protect admin page
4. **Implement email notifications** for customers
5. **Create order fulfillment process** to deliver services

---

## 💡 Pro Tips

- Export orders to CSV regularly as backup
- Set up daily email reports of sales
- Use Telegram bot for instant order notifications
- Create automated fulfillment for digital products
- Track conversion rates by traffic source

Your demo dashboard is ready at `/admin` - follow these steps to make it fully functional! 🚀
