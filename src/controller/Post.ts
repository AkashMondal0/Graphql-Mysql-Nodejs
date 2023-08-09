/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import uuid4 from "uuid4"
import { Like, Post, Comment, Image } from "../db/model/Post"

// Post
const getUserAllPosts = async (id: string) => {
    try {
        const posts = await Post.findAll({ where: { authorId: id } })
        return posts
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const getPostImages = async (postId: string) => {
    try {
        let url = []
        const images = await Image.findAll({ where: { postId } })
        for (let i = 0; i < images.length; i++) {
            url.push(images[i].dataValues.imageUrl)
        }
        return url
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const getPost = async (id: string) => {
    try {
        const post = await Post.findOne({ where: { id } })
        return post
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const getPosts = async () => {
    try {
        const posts = await Post.findAll()
        return posts
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const createPost = async (data: { caption: string, images: string[], authorId: string }) => {

    try {
        const PID = uuid4()
        await Post.create({
            caption: data.caption,
            images: "images",
            authorId: data.authorId,
            id: PID
        })

        for (let i = 0; i < data.images.length; i++) {
            await Image.create({
                postId: PID,
                imageUrl: data.images[i],
                authorId: data.authorId,
                id: uuid4()
            })
        }

        return "Post created"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const updatePost = async (data: {
    id: string, caption: string, images: string[]
}) => {
    try {
        await Post.update({
            caption: data.caption
        }, { where: { id: data.id } })
        return "Post updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const deletePost = async (postId: string) => {
    try {
        await Post.destroy({ where: { id: postId } })
        return "Post deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
// Like 
const createLikeAndDisLike = async (postId: string, authorId: string) => {

    try {
        const [alreadyLike] = await Like.findAll({ where: { postId, authorId } })
        if (alreadyLike) {
            await Like.destroy({ where: { postId, authorId } })
            return "Like deleted"
        } else {
            await Like.create({
                reaction: true,
                authorId: authorId,
                postId: postId
            })
            return "Like Added"
        }
    } catch (error) {
        console.log("Something went wrong")
        return new Error("Something went wrong")
    }
}

const getPostLikes = async (postId: string) => {
    try {
        const likes = await Like.findAll({ where: { postId } })
        return likes
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
// Comment
const getPostComment = async (postId: string) => {
    try {
        const comments = await Comment.findAll({
            where: { postId }
        })
        return comments
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const createComment = async (postId: string, authorId: string, content: string) => {
    try {
        await Comment.create({
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
const updateComment = async (postId: string, content: string) => {
    try {
        await Comment.update({ content }, { where: { postId } })
        return "Comment updated"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}
const deleteComment = async (postId: string) => {
    try {
        await Comment.destroy({ where: { postId } })
        return "Comment deleted"
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong")
    }
}

export {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    getUserAllPosts,
    createLikeAndDisLike,
    getPostLikes,
    createComment,
    updateComment,
    deleteComment,
    getPostComment,
    getPostImages
}
