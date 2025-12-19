import React from 'react';
import { useState, useEffect } from 'react';
import { RepositoryListResponse, Repository } from '../../types/Repository';
export interface UseRepositoriesResult {
    repositories: Repository[];
    loading: boolean;
    refetch: () => Promise<void>;
}

const useRepositories = (): UseRepositoriesResult => {
    const [repositories, setRepositories] =  React.useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async (): Promise<void> => {
        setLoading(true);

        const response: Response = await fetch("http://localhost:5001/api/repositories")
        response.status == 200 ? console.log("Fetch repositories succeeded") : console.error("Fetch repositories failed with status: ", response.status);
        const data = await response.json() as RepositoryListResponse;
        const repositories: Repository[] = data.edges.map(edge => edge.node);

        console.log("success", repositories);
        setLoading(false);
        setRepositories(repositories);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;