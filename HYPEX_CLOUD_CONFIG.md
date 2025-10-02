# 🌐 Hypex.cloud - Korrekte Domain-Konfiguration

## ✅ Domain: hypex.cloud

Deine Website läuft auf **hypex.cloud** - das ist die richtige Domain!

---

## 📋 **Für Vercel Environment Variables:**

Stelle sicher, dass diese Werte in Vercel gesetzt sind:

### **In Vercel Dashboard:**
1. Gehe zu https://vercel.com
2. Wähle dein Projekt
3. **Settings** → **Environment Variables**
4. Setze diese Variablen:

```env
# Domain - WICHTIG!
NEXT_PUBLIC_DOMAIN=https://hypex.cloud
NEXTAUTH_URL=https://hypex.cloud

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret

# Admin Login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Stripe (Get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**⚠️ Wichtig:** 
- Hole deine echten Keys aus Supabase und Stripe Dashboards
- NIEMALS Keys in Code oder Markdown-Dateien schreiben!
- Verwende nur Vercel Environment Variables

**⚠️ Wichtig für JEDE Variable:**
- Wähle **alle Environments**: Production, Preview, Development
- Klicke **Save**

---

## 🔄 **Nach dem Ändern:**

1. **Redeploy in Vercel:**
   - Gehe zu **Deployments**
   - Neuestes Deployment → **⋮** → **Redeploy**
   - Warte 2-3 Minuten

2. **Teste auf hypex.cloud:**
   - Öffne https://hypex.cloud
   - Teste eine Zahlung
   - Success URL sollte sein: `https://hypex.cloud/success`

---

## 🎯 **URLs die jetzt funktionieren sollten:**

```
Website:        https://hypex.cloud
Admin Login:    https://hypex.cloud/admin/login
Dashboard:      https://hypex.cloud/admin/dashboard
Success Page:   https://hypex.cloud/success
Stripe Webhook: https://hypex.cloud/api/stripe/webhook
```

---

## 🔧 **Stripe Webhook konfigurieren:**

Wenn du echte Zahlungen akzeptieren willst:

1. Gehe zu https://dashboard.stripe.com/webhooks
2. **Add endpoint**
3. URL: `https://hypex.cloud/api/stripe/webhook`
4. Events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.payment_failed`
5. **Add endpoint**
6. Kopiere **Signing secret** (whsec_...)
7. Füge in Vercel Environment Variables ein als `STRIPE_WEBHOOK_SECRET`
8. Redeploy

---

## ✅ **Checklist:**

- [ ] `NEXT_PUBLIC_DOMAIN=https://hypex.cloud` in Vercel
- [ ] `NEXTAUTH_URL=https://hypex.cloud` in Vercel
- [ ] Alle Supabase Keys in Vercel
- [ ] Alle Stripe Keys in Vercel
- [ ] Admin Credentials in Vercel
- [ ] Für alle Environments gespeichert
- [ ] Redeployed
- [ ] Getestet auf hypex.cloud

---

## 🚀 **Deine Website:**

**Live URL:** https://hypex.cloud

**Features:**
- ✅ Payment Processing (Stripe + PayPal)
- ✅ Admin Dashboard
- ✅ Order Tracking
- ✅ Support Tickets
- ✅ Success Pages
- ✅ SSL Secure (HTTPS)

---

## 💡 **Wichtig:**

- Verwende immer `https://hypex.cloud` (mit https)
- Keine trailing slashes (`/`) am Ende
- Für localhost: `http://localhost:3000`
- Für production: `https://hypex.cloud`

---

## 🔐 **Sicherheit:**

- NIEMALS API Keys in Code committen
- NIEMALS Keys in Markdown-Dateien
- IMMER nur Vercel Environment Variables verwenden
- Verwende .env.local nur lokal (ist in .gitignore)

---

## 🎉 **Alles korrekt konfiguriert für hypex.cloud!**

Setze alle Keys in Vercel Environment Variables und du bist ready! 🚀