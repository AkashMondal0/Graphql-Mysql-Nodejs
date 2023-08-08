import { User } from "./User";

export interface Post {
    id: string;
    caption: string;
    createAt: string;
    updateAt: string;
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
    createAt: string;
    updateAt: string;
}

export interface Comment {
    id: User;
    content: string;
    createAt: string;
    updateAt: string;
}

// Status 
export interface Status {
    id: User;
    Status: [{
        id: string;
        image: string;
        createAt: string;
        updateAt: string;
        seenUsers: User[];
        comments: Comment[];
    }];
    totalStatus: number;
}