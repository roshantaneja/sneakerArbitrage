const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- MongoDB-style schema (for future DB integration) ---
// Sneaker Schema Example
// const Sneaker = {
//   model: String,
//   size: String,
//   condition: String,
//   marketValue: Number,
//   lastUpdated: Date,
// };
//
// Bid Schema Example
// const Bid = {
//   sneakerId: String,
//   platform: 'StockX' | 'GOAT',
//   bidAmount: Number,
//   status: 'active' | 'won' | 'cancelled',
//   createdAt: Date,
//   updatedAt: Date,
// };

// --- Mock Data ---
const mockSneakers = [
  {
    id: '1',
    model: 'Nike Air Max 1',
    size: '10',
    condition: 'new',
    marketValue: 250,
    lastUpdated: new Date(),
  },
  {
    id: '2',
    model: 'Adidas Yeezy Boost 350',
    size: '9',
    condition: 'new',
    marketValue: 400,
    lastUpdated: new Date(),
  },
];

let mockBids = [];

// --- API Endpoints ---

// Get all sneakers (mocked from RapidAPI)
app.get('/api/sneakers', (req, res) => {
  res.json(mockSneakers);
});

// Place a bid (simulation mode)
app.post('/api/bids', (req, res) => {
  const { sneakerId, platform, bidAmount } = req.body;
  const newBid = {
    id: String(Date.now()),
    sneakerId,
    platform,
    bidAmount,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockBids.push(newBid);
  res.json({ success: true, bid: newBid, simulation: true });
});

// Get all bids
app.get('/api/bids', (req, res) => {
  res.json(mockBids);
});

// Cancel a bid (simulation mode)
app.delete('/api/bids/:id', (req, res) => {
  const { id } = req.params;
  mockBids = mockBids.map(bid =>
    bid.id === id ? { ...bid, status: 'cancelled', updatedAt: new Date() } : bid
  );
  res.json({ success: true, id, simulation: true });
});

app.listen(PORT, () => {
  console.log(`Mock sneaker arbitrage backend running on port ${PORT}`);
}); 