import { Author } from "../shared/types";

export interface Comment {
    id: string;
    articleId: string;
    parentId: string;
    content: string;
    totalLikes: number;
    totalDislikes: number;
    totalReplies: number;
    isLiked: boolean;
    isDisliked: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
    replies: Comment[];
}