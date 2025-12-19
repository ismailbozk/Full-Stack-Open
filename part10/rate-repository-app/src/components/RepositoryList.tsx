import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import "whatwg-fetch";
import useRepositories from "./hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../DesignSystem/theme";

function RepositoryList(): React.ReactElement {
    const { repositories } = useRepositories();
    
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
                <RepositoryItem repository={item} />
            )}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

export default RepositoryList;