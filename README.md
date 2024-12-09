# **ExBanking Playwright Tests**

## **Project Overview**

This project automates the testing of the ExBanking API using Playwright. It includes a mock server for simulating API endpoints and a CSV file for user data storage.

---

## **API Endpoints**

The mock server implements the following API endpoints:

1. **Create User**
   - **Method:** POST  
   - **Endpoint:** `/create_user`  
   - **Body:** `{ "username": "string" }`

2. **Deposit**
   - **Method:** POST  
   - **Endpoint:** `/deposit`  
   - **Body:** `{ "username": "string", "amount": number }`

3. **Withdraw**
   - **Method:** POST  
   - **Endpoint:** `/withdraw`  
   - **Body:** `{ "username": "string", "amount": number }`

4. **Get Balance**
   - **Method:** GET  
   - **Endpoint:** `/get_balance?username=string`

5. **Send Money**
   - **Method:** POST  
   - **Endpoint:** `/send`  
   - **Body:** `{ "from_username": "string", "to_username": "string", "amount": number }`

---

## **Setup Instructions**

### **Install Dependencies**
Run the following command to install required dependencies:
```bash
npm install
```

### **Start the Mock Server**
Start the mock server using:
```bash
npm run start-mock-server
```
The server will run at `http://localhost:3000`.

---

## **Running Tests**

### **Before Running Tests**
- Ensure the mock server is running.
- Verify that the `data/users.csv` file is in its correct initial state. You can reset it as needed.

### **Run All Tests**
Execute all tests using:
```bash
npm test
```

### **Run Specific Test Suites**
You can run specific test groups with the following commands:
- **Create User Tests:** `npm run test:create`
- **Deposit Tests:** `npm run test:deposit`
- **Withdraw Tests:** `npm run test:withdraw`
- **Balance Tests:** `npm run test:balance`
- **Send Money Tests:** `npm run test:send`
- **Positive Tests:** `npm run test:positive`
- **Negative Tests:** `npm run test:negative`

---

## **CSV File Management**

- **File:** `data/users.csv`  
- The CSV stores user data (e.g., username, balance).  
- The utility in `src/csvHandler.js` manages reading and writing data.  
- Ensure the file is reset to a known state before running tests for consistency.

---

## **Project Structure**

- **`src/`**: Contains:
  - Mock server (`mockServer.js`)
  - CSV handler (`csvHandler.js`)
- **`tests/`**: Playwright test files for functional and non-functional cases.
- **`data/`**: User data stored in `users.csv`.

---

## **Known Issues**

If running all tests together causes issues, execute them individually using the commands in the "Run Specific Test Suites" section.