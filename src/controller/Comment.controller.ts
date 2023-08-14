import uuid4 from "uuid4"
import { PostComment } from "../db/model/Post"

// Comment
const getComments = async (id: string) => {
    try {
        const comments = await PostComment.findAll({
            where: { postId: id }
        })
        return comments
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const createComment = async (postId: string, authorId: string, content: string) => {
    try {
        await PostComment.create({
            id: uuid4(),
            content,
            postId,
            authorId,
        })
        return "Comment added"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

const updateComment = async (id: string, content: string) => {
    try {
        await PostComment.update({ content }, { where: { id } })
        return "Comment updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const deleteComment = async (id: string) => {
    try {
        await PostComment.destroy({ where: { id } })
        return "Comment deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}


export {
    getComments,
    createComment,
    updateComment,
    deleteComment
}