import express  from "express";
import {getData, addData} from './db_function.js'

const app = express()

app.use(express.json())


app.get('/', async(req, res)=>{
    try {
    const data = await getData();
    res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'server error'})
    }
    
})

app.post('/add', async(req,res)=>{
    try {
        const data = req.body
        const addUser = await addData(data)
        if(addUser.length<0){
            res.status(400).json({message: "Not inserted"})
        }
        res.json({message:'Data inserted successfully', data:addUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'server error'})
    }
    
    
})
app.listen(3000, ()=>{
    console.log('services are live');
})