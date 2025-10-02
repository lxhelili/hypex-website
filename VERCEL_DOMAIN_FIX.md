# 🌐 Domain-Problem: hypex.cloud → hypex.de

## 🎯 Problem

Deine Seite zeigt die falsche Domain.

---

## ✅ **Schnelle Lösung - In Vercel Environment Variables ändern:**

### **Schritt 1: Gehe zu Vercel Dashboard**

1. Öffne https://vercel.com
2. Wähle dein Projekt
3. Klicke auf **Settings**

### **Schritt 2: Ändere Environment Variables**

1. Klicke auf **Environment Variables** (linkes Menü)
2. Setze diese Variablen:

```env
NEXT_PUBLIC_DOMAIN=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
```

3. **Wichtig:** Wähle alle Environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. Klicke **Save**

### **Schritt 3: Redeploy**

1. Gehe zu **Deployments** Tab
2. Klicke auf das neueste Deployment
3. Klicke **⋮** (drei Punkte)
4. Klicke **Redeploy**
5. Warte 2-3 Minuten

---

## 🔧 **Alternative: Domain in Vercel ändern**

### **Domain hinzufügen:**

1. **In Vercel:** Settings → Domains
2. **Füge hinzu:** deine-domain.com
3. **Füge hinzu:** www.deine-domain.com
4. **DNS Update:** Vercel zeigt dir die DNS-Einstellungen
5. **Bei deinem Domain-Provider:** Aktualisiere die DNS-Records
6. **Warte:** 1-24 Stunden für DNS-Propagation

---

## 📋 **Environment Variables für Vercel:**

```env
# Domain
NEXT_PUBLIC_DOMAIN=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com

# Supabase (Get from Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_KEY=your_key

# NextAuth
NEXTAUTH_SECRET=your_secret

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password

# Stripe (Get from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**⚠️ Wichtig:** 
- Hole Keys aus deinen Dashboards
- NIEMALS Keys in Code committen
- Nur in Vercel Environment Variables

---

## 🔍 **Überprüfen:**

1. Gehe zu deiner Domain
2. Öffne Browser Console (F12)
3. Teste Payment
4. Check Success URL

---

## 🎯 **Quick Steps:**

```
1. Vercel Dashboard → Settings → Environment Variables
2. Update NEXT_PUBLIC_DOMAIN und NEXTAUTH_URL
3. Save für alle Environments
4. Deployments → Redeploy
5. Warte 2-3 Minuten
6. Teste! ✅
```

---

## 🔐 **Sicherheit:**

- NIEMALS API Keys in öffentlichen Files
- Nur Vercel Environment Variables verwenden
- .env.local bleibt lokal (in .gitignore)

---

## 🎉 **Fertig!**

Nach Redeploy läuft alles auf deiner Domain! 🚀