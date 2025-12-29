import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
    edges {
      node {
        forksCount
        description
        fullName
        id
        language
        name
        openIssuesCount
        ownerName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
      }
      cursor
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export const USER_INFO = gql`
  query UserInfo($withReviews: Boolean = false) {
    me {
      id
      username
      reviewCount
      reviews @include(if: $withReviews) {
        edges {
          node {
            id
            rating
            text
            user {
              id
              username
            }
            userId
            createdAt
            repositoryId
            repository {
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $reviewsAfter: String) {
  repository(id: $repositoryId) {
    id
    fullName
    forksCount
    description
    language
    name
    openIssuesCount
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    watchersCount
    url
    reviews(first: 4, after: $reviewsAfter) {
      edges {
        node {
          id
          rating
          text
          user {
            id
            username
          }
          userId
          createdAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`;