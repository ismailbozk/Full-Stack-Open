import { RepositoryListResponse, Repository } from '../../types/Repository';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../../graphql/queries';

export interface RepositoryQueryVariables {
    first?: number;
    orderBy: string;
    orderDirection: string;
    searchKeyword?: string;
}

export interface UseRepositoriesResult {
    repositories: Repository[];
    loading: boolean;
    // eslint-disable-next-line no-unused-vars
    refetch: (variables: RepositoryQueryVariables) => void;
    fetchMore: () => Promise<void>;
}

const useRepositories = (initialValues: RepositoryQueryVariables): UseRepositoriesResult => {
    const { data, loading, refetch, fetchMore } = useQuery<RepositoryListResponse>(GET_REPOSITORIES,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                first: initialValues.first ?? 10,
                orderBy: initialValues.orderBy,
                orderDirection: initialValues.orderDirection
            },
            onError: (error) => {
                globalThis.console.error("Fetch repositories failed: ", error.message);
            }
        }
    );
    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        await fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...initialValues,
            },
        });
    };
    const repositories: Repository[] = data?.repositories?.edges?.map(edge => edge.node) || [];
    return {
        repositories,
        loading,
        refetch,
        fetchMore: handleFetchMore,
    };
};

    export default useRepositories;