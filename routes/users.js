var express = require('express');
var router = express.Router();
var router = express.Router();
var cors = require('cors');

const Session = require('../models/Session');


/* this is required to store the session_token after we send the request to another doamain ex : localhost:3000 */

router.use(cors({ origin: 'http://localhost:3000' }));


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/checkauthentification', async (req, res, next) => {
  var session_data = null;
  var session = await Session.init();
  var sessions = await session.findAll();
  var sess
  for (sess of sessions) {
    session_data = sess.data;
    session_data = JSON.parse(session_data);
    if (!session_data.email) {
      console.log("Not Authenticated")
      return res.json({
        "message": "Not Authenticated"
      });
    } else {
      return res.json({
        "message": "Authenticated"
      });
    }

  }
  return res.json({
    "message": "Not Authenticated"
  });
});

module.exports = router;
