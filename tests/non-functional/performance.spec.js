import { test, expect } from '@playwright/test';
import { CSVHandlerPerformance } from '../../src/CSVHandlerPerformance.js';

const API_URL = 'http://localhost:3000/get_balance';
const LOAD_USERS_URL = 'http://localhost:3000/load_test_users';
const csvHandler = new CSVHandlerPerformance('./data/users_performance_testing.csv');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test.describe('Performance Testing for get_balance API', () => {
 test.beforeAll(async ({ request }) => {
  const users = await csvHandler.readUsers();

  if (users.length === 0) {
    throw new Error('No users found in users_performance_testing.csv');
  }
  console.log(`Loaded ${users.length} users for performance testing`);

  // Load test users into the mock server
  console.log('Sending request to load test users');
  const response = await request.post(LOAD_USERS_URL, {
    headers: { 'Content-Type': 'application/json' },
    data: { users },
  });

  console.log('Response status:', response.status());
  console.log('Response body:', await response.text());

  expect(response.status(), 'Failed to load test users into the mock server').toBe(200);
  console.log('Test users loaded into the mock server');
});

  test('should handle 100 concurrent requests under 200ms @performance', async ({ request }) => {
    const users = await csvHandler.readUsers();
    const maxRequests = users.length; // Use the number of users in the CSV
    const promises = [];
    const startTime = Date.now();

    for (const user of users) {
      promises.push(
        request.get(`${API_URL}?username=${user.username}`, {
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }

    const responses = await Promise.all(promises);
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Assertions
    responses.forEach((response, index) => {
      expect(
        response.status(),
        `Request failed for ${users[index].username}: ${response.statusText()}`
      ).toBe(200);
    });

    console.log(`Total time for ${maxRequests} requests: ${totalTime}ms`);
    expect(totalTime).toBeLessThan(200); // Adjust threshold as needed
  });
});
