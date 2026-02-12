import { View, StyleSheet } from 'react-native';
import AppText from '@/src/components/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

interface Props {
    value: string;
    label: string;
}

export default function SummaryStatCard({ value, label }: Props) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: colors.bg.card }
            ]}
        >
            <AppText
                variant="headingLarge"
                style={{ color: colors.category.effort }}
            >
                {value}
            </AppText>

            <AppText variant="caption" color="secondary">
                {label}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '47%',
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
});