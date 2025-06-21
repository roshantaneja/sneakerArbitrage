import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [sneakers, setSneakers] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingBid, setPlacingBid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSneakers();
    fetchBids();
  }, []);

  const fetchSneakers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/sneakers`);
      const data = await res.json();
      setSneakers(data);
    } catch (err) {
      setError('Failed to fetch sneakers');
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const res = await fetch(`${API_BASE}/bids`);
      const data = await res.json();
      setBids(data);
    } catch (err) {
      setError('Failed to fetch bids');
    }
  };

  const placeBid = async (sneakerId, platform, bidAmount) => {
    setPlacingBid(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sneakerId, platform, bidAmount }),
      });
      const data = await res.json();
      if (data.success) {
        fetchBids();
      } else {
        setError('Failed to place bid');
      }
    } catch (err) {
      setError('Failed to place bid');
    } finally {
      setPlacingBid(false);
    }
  };

  const cancelBid = async (bidId) => {
    setError('');
    try {
      await fetch(`${API_BASE}/bids/${bidId}`, { method: 'DELETE' });
      fetchBids();
    } catch (err) {
      setError('Failed to cancel bid');
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Sneaker Arbitrage Dashboard (Simulation Mode)</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>Available Sneakers</h2>
      {loading ? (
        <div>Loading sneakers...</div>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Model</th>
              <th>Size</th>
              <th>Condition</th>
              <th>Market Value</th>
              <th>Bid (StockX)</th>
              <th>Bid (GOAT)</th>
            </tr>
          </thead>
          <tbody>
            {sneakers.map((s) => (
              <tr key={s.id}>
                <td>{s.model}</td>
                <td>{s.size}</td>
                <td>{s.condition}</td>
                <td>${s.marketValue}</td>
                <td>
                  <button
                    disabled={placingBid}
                    onClick={() => placeBid(s.id, 'StockX', Math.round(s.marketValue * 0.65))}
                  >
                    Place Bid @ ${Math.round(s.marketValue * 0.65)}
                  </button>
                </td>
                <td>
                  <button
                    disabled={placingBid}
                    onClick={() => placeBid(s.id, 'GOAT', Math.round(s.marketValue * 0.65))}
                  >
                    Place Bid @ ${Math.round(s.marketValue * 0.65)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Active Bids</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Sneaker</th>
            <th>Bid Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bids.length === 0 && (
            <tr><td colSpan="5">No bids yet.</td></tr>
          )}
          {bids.map((bid) => {
            const sneaker = sneakers.find((s) => s.id === bid.sneakerId);
            return (
              <tr key={bid.id}>
                <td>{bid.platform}</td>
                <td>{sneaker ? sneaker.model : bid.sneakerId}</td>
                <td>${bid.bidAmount}</td>
                <td>{bid.status}</td>
                <td>
                  {bid.status === 'active' && (
                    <button onClick={() => cancelBid(bid.id)}>Cancel</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
