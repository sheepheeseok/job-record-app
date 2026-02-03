import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SummaryCard } from './SummaryCard';
import ClockIcon from '../../assets/icons/clock2.svg';
import DateIcon from '../../assets/icons/date.svg';
import BestIcon from '../../assets/icons/Best.svg';
import { useTheme } from '@/src/theme/ThemeContext';
interface SummaryRowProps {
    totalTime: number;   // total duration in minutes
    activeDays: number;  // number of active days
    topCategory: string; // display label (e.g. '노력')
}

export function SummaryRow({
    totalTime,
    activeDays,
    topCategory,
}: SummaryRowProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.row}>
            <SummaryCard
                icon={<ClockIcon />}
                title="총 활동 시간"
                value={Math.round(totalTime / 60).toString()}
                unit="시간"
                iconBgColor={colors.bg_category.effort}
            />

            <SummaryCard
                icon={<DateIcon />}
                title="활동 일수"
                value={activeDays.toString()}
                unit="일"
                iconBgColor={colors.bg_category.complete}
            />

            <SummaryCard
                icon={<BestIcon />}
                title="인기 카테고리"
                value={topCategory}
                iconBgColor={colors.bg_category.support}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
});