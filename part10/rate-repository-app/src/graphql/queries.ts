import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
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
    reviews {
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
        hasNextPage
      }
    }
  }
}
`;