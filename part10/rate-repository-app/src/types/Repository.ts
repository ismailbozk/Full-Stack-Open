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

export enum RepositoryOrderDirection {
    // eslint-disable-next-line no-unused-vars
    ASC = 'ASC',
    // eslint-disable-next-line no-unused-vars
    DESC = 'DESC',
}

export enum RepositoryOrderBy {
    // eslint-disable-next-line no-unused-vars
    CREATED_AT = 'CREATED_AT',
    // eslint-disable-next-line no-unused-vars
    RATING_AVERAGE = 'RATING_AVERAGE',
}
