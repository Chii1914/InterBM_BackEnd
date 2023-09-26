import {db} from "../db.js" 
import bcrypt from "bcryptjs"

export const register = (req, res)=>{
    //Mirar existencias
    const q = "SELECT * FROM usuario WHERE RUN = ?"
    db.query(q, [req.body.RUN], (err, data) =>{
        if(err) return res.json(err)
        if(data.lenght) return res.status(409).json("Usuario YA registrado")

        //Hash the password and create user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO usuario (RUN, password) VALUES (?)"
        const values = [
            req.body.RUN,
            hash,
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return res.json(err);
            return res.status(200).json("Usuario ingresado")
        })
    })
}
export const login = (req,res)=>{

}
export const logout = (req,res) =>{

}