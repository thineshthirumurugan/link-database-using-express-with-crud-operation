const expRef = require('express')
const refMysql=require('mysql')
const bodyParser = require("body-parser")

const app = expRef()

const db=refMysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"joes_app_node"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
})

app.use(bodyParser.json());

app.listen(2020,()=>{
    console.log("App is running")
})

//Post the record 
app.post('/facultyPost',async(req,res)=>{
    const {ID,CNAME,AGE,CITY} = req.body
    const sql="insert into users values (?,?,?,?);"
    db.query(sql,[ID,CNAME,AGE,CITY],(err,result)=>{
        if (err) {
            res.status(500).json({ "error": err.message })
        }
        else{
            res.status(200).json({ "message": result.affectedRows });
        }
    })
})

//Delete the record 
app.delete('/delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    const sql="delete from users where ID=?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(500).json({error:"Error while deleting the record"})
            return
        }
        if(result.affectedRows==0){
                res.status(404).json({message:"Product not found to delete"})
            return
        }
        res.status(200).json({"message":`${id} has removed from stock`})
    })
})


//Update existing
app.put('/facultyUpdate/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    const {CNAME,AGE,CITY} = req.body
    const sql="update users set CNAME=?,AGE=?,CITY=? where ID=?"
    db.query(sql,[CNAME,AGE,CITY,id],(err,result)=>{
        if(err){
            res.status(500).json({"error": err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({message:"No product found"})
            return
        }
        res.status(200).json({message:`${id} has updated`})
    })
})

