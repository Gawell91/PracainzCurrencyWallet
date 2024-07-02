const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/register', require('./routes/registerRoutes')); 
app.use('/api/users', require('./routes/users'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/rates', require('./routes/ratesRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
