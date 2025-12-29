import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Linking, Alert } from "react-native";
import RepositoryReviewItem from "../Repository/RepositoryReviewItem";
import VerticalSeperator from "../Common/VerticalSeperator";
import { useUserInfo } from "../hooks/useUserInfo";
import { Review } from "../../types/Review";
import theme from "../../DesignSystem/theme";
import { useDeleteReview } from "../hooks/useDeleteReview";

export default function MyReviews(): React.ReactElement {
    const { userInfo, loading, refetch } = useUserInfo(true);
    const reviews = userInfo?.reviews?.edges.map(edge => edge.node) || [];

    const { deleteReview } = useDeleteReview();
    const handleDeleteReview = async (reviewId: string) => {
        try {
            await deleteReview(reviewId);
            await refetch();
        } catch (error) {
            globalThis.console.error("Failed to delete review: ", error);
        }
    }

    globalThis.console.log("User reviews: ", reviews);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });

    function renderItem({ item }: { item: Review }) {
        const openGithub = (): void => {
            if (item.repository && item.repository.url)
            Linking.openURL(item.repository.url);
        }
        const deleteReview = (): void => {
            const deleteFinal = async () => {
                await handleDeleteReview(item.id);

            }

            Alert.alert(
                "Delete review",
                "Are you sure you want to delete this review?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: deleteFinal
                    }
                ]
            );
        }
        return (
            <View style={{ flexDirection: 'column' }}>
                <RepositoryReviewItem review={item} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: theme.spacing.large,
                        margin: theme.spacing.large,
                        backgroundColor: 'white',
                    }}
                >
                    <Pressable
                        style={{
                            backgroundColor: theme.colors.primary,
                            padding: theme.spacing.medium,
                            borderRadius: 5,
                            flex: 1,
                            marginRight: 8,
                        }}
                        onPress={openGithub}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Open in GitHub</Text>
                    </Pressable>
                    <Pressable
                        style={{
                            backgroundColor: 'red',
                            padding: theme.spacing.medium,
                            borderRadius: 5,
                            flex: 1,
                            marginLeft: 8,
                        }}
                        onPress={deleteReview}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Delete review</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View testID="RepositoryDetail" style={styles.container}>
            {
                (loading) ? (
                    <Text testID='LoadingText'>Loading...</Text>
                ) :
                    (reviews.length > 0) ? (
                        <FlatList
                            data={reviews}
                            renderItem={renderItem}
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