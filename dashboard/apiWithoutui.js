const express = require('express');
const app = express();
const {MongoClient,ObjectId} = require('mongodb');
const mongoUrl = "mongodb://127.0.0.1/27017";
const client = new MongoClient(mongoUrl);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

async function main(){
    await client.connect()
}

const collection = client.db('octnode').collection('dashboard');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 7710;

app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/health',(req,res) => {
    res.send('Health Ok')
});

//addUsers
app.post('/addUser',async(req,res) => {
    await collection.insertOne(req.body);
    res.status(202).send('User Added')
})

//get users
app.get('/users',async(req,res) => {
    let output = [];
    let query = {};
    if(req.query.role && req.query.city){
        query = {
            role:req.query.role,
            city:req.query.city,
            isActive:true
        }
    }
    else if(req.query.role){
        query = {
            role:req.query.role,
            isActive:true
        }
    }else if(req.query.city){
        query = {
            city:req.query.city,
            isActive:true
        }
    }else if(req.query.isActive){
        let isActive = req.query.isActive
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        query = {isActive}
    }else{
        query = {
            isActive:true
        }
    }
    const cursor = collection.find(query);
    for await(const data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output);
});

// get particular user
app.get('/user/:id',async(req,res) => {
    const output = [];
    let query = {_id:new ObjectId(req.params.id)};
    const cursor = collection.find(query);
    for await(const data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output);
});

//update
app.put('/updateUser',async(req,res) => {
    await collection.updateOne(
        {_id:new ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                role: req.body.role,
                isActive: true
            }
        }
    )
    res.send('Record updated')
})


//deactivate (soft delete)
app.put('/deactivatedUser',async(req,res) => {
    await collection.updateOne(
        {_id:new ObjectId(req.body._id)},
        {
            $set:{
                isActive: false
            }
        }
    )
    res.send('User Deactivated')
})

//Activate (soft delete)
app.put('/activatedUser',async(req,res) => {
    await collection.updateOne(
        {_id:new ObjectId(req.body._id)},
        {
            $set:{
                isActive: true
            }
        }
    )
    res.send('User Activated')
})

//delete (hard delete)
app.delete('/deleteUser',async(req,res) => {
    await collection.deleteOne(
        {_id:new ObjectId(req.body._id)}
    )
    res.send('User Deleted')
})


app.listen(port,() => {
    main();
    console.log(`Server is running on port ${port}`)
})