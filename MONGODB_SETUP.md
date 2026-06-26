# MongoDB Atlas Setup Guide

## Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose "M0 FREE" tier
4. Select your closest region (e.g., AWS / US East)
5. Create cluster (takes 1-3 minutes)

## Step 2: Set Up Database Access
1. In Atlas dashboard, click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Create a user:
   - Username: `luxestore`
   - Password: Generate a secure password (click "Autogenerate Secure Password")
   - **IMPORTANT**: Copy the password immediately!
4. Database User Privileges: "Read and write to any database"
5. Click "Add User"

## Step 3: Set Up Network Access
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is fine for development, but in production use specific IPs
4. Click "Confirm"

## Step 4: Get Your Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://luxestore:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you generated in Step 2

## Step 5: Update Your .env File
Replace the MongoDB line in your `.env` file with:
```env
MONGODB_URI=mongodb+srv://luxestore:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/luxestore?retryWrites=true&w=majority
```

## Step 6: Restart & Seed
1. Stop the dev server (Ctrl+C)
2. Run: `npm run seed` (this creates the 20 sample products)
3. Run: `npm run dev`
4. Visit: http://localhost:3001

---

## Alternative: Install MongoDB Locally
If you prefer local development:
1. Download: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Keep: `MONGODB_URI=mongodb://localhost:27017/luxestore` in .env

---

Note: The Unsplash image errors might be temporary network issues. The site should still work, images may just load slowly or show broken initially.
