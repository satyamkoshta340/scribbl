const { Router } = require('express');
const Controller = require('./controller');

const router = Router();
router.post("/sessions", Controller.CreateSession);

module.exports = router;