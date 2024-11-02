import { Comment } from "../comments/types";
import { User } from "../shared/types";

export enum Status {
    Draft = 'draft',
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
    Published = 'published'
}

export interface Article {
  id: string;
  title: string;
  content: string;
  status: Status;
  submittedAt: Date | null;
  approvedAt: Date | null;
  rejectedAt: Date | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  totalLikes: number;
  totalDislikes: number;
  totalComments: number;
  isLiked: boolean;
  isDisliked: boolean;
  author: User;
  comments: Comment[];
}
