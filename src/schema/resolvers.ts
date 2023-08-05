/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserById, getUserByNameAndEmail, getUserByToken, getUsers, login, register, userFollow } from "../controller/User";

const resolvers = {
    Query: {
        users: async () => await getUsers(),
        user: async (_: any, data: { uid: string }) => await getUserById(data.uid),
        userLogin: async (_: any, data: { email: string, password: string }) => login(data.email, data.password),
        userByToken: async (_: any, data: { token: string }) => await getUserByToken(data.token),
        userByNameAndEmail: async (_: any, data: { Text: string }) => await getUserByNameAndEmail(data.Text),
    },

    Mutation: {
        userRegister: async (_: any, data: { email: string, password: string, avatar: string, name: string }) => await register(data),
        follow: async (_: any, data: { authorId: string, followUserId: string }) => await userFollow(data.authorId, data.followUserId),
    }
}
export default resolvers;