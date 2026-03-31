import * as fs from 'fs';
import * as path from 'path';
import { TestCredentials } from './types';

export function readCredentials(): TestCredentials {
  const credentialsPath = path.resolve(__dirname, '../../../support/setup/test-credentials.json');
  if (!fs.existsSync(credentialsPath)) {
    throw new Error(`Credentials file not found at ${credentialsPath}. Run create-env.ts before tests.`);
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8')) as TestCredentials;
  if (!credentials.username || !credentials.password) {
    throw new Error('Credentials file is invalid: username/password are required.');
  }

  return credentials;
}
