const express = require('express');
const router = express.Router();
const fs = require('fs');

/* Agency routes */
router.use('/agency', function (req, res, next) {
    const agencyController = require('../controllers/agency.controller.js');
    router.get('/agency', agencyController.getAgencies);
    router.post('/agency', agencyController.createAgency);
    router.get('/agency/:Id', agencyController.fetchAgencyDetails);
    router.put('/agency/:Id', agencyController.updateAgencyDetails);
    router.delete('/agency/:Id', agencyController.deleteAgency);
    next();
});

/* Client routes */
router.use('/client', function (req, res, next) {
    const clientController = require('../controllers/client.controller.js');
    router.get('/client', clientController.getClients);
    router.post('/client', clientController.createClient);
    router.get('/client/:clientId', clientController.fetchClientDetails);
    router.put('/client/:clientId', clientController.updateClientDetails);
    router.delete('/client/:clientId', clientController.deleteClient);
    next();
});

/* Client routes */
router.use('/data', function (req, res, next) {
    const clientController = require('../controllers/client.controller.js');
    const dataController = require('../controllers/data.controller');
    router.post('/data', dataController.createAgencyandClient);
    router.get('/data/:agencyName', dataController.getTopClientDetails);
    next();
});


module.exports = router;