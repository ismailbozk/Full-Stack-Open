import { User } from "./User";

export interface Repository {
    id: string;
    fullName: string;
    reviewCount: number;
    ratingAverage: number;
    forksCount: number;
    stargazersCount: number;
    description: string;
    language: string;
    ownerAvatarUrl: string;
}

export interface RepositoryEdge {
    node: Repository;
    cursor: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
}

export interface RepositoryListWrapper {
    totalCount: number;
    edges: RepositoryEdge[];
    pageInfo: PageInfo;
}

export interface RepositoryListResponse {
    repositories: RepositoryListWrapper;
}

export interface Review {
    id: string;
    rating: number;
    text: string;
    user: User;
    userId: string;
    createdAt: string;
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

export interface RepositoryDetail extends Repository {
    url: string;
    reviews: ReviewsWrapper;
}

export interface RepositoryDetailResponse {
    repository: RepositoryDetail;
}