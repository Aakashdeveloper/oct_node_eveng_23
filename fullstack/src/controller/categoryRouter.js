let express = require('express');
let categoryRouter = express.Router();

categoryRouter.route('/')
    .get((req,res) => {
        res.send("Express Category Route")
    })

categoryRouter.route('/details')
    .get((req,res) => {
        res.send("Hii From Category Details Route");
    })

module.exports = categoryRouter;