import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Review } from "../../types/Repository";
import theme from "../../DesignSystem/theme";
import { format } from "date-fns/format";

export interface RepositoryReviewItemProps {
    review: Review;
}

export default function RepositoryReviewItem(props: RepositoryReviewItemProps): React.ReactElement {
    const { review } = props;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.backgroundPrimary,
            padding: theme.spacing.large,
        },
        row: {
            flexDirection: 'row',
            gap: theme.spacing.medium,
        },
        textContainer: {
            flexDirection: 'column',
            flexGrow: 1,
            flexShrink: 1
        },
        score: {
            width: 40,
            height: 40,
            borderRadius: 20,
            borderColor: theme.colors.primary,
            borderWidth: 2,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
        },
        scoreText: {
            color: theme.colors.primary,
            fontWeight: 'bold',
            fontSize: 14,
        }
    });

    return (
        <View testID="RepositoryReviewItem" style={styles.container}>
            <View style={styles.row}>
                <View style={styles.score}>
                    <Text style={styles.scoreText}>{review.rating}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{review.user.username}</Text>
                    <Text style={{ color: 'gray' }}>
                        {format(new Date(review.createdAt), "dd.MM.yyyy")}
                    </Text>
                    <Text style={{ marginBottom: 5 }}>{review.text}</Text>
                </View>
            </View>
        </View>
    );
}