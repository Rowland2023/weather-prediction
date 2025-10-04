const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve popup.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'popup.html'));
});

// ✅ Proxy API requests to Flask backend on Render
app.use('/api', createProxyMiddleware({
  target: 'https://flight-booking-y6l6.onrender.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  timeout: 10000,
  proxyTimeout: 10000
}));

// ✅ Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`🔁 Proxying: ${req.method} ${req.url}`);
  next();
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Frontend running on port ${PORT}`);
});
