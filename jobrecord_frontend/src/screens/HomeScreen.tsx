import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/theme/ThemeContext';
import AppText from '../components/AppText'
import StatCard from '../components/StatCard';
import ActivityCard from '../components/ActivityCard';
import { DonutChart } from '../components/DonutChart';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActivity } from '@/src/hooks/useActivities';
import {
  getTotalDuration,
  getCategoryDurationMap,
  getCategoryRatioMap,
} from '@/src/utils/activityStats';

type RootStackParamList = {
    ActivityDetailScreen: {
        activityId: number;
    };
};

const categoryMap = {
  EFFORT: 'effort',
  COMPLETE: 'complete',
  EXPLORE: 'explore',
  SUPPORT: 'support',
  FEEDBACK: 'feedback',
} as const;

export default function HomeScreen(){
    const { colors } = useTheme();
    const [focusKey, setFocusKey] = useState(0);
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { activities, loading, fetchActivities, fetchActivityDetail } = useActivity();

    const totalDuration = getTotalDuration(activities);
    const categoryDurations = getCategoryDurationMap(activities);
    const categoryRatios = getCategoryRatioMap(activities);

    useFocusEffect(
        useCallback(() => {
            setFocusKey(prev => prev + 1);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetchActivities();
        }, [fetchActivityDetail])
    );

    return (
        <SafeAreaView
          edges={['top']}
          style={[styles.safe, { backgroundColor: colors.bg.app }]}
        >
        <ScrollView
            style={[styles.container, { backgroundColor: colors.bg.app }]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.title}>
                <AppText variant="caption" color="secondary">
                    2025년 1월
                </AppText>
                <AppText variant="headingLarge">
                    안녕하세요, 지원님 👋
                </AppText>
            </View>

            <View style={styles.statRow}>
                <StatCard title="총 활동 시간" value={47} label="시간" />
                <StatCard title="활동 일수" value={18} label="일" />
            </View>

            <View style={styles.section}>
                <View
                  style={[
                    styles.graphPlaceholder,
                    { backgroundColor: colors.bg.card },
                  ]}
                >
                    <AppText variant="headingMedium">
                        카테고리별 활동시간 비율
                    </AppText>

                    <View style={styles.chartRow}>
                        <View style={styles.donutWrapper}>
                            <DonutChart
                              key={focusKey}
                              segments={[
                                {
                                  key: 'effort',
                                  percent: categoryRatios.effort,
                                  color: colors.category.effort,
                                },
                                {
                                  key: 'complete',
                                  percent: categoryRatios.complete,
                                  color: colors.category.complete,
                                },
                                {
                                  key: 'explore',
                                  percent: categoryRatios.explore,
                                  color: colors.category.explore,
                                },
                                {
                                  key: 'support',
                                  percent: categoryRatios.support,
                                  color: colors.category.support,
                                },
                                {
                                  key: 'feedback',
                                  percent: categoryRatios.feedback,
                                  color: colors.category.feedback,
                                },
                              ]}
                            />

                            <View style={styles.donutCenter}>
                                <AppText variant="headingMedium">5</AppText>
                                <AppText variant="caption" color="secondary">카테고리</AppText>
                            </View>
                        </View>

                        <View style={styles.legend}>
                            {Object.entries(categoryRatios).map(([key, value]) => (
                              <View key={key} style={styles.legendRow}>
                                <View
                                  style={[
                                    styles.legendDot,
                                    { backgroundColor: colors.category[key as keyof typeof colors.category] },
                                  ]}
                                />
                                <AppText variant="caption">
                                  {key === 'effort'
                                    ? '노력'
                                    : key === 'complete'
                                    ? '완성'
                                    : key === 'explore'
                                    ? '탐색'
                                    : key === 'support'
                                    ? '지원'
                                    : '피드백'}
                                </AppText>
                                <AppText
                                  variant="caption"
                                  color="secondary"
                                  style={{ marginLeft: 10 }}
                                >
                                  {value}%
                                </AppText>
                              </View>
                            ))}
                    </View>
                </View>
            </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionTitle}>
                    <AppText variant="headingMedium">
                        최근 활동
                    </AppText>
                    <AppText variant="caption" color="secondary">
                        전체보기
                    </AppText>
                </View>

                {activities.slice(0, 4).map(activity => (
                    <ActivityCard
                      key={activity.activityId}
                      title={activity.title}
                      category={categoryMap[activity.category]}
                      date={activity.activityDate}
                      duration={activity.duration}
                      onPress={() =>
                        navigation.navigate('ActivityDetailScreen', {
                          activityId: activity.activityId,
                        })
                      }
                    />
                ))}
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
    },

    title: {
        gap: 4,
    },

    content: {
        padding: 20,
    },

    statRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
        marginBottom: 24,
    },

    section: {
        marginTop: 12,
    },

    sectionTitle: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'space-between',
    },

    graphPlaceholder: {
        height: 218,
        // backgroundColor removed for theme injection
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        marginBottom: 16,
    },

    chartRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },

    donutWrapper: {
        width: 120,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },

    donutCenter: {
        position: 'absolute',
        alignItems: 'center',
    },

    legend: {
        flex: 1,
        gap: 8,
    },

    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 4,
    },
});