# 🔗 Connect Your Website Sales to Dashboard

## ✅ What You Need

Your dashboard is ready, but you need to:
1. Create database tables in Supabase
2. Test the connection
3. Configure Stripe webhook (for live sales)

---

## 📊 Step 1: Create Database Tables (REQUIRED)

### **Go to Supabase:**
1. Open https://supabase.com/dashboard
2. Select your project: `hypex-dashboard`
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**

### **Paste This SQL:**

```sql
-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
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

-- Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
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
CREATE TABLE IF NOT EXISTS ticket_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  reply_from TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_email ON tickets(customer_email);
CREATE INDEX IF NOT EXISTS idx_tickets_created ON tickets(created_at DESC);

-- Add some test data
INSERT INTO orders (order_id, customer_email, customer_name, product_name, amount, status, payment_method)
VALUES 
  ('ORD-TEST-001', 'max@example.com', 'Max Mustermann', 'Instagram Follower - 5.000', 14.99, 'completed', 'stripe'),
  ('ORD-TEST-002', 'anna@example.com', 'Anna Schmidt', 'Spotify Premium - 12 Monate', 39.99, 'completed', 'paypal'),
  ('ORD-TEST-003', 'tom@example.com', 'Tom Weber', 'TikTok Follower - 10.000', 27.99, 'pending', 'stripe')
ON CONFLICT (order_id) DO NOTHING;

INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, message, status, priority)
VALUES 
  ('TKT-TEST-001', 'Lisa Müller', 'lisa@example.com', 'Bestellung nicht erhalten', 'Hallo, ich habe meine Bestellung noch nicht bekommen.', 'open', 'high'),
  ('TKT-TEST-002', 'Peter Klein', 'peter@example.com', 'Frage zu Spotify Abo', 'Wie lange dauert die Aktivierung?', 'open', 'normal')
ON CONFLICT (ticket_id) DO NOTHING;
```

### **Click RUN** ▶️

✅ **Verify:** Go to **Table Editor** - you should see 3 tables with test data!

---

## 🧪 Step 2: Test the Connection

### **Refresh Your Dashboard:**
1. Go to: http://localhost:3000/admin/dashboard
2. Login if needed
3. You should see:
   - ✅ Stats showing test data
   - ✅ 3 orders in Orders tab
   - ✅ 2 tickets in Tickets tab

If you see the data, **IT'S WORKING!** 🎉

---

## 🔄 Step 3: How Sales Connect Automatically

### **Current Setup:**

```
Customer Buys → Stripe Processes → Webhook Fires → Order Saved to Database → Appears in Dashboard
```

### **What's Already Done:**

✅ Stripe webhook configured (`/api/stripe/webhook`)
✅ Webhook saves orders to Supabase
✅ Dashboard reads from Supabase
✅ Real-time connection

### **Test Real Purchase:**

1. Go to your landing page: http://localhost:3000
2. Click "Jetzt kaufen" on any product
3. Use Stripe test card:
   ```
   Card: 4242 4242 4242 4242
   Date: Any future date (12/25)
   CVC: Any 3 digits (123)
   ZIP: Any (12345)
   ```
4. Complete checkout
5. **Refresh dashboard** - order appears! ✨

---

## 🚀 Step 4: For Live Production (Later)

When you're ready to go live:

### **1. Configure Stripe Webhook:**

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Events to send:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.payment_failed`
5. Copy the **Signing secret**
6. Add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxx...
   ```

### **2. Test Webhook:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 📊 How Each Sale Works

### **When Customer Pays:**

1. **Stripe processes payment** ✅
2. **Webhook fires** to `/api/stripe/webhook` ✅
3. **Order saved** to Supabase with:
   - Order ID (ORD-XXXX)
   - Customer email & name
   - Product purchased
   - Amount paid
   - Payment method
   - Status: completed
4. **Dashboard shows** order immediately ✅

### **What You See in Dashboard:**

- 💰 Updated sales stats
- 📦 New order in table
- 📧 Customer information
- 💳 Payment method
- ⏰ Timestamp

---

## 🎫 Support Tickets Connection

### **Add Support Form to Your Site:**

Add this component anywhere on your landing page:

```typescript
// Import the form
import SupportForm from '@/app/components/SupportForm'

// Use it
<section className="py-16">
  <div className="max-w-2xl mx-auto px-4">
    <SupportForm />
  </div>
</section>
```

**When customer submits:**
1. ✅ Ticket created in database
2. ✅ Appears in dashboard immediately
3. ✅ Customer gets ticket ID
4. ✅ You can respond from dashboard (coming soon)

---

## 🔍 Verify Everything Works

### **Checklist:**

- [ ] Tables created in Supabase
- [ ] Test data appears in dashboard
- [ ] Can see orders in Orders tab
- [ ] Can see tickets in Tickets tab
- [ ] Stats show correct numbers
- [ ] Test purchase creates new order
- [ ] Support form creates tickets

---

## 🆘 Troubleshooting

### **Dashboard is empty?**
→ Run the SQL to create tables and add test data

### **Test purchase doesn't appear?**
→ Check browser console for errors
→ Verify webhook is working
→ Check Supabase credentials in .env.local

### **Orders not saving?**
→ Check terminal logs for errors
→ Verify SUPABASE_SERVICE_KEY is correct
→ Make sure tables exist

---

## 💡 Quick Test Right Now

1. **Login to dashboard:** http://localhost:3000/admin/login
2. **See test data?** ✅ Connection working!
3. **Make test purchase** on your site
4. **Refresh dashboard** - new order appears! 🎉

---

## 📊 What's Connected

```
Your Website (Hypex)
    ↓
Stripe Payment
    ↓
Webhook → /api/stripe/webhook
    ↓
Supabase Database
    ↓
Admin Dashboard
    ↓
You see the sale! 💰
```

---

## ✅ You're Ready!

Once you run the SQL and see test data in your dashboard, **sales will automatically connect**!

Every purchase on your website will:
1. Save to database automatically
2. Appear in dashboard immediately
3. Show customer details
4. Track payment info
5. Update statistics

**Run the SQL now and test it!** 🚀