# **ExBanking Playwright Tests**

## **Project Overview**

This project automates the testing of the ExBanking API using Playwright. It includes a mock server for simulating API endpoints and a CSV file for user data storage.

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

## **Setup Instructions**

### **Install Dependencies**
Run the following command to install required dependencies:

npm install


### **Start the Mock Server**
Start the mock server using:

npm run start-mock-server

The server will run at `http://localhost:3000`.

---

## **Running Tests**

### **Before Running Tests**
- Ensure the mock server is running.
- Verify that the `data/users.csv` file is in its correct initial state. You can reset it as needed.

### **Run All Tests**
Execute all tests using:
npm test


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

## **Test Case Documentation**

### **Functional Test Cases**
Each API has both positive and negative test cases, tagged for selective execution. 

#### **1. Create User**
- **Requirement:** Users can create new accounts.
- **Test Cases:**
  - Positive: Create a new user successfully.
  - Negative: Attempt to create a user with an existing username.

#### **2. Deposit**
- **Requirement:** Users can add funds to their account.
- **Test Cases:**
  - Positive: Deposit funds into an existing account.
  - Negative: Attempt to deposit into a non-existent account.

#### **3. Withdraw**
- **Requirement:** Users can withdraw funds from their account.
- **Test Cases:**
  - Positive: Withdraw funds with sufficient balance.
  - Negative: Attempt to withdraw with insufficient balance.

#### **4. Get Balance**
- **Requirement:** Users can check their account balance.
- **Test Cases:**
  - Positive: Retrieve balance for an existing user.
  - Negative: Attempt to retrieve balance for a non-existent user.

#### **5. Send Money**
- **Requirement:** Users can transfer funds between accounts.
- **Test Cases:**
  - Positive: Send money between two valid accounts.
  - Negative: Attempt to send money to a non-existent user or with insufficient balance.

### **Non-Functional Test Cases**
#### **Performance Testing**
- **Requirement:** System handles concurrent requests efficiently.
- **Test Case:** Simulate high traffic for APIs and measure response times.

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
