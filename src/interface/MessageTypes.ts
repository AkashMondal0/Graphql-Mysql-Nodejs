
export interface reply {
    id: string
    message: string
    img: [] | null
    video: string | null
    messageId: string | null
    authorId: string
}

export interface img {
    src: string[]
    caption: string
}

export const initialReply: reply = {
    message: "",
    img: null,
    video: null,
    messageId: null,
    authorId: "",
    id: ""
}
export interface MessagesType {
    conversationId: string,
    text: string,
    images: string[],
    replyId: string,
    createdAt: string,
    updatedAt: string,
    userId: string,
}

// export const initialMessage: Messages = {
//     id: "",
//     message: "",
//     img: [],
//     reply: initialReply,
//     seenIds: [],
//     createdAt: undefined,
//     updatedAt: undefined,
//     conversationId: "",
//     messageUserId: "",
//     seen: []
// }

export interface MessageData {
    id: string
    messages: MessagesType[]
    senderMessages: MessagesType[]
    receiverMessages: MessagesType[]
}

export interface LastMessage {
    lastMessage: string,
    lastMessageDate?: string,
    UserId: string,
    friendId: string,
    conversationId: string
}

