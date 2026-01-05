const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/api');

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', apiRoutes);

// Fallback for SPA (if we had client side routing, but here we have static files)
// For now, root serves index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Database Sync and Start
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync models
        console.log('Database synced successfully.');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
