const { request, response } = require("express");
const postmodel = require("../Model/Post.model");



let postcontroll = {
    adds: async (request, response) => {
        let { userId } = request.params;
        let { title, content } = request.body
        if (!userId) {
            return response.status(400).json({
                message: "Can't Access"
            })
        }
        if (!title || !content) {
            return response.status(400).json({
                message: "please fill the feilds"
            })
        }
        try {
            let postcreate = await postmodel.create({ userid: userId, title, content });
            return response.status(201).json({
                message: "Post create",
                postcreate
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }




    },
    allpost: async (request, response) => {
        let { userId } = request.params;
        if (!userId) {
            return response.status(400).json({
                message: "Can't Access"
            })
        }
        try {
            let posts = await postmodel.find({ userid: userId })
            return response.status(200).json({
                message: "all post",
                posts
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }
    },
    updatepost: async (request, response) => {
        let { userId, id } = request.params
        if (!userId || !id) {
            return response.status(400).json({
                message: "you can't do this action"
            })
        }

        try {
            let findproduct = await postmodel.findByIdAndUpdate(id, { $set: { title: request.body.title, content: request.body.content } }, { new: true });
            if (!findproduct) {
                return response.status(400).json({
                    message: "post not found"
                })
            }

            return response.status(200).json({
                message: "post Update",
                findproduct
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }





    },
    Deletpost: async (request, response) => {
        let { userId, id } = request.params
        if (!userId || !id) {
            return response.status(400).json({
                message: "you can't do this action"
            })
        }

        try {
            let findproduct = await postmodel.findByIdAndDelete(id);
            if (!findproduct) {
                return response.status(400).json({
                    message: "post not found"
                })
            }

            return response.status(200).json({
                message: "post Delete successfully",
                findproduct
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message
            })
        }

    }
}


module.exports = postcontroll