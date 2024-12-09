import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('./data/users_performance_testing.csv');

const createPerformanceUsers = async () => {
  const headers = 'username,balance\n';
  const rows = Array.from({ length: 100 }, (_, i) => `user${i},1000`).join('\n');

  try {
    await fs.writeFile(filePath, headers + rows, 'utf-8');
    console.log(`Created 100 users for performance testing in ${filePath}`);
  } catch (error) {
    console.error('Error creating performance users CSV:', error.message);
  }
};

createPerformanceUsers();
