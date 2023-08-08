/* eslint-disable @typescript-eslint/no-unused-vars */
import uuid4 from "uuid4"
import { Like, Post, Comment } from "../db/model/Post"

// Post
const getUserAllPosts = async (id: string) => {
    const posts = await Post.findAll({ where: { authorId: id } })
    return posts
}
const getPost = async (id: string) => {
    const post = await Post.findOne({ where: { id } })
    return post
}
const getPosts = async () => {
    const posts = await Post.findAll()
    return posts
}
const createPost = async (data: { caption: string, images: string[], authorId: string }) => {
    await Post.create({
        caption: data.caption,
        images: "coming soon",
        authorId: data.authorId,
        id: uuid4()
    })
    return "Post created"
}
const updatePost = async (data: {
    id: string, caption: string, images: string[]
}) => {
    await Post.update({
        caption: data.caption,
        images: "coming soon",
    }, { where: { id: data.id } })
    return "Post updated"
}
const deletePost = async (postId: string) => {
    await Post.destroy({ where: { id: postId } })
    return "Post deleted"
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
    }
}

const getPostLikes = async (postId: string) => {
    const likes = await Like.findAll({ where: { postId } })
    return likes
}
// Comment
const getPostComment = async (postId: string) => {
    const comments = await Comment.findAll({
        where: { postId }
    })
    return comments
}
const createComment = async (postId: string, authorId: string, content: string) => {
    await Comment.create({
        content,
        postId,
        authorId,
    })
    return "Comment added"
}
const updateComment = async (postId: string, content: string) => {
    await Comment.update({ content }, { where: { postId } })
    return "Comment updated"
}
const deleteComment = async (postId: string) => {
    await Comment.destroy({ where: { postId } })
    return "Comment deleted"
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
}
