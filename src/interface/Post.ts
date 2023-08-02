import { User } from "./User";

export interface Post {
    id: string;
    caption: string;
    createDate: string;
    updateDate: string;
    author: User;
    likes: Like[];
    comments: Comment[];
    images: string[];
}

export type Reaction = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
export interface Like {
    id: string;
    User: User;
    Post: Post;
    reaction: Reaction;
    createDate: string;
    updateDate: string;
}

export interface Comment {
    id: User;
    content: string;
    createDate: string;
    updateDate: string;
}

// Status 
export interface Status {
    id: User;
    Status: [{
        id: string;
        image: string;
        createDate: string;
        seenUsers: User[];
        comments: Comment[];
    }];
    totalStatus: number;
}