const express = require('express')
const os = require('os')
const { logRequest, apiKeyMiddleware } = require('./middleware')
const router = require('./routes')
const fs = require('fs')
const PORT = 3000
const app = express()
app.use(router)

app.get("/authorization", apiKeyMiddleware, (req, res)=>{
    res.send("Authorization complete")
})


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
    fs.writeFile("./data.json", JSON.stringify(req.body), (err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("Write successful!")
        }
    })
})

app.put("/data", (req, res) => {
    const newData = req.body;

    fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        
        const existingData = JSON.parse(data)
        Object.assign(existingData, newData)

        fs.writeFile("./data.json", JSON.stringify(existingData), (err) => {
            if (err) {
                res.send(err);
                return;
            }

            res.send("Append successful");
        });
    });
});

app.delete("/data", (req, res)=>{
    fs.unlink("./data.json", (err)=>{
        if(err){
            res.send(err)
            return
        }

        res.send("Deleted successfully!!")
    })
})

app.get("/os-info", (req, res)=>{
    fs.readFile("./os-data.json", "utf-8", (err, data)=>{
        if(err){
            res.send(err)
            return
        }

        if(data){
            res.send(data)
            return
        }

        const osInfo = {
            name: os.type(),
            release: os.release(),
            totalmem: os.totalmem(),
            freemem: os.freemem()
        }

        fs.writeFile("./os-data.json", JSON.stringify(osInfo, null, 2), (err)=>{
            if(err){
                res.send(err)
                return
            }

            res.send("OS info stored")
        })
    })
})

app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`)
})
