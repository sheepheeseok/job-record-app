import React, {useCallback, useState} from 'react';
import { View, ScrollView, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native';
import AppText from '@/src/components/AppText';
import { DonutChart } from '@/src/components/DonutChart';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SummaryRow } from '@/src/components/SummaryRow';
import LeftArrowIcon from '../../assets/icons/left_arrow.svg';
import RightArrowIcon from '../../assets/icons/right_arrow.svg';
import {useFocusEffect} from "@react-navigation/core";
import { useTheme } from '@/src/theme/ThemeContext';
import { useActivity } from '@/src/hooks/useActivities';
import {
  getTotalDuration,
  getCategoryDurationMap,
  getCategoryRatioMap,
} from '@/src/utils/activityStats';
import { useMonthlyReport } from '@/src/hooks/useMonthlyReport';
import { MonthlyWeeklyBarChart } from '@/src/components/MonthlyWeeklyBarChart';

export default function ReportScreen() {
    const { colors } = useTheme();

    const { activities, loading,refetch } = useActivity();


    const [currentDate, setCurrentDate] = useState(new Date(2026, 0)); // 2025년 1월


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const {
      labels,
      data,
      loading: monthlyLoading,
      isEmpty: monthlyEmpty,
    } = useMonthlyReport(year, month);

    // Filter activities for the selected year and month
    const filteredActivities = activities.filter(a => {
      const date = new Date(a.activityDate);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month
      );
    });

    const totalDuration = getTotalDuration(filteredActivities);
    const categoryRatios = getCategoryRatioMap(filteredActivities);

    // Compute summary values
    const activeDays = new Set(
      filteredActivities.map(a => a.activityDate.split('T')[0]),
    ).size;

    const categoryDurationsMap = getCategoryDurationMap(filteredActivities);
    const topCategory = Object.entries(categoryDurationsMap).reduce(
      (prev, curr) => (curr[1] > prev[1] ? curr : prev),
      ['effort', 0] as [string, number],
    )[0];

    const [focusKey, setFocusKey] = useState(0);
