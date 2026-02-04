import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/ThemeContext';

interface ProgressBarProps {
    /** 0 ~ 100 */
    percent: number;
    height?: number;
}

export default function ProgressBar({
                                        percent,
                                        height = 8,
                                    }: ProgressBarProps) {
    const { colors } = useTheme();

    const safePercent = Math.min(Math.max(percent, 0), 100);

    return (
        <View
            style={[
                styles.track,
                {
                    height,
                    borderRadius: height / 2,
                    backgroundColor: colors.bg.subtle,
                },
            ]}
        >
            <View
                style={[
                    styles.fill,
                    {
                        width: `${safePercent}%`,
                        height,
                        borderRadius: height / 2,
                        backgroundColor: colors.active.active,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        width: '100%',
        overflow: 'hidden',
    },
    fill: {
        width: '0%',
    },
});