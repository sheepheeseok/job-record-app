import { View, Pressable, StyleSheet } from 'react-native';
import AppText from '@/src/components/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

interface Props {
    onRetry: () => void;
    disabled: boolean;
}

export default function SummaryBottomBar({ onRetry, disabled, }: Props) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
            <Pressable
                style={[
                    styles.primaryButton,
                    { backgroundColor: colors.category.effort }
                ]}
            >
                <Pressable
                    disabled={disabled}
                    onPress={onRetry}
                >
                <AppText variant="headingMedium" color="inverse">
                    {disabled ? '분석 중...' : '다시 분석하기'}
                </AppText>
                </Pressable>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 12,
        paddingBottom: 30,
        gap: 10,
    },
    primaryButton: {
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButton: {
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
});