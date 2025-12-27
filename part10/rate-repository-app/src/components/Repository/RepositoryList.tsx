import React from "react";
import { FlatList, Pressable } from "react-native";
import "whatwg-fetch";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Repository } from "../../types/Repository";
import { useNavigate } from "react-router";
import VerticalSeperator from "../Common/VerticalSeperator";

export interface RepositoryListProps {
    repositories: Repository[];
    // eslint-disable-next-line no-unused-vars
    onPress: (repositoryId: string) => void;
}

export const RepositoryListContainer = (props: RepositoryListProps) => {
    return (
        <FlatList
            data={props.repositories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable onPress={() => props.onPress(item.id)}>
                    <RepositoryItem repository={item} />
                </Pressable>
            )}
            ItemSeparatorComponent={VerticalSeperator}
        />
    );
};

function RepositoryList(): React.ReactElement {
    const { repositories } = useRepositories();
    const navigate = useNavigate();


    return <RepositoryListContainer repositories={repositories} onPress={(repositoryId) => navigate(`/repository/${repositoryId}`)} />;
}

export default RepositoryList;