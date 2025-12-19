import { RepositoryListResponse, Repository } from '../../types/Repository';
import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../../graphql/queries';
export interface UseRepositoriesResult {
    repositories: Repository[];
    loading: boolean;
    refetch: () => void;
}

const useRepositories = (): UseRepositoriesResult => {

    const { data, loading, refetch } = useQuery<RepositoryListResponse>(GET_REPOSITORIES,
        {
            fetchPolicy: 'cache-and-network',
            onError: (error) => {
                globalThis.console.error("Fetch repositories failed: ", error.message);
            },
            onCompleted: () => {
                globalThis.console.log("Fetch repositories succeeded");
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