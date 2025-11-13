# 🚀 Supabase Setup Guide for TVS Event Center

## 🎯 **Why Supabase?**
- ✅ **Free PostgreSQL database** for your blog system
- ✅ **Built-in form handling** for contact forms
- ✅ **Easy Vercel integration**
- ✅ **No complex configuration needed**

---

## 📋 **Step-by-Step Supabase Setup**

### **Step 1: Create Supabase Project**

1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"**
3. **Sign up with GitHub** (same account as your code)
4. **Click "New Project"**
5. **Fill in details:**
   - **Name:** `TVS Event Center`
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing:** Free tier is perfect
6. **Click "Create new project"**
7. **Wait 2-3 minutes** for setup to complete

### **Step 2: Get Your Credentials**

Once your project is ready:

1. **Go to Settings > API** (in left sidebar)
2. **Copy these 3 values:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Go to Settings > Database**
4. **Copy the Connection String:**
   - Look for "Connection string" section
   - Choose "URI" format
   - **Copy the full URL** (looks like: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`)

### **Step 3: Add to Vercel Environment Variables**

1. **Go to your Vercel project dashboard**
2. **Settings > Environment Variables**
3. **Add these 3 variables:**

```env
NEXT_PUBLIC_SUPABASE_URL = https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL = postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```

4. **Click "Save" for each**

### **Step 4: Redeploy**

1. **In Vercel dashboard, click "Redeploy"**
2. **Wait for deployment to complete**
3. **Test your blog at `https://your-site.vercel.app/admin`**

---

## 🔧 **Local Development Setup**

### **Create `.env.local` file:**

1. **Copy `.env.example` to `.env.local`**
2. **Add your Supabase credentials:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL="postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres"
```

3. **Restart your development server**

---

## 🗃️ **Database Tables (Auto-Created)**

When you create your first blog post, Supabase will automatically create these tables:

### **Blog Posts Table:**
- `id` - Unique identifier
- `title` - Post title
- `slug` - URL-friendly version
- `content` - Rich text content
- `author` - Author name
- `category` - Post category
- `status` - draft/published
- `featured` - Featured post flag
- `meta_title` - SEO title
- `meta_description` - SEO description
- `created_at` - Creation date
- `updated_at` - Last modified

### **Contact Submissions Table:**
- Already exists from your current setup
- Will continue working as before

---

## ✅ **What Works After Setup:**

### **Blog System:**
- ✅ Create/Edit/Delete blog posts
- ✅ Rich text editor with images
- ✅ SEO optimization
- ✅ Public blog pages (`/blog`)
- ✅ Admin dashboard (`/admin`)

### **Contact Forms:**
- ✅ Contact form submissions
- ✅ Admin view of inquiries
- ✅ Email notifications

### **Production Ready:**
- ✅ Fast global CDN
- ✅ Automatic backups
- ✅ Real-time database
- ✅ Scalable architecture

---

## 🆘 **Troubleshooting:**

### **"Connection failed" error:**
- Double-check DATABASE_URL format
- Ensure password is correct
- Check if project is fully initialized

### **"Table doesn't exist" error:**
- Tables are created on first blog post creation
- Try creating a test blog post

### **Environment variables not working:**
- Restart development server after adding `.env.local`
- Redeploy on Vercel after adding variables

---

## 🎉 **Quick Test:**

After setup:
1. **Go to `https://your-site.vercel.app/admin`**
2. **Click "Blog Management" tab**
3. **Click "Create New Post"**
4. **Add title and content**
5. **Click "Create Post"**

**If it works = You're all set! 🚀**

---

## 📞 **Need Help?**

**Supabase Dashboard:** [app.supabase.com](https://app.supabase.com)
**Documentation:** [supabase.com/docs](https://supabase.com/docs)

**Your blog system will work perfectly with Supabase! 🎊**