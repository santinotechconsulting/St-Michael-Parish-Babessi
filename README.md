# St. Michael Parish, Babessi — Web Platform

**Tagline:** *Growing in Faith, United in Christ.*  
**Parish Priest:** Rev. Fr. Leonard Akuimbeni  
**Contact:** `+237 677 677 057`  
**Location:** Babessi, Northwest Region, Cameroon  
**Affiliation:** Roman Catholic Church  

---

## 🚀 Deploying Directly to Vercel (Zero Configuration Required)

This project is pre-configured for direct, seamless deployment on [Vercel](https://vercel.com) without requiring any extra dependencies, custom server configurations, or build flags.

### Option 1: Direct Git Integration (Recommended)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
3. Import this repository.
4. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. The site will deploy in seconds with full SPA URL routing and asset caching configured via `vercel.json`.

### Option 2: Deploy via Vercel CLI
If you prefer deploying from your local terminal:
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy directly (accept defaults)
vercel

# Deploy to production
vercel --prod
```

---

## 🛠️ Included Vercel Configuration (`vercel.json`)
The included `vercel.json` ensures:
* **SPA Routing & Rewrites**: Deep links (such as `/mass-sacraments`, `/events`, `/support`) refresh cleanly without `404 Not Found` errors.
* **Asset Optimization**: Long-term immutable caching for CSS, JS, and image bundles in `/assets/`.

---

## 💻 Local Development
```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run production build check
npm run build

# Run TypeScript type check
npm run lint
```

---

## 🛡️ Administrative Portal
Access the parish dashboard by clicking **"Admin Portal"** in the top navigation bar or footer.
* **Super Admin**: Rev. Fr. Leonard Akuimbeni
* **Default Passcode**: `stmichael` (or select any of the 4 roles on the login modal to test RBAC privileges)
