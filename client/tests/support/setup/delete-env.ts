const fs = require('fs');
const path = require('path');

const CREDENTIALS_FILE = path.resolve(__dirname, 'test-credentials.json');

async function deleteEnv() {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    console.log('No credentials file found, nothing to delete.');
    return;
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8'));
  if (!credentials || (!credentials.userId && !credentials.username)) {
    throw new Error('Invalid credentials file: expected userId or username');
  }

  require('../../../../server/config/environment');
  await require('../../../../server/database');
  const { User, Todo } = require('../../../../server/database/schemas');

  const query = credentials.userId
    ? { _id: credentials.userId }
    : { username: String(credentials.username).toLowerCase() };

  const deleted = await User.findOneAndDelete(query);
  if (!deleted) {
    throw new Error(`User not found for deletion: ${JSON.stringify(query)}`);
  }

  // Remove all todos associated with this user so the environment is clean
  const todosResult = await Todo.deleteMany({ user: deleted._id });
  console.log(`Deleted ${todosResult.deletedCount} todos for user "${deleted.username}".`);

  fs.unlinkSync(CREDENTIALS_FILE);
  console.log(`Deleted user "${deleted.username}" and removed ${CREDENTIALS_FILE}`);
}

deleteEnv()
  .then(() => {
    console.log('Cleanup complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('delete-env failed:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  });