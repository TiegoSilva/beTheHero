const express = require('express');
const router = express.Router();

const OngController = require("./controllers/OnController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")

router.get('/list_ongs', OngController.list_ongs);
router.post('/ongs', OngController.create);

router.get('/list_incidents', IncidentController.list_incidents);
router.post('/incidents', IncidentController.create);
router.delete('/delete_incident/:id', IncidentController.delete);

router.get('/specific_incidents', ProfileController.list_cases);

router.post('/session', SessionController.create);

router.get('/', (req, res) => {
  return res.json({
      "status": "success",
      "message": "http://localhost:3000/"
  })
});

module.exports = router;