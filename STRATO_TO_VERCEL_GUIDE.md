# 🌐 Connect Strato Domain to Vercel - Complete Guide

## 🎯 Overview

You'll connect your `hypex.cloud` domain from Strato to Vercel in ~15 minutes!

**Steps:**

1. Deploy to Vercel (5 min)
2. Add domain in Vercel (2 min)
3. Update DNS in Strato (5 min)
4. Wait for propagation (5-48 hours)

---

## 📋 **Step 1: Deploy Your Site to Vercel (5 minutes)**

### **A. Push to GitHub First:**

```bash
# In your project folder
cd /Users/lavdim/Desktop/LandingCata

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Hypex website"

# Create repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/hypex.git
git branch -M main
git push -u origin main
```

### **B. Deploy to Vercel:**

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click:** "Add New" → "Project"
4. **Import** your GitHub repository
5. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `next build`
6. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://akeiqjgdtefbadkhapoz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   NEXTAUTH_SECRET=qN7UJNhop+nP07gQp5WWi5pQj3kb0D685uhWlII3SS4=
   NEXTAUTH_URL=https://hypex.cloud
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=ChooseAStrongPassword123!
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51NyJ8W...
   STRIPE_SECRET_KEY=sk_test_51NyJ8W...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
   PAYPAL_CLIENT_SECRET=...
   ```
7. **Click:** "Deploy"
8. **Wait** 2-3 minutes
9. **Done!** You get a URL like: `https://hypex-xxx.vercel.app`

---

## 🌐 **Step 2: Add Domain in Vercel (2 minutes)**

### **In Vercel Dashboard:**

1. **Click** your project
2. **Go to:** Settings → Domains
3. **Add Domain:**
   - Type: `hypex.cloud`
   - Click "Add"
4. **Also add** `www.hypex.cloud`
   - Type: `www.hypex.cloud`
   - Click "Add"

### **Vercel will show you DNS records:**

You'll see something like:

```
Type    Name    Value
────────────────────────────────────────
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**IMPORTANT:** Keep this page open! You'll need these values next.

---

## 🔧 **Step 3: Configure DNS in Strato (5 minutes)**

### **Login to Strato:**

1. **Go to:** https://www.strato.de/apps/CustomerLogin
2. **Login** with your Strato credentials
3. **Go to:** Domains → Domain management
4. **Find** your domain: `hypex.cloud`
5. **Click:** DNS Settings / DNS-Einstellungen

---

### **Option A: Using Strato's DNS (Recommended)**

#### **Configure DNS Records:**

1. **Remove ALL existing A and CNAME records** for @ and www
2. **Add new A Record:**
   ```
   Type: A
   Name: @ (or leave empty)
   Value: 76.76.21.21
   TTL: 3600
   ```
3. **Add CNAME Record for www:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```
4. **Click** "Save" / "Speichern"

---

### **Option B: Using Vercel's Nameservers (Alternative)**

#### **Change Nameservers:**

**In Vercel (get nameservers):**

1. Domains → hypex.cloud
2. Click "Use Vercel Nameservers"
3. Copy the nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

**In Strato (update nameservers):**

1. Go to: Domain → Nameserver
2. Select: "Use custom nameservers"
3. Enter:
   ```
   Nameserver 1: ns1.vercel-dns.com
   Nameserver 2: ns2.vercel-dns.com
   ```
4. Click "Save"

**⚠️ WARNING:** This gives Vercel full DNS control. Option A is usually better!

---

## 🎯 **Step 4: Verify & Wait (5-48 hours)**

### **Immediate Steps:**

1. **In Vercel:** Click "Verify" or "Refresh"
2. **Check status:**
   - ⏳ Pending = Waiting for DNS
   - ✅ Valid = Working!

### **DNS Propagation:**

```
Typical times:
- 5 minutes: Sometimes instant!
- 1-2 hours: Most common
- 24-48 hours: Maximum

During this time:
- Some people see old site
- Some people see new site
- This is NORMAL
```

