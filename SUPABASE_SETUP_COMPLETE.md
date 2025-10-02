# 🚀 Supabase Dashboard Setup - Complete Guide

## ✅ What We've Built

Your admin dashboard is now ready with:

- 📊 Real-time sales tracking
- 📦 Order management
- 🎫 Support ticket system
- 📈 Statistics and analytics
- 🔐 Secure authentication
- 💾 Database integration

---

## 📋 Setup Steps

### **Step 1: Create Supabase Account**

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Project name: `hypex-dashboard`
   - Database password: (create a strong password)
   - Region: Choose closest to you
   - Wait 2-3 minutes for setup

### **Step 2: Get Your Supabase Credentials**

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ Keep this SECRET!)

### **Step 3: Create Database Tables**

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
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
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  order_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ticket Replies Table
CREATE TABLE ticket_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  reply_from TEXT NOT NULL,
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

4. Click **Run** to create the tables

### **Step 4: Configure Environment Variables**

1. Create/update your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...your_anon_key
SUPABASE_SERVICE_KEY=eyJxxx...your_service_role_key

# NextAuth (for admin login)
NEXTAUTH_SECRET=generate_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# Stripe (your existing keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# PayPal (your existing)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### **Step 5: Start Your Dashboard**

```bash
npm run dev
```

**Access URLs:**

- **Landing Page:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Dashboard:** http://localhost:3000/admin/dashboard

**Login with:**

- Username: `admin`
- Password: Whatever you set in `.env.local`

---

## 🧪 Testing the System

### **1. Test with Sample Data:**

Add test orders and tickets in Supabase SQL Editor:

```sql
INSERT INTO orders (order_id, customer_email, customer_name, product_name, amount, status, payment_method)
VALUES
  ('ORD-TEST-001', 'max@example.com', 'Max Mustermann', 'Instagram Follower - 5.000', 14.99, 'completed', 'stripe'),
  ('ORD-TEST-002', 'anna@example.com', 'Anna Schmidt', 'Spotify Premium - 12 Monate', 39.99, 'completed', 'paypal'),
  ('ORD-TEST-003', 'tom@example.com', 'Tom Weber', 'TikTok Follower - 10.000', 27.99, 'pending', 'stripe');

INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, message, status, priority)
VALUES
  ('TKT-001', 'Lisa Müller', 'lisa@example.com', 'Bestellung nicht erhalten', 'Hallo, ich habe meine Bestellung noch nicht bekommen.', 'open', 'high'),
  ('TKT-002', 'Peter Klein', 'peter@example.com', 'Frage zu Spotify Abo', 'Wie lange dauert die Aktivierung?', 'open', 'normal');
```

Refresh your dashboard - you should see the data!

### **2. Test Real Payment Flow:**

1. Go to http://localhost:3000
2. Click any "Jetzt kaufen" button
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete checkout
5. Check dashboard - order should appear automatically!

---

## 📊 Dashboard Overview

### **What You Can See:**

**Stats Cards:**

- 💰 Today's sales (€)
- 📦 Total orders
- 📈 Total revenue
- 🎫 Open support tickets

**Orders Tab:**

- Order ID
- Customer name & email
- Product purchased
- Amount paid
- Payment method (Stripe/PayPal)
- Status (completed, pending, etc.)
- Order date

**Tickets Tab:**

- Ticket ID
- Customer info
- Subject
- Priority level
- Status (open, resolved, etc.)
- Creation date

---

## 🎫 Next Steps: Support Ticket System

### **Create API Route for Ticket Submission:**

