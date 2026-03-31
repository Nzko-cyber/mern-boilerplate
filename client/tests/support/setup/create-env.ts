const fs = require('fs');
const path = require('path');

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const CREDENTIALS_FILE = path.resolve(__dirname, 'test-credentials.json');

function generateRandomUsername() {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).slice(2, 8);
  return `testuser_${randomStr}_${timestamp}`;
}

function generateRandomPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i += 1) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function createEnv() {
  console.log('Starting create-env setup...');

  const username = generateRandomUsername();
  const password = generateRandomPassword();
  const url = `${API_BASE_URL}/api/auth/register`;

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch (error) {
    throw new Error(`Failed to reach API at ${url}: ${error instanceof Error ? error.message : String(error)}`);
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorPayload: any = await response.json();
      if (errorPayload && typeof (errorPayload as any).message === 'string') {
        errorMessage = (errorPayload as any).message;
      }
    } catch (_error) {
      // Keep default status-based message if parsing fails.
    }
    throw new Error(`Failed to create user: ${errorMessage}`);
  }

  const data: any = await response.json();
  if (!data || !(data as any).user) {
    throw new Error('API did not return user data');
  }

  const credentials = {
    username,
    password,
    userId: (data as any).user._id || (data as any).user.id,
  };

  const dir = path.dirname(CREDENTIALS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2), 'utf8');
  console.log(`Credentials saved: ${CREDENTIALS_FILE}`);
  return credentials;
}

createEnv()
  .then((credentials) => {
    console.log('Setup complete for test user:', credentials.username);
    process.exit(0);
  })
  .catch((error) => {
    console.error('create-env failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  });