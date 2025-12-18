# 🚀 FirstSketch Backend Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. MongoDB Atlas
- [ ] Create MongoDB Atlas account at https://cloud.mongodb.com
- [ ] Create a new cluster (free tier available)
- [ ] Create database user with read/write permissions
- [ ] Get connection string (replace `<password>` with actual password)
- [ ] Whitelist all IP addresses (0.0.0.0/0) for production

### 2. Gmail SMTP Setup
- [ ] Enable 2-factor authentication on Gmail account
- [ ] Generate App Password (not regular password)
- [ ] Note down the 16-character app password

### 3. Generate JWT Secret
```bash
node scripts/generate-jwt-secret.js
```
- [ ] Copy the generated 64-character secret

## 🚀 Deployment Options

### Option A: Railway (Recommended)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set Environment Variables in Railway Dashboard**
   - Go to your project dashboard
   - Click "Variables" tab
   - Add all variables from `.env.example`

### Option B: Heroku

1. **Create Heroku App**
   ```bash
   heroku create firstsketch-api
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set EMAIL_USER="your_email@gmail.com"
   heroku config:set EMAIL_PASS="your_app_password"
   heroku config:set ADMIN_EMAIL="firstskechconcepts@gmail.com"
   heroku config:set NODE_ENV="production"
   heroku config:set CORS_ORIGIN="https://your-frontend-domain.com"
   heroku config:set ADMIN_TOKEN="admin123"
   ```

3. **Deploy**
   ```bash
   git push heroku master
   ```

## 🧪 Post-Deployment Testing

### 1. Health Check
```bash
curl https://your-api-domain.com/api/health
```
Expected response: `{"status":"OK","timestamp":"...","environment":"production"}`

### 2. Seed Database
- SSH into your deployment or use platform CLI
- Run: `npm run seed`

### 3. Test Key Endpoints
```bash
# Test home data
curl https://your-api-domain.com/api/home

# Test admin login
curl -X POST https://your-api-domain.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 🔧 Environment Variables Checklist

- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - 64-character random string
- [ ] `EMAIL_USER` - Gmail address
- [ ] `EMAIL_PASS` - Gmail app password (16 characters)
- [ ] `ADMIN_EMAIL` - firstskechconcepts@gmail.com
- [ ] `NODE_ENV` - production
- [ ] `CORS_ORIGIN` - Your frontend domain (with https://)
- [ ] `ADMIN_TOKEN` - admin123 (change in production)

## 🔒 Security Checklist

- [ ] Change default admin credentials after deployment
- [ ] Verify CORS is set to your frontend domain only
- [ ] Ensure .env files are not committed to repository
- [ ] Test rate limiting is working
- [ ] Verify JWT tokens expire correctly (24 hours)

## 📝 Final Steps

1. **Save Your Deployment URL**
   - Note down your API URL (e.g., https://firstsketch-api.railway.app)
   - You'll need this for frontend configuration

2. **Test Contact Form**
   - Submit a test contact form
   - Verify email notifications are received

3. **Update Frontend**
   - Update frontend `VITE_API_URL` to your deployed API URL
   - Deploy frontend with new API URL

## 🆘 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check MongoDB URI format
   - Verify database user permissions
   - Ensure IP whitelist includes 0.0.0.0/0

2. **Email Not Working**
   - Use Gmail App Password, not regular password
   - Verify 2FA is enabled on Gmail
   - Check EMAIL_HOST and EMAIL_PORT

3. **CORS Errors**
   - Ensure CORS_ORIGIN matches frontend domain exactly
   - Include https:// protocol

## 📞 Support

Need help? Contact:
- Email: firstskechconcepts@gmail.com
- Phone: +91-6282570226

---

**🎉 Once deployed, your API will be available at:**
`https://your-domain.com/api/health`