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

    const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ).getTime();

    const startOfTarget = new Date(
        target.getFullYear(),
        target.getMonth(),
        target.getDate()
    ).getTime();

    const diffDays =
        (startOfToday - startOfTarget) / (1000 * 60 * 60 * 24);

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
import React, { useState, useCallback } from 'react';
import { RouteProp, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useActivity } from '@/src/hooks/useActivities';
import {
    View,
    StyleSheet,
    Pressable,
    SafeAreaView,
    Alert,
} from 'react-native';
import AppText from '@/src/components/AppText';
import CategoryTag from '@/src/components/CategoryTag';
import { useTheme } from '@/src/theme/ThemeContext';
import MenuIcon from '@/assets/icons/menu.svg';
import DateIcon from '@/assets/icons/calendar.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import ArrowIcon from '@/assets/icons/left_arrow.svg';
import EditIcon from '@/assets/icons/edit.svg';
import { ActivityCategory } from '@/src/types/activity';
import { RootStackParamList } from '@/src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

const categoryMap: Record<ActivityCategory, CategoryType> = {
    EFFORT: 'effort',
    COMPLETE: 'complete',
    EXPLORE: 'explore',
    SUPPORT: 'support',
    FEEDBACK: 'feedback',
};

type ActivityDetailRouteParams = {
    ActivityDetailScreen: {
        activityId: number;
    };
};

export default function ActivityDetailScreen() {
    const navigation = useNavigation();
    const rootNavigation = useNavigation<RootNavigationProp>();
    const { colors } = useTheme();
    const route =
      useRoute<RouteProp<ActivityDetailRouteParams, 'ActivityDetailScreen'>>();
    const { activityId } = route.params;
    const { activity, loading, fetchActivityDetail, deleteActivity } = useActivity({ activityId });

    const [showMenu, setShowMenu] = useState(false);

    useFocusEffect(
      useCallback(() => {
        if (activityId) {
          fetchActivityDetail(activityId);
        }
      }, [activityId, fetchActivityDetail])
    );

    const handleDelete = () => {
        Alert.alert(
            '활동 삭제',
            '이 활동을 삭제하시겠습니까?',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '삭제하기',
                    style: 'destructive',
                    onPress: async () => {
                       await deleteActivity(activityId);
                       navigation.goBack();
                    },
                },
            ]
        );
    };

    if (loading || !activity) {
        return <View />;
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg.app }]}>

            {/* Header */}
            <View
                style={[
                    styles.header,
                    { borderBottomWidth: 1, borderBottomColor: colors.bg.Divider },
                ]}
            >
                <Pressable onPress={() => navigation.goBack()}>
                    <ArrowIcon width={10} height={18} color={colors.text.primary}/>
                </Pressable>

                <AppText variant="headingLarge">활동 상세</AppText>

                <Pressable onPress={() => setShowMenu((prev) => !prev)}>
                    <MenuIcon width={5} height={18} color={colors.text.primary}/>
                </Pressable>

                {showMenu && (
                    <View
                        style={[
                            styles.menuBox,
                            { backgroundColor: colors.bg.card, borderColor: colors.bg.Divider },
                        ]}
                    >
                        <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                                setShowMenu(false);
                                handleDelete();
                            }}
                        >
                            <EditIcon width={16} height={16} color={colors.state.error} />
                            <AppText variant="caption" style={{ marginLeft: 8, color:colors.state.error}} >
                                삭제하기
                            </AppText>
                        </Pressable>
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <CategoryTag type={categoryMap[activity.category]} />

                <AppText variant="headingLarge" style={styles.title}>
                    {activity?.title}
                </AppText>

                {/* 날짜 / 소요시간 카드 */}
                <View style={[styles.infoCard, { backgroundColor: colors.bg.card }]}>
                    {/* Date */}
                    <View style={styles.infoRow}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: colors.bg_category[categoryMap[activity.category]] },
                            ]}
                        >
                            <DateIcon
                                width={18}
                                height={18}
                                color={colors.text_category[categoryMap[activity.category]]}
                            />
                        </View>

                        <View style={styles.infoTextBox}>
                            <AppText variant="caption" color="secondary">날짜</AppText>
                            <AppText variant="headingMedium">{formatDate(activity.activityDate)}</AppText>
                        </View>
                    </View>

                    {/* Time */}
                    <View style={styles.infoRow}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: colors.bg_category[categoryMap[activity.category]] },
                            ]}
                        >
                            <ClockIcon
                                width={18}
                                height={18}
                                color={colors.text_category[categoryMap[activity.category]]}
                            />
                        </View>

                        <View style={styles.infoTextBox}>
                            <AppText variant="caption" color="secondary">소요 시간</AppText>
                            <AppText variant="headingMedium">{formatDuration(activity.duration)}</AppText>
                        </View>
                    </View>
                </View>

                {/* Memo */}
                <View style={styles.memoSection}>
                    <AppText variant="headingMedium">메모</AppText>

                    <View style={[styles.memoBox, { backgroundColor: colors.bg.card }]}>
                        <AppText variant="headingMedium" color="secondary">
                            {activity?.description ?? ''}
                        </AppText>
                    </View>
                </View>
            </View>

            {/* Bottom CTA */}
            <View style={[styles.bottomCTA, { backgroundColor: colors.bg.app }]}>
                <Pressable
                    style={[styles.editButton, { backgroundColor: colors.active.active }]}
                    onPress={() =>
                        rootNavigation.navigate('EditActivity', {
                            activityId,
                        })
                    }
                >
                    <AppText variant="headingMedium" color="inverse">
                        수정하기
                    </AppText>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        height: 56,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
    },

    title: {
        marginTop: 16,
        marginBottom: 16,
    },

    infoCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        gap: 12,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    memoSection: {
        marginTop: 8,
    },

    memoBox: {
        marginTop: 8,
        borderRadius: 16,
        padding: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    bottomCTA: {
        padding: 20,
    },

    editButton: {
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    infoTextBox: {
        flex: 1,
    },
    menuBox: {
        position: 'absolute',
        width: 120,
        top: 25,
        right: 30,
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
});

import { CategoryType } from '@/src/components/CategoryTag';