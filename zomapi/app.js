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

//getCities
app.get('/location',async(req,res) => {
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query);
    res.status(200).send(output)
})

// list of restaurants
app.get('/restaurants',async(req,res) => {
    let query = {};
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);
    if(stateId){
        query = {
            "state_id":stateId
        }
    }else if(mealId){
        query = {
            "mealTypes.mealtype_id":mealId
        }
    }
    let collection = 'restaurants';
    let output = await getData(collection,query);
    res.status(200).send(output)
})

// list of meal type
app.get('/mealType',async(req,res) => {
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query);
    res.status(200).send(output)
})

//filters
app.get('/filters/:mealId',async(req,res) => {
    let query = {};
    let collection = 'restaurants';
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let hcost = Number(req.query.hcost);
    let lcost = Number(req.query.lcost);
    if(cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId,
        }
    }else if(hcost & lcost){
        query = {
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }else{
        query = {
            "mealTypes.mealtype_id":mealId
        }
    }
    let output = await getData(collection,query);
    res.status(200).send(output);
})

app.listen(port,() => {
    dbConnect();
    console.log(`Running on port ${port}`)
})
