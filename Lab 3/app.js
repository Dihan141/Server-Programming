const express = require('express')
const { logRequest } = require('./middleware')
const router = require('./routes')
const fs = require('fs')
const app = express()
app.use(router)


app.get("/middleware", logRequest, (req, res) => {
    console.log("First middleware implemented")
})

app.get("/", (req, res)=>{
    res.send("Welcome, user")
})

app.get("/data", (req, res)=>{
    fs.readFile("./data.json", "utf-8", (err, data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

app.post("/data", (req, res)=>{
    fs.writeFile("./data.json", req.body, (req, res)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("Write successful")
        }
    })
})

app.listen(5000, ()=>{
    console.log("Listening....")
})
