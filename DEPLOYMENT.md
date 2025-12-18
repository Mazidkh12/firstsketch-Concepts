# 🚀 FirstSketch Backend Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended) ⭐

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   railway init
   ```

3. **Set Environment Variables in Railway Dashboard**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/firstsketch
   JWT_SECRET=your_64_character_random_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ADMIN_EMAIL=firstskechconcepts@gmail.com
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.com
   ADMIN_TOKEN=admin123
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   Download from: https://devcenter.heroku.com/articles/heroku-cli

2. **Create App**
   ```bash
   heroku login
   heroku create firstsketch-api
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASS=your_app_password
   heroku config:set ADMIN_EMAIL=firstskechconcepts@gmail.com
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   heroku config:set ADMIN_TOKEN=admin123
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy FirstSketch API"
   git push heroku main
   ```

### Option 3: Render

1. **Connect GitHub Repository**
   - Go to https://render.com
   - Connect your GitHub repository
   - Choose "Web Service"

2. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   Add all the environment variables listed above in Render dashboard.

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create cluster
- [ ] Create database user
- [ ] Get connection string
- [ ] Whitelist IP addresses (0.0.0.0/0 for production)

### 2. Gmail SMTP Setup
- [ ] Enable 2-factor authentication
- [ ] Generate App Password
- [ ] Test email configuration

### 3. Environment Variables
- [ ] MONGODB_URI configured
- [ ] JWT_SECRET generated (64+ characters)
- [ ] Email credentials set
- [ ] CORS_ORIGIN set to frontend domain
- [ ] NODE_ENV set to production

### 4. Security
- [ ] Change default admin credentials
- [ ] Verify rate limiting is enabled
- [ ] Check CORS configuration
- [ ] Ensure .env files are not committed

## 🧪 Post-Deployment Testing

1. **Health Check**
   ```bash
   curl https://your-api-domain.com/api/health
   ```

2. **Seed Database**
   ```bash
   # SSH into your deployment or use platform CLI
   npm run seed
   ```

3. **Test API Endpoints**
   ```bash
   # Test home page data
   curl https://your-api-domain.com/api/home
   
   # Test services
   curl https://your-api-domain.com/api/services
   
   # Test admin login
   curl -X POST https://your-api-domain.com/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` |
| `MONGODB_URI` | Database connection | `mongodb+srv://...` |
| `JWT_SECRET` | Authentication secret | `64-char-random-string` |
| `EMAIL_HOST` | SMTP server | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Email account | `your@gmail.com` |
| `EMAIL_PASS` | Email password | `app-password` |
| `ADMIN_EMAIL` | Admin email | `firstskechconcepts@gmail.com` |
| `CORS_ORIGIN` | Frontend domain | `https://yoursite.com` |
| `ADMIN_TOKEN` | Simple admin token | `admin123` |

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB URI format
   - Verify network access in MongoDB Atlas
   - Ensure database user has correct permissions

2. **CORS Errors**
   - Verify CORS_ORIGIN matches frontend domain exactly
   - Include protocol (https://) in CORS_ORIGIN

3. **Email Not Working**
   - Verify Gmail App Password (not regular password)
   - Check 2-factor authentication is enabled
   - Test SMTP settings

4. **JWT Errors**
   - Ensure JWT_SECRET is at least 32 characters
   - Verify secret is consistent across deployments

### Logs and Monitoring

- **Railway**: `railway logs`
- **Heroku**: `heroku logs --tail`
- **Render**: Check logs in dashboard

## 📞 Support

If you need help with deployment:
- Email: firstskechconcepts@gmail.com
- Phone: +91-6282570226

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app/)
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)