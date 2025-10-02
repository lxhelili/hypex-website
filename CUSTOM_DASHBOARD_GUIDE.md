# 🎛️ Complete Admin Dashboard Setup Guide

## 🎯 Overview

Build your own admin dashboard to:

- ✅ Track all sales in real-time
- ✅ Manage customer orders
- ✅ Respond to support tickets
- ✅ View analytics and reports
- ✅ Process refunds
- ✅ Manage products

---

## 🏗️ **Architecture Options**

### **Option 1: Simple Setup (Recommended for Beginners)**

**Stack:** Next.js + Supabase + NextAuth

**Why:**

- No backend coding needed
- Free tier available
- Easy to set up
- Instant database

**Time:** 2-3 hours

### **Option 2: Full Control Setup**

**Stack:** Next.js + PostgreSQL + Prisma + NextAuth

**Why:**

- Full control over database
- Better for scaling
- More customization

**Time:** 4-6 hours

### **Option 3: Quick & Dirty (Fastest)**

**Stack:** Just Google Sheets + Zapier

**Why:**

- No coding required
- Set up in 30 minutes
- Good for testing

**Time:** 30 minutes

---

## 🚀 **Option 1: Simple Setup with Supabase (RECOMMENDED)**

### **Step 1: Create Supabase Project**

1. Go to https://supabase.com
2. Create free account
3. Create new project
4. Save your credentials:
   - Project URL
   - Anon Key
   - Service Role Key

### **Step 2: Create Database Tables**

Run this SQL in Supabase SQL Editor:

```sql
-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT, -- 'social_media', 'subscription', 'google_service'
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'processing', 'failed', 'refunded'
  payment_method TEXT, -- 'stripe', 'paypal'
  payment_intent_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Support Tickets Table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  order_id TEXT, -- Link to order if applicable
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ticket Replies Table
CREATE TABLE ticket_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  reply_from TEXT NOT NULL, -- 'customer' or 'admin'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_email ON tickets(customer_email);
CREATE INDEX idx_tickets_created ON tickets(created_at DESC);
```

### **Step 3: Install Dependencies**

```bash
cd /Users/lavdim/Desktop/LandingCata
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install next-auth
npm install recharts date-fns
```

### **Step 4: Environment Variables**

Add to `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### **Step 5: Create Supabase Client**

```typescript
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
```

### **Step 6: Update Stripe Webhook to Save Orders**

```typescript
// app/api/stripe/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Save order to database
    const { data, error } = await supabaseAdmin.from("orders").insert({
      order_id: `ORD-${Date.now()}`,
      customer_email: session.customer_email,
      customer_name: session.customer_details?.name || "Unknown",
      product_name: session.metadata?.product_name || "Unknown Product",
      product_type: session.metadata?.product_type || "social_media",
      amount: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase(),
      status: "completed",
      payment_method: "stripe",
      payment_intent_id: session.payment_intent as string,
      metadata: session.metadata,
    });

    if (error) {
      console.error("Error saving order:", error);
    } else {
      console.log("Order saved:", data);
      // TODO: Send confirmation email
      // TODO: Fulfill order
    }
  }

  return NextResponse.json({ received: true });
}
```

### **Step 7: Create Authentication**

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
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@hypex.cloud",
            role: "admin",
          };
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### **Step 8: Create Login Page**

```typescript
// app/admin/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Ungültige Anmeldedaten");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4d006a] to-[#8924e9] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hypex Admin</h1>
          <p className="text-gray-600">Melde dich an, um fortzufahren</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### **Step 9: Create Main Dashboard**

I'll create this in the next message due to length...

---

## 📊 **Quick Alternative: Google Sheets + Zapier**

If you want something super quick:

### **Setup (30 minutes):**

1. **Create Google Sheet** with columns:

   - Order ID | Customer Email | Product | Amount | Status | Date

2. **Set up Zapier:**

   - Trigger: "New Payment in Stripe"
   - Action: "Add Row to Google Sheets"

3. **View your sales** in the sheet!

4. **For tickets:**
   - Add Google Form for support
   - Responses go to another sheet
   - Respond via email

---

## 🎯 **Which Option Should You Choose?**

- **Just starting?** → Google Sheets + Zapier
- **Want proper system?** → Supabase Setup (Option 1)
- **Need full control?** → PostgreSQL Setup (Option 2)

Let me know which option you want to implement and I'll provide the complete code! 🚀
