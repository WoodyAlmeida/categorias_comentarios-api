import express = require('express');
import UserController from './controllers/UserController';

const routes = express.Router();

routes.get('/', (req, res) => {
    let hash = require('child_process').execSync('git rev-parse HEAD');
    res.send(`<pre>API Running</pre>`);
});
routes.get('/user/:id', UserController.getUser);

export default routes;