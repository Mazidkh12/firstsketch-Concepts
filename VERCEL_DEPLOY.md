# 🚀 Deploy FirstSketch Backend to Vercel

## Method 1: Vercel Dashboard (Recommended)

### Step 1: Connect GitHub Repository

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: `firstsketch-Concepts`
5. **Select the server folder** as the root directory

### Step 2: Configure Project Settings

**Framework Preset**: Other
**Root Directory**: `server`
**Build Command**: `npm run build` (or leave empty)
**Output Directory**: Leave empty
**Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, add these environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/firstsketch
JWT_SECRET=your_64_character_random_string
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=firstskechconcepts@gmail.com
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
ADMIN_TOKEN=admin123
```

### Step 4: Deploy

Click **"Deploy"** button

## Method 2: Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Deploy from Server Directory
```bash
cd server
vercel login
vercel --prod
```

## 🔧 Environment Variables Setup

### Required Variables:

1. **MONGODB_URI**
   - Get from MongoDB Atlas
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/firstsketch`

2. **JWT_SECRET**
   - Generate with: `node scripts/generate-jwt-secret.js`
   - 64+ character random string

3. **Email Configuration**
   - EMAIL_USER: Your Gmail address
   - EMAIL_PASS: Gmail App Password (not regular password)
   - Enable 2FA and generate App Password

4. **CORS_ORIGIN**
   - Your frontend Vercel URL
   - Format: `https://your-app.vercel.app`

## 🧪 Post-Deployment Testing

### 1. Test Health Endpoint
```bash
curl https://your-api.vercel.app/api/health
```

### 2. Test Home Data
```bash
curl https://your-api.vercel.app/api/home
```

### 3. Seed Database
You'll need to run the seeder manually:
- Use MongoDB Compass or Atlas interface
- Or create a temporary endpoint to seed data

## ⚠️ Important Notes for Vercel

### Serverless Functions
- Vercel runs Node.js as serverless functions
- Each request is stateless
- Database connections are handled per request

### File Limitations
- No persistent file storage
- Use MongoDB for all data storage
- Remove any file upload functionality for now

### Cold Starts
- First request might be slower (cold start)
- Subsequent requests will be faster

## 🔗 Update Frontend

After deployment, update your frontend environment:

```env
# In your frontend .env
VITE_API_URL=https://your-api.vercel.app/api
```

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check all dependencies are in package.json
   - Ensure no dev-only imports in production code

2. **Database Connection**
   - Verify MongoDB URI is correct
   - Check network access in MongoDB Atlas (allow all IPs: 0.0.0.0/0)

3. **CORS Errors**
   - Ensure CORS_ORIGIN matches your frontend domain exactly
   - Include https:// protocol

4. **Environment Variables**
   - Double-check all variables are set in Vercel dashboard
   - Redeploy after adding new variables

## 📞 Support

Need help? Contact:
- Email: firstskechconcepts@gmail.com
- Phone: +91-6282570226

---

**🎉 Your API will be available at: `https://your-project.vercel.app`**