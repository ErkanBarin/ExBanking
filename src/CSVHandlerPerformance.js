import fs from 'fs/promises';

export class CSVHandlerPerformance {
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
      console.error('Error reading performance CSV file:', error.message);
      return [];
    }
  }
}
