import { Router } from 'express';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import DadosController from './app/controllers/DadosController';

function checkFirstName(req, res, next){
if(!req.body.firstname){ 
    return res.status(400).json({error: "Firstname e requirido"}) 
}
    return next()
}
const routes = new Router();
routes.post('/login', SessionController.store);
routes.post('/admins', AdminController.store);
routes.use(authMiddleware);
routes.put('/admins/:id', AdminController.update);
routes.delete('/admins/:id', AdminController.delete);
routes.post('/dados', checkFirstName, DadosController.store);
routes.put('/dados/:id', DadosController.update);
routes.delete('/dados/:id', DadosController.delete);
routes.get('/dados', DadosController.index);
routes.get('/dados/:id', DadosController.index1)

module.exports = routes;