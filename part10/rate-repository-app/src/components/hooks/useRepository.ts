import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../../graphql/queries";
import { RepositoryDetail } from "../../types/Repository";

export const useRepository = (repositoryId: string, reviewsAfter?: string) => {
  const { data, loading, error, fetchMore } = useQuery<{ repository: RepositoryDetail }>(
    GET_REPOSITORY,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        repositoryId,
        reviewsAfter
      },
      onError: (error) => {
        globalThis.console.error("Fetch repository failed: ", error.message);
      },
    }
  );

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      globalThis.console.log("No more reviews to fetch");
      return;
    }

    await fetchMore({
      variables: {
        reviewsAfter: data?.repository.reviews.pageInfo.endCursor,
        repositoryId: repositoryId,
      },
    });
  }

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    error,
  };
}