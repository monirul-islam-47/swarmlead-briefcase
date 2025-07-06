# SwarmLead Briefcase - Two-Stage Security Setup

## Overview
This system provides secure, key-based access to your investment documents with these benefits:
- 🔐 Access key authentication (no GitHub knowledge needed)
- 📱 Works on any device with a browser
- 🔄 Always shows latest documents from GitHub
- 📊 Tracks engagement and feedback
- 🚀 Professional, secure experience

## How It Works

1. **Stage 1**: Investor opens `viewer.html` → enters access key → authenticates
2. **Stage 2**: System downloads main app from GitHub → loads documents → enables feedback

## Setup Instructions

### Step 1: Prepare Your GitHub Repository

```bash
# Create folder structure
cd founders-briefcase
mkdir app

# Copy the main app file to app folder
# (app/index.html is already created)

# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial briefcase setup"
git remote add origin https://github.com/YOUR_USERNAME/swarmlead-briefcase.git
git push -u origin main
```

### Step 2: Configure the Viewer

Edit `viewer.html` and update these lines (around line 85):

```javascript
const CONFIG = {
    // Your GitHub username and repo
    githubOwner: 'YOUR_GITHUB_USERNAME',  // <- CHANGE THIS
    githubRepo: 'swarmlead-briefcase',    // <- CHANGE THIS IF DIFFERENT
    
    // Path to the main app HTML in your repo
    mainAppPath: 'app/index.html',
    
    // Access keys (customize these)
    validKeys: {
        'INVESTOR2025': {
            name: 'General Investor Access',
            githubToken: '',  // Leave empty for public repo
            expires: '2025-03-01'
        },
        'VIP2025': {
            name: 'VIP Investor Access',
            githubToken: '',  // Leave empty for public repo
            expires: '2025-06-01'
        }
    }
};
```

### Step 3: Choose Your Setup

#### Option A: Public Repository (Simplest)
- No GitHub token needed
- Documents are public but need key to access viewer
- Feedback stored locally only

#### Option B: Private Repository (Most Secure)
1. Make your GitHub repo private
2. Create a Personal Access Token:
   - Go to https://github.com/settings/tokens/new
   - Select `repo` scope
   - Generate token
3. Add token to each access key in CONFIG

### Step 4: Create Access Keys

Customize the access keys in `viewer.html`:

```javascript
validKeys: {
    'ALPHA2025': {
        name: 'Alpha Investors',
        githubToken: 'ghp_xxxxxxxxxxxx',  // Only for private repos
        expires: '2025-02-01'
    },
    'BETA2025': {
        name: 'Beta Round',
        githubToken: 'ghp_yyyyyyyyyyyy',
        expires: '2025-04-01'
    },
    'ADVISOR2025': {
        name: 'Advisory Board',
        githubToken: 'ghp_zzzzzzzzzzzz',
        expires: '2025-12-31'
    }
}
```

### Step 5: Share with Investors

**What to send:**
1. The `viewer.html` file only
2. Their unique access key
3. Simple instructions

**Email template:**
```
Subject: SwarmLead Investment Documents - Secure Access

Hi [Name],

Please find attached our investment briefcase viewer. To access:

1. Save and open the attached HTML file in your browser
2. Enter this access key: ALPHA2025
3. Enter your name (for feedback tracking)
4. Click "Access Documents"

The system will securely load all documents and allow you to provide feedback.

Your access expires on: March 1, 2025

Best regards,
[Your name]

Attachment: SwarmLead-Viewer.html
```

## Features for Investors

- ✅ No installation required
- ✅ Works on any device
- ✅ Always see latest documents
- ✅ Submit feedback easily
- ✅ Download their analytics
- ✅ Print any document

## Features for You

- ✅ Control access with keys
- ✅ Set expiration dates
- ✅ Track who views what
- ✅ Collect structured feedback
- ✅ Update documents anytime
- ✅ Revoke access instantly

## Security Benefits

1. **No Direct GitHub Access**: Investors never see your GitHub
2. **Time-Limited Keys**: Auto-expire after your round
3. **Minimal Attack Surface**: Only one HTML file shared
4. **No Permanent Storage**: Keys only in session
5. **Audit Trail**: Track all access and feedback

## Advanced Options

### Custom Branding
Edit the CSS in `viewer.html` to match your brand:
- Colors: Change `#667eea` to your brand color
- Logo: Add your logo to the auth screen
- Fonts: Update font-family

### Enhanced Analytics
The main app tracks:
- Document views
- Time spent per document  
- Feedback submitted
- Download analytics as JSON

### Feedback Options
Currently stores locally. Can enhance to:
- Email feedback to you
- Post to Slack webhook
- Create GitHub issues (with token)
- Send to your CRM

## Troubleshooting

**"Invalid access key"**
- Check key spelling
- Verify not expired
- Ensure CONFIG is updated

**"Failed to load documents"**
- Check GitHub username/repo
- Verify repo is public OR token is valid
- Check file paths match

**Documents not updating**
- Clear browser cache
- Check files are pushed to GitHub
- Verify on correct branch (main)

## Next Steps

1. **Test locally** with your own key
2. **Push to GitHub** and test full flow
3. **Create investor keys** with appropriate expiry
4. **Send to one investor** as pilot
5. **Roll out to all** after confirmation

---

This approach gives you maximum security and control while keeping it simple for investors!