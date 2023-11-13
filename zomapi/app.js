let express = require('express');
let app = express();
let {ObjectId} = require('mongodb')
let dotenv = require('dotenv');
dotenv.config()
let cors = require('cors');
let bodyParser = require('body-parser')
let port = process.env.PORT || 3001;
let { dbConnect, getData,getDataSort,
    getDataSortLimit} = require('./Controller/dbController');


app.use(cors());
// app.use(express.urlencoded({extended:false}))
// app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

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
    let sort = {cost:1};
    let skip = 0;
    let limit = 10000000000000;

    if(req.query.sort){
        sort = {cost:req.query.sort}
    }

    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }

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
    let output = await getDataSortLimit(collection,query,sort,skip,limit);
    res.status(200).send(output);
});

// details of restaurants
app.get('/details/:id',async(req,res) => {
    // let id = Number(req.params.id);
    const validObjectId = (id) => {
        const idPattern = /^[0-9a-fA-F]{24}$/
        return idPattern.test(id)
    }
    if(validObjectId(req.params.id)){
        let collection = 'restaurants';
        let query = {_id:new ObjectId(req.params.id)};
        let output = await getData(collection,query);
        res.status(200).send(output);
    }else{
        res.send('Invalid Object Id')
    }
})

//menu of restaurants
app.get('/menu/:id',async(req,res) => {
    let query = {restaurant_id:Number(req.params.id)};
    let output = await getData('menu',query);
    res.status(200).send(output);
})

//menuDetails {"id":[1,2,3]}
app.post('/menuDetails',async(req,res) => {
    console.log(req.body)
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}};
        let collection = 'menu';
        let output = await getData(collection,query);
        res.send(output);
    }else{
        res.send('Please Pass data in format of {"id":[1,2,3]}')
    }
   
})

app.listen(port,() => {
    dbConnect();
    console.log(`Running on port ${port}`)
})

