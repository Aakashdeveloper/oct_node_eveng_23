const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db.js');
const AuthController = require('./controller/authController');
const port = process.env.PORT || 5001;

app.use(cors());
app.use('/api/auth',AuthController);

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})