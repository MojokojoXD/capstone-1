const express = require('express');
const controller = require('./controller')
const cors = require('cors')
const seedPath = require('./seed')
const path = require('path')
const app = express();
const port = process.env.PORT || 5000
app.use(express.json());
// app.use(cors());


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/home.html'))
})
app.use(express.static(path.join(__dirname,'../public')));

app.post('/api/client', controller.storeClient);
app.put('/api/client_rep/:user_email', controller.clientRep_populate);
app.delete('/api/bank_trace/:bank_rep',controller.rep_client_rm);

app.get('/api/seed', seedPath.seed);
app.get('/api/seedBank', seedPath.seedBanks);

app.listen(port, () => {
    console.log(`Port running on ${port}`)
})