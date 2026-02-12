import { useTheme } from "@/src/theme/ThemeContext";
import { View, StyleSheet } from "react-native";
import AppText from "@/src/components/AppText";

interface Props {
    title: string;
    description: string;
}

export default function AISummaryCard({ title, description }: Props) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: colors.bg_category.effort }
            ]}
        >
            <AppText variant="headingSemiLarge">
                {title}
            </AppText>

            <AppText
                variant="caption"
                color="secondary"
                style={styles.desc}
            >
                {description}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
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
    desc: {
        marginTop: 12,
        lineHeight: 20,
    },
});