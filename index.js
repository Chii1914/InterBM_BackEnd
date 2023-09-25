import express from "express"

const app = express()

app.use(express.json())

app.get("/test", (req, res) =>{
    res.json("disen")
})

app.listen(3306, ()=>{
    console.log("Conectado")
})