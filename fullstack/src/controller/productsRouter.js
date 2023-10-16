let express = require('express');
let productRouter = express.Router();

productRouter.route('/')
    .get((req,res) => {
        res.send("Hii From Products Express Route")
    })

productRouter.route('/details')
    .get((req,res) => {
        res.send("Hii From Products Details Route")
    })

module.exports = productRouter;