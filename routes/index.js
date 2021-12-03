const express = require('express');
// const cors = require('cors');

const soulsRoutes = require('./souls.js');
const minionsRoutes = require('./minions.js');

const router = express.Router();

router.get('/souls', soulsRoutes.soulsGetAll);
router.get('/souls/count', soulsRoutes.soulsCountSouls);
router.post('/souls', soulsRoutes.soulsPostSoul);
router.delete('/souls', soulsRoutes.soulsDeleteSouls);
router.delete('/souls/:amount', soulsRoutes.soulsDeleteRandomSouls);
router.get('/minions', minionsRoutes.minionsGetAll);
router.get('/minions/:type', minionsRoutes.minionsGetByType);
router.post('/minions', minionsRoutes.minionsPostMinion);
router.delete('/minions', minionsRoutes.minionsDeleteMinion);

module.exports = router;