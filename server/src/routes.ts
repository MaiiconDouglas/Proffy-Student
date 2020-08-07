import express from 'express';
import ClassesController from './controllers/ClassesController';

const routes = express.Router();  // modulo de roteamento do express
const classesControllers = new ClassesController();

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

export default routes;
