// Simple script to download PocketBase executable directly
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure the directory exists
const pocketbaseDir = path.join(__dirname, 'test-app-3', 'pocketbase');
if (!fs.existsSync(pocketbaseDir)) {
  fs.mkdirSync(pocketbaseDir, { recursive: true });
}

// Use PowerShell to download
console.log("Downloading PocketBase using PowerShell...");
try {
  const zipFilePath = path.join(pocketbaseDir, 'pocketbase_windows.zip');
  const downloadUrl = 'https://github.com/pocketbase/pocketbase/releases/download/v0.28.2/pocketbase_0.28.2_windows_amd64.zip';
  
  // Simple PowerShell command to download
  const downloadCmd = `powershell -Command "Invoke-WebRequest -Uri '${downloadUrl}' -OutFile '${zipFilePath}' -UseBasicParsing"`;
  
  console.log("Executing download command...");
  console.log(downloadCmd);
  execSync(downloadCmd, { stdio: 'inherit' });
  
  // Now extract the zip file
  if (fs.existsSync(zipFilePath) && fs.statSync(zipFilePath).size > 0) {
    console.log("Download successful! Extracting zip file...");
    
    const extractCommand = `powershell -Command "Expand-Archive -Path '${zipFilePath}' -DestinationPath '${pocketbaseDir}' -Force"`;
    execSync(extractCommand, { stdio: 'inherit' });
    
    console.log("Extraction completed!");
    
    // Verify extraction
    const pbExePath = path.join(pocketbaseDir, 'pocketbase.exe');
    if (fs.existsSync(pbExePath)) {
      console.log(`PocketBase executable found at ${pbExePath}`);
      
      // Make it executable
      try {
        fs.chmodSync(pbExePath, 0o755);
        console.log("Made executable file accessible.");
      } catch (error) {
        console.error("Warning: Could not change file permissions:", error.message);
      }
    } else {
      console.error("PocketBase executable not found after extraction");
    }
  } else {
    console.error("Download failed or file is empty");
  }
} catch (error) {
  console.error("Error:", error.message);
} 