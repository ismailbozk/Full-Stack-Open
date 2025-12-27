import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import "whatwg-fetch";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../../DesignSystem/theme";
import { Repository } from "../../types/Repository";
import { useNavigate } from "react-router";

export interface RepositoryListProps {
    repositories: Repository[];
    // eslint-disable-next-line no-unused-vars
    onPress: (repositoryId: string) => void;
}

export const RepositoryListContainer = (props: RepositoryListProps) => {

    const ItemSeparator = () => <View style={styles.separator} />;

    const styles = StyleSheet.create({
        separator: {
            height: 10,
            backgroundColor: theme.colors.separatorColor,
        },
    });

    return (
        <FlatList
            data={props.repositories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable onPress={() => props.onPress(item.id)}>
                    <RepositoryItem repository={item} />
                </Pressable>
            )}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

function RepositoryList(): React.ReactElement {
    const { repositories } = useRepositories();
    const navigate = useNavigate();


    return <RepositoryListContainer repositories={repositories} onPress={(repositoryId) => navigate(`/repository/${repositoryId}`)} />;
}

export default RepositoryList;