const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const port = 9881;
const app = express();

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');

mongoose.connect('mongodb://127.0.0.1:27017/sepnode',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const storage = multer.memoryStorage();
const upload = multer({storage});

//Model
const Image = mongoose.model('Image',{data:Buffer,contentType:String});

app.get('/',(req,res) => {
    res.render('index');
})

app.post('/upload',upload.single('image'),async(req,res) => {
    try{
        const image = new Image({
            data:req.file.buffer,
            contentType:req.file.mimetype
        })
        await image.save();
        res.send({message:'Image Upload'})
    }catch(err){
        res.send({error:'Error While Upload'})
    }
})


app.listen(port,() => {
    console.log(`Running on port ${port}`)
})