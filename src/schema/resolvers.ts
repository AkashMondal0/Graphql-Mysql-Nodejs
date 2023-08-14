/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import uuid4 from "uuid4";
import { createComment, deleteComment, getComments, updateComment } from "../controller/Comment.controller";
import { CreateAndAddMessage, DeleteConversation, DeleteMessage, UpdateConversation, addUserToConversation, createConversation, findUserConversation, removeUserFromConversation } from "../controller/Conversation";
import { createPost, deletePost, getAllPosts, getPostById, getPostsByAuthorId, likeAndDisLikePost, updatePost } from "../controller/Post.controller";
import { createUserStatus, deleteUserStatus, getUserAllStatus, updateSeenStatus } from "../controller/Status";
import { deleteUser, getUserById, getUserByNameAndEmail, getUserByToken, getUsers, login, register, updateUser } from "../controller/User";
import { MessagesType } from "../interface/MessageTypes";
import { PostType } from "../interface/Post";
import { createConversationType } from "../interface/User";
import pubsub from "./pubsub";

const messages: any = [];

const resolvers = {
    Query: {
        //! user queries
        users: async () => await getUsers(),
        user: async (_: any, data: { id: string }) => await getUserById(data.id),
        userLogin: async (_: any, data: { email: string, password: string }) => login(data.email, data.password),
        userLoginByToken: async (_: any, data: { token: string }) => await getUserByToken(data.token),
        userByNameAndEmail: async (_: any, data: { Text: string }) => await getUserByNameAndEmail(data.Text),

        //! conversation queries
        conversation: async (_: any, data: { userId: string }) => await findUserConversation(data.userId),

        //! post queries
        posts: async (): Promise<PostType[]> => await getAllPosts() as PostType | any,
        postById: async (_: any, data: { id: string }): Promise<PostType> => await getPostById(data.id) as PostType | any,

        //! chat queries

    },

    Mutation: {
        //! user mutations
        userRegister: async (_: any, data: { email: string, password: string, avatar: string, name: string }) => await register(data),
        // follow: async (_: any, data: { authorId: string, followUserId: string }) => await userFollowAndUnFollow(data.authorId, data.followUserId),
        userUpdate: async (_: any, data: { id: string, name: string, email: string, password: string, bio: string, website: string, avatar: string }) => await updateUser(data),
        userDelete: async (_: any, data: { id: string }) => await deleteUser(data.id),

        //! conversation mutations
        conversationsCreate: async (_: any, data: createConversationType) => await createConversation(data),
        conversationsUpdate: async (_: any, data: createConversationType) => await UpdateConversation(data),
        conversationsDelete: async (_: any, data: { conversationId: string }) => await DeleteConversation(data.conversationId),
        conversationsMessageDataDelete: async (_: any, data: { conversationId: string, messageId: string[] }) => await DeleteMessage(data.conversationId, data.messageId),
        conversationsAddUsers: async (_: any, data: { conversationId: string, usersId: string[] }) => await addUserToConversation(data),
        conversationsRemoveUsers: async (_: any, data: { conversationId: string, usersId: string[] }) => await removeUserFromConversation(data),
        conversationsMessageDataUpdate: async (_: any, data: MessagesType) => await CreateAndAddMessage(data),

        //! post mutations
        postCreate: async (_: any, data: { caption: string, images: string[], authorId: string }) => await createPost(data),
        postUpdate: async (_: any, data: { id: string, caption: string, images: string[] }) => await updatePost(data),
        postDelete: async (_: any, data: { id: string }) => await deletePost(data.id),
        //! post comment mutations
        postLikeAndDisLike: async (_: any, data: { postId: string, authorId: string }) => await likeAndDisLikePost(data.postId, data.authorId),
        postCommentCreate: async (_: any, data: { postId: string, authorId: string, content: string }) => await createComment(
            data.postId,
            data.authorId,
            data.content
        ),
        postCommentUpdate: async (_: any, data: { commentId: string, content: string }) => await updateComment(data.commentId, data.content),
        postCommentDelete: async (_: any, data: { commentId: string }) => await deleteComment(data.commentId),

        //! status mutations
        statusCreate: async (_: any, data: { caption: string, image: string, authorId: string }) => await createUserStatus(data),
        statusSeenUpdate: async (_: any, data: { statusId: string, userId: string }) => await updateSeenStatus(data.statusId, data.userId),
        statusDelete: async (_: any, data: { id: string }) => await deleteUserStatus(data.id),
        statusCreateComment: async (_: any, data: { statusId: string, authorId: string, content: string }) => await createComment(
            data.statusId,
            data.authorId,
            data.content
        ),
        //! chat
        sendMessage: (_: any, { text, senderId, receiverId, replyId ,roomId}: any) => {
            const message = {
                id: uuid4(),
                text,
                senderId,
                receiverId,
                images: [],
                replyId:"",
                roomId,
                createdAt: new Date().toISOString(),
            };

            // messages.push(message); // save message to database message array
            pubsub.publish('MESSAGE_SENT', { LiveChatRoom: message });

            return message;
        },
    },
    Subscription: {
        LiveChatRoom: {
            subscribe: (_: any, { userId }: any) => {
                console.log('receiverId', userId)
                return pubsub.asyncIterator('MESSAGE_SENT');
            },
        },
    },

    // user
    User: {
        status: async (parent: any) => await getUserAllStatus(parent.id),
        conversations: async (parent: any) => await findUserConversation(parent.id),
        posts: async (parent: any) => await getPostsByAuthorId(parent.id),
    },
    // post 
    Post: {
        author: async (parent: any) => await getUserById(parent.authorId),
        comments: async (parent: any) => await getComments(parent.id),
    },
    Status: {
        comments: async (parent: any) => await getComments(parent.id),
    }
}
export default resolvers;