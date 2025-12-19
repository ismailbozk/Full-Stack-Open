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

// other queries...