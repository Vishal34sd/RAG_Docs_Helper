import express from 'express';
import cors from "cors" ;



const app = express();


app.use(
    cors({
        origin :['http://localhost:3000'],
        methods : ['POST' , 'DELETE' , 'GET' , 'OPTIONS'],
        allowedHeaders : ['Content-Type ' , 'Authorization'],
        credentials : false
    })
)

app.use(express.json());



const PORT = process.env.PORT ;

app.listen(PORT , ()=>{
    console.log("Server is running on port 5000")
})