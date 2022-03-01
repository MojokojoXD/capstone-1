const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/home.html'))
})
app.use(express.static(path.join(__dirname,'../public')));

app.listen(port, () => {
    console.log(`Port running on ${port}`)
})