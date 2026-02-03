import { useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import AppText from './AppText';
import CategoryTag, { CategoryType } from './CategoryTag';
import { useTheme } from '@/src/theme/ThemeContext';
import EffortIcon from '../../assets/icons/effort.svg';
import CompleteIcon from '../../assets/icons/complete.svg';
import ExploreIcon from '../../assets/icons/explore.svg';
import SupportIcon from '../../assets/icons/support.svg';
import FeedbackIcon from '../../assets/icons/feedback.svg';

const CATEGORY_ICON_MAP: Record<CategoryType, React.FC<any>> = {
    effort: EffortIcon,
    complete: CompleteIcon,
    explore: ExploreIcon,
    support: SupportIcon,
    feedback: FeedbackIcon,
};

interface ActivityCardProps {
    title: string;
    category: CategoryType;
    date: string;
    duration: number;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function ActivityCard({
    title,
    category,
    date,
    duration,
    onPress,
    style,
}: ActivityCardProps) {
    const Icon = CATEGORY_ICON_MAP[category];

    const { colors, mode } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const formatDuration = (minutes: number) => {
        const safeMinutes =
            typeof minutes === 'number' && !Number.isNaN(minutes)
                ? minutes
                : Number(minutes);

        if (!safeMinutes || Number.isNaN(safeMinutes)) return '0분';

        const h = Math.floor(safeMinutes / 60);
        const m = safeMinutes % 60;

        if (h > 0 && m > 0) return `${h}시간 ${m}분`;
        if (h > 0) return `${h}시간`;
        return `${m}분`;
    };

    const formatDate = (dateStr: string) => {
        const today = new Date();
        const target = new Date(dateStr);

        const diffTime =
            new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() -
            new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();

        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) return '오늘';
        if (diffDays === 1) return '어제';

        const isSameYear = today.getFullYear() === target.getFullYear();

        const month = target.getMonth() + 1;
        const day = target.getDate();
        const year = String(target.getFullYear()).slice(2);

        return isSameYear
            ? `${month}월 ${day}일`
            : `${year}년 ${month}월 ${day}일`;
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: colors.bg.card,
                    shadowColor: '#000',
                    ...(mode === 'dark' && { shadowOpacity: 0.04 }),
                },
                style,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >

            <View style={styles.categorySection}>
                <CategoryTag type={category}/>
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: colors.bg.Divider },
                  ]}
                >
                    <Icon width={12} height={12} />
                </View>
            </View>

            <AppText
                variant="headingMedium"
                numberOfLines={2}
            >
                {title}
            </AppText>

            <View style={styles.infoRow}>
                <AppText variant="caption" color="secondary">
                    {formatDate(date)}
                </AppText>

                <View
                  style={[
                    styles.dot,
                    { backgroundColor: colors.text.secondary },
                  ]}
                />

                <AppText variant="caption" color="secondary">
                    {formatDuration(duration)}
                </AppText>
            </View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        gap: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    categorySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    iconWrapper: {
        width: 26,
        height: 26,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    dot: {
        width: 2,
        height: 2,
        borderRadius: 2,
        marginHorizontal: 8,
    },
});
