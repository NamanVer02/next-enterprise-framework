# Quick PocketBase Setup for Car Dashboard

## 🎯 Goal

Set up PocketBase collections and sample data to make your dashboard pull content from the CMS.

## 📋 Step-by-Step Setup

### 1. Access PocketBase Admin

1. Open your browser and go to: **http://127.0.0.1:8090/_/**
2. If this is your first time, create an admin account (email + password)
3. If you already have an account, log in

### 2. Create Collections

Create these 5 collections in order:

#### Collection 1: `car_models`

1. Click "Collections" → "New collection"
2. Name: `car_models`
3. Type: `Base`
4. Add these fields:
   - `name` (Text, Required)
   - `tagline` (Text, Required)
   - `description` (Text, Required)
   - `hero_image` (File, Optional, Max files: 1)
   - `badge_text` (Text, Optional)
5. Click "Create"

#### Collection 2: `car_features`

1. Click "New collection"
2. Name: `car_features`
3. Type: `Base`
4. Add these fields:
   - `title` (Text, Required)
   - `description` (Text, Required)
   - `value` (Text, Required)
   - `icon` (Text, Required)
5. Click "Create"

#### Collection 3: `car_specifications`

1. Click "New collection"
2. Name: `car_specifications`
3. Type: `Base`
4. Add these fields:
   - `label` (Text, Required)
   - `value` (Text, Required)
5. Click "Create"

#### Collection 4: `gallery_images`

1. Click "New collection"
2. Name: `gallery_images`
3. Type: `Base`
4. Add these fields:
   - `title` (Text, Required)
   - `image` (File, Optional, Max files: 1)
   - `alt_text` (Text, Optional)
5. Click "Create"

#### Collection 5: `cta_sections`

1. Click "New collection"
2. Name: `cta_sections`
3. Type: `Base`
4. Add these fields:
   - `title` (Text, Required)
   - `description` (Text, Required)
   - `primary_button_text` (Text, Required)
   - `primary_button_link` (Text, Required)
   - `secondary_button_text` (Text, Required)
   - `secondary_button_link` (Text, Required)
5. Click "Create"

### 3. Add Sample Data

#### Add Car Model Data

1. Go to `car_models` collection
2. Click "New record"
3. Fill in:
   - **name**: `Tesla Model S Plaid`
   - **tagline**: `The quickest accelerating sedan ever built. Beyond Ludicrous.`
   - **description**: `Experience the future of automotive engineering with cutting-edge technology`
   - **badge_text**: `New Launch 2024`
4. Click "Create"

#### Add Car Features (create 4 records)

1. Go to `car_features` collection
2. Create Record 1:
   - **title**: `Electric Performance`
   - **description**: `0-60 mph in 3.2 seconds with instant torque delivery`
   - **value**: `3.2s`
   - **icon**: `⚡`
3. Create Record 2:
   - **title**: `Range`
   - **description**: `Up to 400 miles on a single charge`
   - **value**: `400mi`
   - **icon**: `🔋`
4. Create Record 3:
   - **title**: `Charging Speed`
   - **description**: `10-80% charge in just 18 minutes`
   - **value**: `18min`
   - **icon**: `⚡`
5. Create Record 4:
   - **title**: `Top Speed`
   - **description**: `Maximum speed of 180 mph`
   - **value**: `180mph`
   - **icon**: `🏎️`

#### Add Car Specifications (create 6 records)

1. Go to `car_specifications` collection
2. Create these records:
   - **label**: `Motor`, **value**: `Dual Motor AWD`
   - **label**: `Power`, **value**: `670 HP`
   - **label**: `Torque`, **value**: `650 lb-ft`
   - **label**: `Battery`, **value**: `100 kWh`
   - **label**: `Drivetrain`, **value**: `All-Wheel Drive`
   - **label**: `Seating`, **value**: `5 Adults`

#### Add Gallery Images (create 4 records)

1. Go to `gallery_images` collection
2. Create these records:
   - **title**: `Front View`, **alt_text**: `Tesla Model S Plaid front view`
   - **title**: `Side View`, **alt_text**: `Tesla Model S Plaid side profile`
   - **title**: `Interior`, **alt_text**: `Tesla Model S Plaid interior dashboard`
   - **title**: `Rear View`, **alt_text**: `Tesla Model S Plaid rear view`

#### Add CTA Section Data

1. Go to `cta_sections` collection
2. Click "New record"
3. Fill in:
   - **title**: `Ready to Experience the Future?`
   - **description**: `Join the electric revolution and be part of sustainable mobility`
   - **primary_button_text**: `Order Now`
   - **primary_button_link**: `/order`
   - **secondary_button_text**: `Learn More`
   - **secondary_button_link**: `/learn-more`
4. Click "Create"

### 4. Test Your Dashboard

1. Visit: **http://localhost:3000/dashboard**
2. You should now see content loaded from PocketBase!
3. The dashboard will show your car model, features, specs, gallery, and CTA

### 5. Verify Data is Coming from PocketBase

1. Go back to PocketBase admin
2. Edit any field (like changing the car name to "Tesla Model S Plaid Updated")
3. Refresh your dashboard page
4. You should see the changes immediately!

## 🎉 You're Done!

Your dashboard is now powered by PocketBase CMS. You can:

- Edit content through the PocketBase admin interface
- Add more car models, features, or specifications
- Upload images for the hero section and gallery
- Manage all content without touching code

## 🔧 Troubleshooting

- **Collections not showing up?** Make sure PocketBase is running at http://127.0.0.1:8090
- **Dashboard still showing static data?** Check the browser console for API errors
- **Can't access admin?** Make sure you created an admin account first

## 📝 Next Steps

- Try uploading images for the hero section and gallery
- Add more car features or specifications
- Customize the content to match your needs
