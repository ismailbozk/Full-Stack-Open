import { useMutation, MutationResult } from '@apollo/client/react';
import { FetchResult } from '@apollo/client';
import { CREATE_REVIEW } from '../../graphql/mutations';
import { CreateReviewResponse } from '../../types/Review';
import { AddReviewFormInputs } from '../../types/Review';

type UseCreateReviewReturn = [
    (_input: AddReviewFormInputs) => Promise<FetchResult<CreateReviewResponse>>,
    MutationResult<CreateReviewResponse>
];

export const useCreateReview = (): UseCreateReviewReturn => {
    
    const [mutate, result] = useMutation<CreateReviewResponse>(CREATE_REVIEW, {
        onError: (error) => {
            globalThis.console.error("Create review failed: ", error.message);
        }
    });

    const createReview = async (input: AddReviewFormInputs) => {
        const response = await mutate({
            variables: {
                review: {
                    repositoryName: input.repositoryName,
                    ownerName: input.repositoryOwnersName,
                    rating: input.rating,
                    text: input.reviewText,
                }
            }
        });
        return response;
    };

    return [createReview, result];
};