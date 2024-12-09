import CSVHandler from './csvHandler.js';

async function main() {
  const csvHandler = new CSVHandler('users.csv');

  // Example 1: Add a new user
  try {
    await csvHandler.addUser('john_doe', 100);
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }

  // Example 2: Update a user's balance
  try {
    await csvHandler.updateUserBalance('john_doe', 150);
    console.log('User balance updated successfully');
  } catch (error) {
    console.error('Error updating user balance:', error.message);
  }

  // Example 3: Read all users
  try {
    const users = await csvHandler.readUsers();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error reading users:', error.message);
  }
}

main();