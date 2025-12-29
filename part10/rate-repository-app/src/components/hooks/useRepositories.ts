import { RepositoryListResponse, Repository } from '../../types/Repository';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../../graphql/queries';

export interface RepositoryQueryVariables {
    orderBy: string;
    direction: string;
}

export interface UseRepositoriesResult {
    repositories: Repository[];
    loading: boolean;
    // eslint-disable-next-line no-unused-vars
    refetch: (variables: RepositoryQueryVariables) => void;
}

const useRepositories = (initialValues: RepositoryQueryVariables): UseRepositoriesResult => {
    const { data, loading, refetch } = useQuery<RepositoryListResponse>(GET_REPOSITORIES,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                orderBy: initialValues.orderBy,
                orderDirection: initialValues.direction
            },
            onError: (error) => {
                globalThis.console.error("Fetch repositories failed: ", error.message);
            }
        }
    );
    const repositories: Repository[] = data?.repositories?.edges?.map(edge => edge.node) || [];
    return {
        repositories,
        loading,
        refetch
    };

};

export default useRepositories;