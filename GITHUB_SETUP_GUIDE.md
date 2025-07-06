# GitHub Private Repo Setup Guide for SwarmLead Briefcase

## Step 1: Create Private GitHub Repository

1. Go to https://github.com/new
2. Repository name: `swarmlead-briefcase` (or your preference)
3. Select **Private**
4. Don't initialize with README (we have our own files)
5. Click "Create repository"

## Step 2: Push Your Briefcase to GitHub

```bash
# Navigate to your briefcase folder
cd /home/gluttony47/projects/mama-marketing/SwarmLead/founders-briefcase

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial SwarmLead founder's briefcase"

# Add your remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/swarmlead-briefcase.git

# Push to GitHub
git push -u origin main
```

## Step 3: Create Personal Access Tokens

### For Yourself (Full Access):
1. Go to https://github.com/settings/tokens/new
2. Note: `SwarmLead Briefcase Admin`
3. Expiration: 90 days (or your preference)
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **SAVE THIS TOKEN** (you won't see it again)

### For Investors (Limited Access):
1. Create another token at https://github.com/settings/tokens/new
2. Note: `SwarmLead Investor Access`
3. Expiration: 30 days
4. Select scopes:
   - ✅ `repo` (needed for private repos)
   - OR use Fine-grained tokens for more control
5. Generate and save

## Step 4: Configure the HTML File

Edit `index-github.html` to pre-fill your repo details:

```javascript
// Around line 384, update the githubConfig defaults:
let githubConfig = {
    owner: 'YOUR_GITHUB_USERNAME',     // <- Add your username
    repo: 'swarmlead-briefcase',       // <- Add your repo name
    token: '',                         // Leave empty (investors will add)
    reviewer: ''                       // Leave empty (investors will add)
};
```

Also update the setup modal to show pre-filled values:

```html
<!-- Around line 286, update the input values -->
<input type="text" id="githubOwner" placeholder="GitHub username or org" value="YOUR_GITHUB_USERNAME">
<input type="text" id="githubRepo" placeholder="Repository name" value="swarmlead-briefcase">
```

## Step 5: Create Labels for Feedback

In your GitHub repo:
1. Go to Issues → Labels
2. Create these labels:
   - `feedback` (color: #0E8A16)
   - `investor-review` (color: #5319E7)
   - `executive-summary` (color: #1D76DB)
   - `technical` (color: #F9D0C4)
   - `business-plan` (color: #FEF2C0)

## Step 6: Share with Investors

### What to Send:

**Email Template:**
```
Subject: SwarmLead Investment Briefcase - Private Access

Hi [Investor Name],

I'm sharing our investment briefcase using a secure GitHub-based system. This allows you to:
- Always see the latest version of our documents
- Submit feedback that I'll receive immediately
- Track all conversations in one place

To access:
1. Open the attached HTML file in your browser
2. Use this access token: [INVESTOR_TOKEN]
3. Enter your name for feedback attribution

The system will automatically load all documents from our private repository.

Best regards,
[Your name]

Attachment: SwarmLead-Briefcase-Viewer.html
```

### Security Best Practices:
1. **Different tokens per investor** (optional but recommended)
2. **Set token expiration** (30-60 days)
3. **Revoke tokens** after funding round closes
4. **Monitor repo access** via GitHub insights

## Step 7: Managing Feedback

### Investor feedback appears as GitHub issues:
- Each comment creates an issue
- Labeled with `feedback` and `investor-review`
- Contains: document name, reviewer name, timestamp

### Your workflow:
1. **Receive notification** when new issue created
2. **Respond** directly in GitHub issue
3. **Update documents** based on feedback
4. **Close issues** when addressed

### Track engagement:
```bash
# See all feedback issues
https://github.com/YOUR_USERNAME/swarmlead-briefcase/issues?q=label:feedback

# See who's been active
https://github.com/YOUR_USERNAME/swarmlead-briefcase/pulse
```

## Optional: Enhanced Security

### Use Fine-grained Personal Access Tokens:
1. Go to https://github.com/settings/tokens?type=beta
2. Create token with:
   - Repository access: Only `swarmlead-briefcase`
   - Permissions:
     - Contents: Read
     - Issues: Write
     - Metadata: Read
3. This limits investor access to ONLY your briefcase repo

### Add IP Restrictions (Enterprise only):
- Limit access to specific IP addresses
- Useful for very sensitive documents

## Troubleshooting

### "Failed to connect to repository"
- Check token has `repo` scope
- Verify repo name and owner are correct
- Ensure investor has token in password field

### "Failed to create issue"  
- Token needs `repo` scope for private repos
- Check token hasn't expired
- Verify labels exist in repo

### Documents not loading
- Check file paths match exactly
- Ensure files are committed and pushed
- Verify branch name (main vs master)

## Next Steps

1. **Test the system yourself** with your admin token
2. **Create a test issue** to see the workflow
3. **Share with one friendly investor** first
4. **Refine based on feedback**
5. **Roll out to all investors**

---

## Quick Reference

**Your Repo:** https://github.com/YOUR_USERNAME/swarmlead-briefcase
**Issues:** https://github.com/YOUR_USERNAME/swarmlead-briefcase/issues
**Settings:** https://github.com/YOUR_USERNAME/swarmlead-briefcase/settings

**Token Scopes Needed:**
- Read documents: `repo` (for private repos)
- Submit feedback: `repo` (includes issue creation)

**Files to Share:**
- `index-github.html` (the viewer)
- Access token (keep secure)
- Instructions (this guide)