useFocusEffect(
    useCallback(() => {
        refetch();
        setFocusKey(prev => prev + 1);
        setCurrentDate(new Date(2026, 0)); // 초기 기준 월로 리셋
        setShowDatePicker(false);
        return () => {};
    }, [])
);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempYear, setTempYear] = useState(year);
    const [tempMonth, setTempMonth] = useState(month);
    const changeMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const nextDate = new Date(prev);
            nextDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return nextDate;
        });
    };

    return (
        <SafeAreaView
          edges={['top']}
          style={[styles.safe, { backgroundColor: colors.bg.card }]}
        >
            <View style={[styles.header, { backgroundColor: colors.bg.card }]}>
                <AppText variant="headingLarge" style={{ marginTop: 16}}>리포트</AppText>
                <View style={styles.headerDate}>
                    <Pressable
                        onPress={() => changeMonth('prev')}
                        style={({ pressed }) => [
                            styles.iconWrapper,
                            { backgroundColor: colors.bg.Divider },
                            pressed && { opacity: 0.8 },
                        ]}
                    >
                        <LeftArrowIcon width={8} height={15} color={colors.text.primary}/>
                    </Pressable>

                    <Pressable onPress={() => {
                        setTempYear(year);
                        setTempMonth(month);
                        setShowDatePicker(true);
                    }}>
                        <AppText variant="headingMedium">
                            {year}년 {month}월
                        </AppText>
                    </Pressable>

                    <Pressable
                        onPress={() => changeMonth('next')}
                        style={({ pressed }) => [
                            styles.iconWrapper,
                            { backgroundColor: colors.bg.Divider },
                            pressed && { opacity: 0.8 },
                        ]}
                    >
                        <RightArrowIcon width={8} height={15} color={colors.text.primary}/>
                    </Pressable>
                </View>
            </View>

            <ScrollView style={[styles.container, { backgroundColor: colors.bg.app }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <SummaryRow
                  totalTime={totalDuration}
                  activeDays={activeDays}
                  topCategory={
                    topCategory === 'effort'
                      ? '노력'
                      : topCategory === 'complete'
                      ? '완성'
                      : topCategory === 'explore'
                      ? '탐색'
                      : topCategory === 'support'
                      ? '지원'
                      : '피드백'
                  }
                />

                <View
                  style={[
                    styles.graphPlaceholder,
                    { backgroundColor: colors.bg.card },
                  ]}
                >
                    <AppText variant="headingMedium">
                        카테고리별 활동시간 비율
                    </AppText>

                    <View style={styles.chartColumn}>
                        <View style={styles.donutWrapper}>
                            <DonutChart
                              key={`${year}-${month}-${focusKey}`}
                              segments={[
                                { key: 'effort', percent: categoryRatios.effort, color: colors.category.effort },
                                { key: 'complete', percent: categoryRatios.complete, color: colors.category.complete },
                                { key: 'explore', percent: categoryRatios.explore, color: colors.category.explore },
                                { key: 'support', percent: categoryRatios.support, color: colors.category.support },
                                { key: 'feedback', percent: categoryRatios.feedback, color: colors.category.feedback },
                              ]}
                            />

                            <View style={styles.donutCenter}>
                                <AppText variant="headingMedium">5</AppText>
                                <AppText variant="caption" color="secondary">
                                    카테고리
                                </AppText>
                            </View>
                        </View>

                        <View style={styles.legendColumn}>
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
                                  style={{ marginLeft: 'auto' }}
                                >
                                  {value}%
                                </AppText>
                              </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: colors.bg.card }]}>
                    <AppText variant="headingMedium">월간 활동 추이</AppText>

                    {monthlyLoading ? (
                        <View style={styles.weeklyPlaceholder} />
                    ) : monthlyEmpty ? (
                        <AppText
                            variant="caption"
                            color="secondary"
                            style={{ marginTop: 16, textAlign: 'center' }}
                        >
                            이번 달 활동 기록이 없습니다
                        </AppText>
                    ) : (
                        <MonthlyWeeklyBarChart labels={labels} data={data} />
                    )}
                </View>
            </ScrollView>
            {/* Month/Year Picker Modal */}
            <Modal transparent animationType="fade" visible={showDatePicker}>
                <View style={styles.modalOverlay}>
                    <View
                      style={[
                        styles.pickerContainer,
                        { backgroundColor: colors.bg.card },
                      ]}
                    >
                        <AppText variant="headingMedium" style={{ marginBottom: 12 }}>
                            날짜 선택
                        </AppText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* Year Picker */}
                            <View style={styles.yearPicker}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {Array.from({ length: 11 }).map((_, i) => {
                                        const y = tempYear - 5 + i;
                                        const selected = y === tempYear;

                                        return (
                                            <Pressable
                                                key={y}
                                                onPress={() => setTempYear(y)}
                                                style={[
                                                    styles.yearItem,
                                                    selected && { backgroundColor: colors.bg.subtle },
                                                ]}
                                            >
                                                <AppText
                                                    variant="caption"
                                                    style={{ opacity: selected ? 1 : 0.5 }}
                                                >
                                                    {y}년
                                                </AppText>
                                            </Pressable>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                            {/* Month Picker (custom spinner) */}
                            <View style={styles.monthPicker}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {Array.from({ length: 12 }).map((_, i) => {
                                        const m = i + 1;
                                        const selected = m === tempMonth;

                                        return (
                                            <Pressable
                                                key={m}
                                                onPress={() => setTempMonth(m)}
                                                style={[
                                                    styles.monthItem,
                                                    selected && { backgroundColor: colors.bg.subtle },
                                                ]}
                                            >
                                                <AppText
                                                    variant="caption"
                                                    style={{ opacity: selected ? 1 : 0.5 }}
                                                >
                                                    {m}월
                                                </AppText>
                                            </Pressable>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => {
                                setCurrentDate(new Date(tempYear, tempMonth - 1));
                                setShowDatePicker(false);
                            }}
                        >
                            <AppText variant="caption">확인</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    content: {
        padding: 20,
    },

    header: {
        paddingHorizontal: 20,
    },

    headerDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        alignItems: 'center',
    },

    iconWrapper: {
        width: 35,
        height: 35,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },

    summaryRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },

    card: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },

    weeklyPlaceholder: {
        height: 120,
        borderRadius: 12,
        marginTop: 16,
    },

    graphPlaceholder: {
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

    chartColumn: {
        alignItems: 'center',
        marginTop: 12,
    },

    legendColumn: {
        width: '100%',
        marginTop: 20,
        gap: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    pickerContainer: {
        borderRadius: 16,
        padding: 20,
        width: '90%',
    },

    confirmButton: {
        marginTop: 16,
        alignSelf: 'flex-end',
    },
    monthPicker: {
        flex: 1,
        maxHeight: 180,
        justifyContent: 'center',
    },

    monthItem: {
        paddingVertical: 6,
        alignItems: 'center',
    },

    monthItemSelected: {
        borderRadius: 8,
    },

    yearPicker: {
        flex: 1,
        maxHeight: 180,
    },

    yearItem: {
        paddingVertical: 6,
        alignItems: 'center',
    },

    yearItemSelected: {
        borderRadius: 8,
    },
});