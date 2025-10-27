#!/usr/bin/env node

/**
 * Wallet Roast Setup Script
 * Helps users set up the environment quickly
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔥 Welcome to Wallet Roast Setup! 🔥\n');
console.log('This script will help you configure your environment.\n');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  try {
    // Check if .env.local already exists
    const envPath = path.join(__dirname, '.env.local');
    
    if (fs.existsSync(envPath)) {
      const overwrite = await question('⚠️  .env.local already exists. Overwrite? (y/n): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('\n✅ Setup cancelled. Using existing .env.local file.\n');
        rl.close();
        return;
      }
    }

    console.log('\n📝 Let\'s set up your Zerion API key.\n');
    console.log('If you don\'t have one yet, get it here:');
    console.log('👉 https://zerion-io.typeform.com/to/QI3GRa7t\n');

    const apiKey = await question('Enter your Zerion API key: ');

    if (!apiKey || apiKey.trim() === '') {
      console.log('\n❌ Error: API key cannot be empty.\n');
      rl.close();
      return;
    }

    // Create .env.local file
    const envContent = `# Zerion API Key
# Get your free API key at: https://zerion-io.typeform.com/to/QI3GRa7t
NEXT_PUBLIC_ZERION_API_KEY=${apiKey.trim()}
`;

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Success! .env.local file created.\n');
    console.log('📋 Next steps:\n');
    console.log('  1. Install dependencies:  npm install');
    console.log('  2. Start dev server:      npm run dev');
    console.log('  3. Open browser:          http://localhost:3000\n');
    console.log('🎉 Happy roasting! 🔥\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message, '\n');
  } finally {
    rl.close();
  }
}

setup();

