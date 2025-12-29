import { User } from './User';

export interface CreateReviewRepository {
    id: string;
}

export interface CreateReviewResponseData {
    id: string;
    rating: number;
    repository: CreateReviewRepository;
}

export interface CreateReviewResponse {
    createReview: CreateReviewResponseData;
}

export interface AddReviewFormInputs {
    repositoryOwnersName: string;
    repositoryName: string;
    rating: number;
    reviewText: string;
}

export interface Review {
    id: string;
    rating: number;
    text: string;
    user: User;
    userId: string;
    createdAt: string;
    repositoryId: string;
    repository: ReviewRepository;
}

export interface ReviewEdge {
    node: Review;
}

export interface ReviewPageInfo {
    hasNextPage: boolean;
}

export interface ReviewsWrapper {
    edges: ReviewEdge[];
    pageInfo: ReviewPageInfo;
}

export interface ReviewRepository {
    id: string;
    url: string;
}
