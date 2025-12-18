# FirstSketch Concepts - Full Stack Website

A modern, full-stack website for FirstSketch Concepts, an architecture and interior design company based in Kerala, India. Built with React frontend and Node.js backend.

![FirstSketch Concepts](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80)

## 🏗️ Project Structure

```
firstsketch-concepts/
├── client/                 # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── hooks/          # Custom React hooks
│   └── package.json
├── server/                 # Node.js backend (Express + MongoDB)
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── seeders/            # Database seeders
│   └── package.json
└── README.md
```

## ✨ Features

### 🎨 Frontend
- **Modern Design**: Clean, minimalist beige color scheme
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Dynamic Content**: All content loaded from backend APIs
- **Hero Slideshow**: Rotating image carousel on home page
- **Services Showcase**: Tabbed interface with project galleries
- **Contact System**: Integrated contact form with validation
- **Admin Panel**: Content management interface
- **Smooth Animations**: Scroll animations and transitions

### ⚙️ Backend
- **RESTful API**: Complete REST API with 25+ endpoints
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based admin authentication
- **Email System**: Contact form notifications via Gmail SMTP
- **Content Management**: CRUD operations for all content
- **Security**: Rate limiting, input validation, CORS protection
- **File Structure**: Modular, scalable architecture

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Gmail account (for email notifications)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/firstsketch-concepts.git
cd firstsketch-concepts
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
node seeders/seedData.js    # Seed database
npm run dev                 # Start backend server
```

### 3. Frontend Setup
```bash
cd client
npm install
cp .env.example .env        # Configure API URL
npm run dev                 # Start frontend server
```

### 4. Access Application
- **Website**: http://localhost:5174
- **API**: http://localhost:5000
- **Admin**: http://localhost:5174/admin
- **Health Check**: http://localhost:5000/api/health

## 📱 Pages

- **🏠 Home** - Hero slideshow, services overview, company statistics
- **🏢 Services** - Architecture, Interior Design, Planning, Construction
- **📞 Contact** - Contact form, business info, location map
- **ℹ️ About** - Company story, values, team statistics
- **👨‍💼 Admin** - Contact management, content administration

## 🔧 API Endpoints

### Public APIs
```
GET  /api/health              # Server health check
GET  /api/home                # Home page data
GET  /api/services            # All services
GET  /api/projects            # Portfolio projects
GET  /api/company             # Company information
POST /api/contact             # Submit contact form
```

### Admin APIs (JWT Protected)
```
POST /api/admin/login         # Admin authentication
GET  /api/admin/contacts      # Contact submissions
PUT  /api/admin/contacts/:id  # Update contact status
CRUD /api/admin/hero-images   # Manage slideshow
CRUD /api/admin/services      # Manage services
CRUD /api/admin/projects      # Manage projects
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Helmet** - Security middleware

## 🔒 Security Features

- **JWT Authentication** - Secure admin access
- **Rate Limiting** - Prevents spam and abuse
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin security
- **Security Headers** - Helmet.js protection
- **Environment Variables** - Secure configuration

## 📧 Email Configuration

Set up Gmail SMTP for contact form notifications:

1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Configure in `.env`:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=firstskechconcepts@gmail.com
```

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secure_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CORS_ORIGIN=https://yourdomain.com
```

### Frontend Deployment (Vercel/Netlify)
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_NODE_ENV=production
```

## 👨‍💼 Admin Access

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

**Features:**
- View contact submissions
- Update contact status
- Manage website content
- Monitor form analytics

## 📞 Company Information

**FirstSketch Concepts**
- 📧 Email: firstskechconcepts@gmail.com
- 📱 Phone: +91-6282570226
- 📍 Address: Beach road, Tanur, Malappuram, Kerala, India

**Social Media:**
- [Instagram](https://www.instagram.com/firstsketch_concepts)
- [Facebook](https://www.facebook.com/profile.php?id=100076768826494)
- [YouTube](https://www.youtube.com/@firstsketch_concepts)

## 🤝 Contributing

This is a proprietary project for FirstSketch Concepts. For any inquiries or support, please contact the development team.

## 📄 License

© 2025 FirstSketch Concepts. All rights reserved.

---

**Built with ❤️ for FirstSketch Concepts**