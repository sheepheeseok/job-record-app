import { lightColors } from '../theme/colors';
import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeContext';

type TextVariant = keyof typeof typography;
type TextColor =
    | keyof typeof lightColors.text
    | keyof typeof lightColors.text_category;

interface AppTextProps extends TextProps {
    variant?: TextVariant;
    color?: TextColor;
    style?: StyleProp<TextStyle>;
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
}

export default function AppText({
    variant = 'bodyRegular',
    color = 'primary',
    align = 'left',
    style,
    children,
    ...props
}: AppTextProps) {
    const { colors } = useTheme();
    return (
        <Text
            {...props}
            style={[
                typography[variant], // 타이포그래피 스타일
                {
                    color:
                        color in colors.text_category
                            ? colors.text_category[color as keyof typeof colors.text_category]
                            : colors.text[color as keyof typeof colors.text],
                    textAlign: align,
                },
                style, // 외부에서 전달된 스타일
            ]}
        >
            {children}
        </Text>
    );
}