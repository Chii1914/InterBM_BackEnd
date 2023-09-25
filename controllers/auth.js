import {db} from "../db.js" 
export const register = (req, res)=>{
    //Mirar existencias
    const i = "SELECT * FROM usuario WHERE run = ?"
    db.query(q, [req.body.RUN], (err, data) =>{
        if(err) return res.json(err)
        if(data.lenght) return res.status(409).json("Usuario YA registrado")
    })
}
export const login = (req,res)=>{

}
export const logout = (req,res) =>{

}