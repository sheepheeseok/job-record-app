import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/src/theme/ThemeContext';

interface StatCardProps {
    title: string;
    value: string | number;
    label: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function StatCard({
    title,
    value,
    label,
    onPress,
    style,
}: StatCardProps) {
    const { colors } = useTheme();
    const Wrapper = onPress ? TouchableOpacity : View;

    return (
        <Wrapper
        onPress={onPress}
        activeOpacity={0.8}
        style={[
            styles.container,
            { backgroundColor: colors.bg.card },
            style,
        ]}
        >
            <AppText
                variant="caption"
                color="secondary"
                style={styles.title}
                >
                {title}
            </AppText>

            <View style={styles.subTitleRow}>
                <AppText variant="number">
                    {value}
                </AppText>
                <AppText variant="caption" color="secondary">
                    {label}
                </AppText>
            </View>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 16,
        flex: 1,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    title: {
        marginTop: 4,
    },

    subTitleRow: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'flex-end',
    }
})