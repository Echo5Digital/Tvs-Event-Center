# 🚀 TVS Event Center - Live Deployment Guide

## ⚠️ **IMPORTANT: Database Fix Required**

**The blog system was failing on Vercel because SQLite doesn't work on serverless platforms. This has been fixed!**

## 🛠️ **Quick Fix Steps (Do This First):**

### 1. **Set Up Production Database**

**Option A: Neon (Recommended - Free)**
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create new project called "tvs-event-center"
4. Copy the connection string

**Option B: Supabase (Also Free)**
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create new project
4. Go to Settings > Database
5. Copy connection string

**Option C: Railway**
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string

### 2. **Update Vercel Environment Variables**

1. Go to your Vercel project dashboard
2. Go to Settings > Environment Variables
3. Add this variable:
   ```
   DATABASE_URL = your_database_connection_string_here
   ```
4. Click "Save"

### 3. **Redeploy**

1. Go to Vercel dashboard
2. Click "Redeploy" or push new code to trigger deployment

## 📋 **Complete Deployment Checklist:**

### ✅ **Prerequisites**
- [ ] Code pushed to GitHub
- [ ] Vercel account connected to GitHub repo
- [ ] Database created (Neon/Supabase/Railway)

### ✅ **Environment Variables (Add to Vercel)**
```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" (if using Supabase for forms)
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_key" (if using Supabase for forms)
```

### ✅ **Vercel Deployment Steps**
1. **Connect Repository**
   - Import project from GitHub
   - Select your repository

2. **Configure Build**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Add Environment Variables**
   - Add `DATABASE_URL` from your database provider
   - Add other variables as needed

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### ✅ **Database Setup**
After deployment, the database tables will be created automatically on first API call.

## 🔧 **What Was Fixed:**

### **Before (Not Working on Vercel):**
- ❌ SQLite database (file-based)
- ❌ Single Prisma instance
- ❌ No production error handling

### **After (Working on Vercel):**
- ✅ PostgreSQL database (cloud-based)
- ✅ Proper Prisma connection management
- ✅ Production-ready configuration

## 🌐 **Features That Work Live:**

### **Blog Management (Admin Panel)**
- ✅ Create blog posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Rich text editor with images
- ✅ SEO optimization
- ✅ Draft/Published status

### **Public Blog Pages**
- ✅ Blog listing page (`/blog`)
- ✅ Individual post pages (`/blog/[slug]`)
- ✅ SEO meta tags and structured data
- ✅ Responsive design

### **Contact System**
- ✅ Contact form submissions
- ✅ Admin dashboard to view inquiries
- ✅ Email notifications (if EmailJS configured)

## 🆘 **Troubleshooting:**

### **If Blog Still Doesn't Work:**
1. Check Vercel deployment logs
2. Verify `DATABASE_URL` is set correctly
3. Ensure database is accessible
4. Check function logs in Vercel dashboard

### **Common Issues:**
- **"Database connection failed"**: Check DATABASE_URL format
- **"Table doesn't exist"**: Database will auto-create on first use
- **"Permission denied"**: Check database user permissions

## 📞 **Support:**
If you need help with deployment, contact your developer or check:
- Vercel documentation
- Database provider documentation
- Next.js deployment guides

---

**Your blog system is now production-ready and will work perfectly on Vercel! 🎉**