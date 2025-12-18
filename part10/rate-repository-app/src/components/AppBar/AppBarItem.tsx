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

function AppBarItem({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <Pressable style={styles.flexItem}>
            {children}
        </Pressable>
    );
}

export default AppBarItem;