const expRef = require('express')
const refMysql=require('mysql')
const newapp = require('./subFile')
const app = expRef()

const db=refMysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"mec_project"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
})


app.listen(2020,()=>{
    console.log("App is running")
})

app.get('/hi',async(req,res)=>{
    res.send("main file")
})

app.use('/info',newapp)

