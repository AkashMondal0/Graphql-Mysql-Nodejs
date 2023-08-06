import uuid4 from "uuid4"
import { Post } from "../db/model/Post"

/* eslint-disable @typescript-eslint/no-unused-vars */
const createPost = async (data: { caption: string, images: string[], authorId: string }) => {
    await Post.create({
        caption: data.caption,
        images: "coming soon",
        authorId: data.authorId,
        id: uuid4()
    })
    return "Post created"
}
const updatePost = async () => {

}
const deletePost = async () => { }
const getPost = async () => {

}
const getPosts = async () => {
    const posts = await Post.findAll()
    return posts
}



export {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts
}
