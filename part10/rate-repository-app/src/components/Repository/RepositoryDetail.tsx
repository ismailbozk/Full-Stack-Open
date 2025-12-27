import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { Repository } from "../../types/Repository";
import theme from "../../DesignSystem/theme";

export function RepositoryDetail(): React.ReactElement {
    const { repositoryId } = useParams();
    globalThis.console.log("RepositoryDetail repositoryId:", repositoryId);
    
    return (
        <View
            testID="RepositoryDetail"
            style={{ backgroundColor: theme.colors.backgroundPrimary, padding: theme.spacing.large }}>
            <Text>Repository Detail for ID: {repositoryId}</Text>
        </View>
    );
};