### **Check Propagation:**

**Use these tools:**

- https://dnschecker.org
- https://www.whatsmydns.net

Enter: `hypex.cloud`

✅ Green checkmarks = DNS propagated!

---

## 🔍 **Troubleshooting Strato-Specific Issues**

### **Issue 1: Strato Subdomain Redirect**

**Problem:** Strato redirects www to non-www automatically

**Solution:**

1. In Strato: Disable "Domain forwarding"
2. In Strato: Disable "Frame redirect"
3. Use DNS records only

### **Issue 2: Can't Remove Old Records**

**Problem:** Strato locks some records

**Solution:**

1. Contact Strato support
2. Or use Vercel nameservers instead (Option B)

### **Issue 3: SSL Certificate Error**

**Problem:** HTTPS not working

**Solution:**

1. Wait 24 hours (Vercel auto-generates SSL)
2. In Vercel: Domains → Refresh SSL
3. Check "Force HTTPS" is enabled

### **Issue 4: "DNS Not Configured"**

**Problem:** Vercel shows error

**Solution:**

1. Double-check DNS records in Strato
2. Wait 1-2 hours
3. Clear browser cache
4. Try incognito mode

---

## 📊 **Step-by-Step Strato DNS Configuration**

### **Detailed Strato Steps:**

1. **Login:** https://www.strato.de/apps/CustomerLogin

2. **Navigate:**

   ```
   Kunde werden → Paket & Domains
   → Domains
   → Domain-Verwaltung
   → hypex.cloud
   → DNS-Einstellungen / Erweiterte DNS-Einstellungen
   ```

3. **Delete existing records:**

   - Find any A record for `@` or empty name
   - Find any CNAME for `www`
   - Click delete/trash icon

4. **Add A Record:**

   ```
   Record Type: A
   Subdomain: @ (or leave empty)
   IP Address: 76.76.21.21 (from Vercel)
   TTL: 3600
   ```

   Click "Hinzufügen" (Add)

5. **Add CNAME Record:**

   ```
   Record Type: CNAME
   Subdomain: www
   Target: cname.vercel-dns.com (from Vercel)
   TTL: 3600
   ```

   Click "Hinzufügen" (Add)

6. **Save Changes:**

   - Click "Speichern" / "Save"
   - Confirm changes

7. **Wait:**
   - 5-60 minutes usually
   - Check Vercel for verification

---

## ✅ **Verification Checklist**

After DNS propagation:

- [ ] `http://hypex.cloud` → redirects to HTTPS ✅
- [ ] `https://hypex.cloud` → shows your site ✅
- [ ] `http://www.hypex.cloud` → redirects to HTTPS ✅
- [ ] `https://www.hypex.cloud` → shows your site ✅
- [ ] Green padlock (SSL) in browser ✅
- [ ] Admin login works at `/admin/login` ✅
- [ ] Payments work (test with Stripe) ✅
- [ ] Dashboard accessible ✅

---

## 🔒 **SSL Certificate (Automatic)**

### **Vercel handles SSL automatically:**

1. **After DNS propagates:**

   - Vercel detects your domain
   - Generates Let's Encrypt certificate
   - Installs it automatically
   - Renews every 90 days

2. **You see:**

   - 🔒 Padlock in browser
   - HTTPS:// in URL
   - "Secure" or "Connection is secure"

3. **No cost:**
   - SSL is FREE with Vercel
   - No configuration needed
   - Works immediately

---

## ⚡ **Quick Command Reference**

### **Check DNS from Terminal:**

```bash
# Check A record
dig hypex.cloud A +short

# Check CNAME
dig www.hypex.cloud CNAME +short

# Check nameservers
dig hypex.cloud NS +short

# Full DNS info
nslookup hypex.cloud
```

### **Expected Results:**

