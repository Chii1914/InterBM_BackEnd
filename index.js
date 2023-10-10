import express from "express"
import postRoutes from "./routes/post.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cors from 'cors';
import morgan from 'morgan';
const app = express()



app.use(express.json())
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(9900, ()=>{
    console.log("Conectado")
})
const corsOptions = {
    credentiasl: true,
    optionSuccessStatus:200,
    methods: "GET, PUT, POST, DELETE",
    origin: '*'
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json({limit: '500MB'}));
app.use(express.urlencoded({extended:true}));