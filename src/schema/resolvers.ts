/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUser, getUsers ,register, userFollow} from "../controller/User";

const resolvers = {
    Query: {
        users: async () => await getUsers(),
        user: async (_: any, data: string) => await getUser(data),
    },

    Mutation: {
        userRegister: async (_: any, uid: any) => await register(uid),
        follow: async (_: any, data: any) => await userFollow(data),
    }
}
export default resolvers;