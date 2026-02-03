import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import AppText from "@/src/components/AppText";
import { useTheme } from '@/src/theme/ThemeContext';

interface FilterTabProps<T extends string> {
    label: string;
    value: T;
    selected: boolean;
    onPress: (value: T) => void;
}

export default function FilterTab<T extends string>({
    label,
    value,
    selected,
    onPress,
    }: FilterTabProps<T>) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(value)}
            style={[
                styles.container,
                {
                    backgroundColor: selected
                        ? colors.active.active
                        : colors.bg.Divider,
                },
            ]}
            >
            <AppText
                variant="tag"
                numberOfLines={1}
                color="secondary"
                style={
                    selected
                        ? { color: colors.text.inverse }
                        : undefined
                }
                >
                {label}
            </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 28,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
})