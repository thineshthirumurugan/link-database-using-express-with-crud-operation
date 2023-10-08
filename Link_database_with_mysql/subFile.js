const expRef = require('express')

const app = expRef.Router()

app.get('/insert',async(req,res)=>{
    res.send("subfile")
})

module.exports = app
 