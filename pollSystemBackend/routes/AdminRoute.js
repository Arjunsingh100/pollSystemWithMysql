const express = require('express');
const { getAllUsers, deleteUser, createPoll, getAllPolls, getAllPollResponsesController, pollOptionsController } = require('../Controllers/AdminControler');
const router = express.Router();
const { isAdmin,requireSignIn } = require('../middlewares/auththenticationMiddleware.js');


router.get('/getAllUsers/:email',requireSignIn, isAdmin, getAllUsers);
//router to delete a user
router.delete('/deleteUser/:email/:Uid',requireSignIn,isAdmin,deleteUser);
//create a poll
router.post('/createPoll/:email',requireSignIn,isAdmin,createPoll);
//all polls
router.get('/allPolls/:email',requireSignIn,isAdmin,getAllPolls);
//get all pollResponses route
router.get('/getallResponses/:email/:pollId',requireSignIn,isAdmin,getAllPollResponsesController);
//get poll options Route
router.get('/getPollOption/:pollId',requireSignIn,pollOptionsController)

module.exports=router;