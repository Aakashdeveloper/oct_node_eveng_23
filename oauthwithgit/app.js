let express = require('express');
let app = express();
let superagent = require('superagent');
let cors = require('cors');
let request = require('request');
let port = process.env.PORT || 8911;
app.use(cors());

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=c2f93717fcae0ccb52cd">Login With Git</a>')
});


app.get('/profile',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:'Code is required'
        })
    };

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'c2f93717fcae0ccb52cd',
            client_secret:'b73ea28b2fce5aac879b6dba1fa356dc16533f9a',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let access_token = result.body.access_token;
            const option = {
                uri:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization': `Bearer ${access_token}`,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body) => {
                res.send(body)
            })
        })
});

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})