const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 9887;

app.use(express.static(__dirname+'/public'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/',(req,res) => {
    res.render('index')
})


app.post('/upload',async(req,res) => {
    console.log(req.files);
    console.log(req.body);
    // res.send('ok')
    const imageFile = req.files.uimage;
    await imageFile.mv(`${__dirname}/public/images/${imageFile.name}`);
    res.render('display',{title:req.body.iname,image:`${imageFile.name}`})
})

app.listen(port,function(err){
    console.log("Server is running on port "+port)
})