```bash
# A record should show:
76.76.21.21

# CNAME should show:
cname.vercel-dns.com

# If correct, you're good!
```

---

## 📧 **Update Environment Variable**

After domain is live, update:

```env
# In Vercel environment variables
NEXTAUTH_URL=https://hypex.cloud

# And update Stripe webhook URL:
https://hypex.cloud/api/stripe/webhook
```

**How to update in Vercel:**

1. Project Settings → Environment Variables
2. Find `NEXTAUTH_URL`
3. Edit value to `https://hypex.cloud`
4. Redeploy (Deployments → Redeploy)

---

## 🎯 **Common Strato DNS Values**

### **What Vercel Gives You:**

```
A Record IP: 76.76.21.21
CNAME Target: cname.vercel-dns.com
```

**Note:** Vercel's IP may be different. Always use the values shown in YOUR Vercel dashboard!

### **What to Set in Strato:**

```
Record 1:
├─ Type: A
├─ Name: @ (or empty)
├─ Value: 76.76.21.21
└─ TTL: 3600

Record 2:
├─ Type: CNAME
├─ Name: www
├─ Value: cname.vercel-dns.com
└─ TTL: 3600
```

---

## 📞 **Support Contacts**

### **If You Need Help:**

**Strato Support:**

- Phone: 030 300 146 000
- Email: support@strato.de
- Hours: Mon-Fri 8-20, Sat 10-16

**Vercel Support:**

- Dashboard: Help button
- Twitter: @vercel
- Docs: vercel.com/docs

**What to Ask Strato:**

```
"Ich möchte die DNS-Einstellungen für hypex.cloud ändern.
Ich brauche:
- Einen A-Record für @ auf 76.76.21.21
- Einen CNAME-Record für www auf cname.vercel-dns.com
Können Sie mir dabei helfen?"
```

---

## ⏱️ **Timeline**

### **Realistic Timeline:**

```
Day 0:
00:00 - Push code to GitHub ✅
00:10 - Deploy to Vercel ✅
00:15 - Add domain in Vercel ✅
00:20 - Update DNS in Strato ✅
00:30 - Wait for propagation... ⏳

Day 0-1:
DNS propagates (1-24 hours)
Some locations see new site
Some still see old

Day 1:
Most people see new site ✅
SSL certificate active ✅
Everything working! 🎉
```

---

## 🎉 **After It's Live**

### **Immediately Test:**

1. **Visit** `https://hypex.cloud`
2. **Check** SSL certificate (padlock)
3. **Test** all pages load
4. **Try** buying something (test mode)
5. **Login** to admin dashboard
6. **Verify** dashboard works

### **Update External Links:**

- [ ] Update social media profiles
- [ ] Update business cards
- [ ] Update email signatures
- [ ] Update Stripe webhook URL
- [ ] Update PayPal return URL
- [ ] Update Google Analytics
- [ ] Update any ads/promotions

---

## ✅ **Success Checklist**

Your domain is ready when:

- [x] Code deployed to Vercel
- [x] Domain added in Vercel
- [x] DNS configured in Strato
- [x] DNS propagated globally
- [x] SSL certificate active
- [x] Website loads on hypex.cloud
- [x] www.hypex.cloud redirects correctly
- [x] Admin dashboard works
- [x] Payments processing
- [x] No browser warnings

---

## 💡 **Pro Tips**

1. **Do this on Friday evening** - gives whole weekend for DNS propagation
2. **Keep old site running** during transition
3. **Test in incognito mode** to avoid cache
4. **Clear browser cache** if site looks wrong
5. **Check on mobile too** - different DNS sometimes
6. **Wait at least 2 hours** before panicking
7. **DNS takes time** - be patient!

---

## 🚀 **You're Ready!**

Follow these steps and your `hypex.cloud` domain will point to Vercel!

**Total time:** 15 minutes work + 1-24 hours waiting

**After it's live:** Your professional business is ready! 💪

Good luck! 🎉
