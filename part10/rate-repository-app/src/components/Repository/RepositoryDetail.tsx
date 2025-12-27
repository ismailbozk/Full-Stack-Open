import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { Link, useParams } from "react-router-native";
import theme from "../../DesignSystem/theme";
import RepositoryItem from "./RepositoryItem";
import { useRepository } from "../hooks/useRepository";

export function RepositoryDetail(): React.ReactElement {
    const { repositoryId } = useParams();
    const { repository } = useRepository(repositoryId || "");

    const styles = {
        button: {
            height: 40,
            backgroundColor: theme.colors.primary,
            flexGrow: 1,
            padding: theme.spacing.medium,
            borderRadius: theme.form.borderRadius,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
        },
        buttonText: {
            color: 'white',
            fontWeight: theme.fontWeights.bold,
        }
    }

    const onPress = (url: string): void => {
        Linking.openURL(url);
    }

    return (
        <View testID="RepositoryDetail">
            {
                (repository !== undefined) ? (
                    <View>
                        <RepositoryItem repository={repository} />
                        <Pressable
                            testID='open-in-github-pressable'
                            style={{ ...styles.button, margin: theme.spacing.large }}
                            onPress={() => onPress(repository.url)}>
                            <Text style={styles.buttonText}>Open in GitHub</Text>
                        </Pressable>
                    </View>

                ) : (
                    <Text testID='LoadingText'>Loading...</Text>
                )
            }

        </ View >
    );
};