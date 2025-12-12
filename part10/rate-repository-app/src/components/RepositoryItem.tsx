import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    });

    return (
        <View>
            <Text>{repository.fullName}</Text>
            <Text>{repository.description}</Text>
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