Create `app/api/tickets/create/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, order_id } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate ticket ID
    const ticketId = `TKT-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;

    // Insert ticket
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .insert({
        ticket_id: ticketId,
        customer_name: name,
        customer_email: email,
        subject,
        message,
        order_id: order_id || null,
        status: "open",
        priority: "normal",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating ticket:", error);
      return NextResponse.json(
        { error: "Failed to create ticket" },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email to customer
    // TODO: Notify admin about new ticket

    return NextResponse.json({
      success: true,
      ticket: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### **Add Support Form to Landing Page:**

Add this to your landing page or create a new support page:

```typescript
// app/components/SupportForm.tsx
"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    order_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tickets/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          order_id: "",
        });
      } else {
        setError(data.error || "Fehler beim Senden");
      }
    } catch (err) {
      setError("Verbindungsfehler");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Ticket erstellt!
        </h3>
        <p className="text-gray-600">Wir melden uns in Kürze bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            E-Mail
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bestellnummer (optional)
        </label>
        <input
          type="text"
          value={formData.order_id}
          onChange={(e) =>
            setFormData({ ...formData, order_id: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6]"
          placeholder="ORD-XXX"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Betreff
        </label>
        <select
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6]"
          required
        >
          <option value="">Wähle ein Thema</option>
          <option value="Bestellung nicht erhalten">
            Bestellung nicht erhalten
          </option>
          <option value="Rückerstattung">Rückerstattung</option>
          <option value="Technisches Problem">Technisches Problem</option>
          <option value="Allgemeine Frage">Allgemeine Frage</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nachricht
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ed07f6]"
          rows={5}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ed07f6] text-white py-3 rounded-lg font-semibold hover:bg-[#d406db] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <span>Wird gesendet...</span>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Ticket senden</span>
          </>
        )}
      </button>
    </form>
  );
}
```

---

## 🔔 Adding Email Notifications (Optional)

Install Resend for email notifications:

```bash
npm install resend
```

Create email utility:

```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: any) {
  try {
    await resend.emails.send({
      from: "Hypex <noreply@hypex.cloud>",
      to: order.customer_email,
      subject: `Bestellbestätigung - ${order.order_id}`,
      html: `
        <h1>Danke für deine Bestellung! 🎉</h1>
        <p><strong>Bestellnummer:</strong> ${order.order_id}</p>
        <p><strong>Produkt:</strong> ${order.product_name}</p>
        <p><strong>Betrag:</strong> €${order.amount}</p>
        <p>Wir bearbeiten deine Bestellung und melden uns in Kürze.</p>
        <p>Bei Fragen kontaktiere uns einfach!</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }
}

export async function sendTicketConfirmation(ticket: any) {
  try {
    await resend.emails.send({
      from: "Hypex Support <support@hypex.cloud>",
      to: ticket.customer_email,
      subject: `Ticket erstellt - ${ticket.ticket_id}`,
      html: `
        <h1>Dein Support Ticket wurde erstellt</h1>
        <p><strong>Ticket-ID:</strong> ${ticket.ticket_id}</p>
        <p><strong>Betreff:</strong> ${ticket.subject}</p>
        <p>Wir melden uns innerhalb von 24 Stunden bei dir.</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }
}
```

---

## 🎯 Quick Reference

### **Dashboard URLs:**

- Login: `/admin/login`
- Dashboard: `/admin/dashboard`

### **Default Credentials:**

- Username: `admin`
- Password: From `.env.local`

### **Database Tables:**

- `orders` - All customer orders
- `tickets` - Support tickets
- `ticket_replies` - Ticket conversations

### **Key Files:**

- `/lib/supabase.ts` - Database client
- `/app/admin/dashboard/page.tsx` - Main dashboard
- `/app/api/stripe/webhook/route.ts` - Stripe integration
- `/app/api/auth/[...nextauth]/route.ts` - Authentication

---

## 🚀 You're Ready!

Your complete dashboard is now set up with:
✅ Sales tracking
✅ Order management  
✅ Support tickets
✅ Secure authentication
✅ Real-time database

**Next Steps:**

1. Create Supabase account
2. Run the SQL to create tables
3. Add credentials to `.env.local`
4. Start your server and login!

Need help? Check the files or ask! 🎉
