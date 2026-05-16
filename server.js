const express = require('express');
const cors = require('cors');
const path = require('path');

const aiRoutes = require('./src/routes/aiRoutes');
const fieldRoutes = require('./src/routes/fieldRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/field-data', fieldRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});