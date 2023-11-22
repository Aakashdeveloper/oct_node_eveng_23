let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'ahanda205@gmail.com',
        pass:process.env.PASS
    }
})

let mailOptions = {
    from:'ahanda205@gmail.com',
    to:'ahanda206@hotmail.com',
    subject:'Send From Node Nov 22 email',
    text:"Hello Text",
    html:"<b>Hello World?</b>"
}

transport.sendMail(mailOptions,(err,info) => {
    if(err) console.log(err)
    else{
        console.log(`Email Sent: ${info.response}`)
    }
})