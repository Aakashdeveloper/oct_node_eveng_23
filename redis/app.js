let express = require('express');
let axios = require('axios');
let redis = require('redis');
let port = 8772;
let app = express();

let client = redis.createClient({
    host:'localhost',
    port:6379
})

app.get('/data',(req,res) => {
    let userInput = req.query.country.trim();
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    //check data in redis
    client.get(userInput,(err,result) => {
        //if data in redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            // as data is not a part of redis
            // make api call and save in redis
            axios.get(url)
                .then((response) => {
                    //save response in the redis for next time;
                    const output = response.data;
                    client.setex(userInput,3600,JSON.stringify({source:'Redis Cache',output}))
                    // for the first time return data
                    res.send({source:'Api Response',output})
                })
        }
    })
})

app.listen(port)