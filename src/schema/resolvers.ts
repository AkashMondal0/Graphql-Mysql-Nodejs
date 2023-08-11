/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserFollowers, getUserFollowing, userFollowAndUnFollow } from "../controller/Follow";
import { createComment, createLikeAndDisLike, createPost, deletePost, getPost, getPostComment, getPostImages, getPostLikes, getPosts, getUserAllPosts, updatePost } from "../controller/Post";
import { createUserStatus, deleteUserStatus, getStatusSeenUsers, getUserAllStatus, updateSeenStatus } from "../controller/Status";
import { deleteUser, getUserById, getUserByNameAndEmail, getUserByToken, getUsers, login, register, updateUser } from "../controller/User";

const resolvers = {
    Query: {
        // user queries
        users: async () => await getUsers(),
        user: async (_: any, data: { id: string }) => await getUserById(data.id),
        userLogin: async (_: any, data: { email: string, password: string }) => login(data.email, data.password),
        userByToken: async (_: any, data: { token: string }) => await getUserByToken(data.token),
        userByNameAndEmail: async (_: any, data: { Text: string }) => await getUserByNameAndEmail(data.Text),
        getUserFollowers: async (_: any, data: { id: string }) => await getUserFollowers(data.id),
        getUserFollowing: async (_: any, data: { id: string }) => await getUserFollowing(data.id),

        // post queries
        posts: async () => await getPosts(),
        post: async (_: any, data: { id: string }) => await getPost(data.id),
    },

    Mutation: {
        // user mutations
        userRegister: async (_: any, data: { email: string, password: string, avatar: string, name: string }) => await register(data),
        follow: async (_: any, data: { authorId: string, followUserId: string }) => await userFollowAndUnFollow(data.authorId, data.followUserId),
        userUpdate: async (_: any, data: { id: string, name: string, email: string, password: string, bio: string, website: string, avatar: string }) => await updateUser(data),
        userDelete: async (_: any, data: { id: string }) => await deleteUser(data.id),
        // post mutations
        postCreate: async (_: any, data: { caption: string, images: string[], authorId: string }) => await createPost(data),
        postUpdate: async (_: any, data: { id: string, caption: string, images: string[] }) => await updatePost(data),
        postDelete: async (_: any, data: { id: string }) => await deletePost(data.id),
        createLikeAndDisLike: async (_: any, data: { postId: string, authorId: string }) => await createLikeAndDisLike(data.postId, data.authorId),
        createComment: async (_: any, data: { postId: string, authorId: string, content: string }) => await createComment(data.postId, data.authorId, data.content),
        // status mutations
        statusCreate: async (_: any, data: { caption: string, image: string, authorId: string }) => await createUserStatus(data),
        statusSeenUpdate: async (_: any, data: { statusId: string, userId: string }) => await updateSeenStatus(data),
        statusDelete: async (_: any, data: { id: string }) => await deleteUserStatus(data.id),
        statusCreateComment: async (_: any, data: { statusId: string, authorId: string, content: string }) => await createComment(data.statusId, data.authorId, data.content),
    },
    // user
    User: {
        followers: async (parent: any) => await getUserFollowers(parent.id),
        following: async (parent: any) => await getUserFollowing(parent.id),
        posts: async (parent: any) => await getUserAllPosts(parent.id),
        status: async (parent: any) => await getUserAllStatus(parent.id),
    },
    // post 
    Post: {
        author: async (parent: any) => await getUserById(parent.authorId),
        likes: async (parent: any) => await getPostLikes(parent.id),
        comments: async (parent: any) => await getPostComment(parent.id),
        images: async (parent: any) => await getPostImages(parent.id),
    },
    Like: {
        User: async (parent: any) => await getUserById(parent.authorId),
    },
    Comment: {
        User: async (parent: any) => await getUserById(parent.authorId),
    },
    // status
    Status: {
        seenUsers: async (parent: any) => await getStatusSeenUsers(parent.id),
        comments: async (parent: any) => await getPostComment(parent.id),
    }
}
export default resolvers;