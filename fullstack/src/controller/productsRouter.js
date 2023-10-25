let express = require('express');
let productRouter = express.Router();
let {getData} = require('./dbController')


function router(menu){
    productRouter.route('/')
        .get(async (req,res) => {
        let query = {};
        let Products = await getData('products',query)
        res.render('products',{title:'Products Page',data:Products,menu})
    })

    productRouter.route('/list/:id')
        .get(async (req,res) => {
            let id = req.params.id;
            let query = {"category_id":Number(id)};
            let products = await getData('products',query)
            res.render('products',{title:'Products Page',data:products,menu})
        })


    productRouter.route('/details')
        .get((req,res) => {
        res.send("Hii From Products Details Route")
    })

    return productRouter
}


module.exports = router;