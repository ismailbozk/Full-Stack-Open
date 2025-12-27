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
    url: string;
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