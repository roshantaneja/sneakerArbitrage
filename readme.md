# Sneaker Marketplace Arbitrage System

A comprehensive sneaker marketplace arbitrage system that monitors StockX and GOAT for price discrepancies, calculates potential profits, and simulates automated bidding in real-time. This project is currently in simulation mode and is designed for easy future integration with real APIs and a MongoDB database.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Simulation Mode](#simulation-mode)
- [API Endpoints](#api-endpoints)
- [Planned MongoDB Schemas](#planned-mongodb-schemas)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This system is designed to:
- Monitor sneaker listings on StockX and GOAT 24/7 (via RapidAPI, mocked for now)
- Calculate true market value for each sneaker variation
- Simulate automated bidding (place, modify, cancel bids) on StockX and GOAT
- Provide a real-time web dashboard for monitoring and analytics
- Allow configuration of bidding parameters and risk management
- Prepare for future integration with MongoDB and real marketplace APIs

---

## Tech Stack
- **Frontend:** React (Create React App)
- **Backend:** Node.js, Express
- **API Integration:** RapidAPI (mocked), StockX, GOAT (mocked)
- **Database:** MongoDB (planned, not yet implemented)
- **Other:** CORS, Axios, Proxy support, Simulation mode

---

## Project Structure

```
/ (root)
  /client   # React frontend
  /server   # Node.js/Express backend
  readme.md # This file
  package.json # Root scripts for dev
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/roshantaneja/sneakerArbitrage](https://github.com/roshantaneja/sneakerArbitrage)
   cd sneakerArbitrage
   ```
2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```
4. **(Optional) From root, you can run both with:**
   ```bash
   npm run start
   ```
   (Requires `concurrently` installed in `/server`)

### Running the App
- **Start backend:**
  ```bash
  cd server
  node index.js
  ```
- **Start frontend:**
  ```bash
  cd ../client
  npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables
- API keys for RapidAPI, StockX, and GOAT are mocked for now.
- When ready, add your keys to a `.env` file or as environment variables in the backend.
- Example (for future use):
  ```env
  RAPIDAPI_KEY=your_rapidapi_key
  STOCKX_API_KEY=your_stockx_key
  GOAT_API_KEY=your_goat_key
  ```

---

## Simulation Mode
- All actions (bidding, cancelling) are simulated and do not interact with real marketplaces.
- Simulation mode is ON by default. Live mode will be added in the future.

---

## API Endpoints (Mocked)

### Sneakers
- `GET /api/sneakers` — List all sneakers (mocked data)

### Bids
- `GET /api/bids` — List all bids
- `POST /api/bids` — Place a new bid (simulation)
- `DELETE /api/bids/:id` — Cancel a bid (simulation)

Example request to place a bid:
```json
{
  "sneakerId": "1",
  "platform": "StockX",
  "bidAmount": 150
}
```

---

## Planned MongoDB Schemas

**Sneaker Schema:**
```js
{
  model: String,
  size: String,
  condition: String,
  marketValue: Number,
  lastUpdated: Date,
}
```

**Bid Schema:**
```js
{
  sneakerId: String,
  platform: 'StockX' | 'GOAT',
  bidAmount: Number,
  status: 'active' | 'won' | 'cancelled',
  createdAt: Date,
  updatedAt: Date,
}
```

---

## Future Features
- Real-time monitoring and notifications (WebSocket, email, SMS)
- Full MongoDB integration for persistent storage
- Real API integration with StockX, GOAT, and RapidAPI
- AI-powered pricing and bidding engine
- Risk management and kill switches
- Secure credential storage and authentication
- Analytics dashboard (profit/loss, ROI, etc.)
- Proxy rotation and CAPTCHA handling for automation
- Simulation/live mode toggle
- Full documentation and operational manual

---

## Contributing
Pull requests and suggestions are welcome! Please open an issue first to discuss major changes.

---

## License
MIT License

---

## Contact
For questions or support, contact me here or create an issue ticket.
