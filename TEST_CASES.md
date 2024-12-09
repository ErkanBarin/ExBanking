# **ExBanking Test Cases**

## **Functional Test Cases**

### **1. Create User**
- **Requirement:** Users can create new accounts.
- **Test Cases:**
  - **Positive:** Create a new user successfully.
  - **Negative:** Attempt to create a user with an existing username.

### **2. Deposit**
- **Requirement:** Users can add funds to their account.
- **Test Cases:**
  - **Positive:** Deposit funds into an existing account.
  - **Negative:** Attempt to deposit into a non-existent account.

### **3. Withdraw**
- **Requirement:** Users can withdraw funds from their account.
- **Test Cases:**
  - **Positive:** Withdraw funds with sufficient balance.
  - **Negative:** Attempt to withdraw with insufficient balance.

### **4. Get Balance**
- **Requirement:** Users can check their account balance.
- **Test Cases:**
  - **Positive:** Retrieve balance for an existing user.
  - **Negative:** Attempt to retrieve balance for a non-existent user.

### **5. Send Money**
- **Requirement:** Users can transfer funds between accounts.
- **Test Cases:**
  - **Positive:** Send money between two valid accounts.
  - **Negative:** Attempt to send money to a non-existent user.
  - **Negative:** Attempt to send money with insufficient balance.

---

## **Non-Functional Test Cases**

### **Performance Testing**
- **Requirement:** System handles concurrent requests efficiently.
- **Test Case:** Simulate high traffic for APIs and measure response times.