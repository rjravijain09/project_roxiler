const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/Db');
const transactionRoutes = require('./routes/transactions');
const { seedDataBase } = require('./services/DataService');
const app = express();
app.use(express.json());

dotenv.config();
connectDB();

seedDataBase(); 

app.use('/api', transactionRoutes);  

app.get('/api', (req, res) => {
    res.send('Server is running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
