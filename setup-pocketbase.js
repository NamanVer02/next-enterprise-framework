import fetch from 'node-fetch';

// PocketBase URL
const PB_URL = 'http://127.0.0.1:8090';

// Function to create a collection
async function createCollection(name, schema) {
  try {
    const response = await fetch(`${PB_URL}/api/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        type: 'base',
        schema: schema
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`Failed to create collection ${name}:`, error);
      return false;
    }

    console.log(`✅ Created collection: ${name}`);
    return true;
  } catch (error) {
    console.error(`Error creating collection ${name}:`, error.message);
    return false;
  }
}

// Function to create a record
async function createRecord(collection, data) {
  try {
    const response = await fetch(`${PB_URL}/api/collections/${collection}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`Failed to create record in ${collection}:`, error);
      return false;
    }

    console.log(`✅ Created record in ${collection}`);
    return true;
  } catch (error) {
    console.error(`Error creating record in ${collection}:`, error.message);
    return false;
  }
}

// Create all collections
async function setupCollections() {
  // Car Models collection
  const carModelsSchema = [
    { name: 'name', type: 'text', required: true },
    { name: 'tagline', type: 'text', required: true },
    { name: 'description', type: 'text', required: true },
    { name: 'hero_image', type: 'file', required: false },
    { name: 'badge_text', type: 'text', required: false }
  ];
  await createCollection('car_models', carModelsSchema);

  // Car Features collection
  const carFeaturesSchema = [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'icon', type: 'text', required: true }
  ];
  await createCollection('car_features', carFeaturesSchema);

  // Car Specifications collection
  const carSpecificationsSchema = [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'text', required: true }
  ];
  await createCollection('car_specifications', carSpecificationsSchema);

  // Gallery Images collection
  const galleryImagesSchema = [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'file', required: false },
    { name: 'alt_text', type: 'text', required: false }
  ];
  await createCollection('gallery_images', galleryImagesSchema);

  // CTA Sections collection
  const ctaSectionsSchema = [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'text', required: true },
    { name: 'primary_button_text', type: 'text', required: true },
    { name: 'primary_button_link', type: 'text', required: true },
    { name: 'secondary_button_text', type: 'text', required: true },
    { name: 'secondary_button_link', type: 'text', required: true }
  ];
  await createCollection('cta_sections', ctaSectionsSchema);
}

// Create sample data
async function createSampleData() {
  // Car model data
  const carModelData = {
    name: 'Tesla Model S Plaid',
    tagline: 'The quickest accelerating sedan ever built. Beyond Ludicrous.',
    description: 'Experience the future of automotive engineering with cutting-edge technology',
    badge_text: 'New Launch 2024'
  };
  await createRecord('car_models', carModelData);

  // Car features data
  const carFeaturesData = [
    {
      title: 'Electric Performance',
      description: '0-60 mph in 3.2 seconds with instant torque delivery',
      value: '3.2s',
      icon: '⚡'
    },
    {
      title: 'Range',
      description: 'Up to 400 miles on a single charge',
      value: '400mi',
      icon: '🔋'
    },
    {
      title: 'Charging Speed',
      description: '10-80% charge in just 18 minutes',
      value: '18min',
      icon: '⚡'
    },
    {
      title: 'Top Speed',
      description: 'Maximum speed of 180 mph',
      value: '180mph',
      icon: '🏎️'
    }
  ];
  
  for (const feature of carFeaturesData) {
    await createRecord('car_features', feature);
  }

  // Car specifications data
  const specificationsData = [
    { label: 'Motor', value: 'Dual Motor AWD' },
    { label: 'Power', value: '670 HP' },
    { label: 'Torque', value: '650 lb-ft' },
    { label: 'Battery', value: '100 kWh' },
    { label: 'Drivetrain', value: 'All-Wheel Drive' },
    { label: 'Seating', value: '5 Adults' }
  ];
  
  for (const spec of specificationsData) {
    await createRecord('car_specifications', spec);
  }

  // Gallery data
  const galleryData = [
    { title: 'Front View', alt_text: 'Tesla Model S Plaid front view' },
    { title: 'Side View', alt_text: 'Tesla Model S Plaid side profile' },
    { title: 'Interior', alt_text: 'Tesla Model S Plaid interior dashboard' },
    { title: 'Rear View', alt_text: 'Tesla Model S Plaid rear view' }
  ];
  
  for (const gallery of galleryData) {
    await createRecord('gallery_images', gallery);
  }

  // CTA section data
  const ctaData = {
    title: 'Ready to Experience the Future?',
    description: 'Join the electric revolution and be part of sustainable mobility',
    primary_button_text: 'Order Now',
    primary_button_link: '/order',
    secondary_button_text: 'Learn More',
    secondary_button_link: '/learn-more'
  };
  await createRecord('cta_sections', ctaData);
}

// Main function
async function main() {
  console.log('🚀 Setting up PocketBase collections and sample data...');
  
  try {
    // First check if PocketBase is running
    const response = await fetch(`${PB_URL}/api/health`);
    if (!response.ok) {
      console.error('❌ PocketBase is not running or not accessible');
      console.error('Please start PocketBase first with: cd pocketbase-server && pocketbase.exe serve --http="0.0.0.0:8090" --dev');
      return;
    }
    
    console.log('✅ PocketBase is running');
    
    // Setup collections
    await setupCollections();
    
    // Create sample data
    await createSampleData();
    
    console.log('🎉 Setup completed successfully!');
    console.log('Visit http://127.0.0.1:8090/_/ to access the PocketBase admin UI');
    console.log('Visit http://localhost:3000 to view your application');
    
  } catch (error) {
    console.error('❌ Error setting up PocketBase:', error.message);
  }
}

// Run the main function
main(); 