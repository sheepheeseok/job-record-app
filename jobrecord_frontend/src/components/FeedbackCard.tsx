import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/ThemeContext';
import AppText from '@/src/components/AppText';
import MyIcon from "@/assets/icons/my.svg";
import React from "react";

interface Props {
    text: string;
}

export default function FeedbackCard({ text }: Props) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.bg.card },
            ]}
        >
            <View style={[styles.iconWrapper, { backgroundColor: colors.bg.Divider }]}>
                <MyIcon
                    width={14}
                    height={14}
                    color={colors.active.active}
                />
            </View>

            <View style={styles.textWrapper}>
                <AppText
                    variant="caption"
                    color="secondary"
                >
                    {text}
                </AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        alignItems: 'flex-start',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    iconWrapper: {
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },

    textWrapper: {
        flex: 1,
    },
});