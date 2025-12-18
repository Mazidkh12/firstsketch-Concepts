# 🚀 Deploy FirstSketch Frontend to Vercel

## Quick Deploy Steps

### 1. Go to Vercel Dashboard
Visit: https://vercel.com

### 2. Import Project
- Click **"New Project"**
- Import your GitHub repository: `firstsketch-Concepts`
- Select **"client"** as the root directory

### 3. Configure Build Settings

**Framework Preset:** Vite
**Root Directory:** `client`
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### 4. Add Environment Variables

In the Vercel dashboard, add these environment variables:

```env
VITE_API_URL=https://firstsketch-concepts-2xrt6kg58-mazidkh12s-projects.vercel.app/api
VITE_NODE_ENV=production
```

### 5. Deploy

Click **"Deploy"** button and wait for the build to complete.

## 🔄 After Deployment

### Update Backend CORS

Once your frontend is deployed, you need to update the backend's CORS settings:

1. Go to your Vercel backend project settings
2. Update the `CORS_ORIGIN` environment variable with your frontend URL
3. Example: `CORS_ORIGIN=https://your-frontend-app.vercel.app`
4. Redeploy the backend

## 🧪 Test Your Deployment

After deployment, test these pages:
- Home page: `/`
- Services: `/services`
- Projects: `/projects`
- About: `/about`
- Contact: `/contact`

## 📝 Important Notes

- The frontend is configured to use your deployed backend API
- All API calls will go to: `https://firstsketch-concepts-2xrt6kg58-mazidkh12s-projects.vercel.app/api`
- Make sure your backend CORS is configured to allow your frontend domain
- The `vercel.json` file handles React Router routing properly

## 🆘 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node version is compatible (16+)

### API Calls Fail
- Verify the `VITE_API_URL` environment variable is set correctly
- Check backend CORS settings include your frontend URL
- Test backend endpoints directly first

### 404 on Page Refresh
- The `vercel.json` file should handle this
- Verify the file is in the client folder and pushed to GitHub

## 📞 Contact

Need help?
- Email: firstskechconcepts@gmail.com
- Phone: +91-6282570226

---

**🎉 Your frontend will be live at: `https://your-project.vercel.app`**
