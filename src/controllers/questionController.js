const questionModel = require('../models/questionModel')

module.exports = {
    uploadQuestions : async (req, res) => {
        try {
            req.body.userId = req.params.userId
            let saveData = await questionModel.create(req.body)
            return res.status(201).send({ status: true, msg: "Question uploaded successfully", Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateQuestions : async (req, res) => {
        try {
            let {questionId} = req.params
            let updateData = await questionModel.findByIdAndUpdate(questionId, req.body, {new: true})
            if (!updateData) throw new Error("No Question Found")
            return res.status(200).send({ status: true, msg: "Question updated successfully", Data: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    
}