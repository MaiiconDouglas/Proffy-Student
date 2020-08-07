import express from 'express';
import cors from 'cors';
import routes from './routes';


const App = express();

App.use(cors());
App.use(express.json());
App.use(routes);

App.listen(3333);


//Anotação

// GET: Buscar ou listar uma informação
// POST:Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente

//CORPO (REQUEST BODY): Dados para criação ou atualização de um registro 
// ROUTE PARAMS: Identificar qual o recurso eu quero atualizar ou deletar
// QUERY PARAMS: Paginação, filtros, ordenação