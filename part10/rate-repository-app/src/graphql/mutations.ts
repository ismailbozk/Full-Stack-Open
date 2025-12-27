import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export type CreateReviewInput = {
  repositoryName: string;
  ownerName: string;
  rating: number;
  text?: string;
};

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput!) {
  createReview(review: $review) {
    id
    rating
    repository {
      id
    }
  }
}
`