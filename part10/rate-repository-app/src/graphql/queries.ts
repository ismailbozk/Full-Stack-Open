import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
  repositories {
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
        url
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
  query {
    me {
      id
      username
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
  }
}`;
