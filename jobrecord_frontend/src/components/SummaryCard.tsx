// src/components/SummaryCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/src/theme/ThemeContext';

interface Props {
    icon: React.ReactNode;
    title: string;
    value: string;
    unit?: string;
    iconBgColor?: string;
    iconSize?: number;
}

export function SummaryCard({ icon, title, value, unit, iconBgColor, iconSize }: Props) {
    const { colors, mode } = useTheme();
    return (
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.bg.card,
              shadowColor: '#000',
              ...(mode === 'dark' && { shadowOpacity: 0.04 }),
            },
          ]}
        >
            <View
                style={[
                    styles.iconWrapper,
                    { backgroundColor: iconBgColor ?? colors.bg.subtle },
                ]}
            >
                <View
                    style={{
                        width: iconSize ?? 20,
                        height: iconSize ?? 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </View>
            </View>

            <AppText variant="caption" color="secondary" style={styles.title}>
                {title}
            </AppText>

            <View style={styles.valueRow}>
                <AppText variant="headingMedium">{value}</AppText>
                {unit && (
                    <AppText
                        variant="headingEmphasis"
                        style={{ marginLeft: 2 }}
                    >
                        {unit}
                    </AppText>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 12,
        alignItems: 'flex-start',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    title: {
        marginBottom: 8,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});