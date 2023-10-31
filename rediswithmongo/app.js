import {createClient} from 'redis';
import {MongoClient} from 'mongodb';
import express from 'express';
const app = express();
const port = 8822;
const url = "mongodb://127.0.0.1:27017";
const mClinet = new MongoClient(url);
const rClient = createClient({host:'localhost',port:6379});

//connecting with redis;
rClient.on('err',err=>console.log(err));

//connecting mongo
async function mongoConnection(){
   await mClinet.connect()
}

const collection = mClinet.db('octnode').collection('products');

app.get('/data',async(req,res)  => {
    await rClient.connect();
    let uInput = req.query.color.trim();
    let result = await rClient.get(uInput);
    if(result){
        const output = JSON.parse(result);
        res.send(output)
    }else{
        //get Data from mongo
        const output = [];
        const cursor = collection.find({Color:uInput});
        for await(const data of cursor){
            output.push(data)
        }
        await rClient.set(uInput, JSON.stringify({source:'Redis Cache',output}),{EX:10,NX:true})
        cursor.closed;
        let fOut = {source:'MongoDB', output}
        res.send(fOut)
    }

    await rClient.disconnect()

})


app.listen(port,(err) => {
    mongoConnection();
    console.log(`Running on port ${port}`)
})