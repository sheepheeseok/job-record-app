import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import AppText from './AppText';
import { useTheme } from '@/src/theme/ThemeContext';

export type CategoryType =
    | 'effort'
    | 'complete'
    | 'explore'
    | 'support'
    | 'feedback';

interface CategoryTagProps extends ViewProps {
    type: CategoryType;
    style?: StyleProp<ViewStyle>;
}

const CATEGORY_LABEL: Record<CategoryType, string> = {
    effort: '노력',
    complete: '완성',
    explore: '탐색',
    support: '지원',
    feedback: '피드백',
};

export default function CategoryTag({
    type,
    style,
    ...props
}: CategoryTagProps) {
    const { colors } = useTheme();
    return (
        <View
            {...props}
            style={[
                styles.container,
                { backgroundColor: colors.bg_category[type] },
                style,
            ]}
            >
            <AppText
                variant="tag"
                style={{ color: colors.text_category[type] }}
            >
                {CATEGORY_LABEL[type]}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
});