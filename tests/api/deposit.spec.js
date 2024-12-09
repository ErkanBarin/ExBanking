import { test, expect } from '@playwright/test';

test('Deposit a positive amount to an existing user @deposit @positive', async ({ request }) => {
  const response = await request.post('/deposit', {
    data: { username: 'alice', amount: 50 },
  });
  console.log('Positive deposit response:', await response.json());
  expect(response.ok()).toBeTruthy(); // Ensure response is a 2xx
  const json = await response.json();
  expect(json).toEqual({ ok: true, new_balance: 150 }); // Expected balance after deposit
});

test('Attempt to deposit a negative amount @deposit @negative', async ({ request }) => {
  const response = await request.post('/deposit', {
    data: { username: 'bob', amount: -50 },
  });
  console.log('Negative deposit response:', await response.json());
  expect(response.status()).toBe(400); // Ensure correct error code for negative deposit
  expect(await response.json()).toHaveProperty('error');
});
