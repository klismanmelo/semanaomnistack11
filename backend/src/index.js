const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);



app.listen(3333);


/**
 * Rota / Recurso
 */

 /**
  * GET: Buscar uma informação no Back-end
  * POST: Criar  uma informação no back-end
  * PUT: Alterar um ainformação no back-end
  * DELETE: Deletar uma informação no back-end
  */

/**
 * Tipo de Parâmetros:
 * 
 * Query Parms: Parâmetros nomeados (name='') enviados na rota após "?" (Filtros, paginação) /users$name='Klisman';
 * Route Params: Parâmetros utilizados para identificar recurso /users/:id
 * Rquest Body: Corpo da Requisição utilizados para Criar/Alterar recursos
 */

 /**
  * Banco de Dados:
  * SQL: MySQL, SQLite;
  * NoSQL: MongoDB, CouchDB;
  * 
  */

  /**
   * Drive: SELECT * FROM users
   * Query Builder: table('users').select('*').where();
   */

