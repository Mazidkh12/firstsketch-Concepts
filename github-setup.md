# 🔗 GitHub Repository Setup

## Commands to Run (after creating GitHub repository)

```bash
# Make sure you're in the server directory
cd server

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/firstsketch-backend.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create repository directly from command line
gh repo create firstsketch-backend --public --description "Backend API for FirstSketch Concepts"

# Push code
git push -u origin main
```

## Repository Settings (After Push)

### 1. Add Repository Description
- Go to your repository on GitHub
- Click "Edit" next to About section
- Add: "Backend API for FirstSketch Concepts - Architecture & Interior Design Company"
- Add topics: `nodejs`, `express`, `mongodb`, `api`, `architecture`, `interior-design`

### 2. Set Up Branch Protection (Optional)
- Go to Settings > Branches
- Add rule for `main` branch
- Enable "Require pull request reviews before merging"

### 3. Add Repository Secrets (for CI/CD later)
- Go to Settings > Secrets and variables > Actions
- Add secrets for deployment:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `EMAIL_USER`
  - `EMAIL_PASS`

## 🚀 Ready for Deployment

After pushing to GitHub, you can:

1. **Deploy to Railway**: Connect GitHub repository
2. **Deploy to Heroku**: Connect GitHub repository  
3. **Deploy to Render**: Connect GitHub repository

All platforms can auto-deploy from GitHub on every push!