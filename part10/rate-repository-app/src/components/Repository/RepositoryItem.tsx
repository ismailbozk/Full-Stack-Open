import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Repository } from "../../types/Repository";
import theme from "../../DesignSystem/theme";

interface RepositoryItemProps {
    repository: Repository;
}

function RepositoryItem({ repository }: RepositoryItemProps): React.ReactElement {

    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            gap: theme.spacing.medium,
            backgroundColor: theme.colors.backgroundPrimary,
        },
        topTextContainer: {
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'column',
        },
        text: {
            flexShrink: 1,
            paddingBottom: theme.spacing.small,
        },
        tagText: {
            flexShrink: 1,
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.tagBackground,
            alignSelf: 'flex-start',
            padding: theme.spacing.small,
            borderRadius: 5,
            overflow: 'hidden',
            marginBottom: theme.spacing.small,
            marginTop: theme.spacing.small,
        }
    });

    function metricItem(value: number, label: string): React.ReactElement {
        const shortValue: string = (value >= 1000) ? (((Math.round(value / 100) / 10).toFixed(1)).toString() + "k") : value.toString();
        return (
            <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                <Text style={{ ...styles.text, fontWeight: 'bold' }}>{shortValue}</Text>
                <Text style={styles.text}>{label}</Text>
            </View>
        );
    }

    return (
        <View
            testID="RepositoryItem"
            style={{ backgroundColor: theme.colors.backgroundPrimary, padding: theme.spacing.large }}>
            <View style={{ flexGrow: 1, flexDirection: 'row', }}>
                <Image
                    source={{ uri: repository.ownerAvatarUrl }}
                    style={{ width: 50, height: 50, borderRadius: 5, marginRight: theme.spacing.large }}
                />
                <View style={styles.topTextContainer}>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }} numberOfLines={3} ellipsizeMode="tail">{repository.fullName}</Text>
                    <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{repository.description}</Text>
                    <Text style={styles.tagText}>{repository.language}</Text>

                </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: theme.spacing.large }}>
                {metricItem(repository.stargazersCount, "Stars")}
                {metricItem(repository.forksCount, "Forks")}
                {metricItem(repository.reviewCount, "Reviews")}
                {metricItem(repository.ratingAverage, "Rating")}
            </View>
        </View>
    );
}

export default RepositoryItem;