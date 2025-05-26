#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('PocketBase Setup Helper');
console.log('======================');

// Check if PocketBase is running
function checkPocketBaseRunning() {
  return new Promise((resolve) => {
    const http = require('http');
    const options = {
      hostname: '127.0.0.1',
      port: 8090,
      path: '/',
      method: 'GET',
      timeout: 2000,
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Start PocketBase if not running
async function startPocketBase() {
  console.log('Checking if PocketBase is running...');
  
  const isRunning = await checkPocketBaseRunning();
  
  if (isRunning) {
    console.log('PocketBase is already running.');
    return true;
  }
  
  console.log('PocketBase is not running. Attempting to start...');
  
  const platform = process.platform;
  const pocketbasePath = path.join(process.cwd(), 'pocketbase');
  
  try {
    let command;
    
    if (platform === 'win32') {
      // Windows
      command = `start cmd /c "${path.join(pocketbasePath, 'pocketbase.exe')}" serve`;
    } else {
      // macOS/Linux
      command = `${path.join(pocketbasePath, 'pocketbase')} serve &`;
    }
    
    execSync(command, { stdio: 'ignore' });
    
    // Wait for PocketBase to start
    console.log('Waiting for PocketBase to start...');
    
    let attempts = 0;
    while (attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const running = await checkPocketBaseRunning();
      if (running) {
        console.log('PocketBase started successfully!');
        return true;
      }
      attempts++;
    }
    
    console.error('Failed to start PocketBase. Please start it manually and try again.');
    return false;
  } catch (error) {
    console.error('Failed to start PocketBase:', error.message);
    console.log('Please start PocketBase manually:');
    console.log('- Windows: pocketbase\\pocketbase.exe serve');
    console.log('- macOS/Linux: ./pocketbase/pocketbase serve');
    return false;
  }
}

// Create collections in PocketBase
async function createCollections() {
  console.log('Creating collections in PocketBase...');
  
  // Read the schema file
  const schemaPath = path.join(process.cwd(), 'pocketbase', 'pb_schema.json');
  
  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found: ${schemaPath}`);
    return false;
  }
  
  try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
    console.log('Schema loaded successfully.');
    console.log(`Found ${schema.collections.length} collections to create.`);
    
    console.log('');
    console.log('Please complete the following steps manually:');
    console.log('1. Open the PocketBase Admin UI at http://127.0.0.1:8090/_/');
    console.log('2. Create an admin account if you haven\'t already');
    console.log('3. Go to Settings > Import Collections');
    console.log(`4. Upload the schema file from: ${schemaPath}`);
    console.log('5. Click Import to create the collections');
    console.log('');
    console.log('After importing, create at least one car model record with:');
    console.log('- name: The Atlas (or any name you prefer)');
    console.log('- tagline: Experience the perfect fusion of luxury and performance');
    console.log('- description: A detailed description of the car model');
    console.log('- badge_text: New Launch (optional)');
    console.log('- hero_image: Upload an image (optional)');
    
    return true;
  } catch (error) {
    console.error('Failed to read or parse schema file:', error.message);
    return false;
  }
}

// Main function
async function main() {
  try {
    const pbRunning = await startPocketBase();
    
    if (!pbRunning) {
      console.log('');
      console.log('Please start PocketBase manually and run this script again.');
      process.exit(1);
    }
    
    await createCollections();
    
    console.log('');
    console.log('Setup instructions displayed. After completing these steps, your dashboard will be connected to PocketBase.');
    console.log('Visit http://localhost:3000/dashboard to see your car model data.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

// Run the main function
main(); 