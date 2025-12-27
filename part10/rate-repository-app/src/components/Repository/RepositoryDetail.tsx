import React from "react";
import { View, Text, Linking, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepository";
import { RepositoryDetailHeader } from "./RepositoryDetailHeader";
import RepositoryReviewItem from "./RepositoryReviewItem";
import VerticalSeperator from "../Common/VerticalSeperator";

export function RepositoryDetail(): React.ReactElement {
    const { repositoryId } = useParams();
    const { repository } = useRepository(repositoryId || "");
    
    const reviews = repository?.reviews.edges.map(edge => edge.node) || [];
    const onPress = (url: string): void => {
        Linking.openURL(url);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });

    return (
        <View testID="RepositoryDetail" style={styles.container}>
            {
                (repository !== undefined) ? (
                    <FlatList
                        data={reviews}
                        renderItem={({ item }) => <RepositoryReviewItem review={item} />}
                        keyExtractor={({ id }) => id}
                        ListHeaderComponent={() => <RepositoryDetailHeader repository={repository} onOpenInGitHub={onPress} />}
                        ItemSeparatorComponent={VerticalSeperator}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <Text testID='LoadingText'>Loading...</Text>
                )
            }
        </ View >
    );
};