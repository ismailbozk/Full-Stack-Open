import { View, StyleSheet } from "react-native";
import theme from "../../DesignSystem/theme";

export default function VerticalSeperator() {
    const styles = StyleSheet.create({
        separator: {
            height: 10,
            backgroundColor: theme.colors.separatorColor,
        },
    });

    return <View style={styles.separator} />;
};