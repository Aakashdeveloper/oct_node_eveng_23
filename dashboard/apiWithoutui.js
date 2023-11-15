const express = require('express');
const app = express();
const {MongoClient,ObjectId} = require('mongodb');
const mongoUrl = "mongodb://127.0.0.1/27017";
const client = new MongoClient(mongoUrl);

async function main(){
    await client.connect()
}

const collection = client.db('octnode').collection('dashboard');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 7710;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/health',(req,res) => {
    res.send('Health Ok')
});


app.listen(port,() => {
    main();
    console.log(`Server is running on port ${port}`)
})