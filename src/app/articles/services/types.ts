import { Pagination, REACTION } from "../../shared/types";
import { Article } from "../types";

export interface ListArticleRequest {
    page: number;
    limit: number;
    sort: number;
    sortBy: string;
}

export interface ListArticleResponse {
    success: boolean;
    message: string;
    data: Article[];
    pagination: Pagination;
}

export interface GetDetailArticleResponse {
    success: boolean;
    message: string;
    data: Article;
}

export interface CreateArticleRequest {
    title: string;
    content: string;
}

export interface CreateArticleResponse {
    success: boolean;
    message: string;
    data: Article;
}

export interface UpdateArticleRequest {
    title: string;
    content: string;
}

export interface UpdateArticleResponse {
    success: boolean;
    message: string;
    data: Article;
}

export interface DeleteArticleResponse {
    success: boolean;
    message: string;
}

export interface RequestApprovalResponse {
    success: boolean;
    message: string;
}

export interface ApproveResponse {
    success: boolean;
    message: string;
}

export interface RejectResponse {
    success: boolean;
    message: string;
}

export interface PublishResponse {
    success: boolean;
    message: string;
}

export interface UnpublishResponse {
    success: boolean;
    message: string;
}

export interface ToggleReactionRequest {
    type: REACTION
}

export interface ToggleReactionResponse {
    success: boolean;
    message: string;
}
