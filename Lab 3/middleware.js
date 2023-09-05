const logRequest = (req, res, next)=>{
    res.send(`Request recieved from: ${req.ip}, method: ${req.method}, URL: ${req.url}`)
    next()
}

module.exports = {
    logRequest
}