# FirstSketch Concepts - Backend API

Backend API server for FirstSketch Concepts website built with Node.js, Express, and MongoDB.

## 🚀 Quick Deploy

### Railway Deployment (Recommended)

1. **Connect to Railway**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

2. **Set Environment Variables**
   ```bash
   railway variables set MONGODB_URI=your_mongodb_atlas_uri
   railway variables set JWT_SECRET=your_jwt_secret
   railway variables set EMAIL_USER=your_email@gmail.com
   railway variables set EMAIL_PASS=your_app_password
   railway variables set ADMIN_EMAIL=firstskechconcepts@gmail.com
   railway variables set NODE_ENV=production
   railway variables set CORS_ORIGIN=https://your-frontend-domain.com
   ```

3. **Deploy**
   ```bash
   railway up
   ```

### Heroku Deployment

1. **Create Heroku App**
   ```bash
   heroku create firstsketch-api
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASS=your_app_password
   heroku config:set ADMIN_EMAIL=firstskechconcepts@gmail.com
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## 📋 Environment Variables Required

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/firstsketch

# Authentication
JWT_SECRET=your_64_character_random_string

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=firstskechconcepts@gmail.com

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# Admin
ADMIN_TOKEN=admin123
```

## 🔧 API Endpoints

### Public APIs
- `GET /api/health` - Server health check
- `GET /api/home` - Home page data
- `GET /api/services` - Services data
- `GET /api/projects` - Portfolio projects
- `GET /api/company` - Company information
- `POST /api/contact` - Submit contact form

### Admin APIs (JWT Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/contacts` - Contact submissions
- `PUT /api/admin/contacts/:id/status` - Update contact status

## 🗄️ Database Setup

1. **MongoDB Atlas** (Recommended)
   - Create cluster at https://cloud.mongodb.com
   - Get connection string
   - Add to MONGODB_URI environment variable

2. **Seed Database**
   ```bash
   npm run seed
   ```

## 📧 Email Setup (Gmail)

1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in EMAIL_PASS

## 🔐 Admin Access

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**Change in production!**

## 🏥 Health Check

After deployment, verify:
- `GET https://your-api-domain.com/api/health`

## 📞 Support

- Email: firstskechconcepts@gmail.com
- Phone: +91-6282570226