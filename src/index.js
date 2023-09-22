import express from "express";
import { getData, addData } from './db_function.js'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    res.json(`Services are live use "/users" to get all user and "/add" use for add users`,)
})

app.get('/users', async (req, res) => {
    try {
        const data = await getData();
        if (data.length === 0) {
            res.json({ message: "No Data Found, Please add data using /add route" })
        } else {
            res.json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server error' })
    }

})

app.post('/add', async (req, res) => {
    try {
        const data = req.body
        const addUser = await addData(data)
        res.json({ message: 'Data inserted successfully', data: addUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server error' })
    }


})
app.listen(3000, () => {
    console.log('services are live');
})