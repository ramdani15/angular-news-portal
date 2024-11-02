import { Pagination, REACTION } from "../../shared/types";
import { Comment } from "../types";

export interface ListCommentRequest {
    articleId: string;
    page: number;
    limit: number;
}

export interface ListCommentResponse {
    success: boolean;
    message: string;
    data: Comment[];
    pagination: Pagination;
}

export interface CreateCommentRequest {
    articleId: string;
    parentId: string;
    content: string;
}

export interface CreateCommentResponse {
    success: boolean;
    message: string;
    data: Comment;
}

export interface ToggleReactionRequest {
    type: REACTION;
}

export interface ToggleReactionResponse {
    success: boolean;
    message: string;
}