import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flexItem: {
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'center',
        padding: 10,
    },

});

interface AppBarItemProps {
    children: React.ReactNode;
    onPress?: () => void;
}

function AppBarItem({ children, onPress }: AppBarItemProps): React.JSX.Element {
    return (
        <Pressable style={styles.flexItem} onPress={onPress}>
            {children}
        </Pressable>
    );
}

export default AppBarItem;