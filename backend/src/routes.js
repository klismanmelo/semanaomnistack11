const express = require('express');


const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const PrpfileController = require('./controllers/PrpfileController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**LOGIN */

routes.post('/session', SessionController.create);

/**ONGS */

routes.get('/ongs',OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', PrpfileController.index);

/**CASOS */

routes.post('/incidents', IncidentController.create);
routes.get('/incidents',IncidentController.index);
routes.delete('/incidents/:id',IncidentController.delete);



module.exports = routes;