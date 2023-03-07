const { request, response } = require('express');
const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'database-blk.ctmgzsdownph.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Casa0812!',
    database: 'dbBlk'
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
    const query = 'SELECT name, date FROM mytable ORDER BY id DESC LIMIT 1';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao recuperar informações do banco de dados:', error);
        return response.status(500).json({error: 'Erro ao recuperar informações do banco de dados.'});
      } else {
        console.log('Informações recuperadas com sucesso do banco de dados.');
        const {name, date} = results[0];
        return response.json({name, date});
      }
    });
  });
  

app.post('/teste', (request, response) => {
    const {name, date} = request.body;
    const query = 'INSERT INTO mytable (name, date) VALUES (?, ?)';
    connection.query(query, [name, date], (error, results) => {
        if (error) {
          console.error('Erro ao inserir informações no banco de dados:', error);
          return response.status(500).json({error: 'Erro ao inserir informações no banco de dados.'});
        } else {
          console.log('Informações inseridas com sucesso no banco de dados.');
          return response.json({name, date});
        }
      });
})

app.listen(3333)