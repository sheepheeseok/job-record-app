import { View, StyleSheet } from 'react-native';
import AppText from '@/src/components/AppText';
import { useTheme } from '@/src/theme/ThemeContext';
import CheckIcon from "@/assets/icons/check.svg";

interface Props {
    type: 'advice' | 'recommend';
    title?: string;
    text: string;
}

export default function AdviceCard({ type, title, text }: Props) {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.bg_category.effort }]}>
            <View style={styles.row}>
                <View style={styles.iconWrapper}>
                    <CheckIcon width={24} height={24} color={colors.active.active} />
                </View>

                <View style={styles.textWrapper}>
                    {title && (
                        <AppText
                            variant="headingMedium"
                            style={{ marginBottom: 6, color: colors.active.active }}
                        >
                            {title}
                        </AppText>
                    )}

                    <AppText variant="caption" color="secondary">
                        {text}
                    </AppText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        marginRight: 12,
    },
    textWrapper: {
        flex: 1,
    },
});