const { request, response } = require('express');
const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'ls-e1041cbd5e7e3afec42e4998862165f8062fad08.cligkavoyphy.us-east-1.rds.amazonaws.com',
    user: 'dbmasteruser',
    password: 'Z)L&Ga1u?Ni?uy$!uq{Ivh4>!!0k>VY[',
    database: 'dbmaster'
  });


connection.connect((error) => {
    if (error) {
      console.error('Erro ao conectar-se ao banco de dados:', error);
    } else {
      console.log('Conexão bem-sucedida ao banco de dados.');
    }
});

app.use(express.json());

app.get('/',(request, response) =>{
    return response.json({message: 'Server is up'});
})

app.get('/teste', (request, response) => {
    // Recupera as informações do banco de dados
    const query = 'SELECT ID, STATUS FROM status_devices ORDER BY id DESC LIMIT 1';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao recuperar informações do banco de dados:', error);
        return response.status(500).json({error: 'Erro ao recuperar informações do banco de dados.'});
      } else {
        console.log('Informações recuperadas com sucesso do banco de dados.');
        const {id, status} = results[0];
        return response.json({id, status});
      }
    });
  });
  

app.post('/teste', (request, response) => {
    const {id, status} = request.body;
    const query = 'INSERT INTO status_devices (ID, STATUS) VALUES (?, ?)';
    connection.query(query, [id, status], (error, results) => {
        if (error) {
          console.error('Erro ao inserir informações no banco de dados:', error);
          return response.status(500).json({error: 'Erro ao inserir informações no banco de dados.'});
        } else {
          console.log('Informações inseridas com sucesso no banco de dados.');
          return response.json({id, status});
        }
      });
})

app.listen(80)