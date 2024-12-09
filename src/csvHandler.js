import fs from 'fs/promises';

export class CSVHandler {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readUsers() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return data
        .split('\n')
        .filter(line => line.trim() !== '' && !line.startsWith('username'))
        .map(line => {
          const [username, balance] = line.split(',');
          return { username: username.trim(), balance: parseFloat(balance) || 0 };
        });
    } catch (error) {
      console.error('Error reading CSV file:', error.message);
      return [];
    }
  }

  async writeUsers(users) {
    const data = ['username,balance', ...users.map(user => `${user.username},${user.balance}`)].join('\n');
    await fs.writeFile(this.filePath, data);
  }

  async addUser(username) {
    const users = await this.readUsers();
    const existingUser = users.find(user => user.username === username.trim());
    if (existingUser) {
      throw new Error('User already exists');
    }
    users.push({ username: username.trim(), balance: 0 });
    await this.writeUsers(users);
  }
}
