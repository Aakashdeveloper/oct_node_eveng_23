let express = require('express');
const { getData } = require('./dbController');
let categoryRouter = express.Router();

function router(menu){
    
    categoryRouter.route('/')
    .get(async(req,res) => {
        let query = {};
        let data = await getData('category',query)
        res.render('category',{title:'Category Page',data:data,menu})
    })

    categoryRouter.route('/details')
    .get((req,res) => {
        res.send("Hii From Category Details Route");
    })

    return categoryRouter
}



module.exports = router;