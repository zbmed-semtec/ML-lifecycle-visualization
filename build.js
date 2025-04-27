import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Log with color
const log = (message, color = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

try {
  // Step 1: Cleanup previous builds
  log('🧹 Cleaning up previous builds...', colors.yellow);
  if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
    fs.rmSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true });
  }
  if (fs.existsSync(path.resolve(__dirname, 'types'))) {
    fs.rmSync(path.resolve(__dirname, 'types'), { recursive: true, force: true });
  }
  
  // Step 2: Ensure directories exist
  ensureDir(path.resolve(__dirname, 'dist'));
  ensureDir(path.resolve(__dirname, 'types'));
  
  // Step 3: Build the library
  log('🏗️ Building the library...', colors.blue);
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 4: Copy example files
  log('📋 Copying example files...', colors.blue);
  ensureDir(path.resolve(__dirname, 'dist/example'));
  fs.copyFileSync(
    path.resolve(__dirname, 'example/index.html'),
    path.resolve(__dirname, 'dist/example/index.html')
  );
  
  log('✅ Build completed successfully!', colors.green);
  log('To test the component, run: npm run preview', colors.yellow);
  log('To publish the package, run: npm publish', colors.yellow);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} 