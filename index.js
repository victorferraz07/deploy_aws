const { request, response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/',(request, response) =>{
    return response.json({message: 'Server is up'});
})

app.get('/teste',(request, response) =>{
    return response.send();
})

app.post('/teste', (request, response) => {
    const {name, date} = request.body;
    return response.json({name, date});
})

app.listen(3333)