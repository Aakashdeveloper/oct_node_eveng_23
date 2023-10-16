let express = require('express');
let app = express();
let port = 9101;
let categoryRouter = require('./src/controller/categoryRouter');
let productRouter = require('./src/controller/productsRouter');

//default Route
app.get('/',function(req,res){
    res.send('Hiii From Express');
});

app.use('/category',categoryRouter);
app.use('/products',productRouter);


app.listen(port,function(err){
    if(err) throw err;
    console.log("Server is running on port "+port)
})