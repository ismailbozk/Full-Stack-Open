import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RepositoryReviewItem from "../Repository/RepositoryReviewItem";
import VerticalSeperator from "../Common/VerticalSeperator";
import { useUserInfo } from "../hooks/useUserInfo";

export default function MyReviews(): React.ReactElement {
    const { userInfo, loading } = useUserInfo(true);
    const reviews = userInfo?.reviews?.edges.map(edge => edge.node) || [];
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });

    return (
        <View testID="RepositoryDetail" style={styles.container}>
            {
                (loading) ? (
                    <Text testID='LoadingText'>Loading...</Text>
                ) :
                (reviews.length > 0) ? (
                    <FlatList
                        data={reviews}
                        renderItem={({ item }) => <RepositoryReviewItem review={item} />}
                        keyExtractor={({ id }) => id}
                        ItemSeparatorComponent={VerticalSeperator}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <Text>No reviews found.</Text>
                )
            }
        </ View >
    );
};