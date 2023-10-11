let express = require('express');
let app = express();
let port = 9101

//default Route
app.get('/',function(req,res){
    res.send('Hiii From Express')
})

app.get('/products',function(req,res){
    res.send("Hii From Products")
})


app.listen(port,function(err){
    if(err) throw err;
    console.log("Server is running on port "+port)
})