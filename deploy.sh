#!/bin/bash

# FirstSketch Backend Deployment Script

echo "🚀 Starting FirstSketch Backend Deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: FirstSketch Concepts Backend API"
fi

echo "🔧 Choose deployment platform:"
echo "1) Railway (Recommended)"
echo "2) Heroku"
echo "3) Manual setup only"

read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "🚂 Setting up Railway deployment..."
        
        # Check if Railway CLI is installed
        if ! command -v railway &> /dev/null; then
            echo "📦 Installing Railway CLI..."
            npm install -g @railway/cli
        fi
        
        echo "🔐 Please login to Railway..."
        railway login
        
        echo "🏗️ Creating Railway project..."
        railway init
        
        echo "⚙️ Setting environment variables..."
        echo "Please set these variables in Railway dashboard:"
        echo "- MONGODB_URI=your_mongodb_atlas_uri"
        echo "- JWT_SECRET=your_jwt_secret"
        echo "- EMAIL_USER=your_email@gmail.com"
        echo "- EMAIL_PASS=your_app_password"
        echo "- ADMIN_EMAIL=firstskechconcepts@gmail.com"
        echo "- NODE_ENV=production"
        echo "- CORS_ORIGIN=https://your-frontend-domain.com"
        
        read -p "Press Enter after setting environment variables..."
        
        echo "🚀 Deploying to Railway..."
        railway up
        ;;
        
    2)
        echo "🟣 Setting up Heroku deployment..."
        
        # Check if Heroku CLI is installed
        if ! command -v heroku &> /dev/null; then
            echo "❌ Heroku CLI not found. Please install it first:"
            echo "https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        echo "🔐 Please login to Heroku..."
        heroku login
        
        echo "🏗️ Creating Heroku app..."
        read -p "Enter app name (e.g., firstsketch-api): " app_name
        heroku create $app_name
        
        echo "⚙️ Setting environment variables..."
        echo "Please provide the following:"
        
        read -p "MongoDB URI: " mongodb_uri
        read -p "JWT Secret: " jwt_secret
        read -p "Email User: " email_user
        read -p "Email Password: " email_pass
        read -p "Frontend Domain (for CORS): " cors_origin
        
        heroku config:set MONGODB_URI="$mongodb_uri"
        heroku config:set JWT_SECRET="$jwt_secret"
        heroku config:set EMAIL_USER="$email_user"
        heroku config:set EMAIL_PASS="$email_pass"
        heroku config:set ADMIN_EMAIL="firstskechconcepts@gmail.com"
        heroku config:set NODE_ENV="production"
        heroku config:set CORS_ORIGIN="$cors_origin"
        heroku config:set ADMIN_TOKEN="admin123"
        
        echo "🚀 Deploying to Heroku..."
        git add .
        git commit -m "Deploy to Heroku"
        git push heroku main
        ;;
        
    3)
        echo "📋 Manual setup instructions:"
        echo ""
        echo "1. Create a MongoDB Atlas cluster"
        echo "2. Set up environment variables on your hosting platform"
        echo "3. Deploy the code to your chosen platform"
        echo "4. Run 'npm run seed' to populate the database"
        echo ""
        echo "Required environment variables:"
        cat .env.example
        ;;
        
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo "✅ Deployment setup complete!"
echo "🔗 Don't forget to:"
echo "   1. Update CORS_ORIGIN with your actual frontend domain"
echo "   2. Run database seeding: npm run seed"
echo "   3. Test the health endpoint: /api/health"