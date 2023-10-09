let fs = require('fs')

// fs.writeFile('myFile.txt','My Code Node Js App',function(){
//     console.log('File Created')
// })

// fs.appendFile('Mycode.txt','Code for FS \n',function(){
//     console.log('File Appended')
// })

// fs.readFile('myFile.txt','utf-8',function(err,data){
//     if(err) throw err;
//     console.log(data)
// })

// let data = fs.readFileSync('db.json',{encoding:'utf-8',flag:'r'})
// console.log(">>>",data)

// let data1 = fs.readFileSync('myFile.txt',{encoding:'utf-8',flag:'r'})
// console.log(">>>",data1)

// fs.rename('Mycode.txt','Mytext.txt',function(err){
//     if(err) throw err
//     console.log("File Renamed")
// })


fs.unlink('Mytext.txt',function(err){
    if(err) throw err
    console.log("File Deleted")
})