import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../../graphql/queries";
import { RepositoryDetail } from "../../types/Repository";

export const useRepository = (repositoryId: string) => {
  const { data, loading, error } = useQuery<{ repository: RepositoryDetail }>(GET_REPOSITORY, { variables: { repositoryId } });

  globalThis.console.log("useRepository data:", data);

  return {
    repository: data?.repository,
    loading,
    error,
  };
}