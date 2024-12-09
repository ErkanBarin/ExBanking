import http from 'http';
import { CSVHandler } from './csvHandler.js';
import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;
const csvHandler = new CSVHandler('./data/users.csv');

// Routes

// Get Balance Route
app.get('/get_balance', async (req, res) => {
  const { username } = req.query;
  console.log('Received get_balance request for username:', username);

  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.log('Invalid username received');
    return res.status(400).json({ error: 'Invalid username' });
  }

  try {
    const users = await csvHandler.readUsers();
    console.log('Current users in CSV:', users);

    const user = users.find(user => user.username === username.trim());
    if (!user) {
      console.log('User not found in CSV');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found, returning balance:', user.balance);
    return res.status(200).json({ ok: true, balance: parseFloat(user.balance) });
  } catch (error) {
    console.error('Error processing get_balance:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create User Route
app.post('/create_user', async (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  try {
    const users = await csvHandler.readUsers();
    const userExists = users.some(user => user.username === username.trim());

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await csvHandler.addUser(username.trim());
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Deposit Route
app.post('/deposit', async (req, res) => {
  const { username, amount } = req.body;

  if (!username || typeof username !== 'string' || username.trim() === '' || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Deposit amount must be positive' });
  }

  try {
    const users = await csvHandler.readUsers();
    const user = users.find(user => user.username === username.trim());

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += amount;
    await csvHandler.writeUsers(users);
    return res.status(200).json({ ok: true, new_balance: user.balance });
  } catch (error) {
    console.error('Error processing deposit:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Withdraw Route
app.post('/withdraw', async (req, res) => {
  const { username, amount } = req.body;

  if (!username || typeof username !== 'string' || username.trim() === '' || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Withdrawal amount must be positive' });
  }

  try {
    const users = await csvHandler.readUsers();
    const user = users.find(user => user.username === username.trim());

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.balance -= amount;
    await csvHandler.writeUsers(users);
    return res.status(200).json({ ok: true, new_balance: user.balance });
  } catch (error) {
    console.error('Error processing withdrawal:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Transfer Route
app.post('/send', async (req, res) => {
  const { from_username, to_username, amount } = req.body;

  if (!from_username || !to_username || typeof from_username !== 'string' || typeof to_username !== 'string' || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Transfer amount must be positive' });
  }

  try {
    const users = await csvHandler.readUsers();

    const toUser = users.find(user => user.username === to_username.trim());
    if (!toUser) {
      return res.status(404).json({ error: 'Receiver not found' });
    }

    const fromUser = users.find(user => user.username === from_username.trim());
    if (!fromUser) {
      return res.status(404).json({ error: 'Sender not found' });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    fromUser.balance -= amount;
    toUser.balance += amount;
    await csvHandler.writeUsers(users);

    return res.status(200).json({ ok: true, from_balance: fromUser.balance, to_balance: toUser.balance });
  } catch (error) {
    console.error('Error processing transfer:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Dynamic Port Handling
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Trying next available port...`);
    server.listen(0, () => {
      console.log(`Mock server now running on http://localhost:${server.address().port}`);
    });
  } else {
    throw err;
  }
});
