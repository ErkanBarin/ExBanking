import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

const CSV_FILE_PATH = path.join(process.cwd(), 'data', 'users.csv');

async function resetCSV() {
  const initialData = 'username,balance\njohn_doe,150\nstatic_existing_user,0';
  await fs.writeFile(CSV_FILE_PATH, initialData);
}

test.describe('create_user API', () => {
  test.beforeEach(async () => {
    await resetCSV(); // Reset CSV file before each test
  });

  test('Create a new user with valid input @create @positive', async ({ request }) => {
    const username = `user_${Date.now()}`;

    const response = await request.post('/create_user', {
      data: { username }
    });

    expect(response.status()).toBe(201);
    const jsonResponse = await response.json();
    expect(jsonResponse).toHaveProperty('message', 'User created successfully');

    // Verify the user was added to CSV
    const csvContent = await fs.readFile(CSV_FILE_PATH, 'utf-8');
    expect(csvContent).toContain(`${username},0`);
  });

  test('Attempt to create an existing user @create @negative', async ({ request }) => {
    const response = await request.post('/create_user', {
      data: { username: 'john_doe' }
    });

    expect(response.status()).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse).toHaveProperty('error', 'User already exists');
  });
});
