let fs = require('fs')

fs.writeFile('myFile.txt','My Code Form Fs',function(){
    console.log('File Created')
})