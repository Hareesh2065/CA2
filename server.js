import express from "express";
import axios from "axios";

const PORT = 5050;
const BASE_URL = "https://t4e-testserver.onrender.com/api";

const app = express();
let dataset = [];

const loadData = async () => {
    try{
        const response = await axios.post(`${BASE_URL}/public/token`, {
        "studentId": "E0323004",
        "set": "setA",
        "password":"425057"
    });
    
    const token = response.data.token;
    const dataUrl = response.data.dataUrl;

    const dataResponse = await axios.get(`${BASE_URL}${dataUrl}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    dataset = dataResponse.data.data;

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });

    }catch(err){
        console.log(err)
    }
    
}

loadData();

app.get('/', (req, res) => {
    res.json(dataset);
});
