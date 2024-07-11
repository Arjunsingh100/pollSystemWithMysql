const express = require('express');
const { getPollsController, storePollResponseController } = require('../Controllers/userController');
const { requireSignIn } = require('../middlewares/auththenticationMiddleware');
const router = express.Router();

//route to get all polls to users
router.get('/getAllPolls/:email', requireSignIn, getPollsController)
//store pollResponse router
router.post('/submitPollResponse',storePollResponseController)


module.exports = router;