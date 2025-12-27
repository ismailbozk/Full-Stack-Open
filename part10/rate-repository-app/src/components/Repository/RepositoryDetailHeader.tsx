import React from "react";
import { View, Text, Pressable } from "react-native";
import theme from "../../DesignSystem/theme";
import RepositoryItem from "./RepositoryItem";
import { RepositoryDetail } from "../../types/Repository";
import VerticalSeperator from "../Common/VerticalSeperator";

interface RepositoryDetailHeaderProps {
    repository: RepositoryDetail;
    // eslint-disable-next-line no-unused-vars
    onOpenInGitHub: (url: string) => void;
}

export function RepositoryDetailHeader(props: RepositoryDetailHeaderProps): React.ReactElement {
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
        props.onOpenInGitHub(url);
    }

    return (
        <View testID="RepositoryDetailHeader">
            {
                <View>
                    <RepositoryItem repository={props.repository} />
                    <Pressable
                        testID='open-in-github-pressable'
                        style={{ ...styles.button, margin: theme.spacing.large }}
                        onPress={() => onPress(props.repository.url)}>
                        <Text style={styles.buttonText}>Open in GitHub</Text>
                    </Pressable>
                    <VerticalSeperator />
                </View>
            }
        </ View >
    );
};