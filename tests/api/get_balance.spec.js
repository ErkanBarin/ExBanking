import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

test.describe('get_balance API', () => {
  test('Retrieve balance for an existing user @balance @positive', async ({ request }) => {
    // Read the contents of users_template.csv
    const csvContent = await fs.readFile('./data/users_template.csv', 'utf-8');
    console.log('Contents of users_template.csv:\n', csvContent);

    // Find the user 'bob' in the CSV
    const userLine = csvContent
      .split('\n')
      .find((line) => line.startsWith('bob,'));

    if (!userLine) {
      throw new Error("User 'bob' not found in users_template.csv");
    }

    // Extract the balance for 'bob'
    const [username, balance] = userLine.split(',');
    console.log(`Found user: ${username} with balance: ${balance}`);

    // Send GET request to /get_balance API
    const response = await request.get(`/get_balance?username=bob`);

    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());

    // Assert the response status and content
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json).toHaveProperty('ok', true);
    expect(json).toHaveProperty('balance', parseFloat(balance)); // Balance should match the CSV
  });

  test('Attempt to retrieve balance for a non-existing user @balance @negative', async ({ request }) => {
    // Send GET request for a nonexistent user
    const response = await request.get('/get_balance?username=nonexistent');

    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());

    // Assert the response status and content
    expect(response.status()).toBe(404);

    const json = await response.json();
    expect(json).toHaveProperty('error', 'User not found'); // Match the expected error message
  });
});
