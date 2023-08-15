import { PostType } from "./Post";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    bio: string;
    website: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    posts: PostType[];
    // status: Status[];
    followers: User[];
    following: User[];
    requests: Requests[];
    conversations: ConversationType[];
}
export type requestsTypes = "followers" | "following" | "friendRequests" | "conversations";
export type requestType = "SENDER" | "RECEIVER"
export interface Requests {
    id: string;
    user: User;
    type: requestsTypes;
    createdAt: string;
    updatedAt: string;
    requestType: requestType;
}

export interface ConversationType {
    id: string;
    usersId: string;
    messageData: Message[];
    createdAt: string;
    updatedAt: string;
    updateDate: string;
    isGroup: boolean;
   
    lastMessage: string
    lastMessageTime: string
    lastMessageAuthor: string
}


export interface groupData {
    name: string;
    avatar: string;
    description: string;
    members: User[];
    admins: User[];
    owner: User;
    requests: Requests[];
}

export interface Message {
    id: string;
    text: string;
    images: string[];
    replyTo: Message;
    createdAt: string;
    updatedAt: string;
    updateDate: string;
    user: User;
}

export interface createConversationType {
    conversationId?: string
    users: string[]
    name?: string
    avatar?: string
    description?: string
    isGroup?: string
}