import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import "whatwg-fetch";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../../DesignSystem/theme";
import { Repository } from "../../types/Repository";
import { useNavigate } from "react-router";

export const RepositoryListContainer = ({ repositories }: { repositories: Repository[] }) => {

    const navigate = useNavigate();

    const ItemSeparator = () => <View style={styles.separator} />;

    const styles = StyleSheet.create({
        separator: {
            height: 10,
            backgroundColor: theme.colors.separatorColor,
        },
    });

    return (
        <FlatList
            data={repositories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
                    <RepositoryItem repository={item} />
                </Pressable>
            )}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

function RepositoryList(): React.ReactElement {
    const { repositories } = useRepositories();

    return <RepositoryListContainer repositories={repositories} />;
}

export default RepositoryList;