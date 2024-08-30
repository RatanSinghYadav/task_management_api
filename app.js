require('dotenv').config();
require('./db/connect.js');
const cors = require('cors');
const express = require('express');
const cookie = require('cookie-parser');
const route = require('./routes/router.js');
const app = express();

const PORT = process.env.PORT || 8000

const corsOption = {
    // origin: "https://task-management-webapp-kr7n.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Token']
}
 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookie());
app.use(cors(corsOption));
app.use(route);

app.listen(PORT, () => {
    console.log("Server is running...");
}) 
