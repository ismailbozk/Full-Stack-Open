import { DELETE_REVIEW } from "../../graphql/mutations";
import { useMutation } from '@apollo/client/react';

export const useDeleteReview = () => {
    const [deleteReviewMutation] = useMutation<{ deleteReviewId: string }>(DELETE_REVIEW, {
        onError: (error) => {
            globalThis.console.error("Delete review failed: ", error.message);
        }
    });

    const deleteReview = async (reviewId: string): Promise<void> => {
        try {
            const result = await deleteReviewMutation({
                variables: { 
                    deleteReviewId: reviewId 
                }
            });
            globalThis.console.log("Review deleted with id: ", result.data?.deleteReviewId);
        }
        catch (error) {
            globalThis.console.error("Error deleting review: ", error);
        }
    };
    
    return { deleteReview };
}