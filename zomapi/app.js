let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let cors = require('cors');
let port = process.env.PORT || 3001;
let { dbConnect, getData} = require('./Controller/dbController');

app.use(cors());

//heart beat
app.get('/',(req,res) => {
    res.send('Health Ok')
})

app.listen(port,() => {
    dbConnect();
    console.log(`Running on port ${port}`)
})
