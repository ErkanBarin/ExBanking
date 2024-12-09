import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

test.describe('send API', () => {
  // Reset the users.csv file before each test
  test.beforeEach(async () => {
    // Copy users_template.csv to users.csv
    await fs.copyFile('./data/users_template.csv', './data/users.csv');
    console.log('Reset users.csv to default state');

    // Read and log the contents of users.csv after reset
    const csvContent = await fs.readFile('./data/users.csv', 'utf-8');
    console.log('Current users.csv content:', csvContent);
  });

  test('Send money between two existing users @send @positive', async ({ request }) => {
    const response = await request.post('/send', {
      data: { from_username: 'sender', to_username: 'receiver', amount: 200 },
    });
    console.log('Send money response:', await response.json());
    expect(response.ok()).toBeTruthy(); // Ensure response is 2xx
    const json = await response.json();
    expect(json).toEqual({ ok: true, from_balance: 300, to_balance: 300 }); // Validate balances
  });

  test('Attempt to send money to a non-existing user @send @negative', async ({ request }) => {
    const response = await request.post('/send', {
      data: { from_username: 'sender', to_username: 'nonexistent_user', amount: 100 },
    });
    console.log('Send to non-existing user response:', await response.json());
    expect(response.status()).toBe(404); // Ensure correct error code
    expect(await response.json()).toHaveProperty('error', 'Receiver not found'); // Validate error message
  });

  test('Attempt to send money with insufficient balance @send @negative', async ({ request }) => {
    // Log the CSV content before the test
    const csvContent = await fs.readFile('./data/users.csv', 'utf-8');
    console.log('CSV content before test:', csvContent);

    const response = await request.post('/send', {
      data: { from_username: 'poor_sender', to_username: 'rich_receiver', amount: 100 },
    });
    console.log('Send with insufficient balance response:', await response.json());
    
    if (response.status() !== 400) {
      console.log('Unexpected status code:', response.status());
      console.log('Response body:', await response.text());
    }

    expect(response.status()).toBe(400); // Ensure correct error code
    expect(await response.json()).toHaveProperty('error', 'Insufficient balance'); // Validate error message
  });
});