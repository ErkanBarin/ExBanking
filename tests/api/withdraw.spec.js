import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('withdraw API', () => {
  // Reset the users.csv file before each test
  test.beforeEach(async () => {
    // Copy users_template.csv to users.csv
    fs.copyFileSync('./data/users_template.csv', './data/users.csv');
    console.log('Reset users.csv to default state');
  });

  test('Withdraw an amount with sufficient balance @withdraw @positive', async ({ request }) => {
    // Assume 'charlie' exists with balance 200
    const response = await request.post('/withdraw', {
      data: { username: 'charlie', amount: 100 },
    });
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json).toEqual({ ok: true, new_balance: 100 });
  });

  test('Attempt to withdraw with insufficient balance @withdraw @negative', async ({ request }) => {
    // Assume 'david' exists with balance 50
    const response = await request.post('/withdraw', {
      data: { username: 'david', amount: 100 },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toHaveProperty('error', 'Insufficient balance');
  });
});
