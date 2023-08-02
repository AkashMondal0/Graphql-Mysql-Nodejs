import { Post, Status } from "./Post";

 export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    website: string;
    avatar: string;
    token: string;
    createDate: string;
    updateDate: string;
    lastLoginDate: string;
    posts: Post[];
    status: Status[];
    followers: User[];
    following: User[];
    requests: Requests[];
    conversations: Conversation[];
}
export type requestsTypes = "followers" | "following" | "friendRequests" | "conversations";
export type requestType = "SENDER" | "RECEIVER"
export interface Requests {
    id: string;
    user: User;
    type: requestsTypes;
    createDate: string;
    requestType: requestType;
}

export interface Conversation {
    id: string;
    users: User[];
    messages: Message[];
    createDate: string;
    updateDate: string;
    isGroup: boolean;
    GroupData: GroupData;
}


export interface GroupData {
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
    createDate: string;
    updateDate: string;
    user: User;
}