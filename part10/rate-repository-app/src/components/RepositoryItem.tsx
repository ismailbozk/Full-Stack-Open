import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Repository } from "../types/Repository";

interface RepositoryItemProps {
    repository: Repository;
}

function RepositoryItem({ repository }: RepositoryItemProps): React.ReactElement {

    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            gap: 10,
        },
        topTextContainer: {
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'column',
            backgroundColor: '#b24d4dff',
        },
        text: {
            flexShrink: 1,
            paddingBottom: 10,
        },
    });

    return (
        <View>
            <View style={{ flexGrow: 1, flexDirection: 'row', margin: 10 }}>
                <Image
                    source={{ uri: repository.ownerAvatarUrl }}
                    style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
                />
                <View style={styles.topTextContainer}>
                    <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{repository.fullName}</Text>
                    <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{repository.description}</Text>
                </View>
            </View>

            <Text>{repository.language}</Text>
            <View style={styles.row}>
                <Text>Forks: {repository.forksCount}</Text>
                <Text>Stars: {repository.stargazersCount}</Text>
            </View>
            <View style={styles.row}>
                <Text>Rating: {repository.ratingAverage}</Text>
                <Text>Reviews: {repository.reviewCount}</Text>
            </View>

        </View>
    );
}

export default RepositoryItem;