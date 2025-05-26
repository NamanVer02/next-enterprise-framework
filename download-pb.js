// Script to download PocketBase directly
const fs = require('fs');
const path = require('path');
const https = require('https');
const { createWriteStream } = require('fs');
const { execSync } = require('child_process');

console.log("Downloading PocketBase for Windows...");

// Direct download URL that handles redirects
const downloadUrl = 'https://pocketbase.io/dl-files/pocketbase_0.28.2_windows_amd64.zip';
const pocketbaseDir = path.join(__dirname, 'test-app-3', 'pocketbase');
const zipFilePath = path.join(pocketbaseDir, 'pocketbase_windows.zip');

// Ensure the directory exists
if (!fs.existsSync(pocketbaseDir)) {
  fs.mkdirSync(pocketbaseDir, { recursive: true });
}

console.log("Downloading from:", downloadUrl);
console.log("Saving zip to:", zipFilePath);

// Function to follow redirects
function downloadWithRedirects(url, filePath, callback) {
  const file = createWriteStream(filePath);
  
  const request = https.get(url, (response) => {
    // If we got a redirect, follow it
    if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
      console.log(`Following redirect to: ${response.headers.location}`);
      downloadWithRedirects(response.headers.location, filePath, callback);
      return;
    }
    
    // If we get an error status code
    if (response.statusCode !== 200) {
      file.close();
      fs.unlink(filePath, () => {});
      callback(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
      return;
    }
    
    // Download the file
    console.log("Download started, please wait...");
    response.pipe(file);
    
    file.on('finish', () => {
      file.close(() => {
        callback(null, filePath);
      });
    });
  });
  
  request.on('error', (err) => {
    fs.unlink(filePath, () => {});
    callback(err);
  });
  
  file.on('error', (err) => {
    fs.unlink(filePath, () => {});
    callback(err);
  });
}

// Start the download
downloadWithRedirects(downloadUrl, zipFilePath, (error, filePath) => {
  if (error) {
    console.error(`Download error: ${error.message}`);
    return;
  }
  
  console.log(`PocketBase zip downloaded to ${filePath}`);
  
  // Extract the zip file using PowerShell
  try {
    console.log("Extracting zip file...");
    const extractCommand = `powershell -command "Expand-Archive -Path '${zipFilePath}' -DestinationPath '${pocketbaseDir}' -Force"`;
    execSync(extractCommand);
    console.log("Extraction completed successfully!");
    
    // Verify extraction
    const pbExePath = path.join(pocketbaseDir, 'pocketbase.exe');
    if (fs.existsSync(pbExePath)) {
      console.log(`PocketBase executable found at ${pbExePath}`);
    } else {
      console.error("PocketBase executable not found after extraction");
    }
  } catch (error) {
    console.error("Error extracting zip file:", error.message);
  }
}); 