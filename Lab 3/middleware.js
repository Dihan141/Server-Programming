const logRequest = (req, res, next)=>{
    res.send(`Request recieved from: ${req.ip}, method: ${req.method}, URL: ${req.url}`)
    next()
}

const apiKeyMiddleware = (req, res, next)=>{
    const apikey = req.query.apikey

    if(!apikey || apikey != 123){
        res.status(401).json({error: "You are not authorized!"})
    }
}

module.exports = {
    logRequest,
    apiKeyMiddleware
}