/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserFollowers, getUserFollowing, userFollowAndUnFollow } from "../controller/Follow";
import { createPost } from "../controller/Post";
import { getUserById, getUserByNameAndEmail, getUserByToken, getUsers, login, register } from "../controller/User";

const resolvers = {
    Query: {
        users: async () => await getUsers(),
        user: async (_: any, data: { id: string }) => await getUserById(data.id),
        userLogin: async (_: any, data: { email: string, password: string }) => login(data.email, data.password),
        userByToken: async (_: any, data: { token: string }) => await getUserByToken(data.token),
        userByNameAndEmail: async (_: any, data: { Text: string }) => await getUserByNameAndEmail(data.Text),
        getUserFollowers: async (_: any, data: { id: string }) => await getUserFollowers(data.id),
        getUserFollowing: async (_: any, data: { id: string }) => await getUserFollowing(data.id),
    },

    Mutation: {
        userRegister: async (_: any, data: { email: string, password: string, avatar: string, name: string }) => await register(data),
        follow: async (_: any, data: { authorId: string, followUserId: string }) => await userFollowAndUnFollow(data.authorId, data.followUserId),
        postCreate: async (_: any, data: { caption: string, images: string[], authorId: string }) => await createPost(data),
    },
    User: {
        followers: async (parent: any) => await getUserFollowers(parent.id),
        following: async (parent: any) => await getUserFollowing(parent.id),
        posts: async (parent: any) => await getUserFollowing(parent.id),
    }
}
export default resolvers;