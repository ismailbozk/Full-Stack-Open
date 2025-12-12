import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Repository } from "../types/Repository";
import RepositoryItem from "./RepositoryItem";

interface RepositoryListProps {
    repositories: Repository[];
}

function RepositoryList({ repositories }: RepositoryListProps): React.ReactElement {
    const ItemSeparator = () => <View style={styles.separator} />;

    const styles = StyleSheet.create({
        separator: {
            height: 10,
        },
    });

    return (
        <FlatList
            data={repositories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <RepositoryItem repository={item} />
            )}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default RepositoryList;