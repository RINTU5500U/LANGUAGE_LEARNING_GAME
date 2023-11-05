const express = require("express")
const router = express.Router()

const {createUser, login, updateUser, deleteUser} = require('../controllers/userController')
const {uploadQuestions, updateQuestions} = require('../controllers/questionController')
const {showQuestion, submitAnswer, checkLeaderBoard} = require('../controllers/gameController')
const {authentication, authorization, adminAuthorization} = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/login', login)
router.put('/updateUser/:userId', authentication, authorization, updateUser)
router.delete('/deleteUser/:userId', authentication, authorization, deleteUser)

router.post('/uploadQuestions/:userId', authentication, adminAuthorization, uploadQuestions)
router.put('/user/:userId/updateQuestions/:questionId', authentication, authorization, adminAuthorization, updateQuestions)

router.post('/showQuestion/:userId', authentication, showQuestion)
router.put('/user/:userId/submitAnswer/:questionId', authentication, authorization, submitAnswer)
router.get('/checkLeaderBoard', authentication, checkLeaderBoard)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router
