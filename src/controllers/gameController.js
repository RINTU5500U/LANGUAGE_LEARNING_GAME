const questionModel = require('../models/questionModel')
const scoreModel = require('../models/scoreModel')

module.exports = {
    showQuestion : async (req, res) => {
        try {
            let userId = req.params.userId
            let level = await scoreModel.findOne({userId: userId}).select({ scores: 1, highestLvl: 1, _id: 0})

            if (level.scores[level.scores.length - 1] >= 50) {
                let question = await questionModel.findOne({ level: level.highestLvl + 1 }).select({ level: 1, questions: 1, _id: 0})
                return res.status(200).send({ status: true, message:  question})
            } else if (level.scores[level.scores.length - 1] < 50 && level.scores[level.scores.length - 1] > 35 ) {
                let question = await questionModel.findOne({ level: level.highestLvl }).select({ level: 1, questions: 1, _id: 0})
                return res.status(200).send({ status: true, message:  question})
            } else {
                let question = await questionModel.findOne({ level: level.highestLvl - 1 }).select({ level: 1, questions: 1, _id: 0})
                return res.status(200).send({ status: true, message:  question})
            }
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    submitAnswer : async (req, res) => {
        try {
            let {userId, questionId} = req.params
            let question = await questionModel.findById(questionId).select({questions: 1, answers: 1, scores: 1, level: 1, _id: 0})
            console.log(question)
            let {answer} = req.body
            let newScore = 0
            let totalScore = 0
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] != question.answers[i]) {
                    newScore += 0
                } else {
                    newScore += question.scores[i]
                }
                totalScore += question.scores[i]
            }
            let percentage = Math.round((newScore / totalScore)*100)
            let updateData = {
                highestLvl: question.level ,
                $push: { scores: percentage } ,
                $inc: { finalScore: +percentage }
            }
            console.log(newScore, totalScore, updateData.finalScore)
            await scoreModel.updateOne({userId}, updateData, {upsert : true})
            return res.status(200).send({ status: true, message: 'Answer submitted successfully', LatestScore : `Your latest score is ${percentage}%`})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }, 

    checkLeaderBoard : async (req, res) => {
        try {
            // let {userId} = req.params
            // let data = await scoreModel.findOne({_id: userId}).select('finalScore')
            const highestScores = await scoreModel.find().sort({ finalScore: -1, highestLvl: -1 }).populate('userId',{name : 1, _id :0}).select({ _id : 0, finalScore: 1, highestLvl: 1})
            return res.status(200).send({ status: true, message: highestScores })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}




