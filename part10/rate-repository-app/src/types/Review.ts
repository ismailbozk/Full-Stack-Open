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