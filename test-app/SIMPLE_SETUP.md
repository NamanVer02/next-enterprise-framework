# Simple Car Dashboard Setup

## 🎯 Goal

Set up only the `car_models` table in PocketBase to make your dashboard hero section CMS-driven.

## 📋 Quick Setup (5 minutes)

### 1. Access PocketBase Admin

- Open: **http://127.0.0.1:8090/_/**
- Create admin account if first time, or log in

### 2. Create car_models Collection

1. Click **"Collections"** → **"New collection"**
2. **Name**: `car_models`
3. **Type**: `Base`
4. Add these **5 fields**:
   - `name` (Text, Required) - Car model name
   - `tagline` (Text, Required) - Hero tagline
   - `description` (Text, Required) - Description text
   - `hero_image` (File, Optional) - Hero section image
   - `badge_text` (Text, Optional) - Badge text like "New Launch 2024"
5. Click **"Create"**

### 3. Configure Collection Permissions (IMPORTANT)

1. Go to `car_models` collection
2. Click on the **"API Rules"** tab
3. Under **"List rule"**, select **"Public (no auth required)"**
4. Under **"View rule"**, select **"Public (no auth required)"**
5. Under **"Files access"**, select **"Public (no auth required)"** for both view and download
6. Click **"Save"**

### 4. Add Sample Data

1. Go to `car_models` collection
2. Click **"New record"**
3. Fill in:
   - **name**: `Tesla Model S Plaid`
   - **tagline**: `The quickest accelerating sedan ever built. Beyond Ludicrous.`
   - **description**: `Experience the future of automotive engineering with cutting-edge technology`
   - **badge_text**: `New Launch 2024`
   - **hero_image**: Upload an image of a car (JPEG or PNG format)
4. Click **"Create"**

### 5. Test Your Dashboard

1. Visit: **http://localhost:3000/dashboard**
2. The hero section should now show your CMS data!
3. The rest of the page (features, specs, gallery, CTA) is hardcoded

### 6. Verify CMS Integration

- **Test API**: http://localhost:3000/api/test-pocketbase
- Should show: `"Car model data found in PocketBase!"`
- **Edit the record** in PocketBase admin and refresh your dashboard to see changes

## ✅ What's Working

- **Hero Section**: Fully CMS-driven from `car_models` table
- **Performance Stats**: Hardcoded (uses description from CMS)
- **Specifications**: Hardcoded
- **Gallery**: Hardcoded
- **CTA Section**: Hardcoded

## 🎨 Customization

- **Change car details**: Edit the record in PocketBase
- **Upload hero image**: Add to the `hero_image` field
- **Multiple cars**: Add more records (dashboard shows the first one)
- **Modify hardcoded sections**: Edit `src/app/dashboard/page.tsx`

## 🔧 Troubleshooting

- **Static data showing?** Check if PocketBase is running and collection exists
- **Permission errors?** Make sure you've set the collection to "Public" access as described in step 3
- **Image not showing?** Ensure file permissions are set to public and the image was uploaded correctly
- **No changes?** Clear browser cache or check browser console for errors
- **API errors?** Verify PocketBase is accessible at http://127.0.0.1:8090

Your dashboard is now CMS-powered for the hero section! 🚗✨
