File for your **Crypto Monitor** backend system. It includes:

* 📁 Project structure
* ⚙️ Setup instructions
* 🚀 How to run each service
* 🧪 Example API endpoints
* 🖼️ Space for inserting a project diagram or screenshot



---

```markdown
# 📈 Crypto Monitor Backend System

This is a full backend microservice system for tracking real-time cryptocurrency statistics using the CoinGecko API. It consists of two services:

- `api-server` — Exposes a REST API and stores stats in MongoDB
- `worker-server` — Background service that fetches stats and sends via NATS

---

## 📁 Project Structure

```bash
crypto-monitor/
├── api-server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── statsController.js     # API logic for returning stats and deviation
│   │   ├── models/
│   │   │   └── CryptoStat.js          # Mongoose schema for stats data
│   │   ├── routes/
│   │   │   └── statsRoutes.js         # API routes (GET endpoints)
│   │   ├── services/
│   │   │   └── coingeckoService.js    # CoinGecko fetching logic (can be reused)
│   │   ├── utils/
│   │   │   └── db.js                  # MongoDB connection helper
│   │   ├── index.js                   # Main server file (starts Express + DB)
│   │   ├── nats.js                    # NATS listener for stats from worker
│   │   └── storeCryptoStats.js       # Handles writing received stats to DB
│   ├── .env                           # Environment config (PORT, MONGO_URI, NATS_URL)
│   ├── package.json                   # Dependencies and scripts
│
├── worker-server/
│   ├── src/
│   │   ├── index.js                   # Main loop to fetch and send stats
│   │   └── nats.js                    # NATS publisher setup
│   ├── .env                           # Environment config (NATS_URL)
│   ├── package.json                   # Dependencies and scripts

````

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/crypto-monitor.git
cd crypto-monitor
````

---

### 2. Install Dependencies

Install packages for both services:

```bash
cd api-server
npm install

cd ../worker-server
node src\index.js

cd projectname
nats-server

```

---

### 3. Set Up Environment Variables

Create a `.env` file in **both** `api-server/` and `worker-server/` folders.

#### 🔐 For `api-server/.env`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto-monitor
COINGECKO_API=xxxxxxxxxx
```

#### 🔐 For `worker-server/.env`:

```
NATS_URL=nats://localhost:4222
```

---

### 4. Start Required Services

Make sure these are running on your machine:

* 🐳 **MongoDB** — database

---

## 🚀 Running the Services

### ✅ Start the API Server

```bash
cd api-server
npm start
```

This runs Express on the port defined in `.env` (default: `5000`).

### 🔁 Start the Worker Server

```bash
cd worker-server
node src\index.js
```

The worker will fetch stats every minute and send to the API server via NATS.

---

## 🧪 API Endpoints

### 1. Get Latest Stats

```http
GET /api/stats/latest?coin=bitcoin
```

**Query Params**:

* `coin` — `bitcoin`, `ethereum`, or `matic-network`

**Response:**

```json
{
  "price": 12345.67,
  "marketCap": 234567890,
  "24hChange": 1.23
}
```

---

### 2. Get Price Standard Deviation (Last 100 records)

```http
GET /api/stats/deviation?coin=bitcoin
```

**Response:**

```json
{
  "deviation": 123.45
}
```

---

## 🖼️ Project Diagram / Screenshot


**✅ 1. API Server Started Successfully**
This screenshot shows the terminal output of the api-server running successfully.
![1api-server](https://github.com/user-attachments/assets/ba82ef7f-0144-44dd-9538-413583eca758)

**✅ 2. Worker Server Fetching Data**
This screenshot shows the worker-server fetching crypto stats and publishing them via NATS.
![2worker-server](https://github.com/user-attachments/assets/66ce3792-1a36-4692-aa02-e8bfbe8ae278)

**✅ 3. NATS Server Running**
This screenshot shows the NATS server up and running, enabling message communication between services.
 ![3Nats-server](https://github.com/user-attachments/assets/ffef80d5-0275-4ff5-b453-340592c02f7c)

**📊 4. MongoDB Before Inserting Crypto Stats**
Initial state of the CryptoStats collection in MongoDB Compass (empty or with minimal data).
![4before15min](https://github.com/user-attachments/assets/74f89a2a-c739-4174-8e2b-bd9eca9393a3)

**📊 5. MongoDB After 15 Minutes (Crypto Data Inserted)**
After 15 minutes, the worker has fetched and inserted multiple crypto stats documents (Bitcoin, Ethereum, Matic).
![5after15min](https://github.com/user-attachments/assets/0f28e573-b361-4546-ad88-2465b5a55fb2)



---

## 🧠 Tech Stack

* **Node.js** (Express + NATS + Mongoose)
* **MongoDB** for data storage
* **NATS** for lightweight service communication
* **CoinGecko API** for real-time crypto stats

---

## 📬 Contact

Created by [Mohammed Vijahath](https://github.com/vizahat36). Contributions welcome!

```

---

Let me know if you'd like a sample project diagram image you can include in the gap for the screenshot.
```
