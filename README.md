# FirstSketch Concepts - Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

**Professional Backend API for FirstSketch Concepts**  
*Architecture & Interior Design Company*

[🚀 Deploy Now](#-quick-deploy) • [📖 Documentation](#-api-endpoints) • [🔧 Setup](#-environment-setup)

</div>

---

## 🏗️ **About**

Backend API server for FirstSketch Concepts website - a leading architecture and interior design company based in Kerala, India. Built with Node.js, Express, and MongoDB, providing secure and scalable API endpoints for the company's digital presence.

### ✨ **Features**

- 🏠 **Dynamic Content Management** - Hero images, services, projects, company info
- 📧 **Contact System** - Form submissions with email notifications
- 🔐 **JWT Authentication** - Secure admin panel access
- 📊 **Portfolio Management** - Projects showcase with categories
- 🛡️ **Security First** - Rate limiting, input validation, CORS protection
- 📱 **Production Ready** - Optimized for deployment on major platforms

---

## 🚀 **Quick Deploy**

### Railway (Recommended)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Heroku
```bash
heroku create firstsketch-api
git push heroku main
```

### One-Click Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

---

## 🔧 **Environment Setup**

### Required Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/firstsketch

# Authentication
JWT_SECRET=your_64_character_random_string

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=firstskechconcepts@gmail.com

# Security
CORS_ORIGIN=https://your-frontend-domain.com
ADMIN_TOKEN=admin123
```

### Setup Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/firstsketch-backend.git
   cd firstsketch-backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Generate JWT Secret**
   ```bash
   node scripts/generate-jwt-secret.js
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Start Server**
   ```bash
   npm run dev  # Development
   npm start    # Production
   ```

---

## 📖 **API Endpoints**

### 🌐 Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/home` | Home page data (hero, services, stats) |
| `GET` | `/api/services` | All services |
| `GET` | `/api/projects` | Portfolio projects |
| `GET` | `/api/company` | Company information |
| `POST` | `/api/contact` | Submit contact form |

### 🔐 Admin APIs (JWT Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Admin authentication |
| `GET` | `/api/admin/contacts` | Contact submissions |
| `PUT` | `/api/admin/contacts/:id/status` | Update contact status |
| `CRUD` | `/api/admin/hero-images` | Manage slideshow |
| `CRUD` | `/api/admin/services` | Manage services |
| `CRUD` | `/api/admin/projects` | Manage projects |

### 📝 Example Requests

**Health Check**
```bash
curl https://your-api-domain.com/api/health
```

**Admin Login**
```bash
curl -X POST https://your-api-domain.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Submit Contact Form**
```bash
curl -X POST https://your-api-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in your services"
  }'
```

---

## 🗄️ **Database Schema**

### Collections

- **HeroImages** - Homepage slideshow images
- **Services** - Company services (Architecture, Interior, Planning, Construction)
- **Projects** - Portfolio projects with categories
- **Stats** - Company statistics
- **CompanyInfo** - Contact details, social links, about content
- **Contacts** - Contact form submissions with status tracking

---

## 🛡️ **Security Features**

- ✅ **JWT Authentication** - Secure admin access with 24h expiration
- ✅ **Rate Limiting** - 100 requests/15min, 3 contact forms/15min
- ✅ **Input Validation** - Comprehensive validation with express-validator
- ✅ **CORS Protection** - Configured for specific origins
- ✅ **Security Headers** - Helmet.js protection
- ✅ **Email Sanitization** - Prevents injection attacks

---

## 📧 **Email Integration**

### Gmail SMTP Setup

1. Enable 2-factor authentication on Gmail
2. Generate App Password (not regular password)
3. Use App Password in `EMAIL_PASS` environment variable

### Features
- 📬 **Admin Notifications** - Receive contact form submissions
- 📧 **Auto-Reply** - Users get confirmation emails
- 🔧 **Error Handling** - Graceful email failure handling

---

## 🚀 **Deployment Platforms**

### Supported Platforms
- ✅ **Railway** (Recommended)
- ✅ **Heroku**
- ✅ **Render**
- ✅ **DigitalOcean App Platform**
- ✅ **AWS Elastic Beanstalk**

### Deployment Files Included
- `Procfile` - Heroku configuration
- `railway.json` - Railway configuration
- `DEPLOYMENT.md` - Comprehensive deployment guide

---

## 🔧 **Development**

### Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Seed database with sample data
```

### Project Structure
```
├── middleware/     # Authentication middleware
├── models/         # Database models (6 models)
├── routes/         # API routes (6 route files)
├── scripts/        # Utility scripts
├── seeders/        # Database seeders
└── server.js       # Main server file
```

---

## 📞 **Company Information**

**FirstSketch Concepts**
- 🌐 Website: [Coming Soon]
- 📧 Email: firstskechconcepts@gmail.com
- 📱 Phone: +91-6282570226
- 📍 Address: Beach road, Tanur, Malappuram, Kerala, India

**Social Media**
- [Instagram](https://www.instagram.com/firstsketch_concepts)
- [Facebook](https://www.facebook.com/profile.php?id=100076768826494)
- [YouTube](https://www.youtube.com/@firstsketch_concepts)

---

## 📄 **License**

© 2025 FirstSketch Concepts. All rights reserved.

---

<div align="center">

**Built with ❤️ for FirstSketch Concepts**

[⭐ Star this repo](https://github.com/yourusername/firstsketch-backend) • [🐛 Report Bug](https://github.com/yourusername/firstsketch-backend/issues) • [💡 Request Feature](https://github.com/yourusername/firstsketch-backend/issues)

</div>