const fs = require('fs')
 console.log("Before...")

 fs.readFile("./text", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(data)
    }
 })

 fs.appendFile("./text", "\nNice to meet you", (err, data) => {
    if(err){
        console.log(error)
    }
    else{
        console.log("After...")
    }
 })

 fs.readFile("./text", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(data)
    }
 })