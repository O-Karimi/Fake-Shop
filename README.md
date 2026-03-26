# 🛒 The Fake Store - Full-Stack E-Commerce

A complete, full-stack e-commerce application built for the seamless transaction of strictly imaginary items. This project serves as a comprehensive demonstration of modern web development, featuring a Vue.js frontend, a Node.js/Express backend, secure MongoDB data storage, and PayPal Sandbox integration.

## ✨ Features Highlight

This application satisfies all core e-commerce requirements:
* **Attractive Landing Page:** A visually appealing hero section and company info page outlining our "Zero Shipping Time" guarantee.
* **Product Management:** View a complete catalog of products, click for detailed views, and add new items to the database via a protected route.
* **Dynamic Search:** Search for specific products by name or description in real-time.
* **Global State Cart:** A fully functional shopping cart powered by Pinia that persists across route changes.
* **Secure Authentication:** User registration and login system with encrypted sessions. 
* **Simulated Checkout:** End-to-end checkout process using the official PayPal JS SDK (Sandbox environment) to process mock payments securely.
* **Smart Order History:** Logged-in users can instantly view their past transactions, including PayPal transaction IDs and exact order dates.

## 🛠 Tech Stack

**Frontend (User Interface):**
* Vue 3 (Composition API)
* Vue Router (Navigation)
* Pinia (State Management)
* PayPal JS SDK

**Backend (Server & Database):**
* Node.js & Express.js (ES Modules)
* MongoDB & Mongoose (Data Modeling)
* CORS & Dotenv (Security & Configuration)

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### 1. Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* A [MongoDB URI](https://www.mongodb.com/) (either a local instance or MongoDB Atlas).
* A [PayPal Developer](https://developer.paypal.com/) account (for testing sandbox transactions).

### 2. Backend Setup
Navigate to the backend directory and install the dependencies:
```bash
cd Fake-Shop-Back
npm install
```

Create a .env file in the root of the Fake-Shop-Back directory and add your database credentials:


```Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
Start the backend server:
```

```Bash
npm run dev
```
(The server should log: "Server running on port 5000" and "MongoDB Connected")

3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install the dependencies:

```Bash
cd frontend
npm install
```

Start the Vue development server:
```Bash
npm run dev
```
🧪 How to Test the Application
Browse & Search: Open the frontend URL (http://localhost:5173) to view the landing page. Navigate to the store, search for items, and click on them to view details.

Create an Account: Click "Sign Up" to create a mock user profile, then log in.

Add to Cart: Add a few imaginary items to your shopping cart.

Verify Order: After a successful transaction, click "My Orders" in the navigation bar to see your newly created database entry, complete with the PayPal Transaction ID.

Disclaimer: No actual money is processed in this application. All items are fictional, and all transactions are routed strictly through PayPal's Sandbox environment.