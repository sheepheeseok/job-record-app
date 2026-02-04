import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '@/src/theme/ThemeContext';

interface Props {
    labels: string[];
    data: number[];
}

export const MonthlyWeeklyBarChart = ({ labels, data }: Props) => {
    const { colors } = useTheme();
    const width = Dimensions.get('window').width;

    // Aggregate data into weekly sums
    const weeklySums = [0, 0, 0, 0, 0];
    data.forEach((value, index) => {
        const day = index + 1;
        if (day <= 7) weeklySums[0] += value;
        else if (day <= 14) weeklySums[1] += value;
        else if (day <= 21) weeklySums[2] += value;
        else if (day <= 28) weeklySums[3] += value;
        else weeklySums[4] += value;
    });

    // Prepare labels and data for weeks with data
    const weekLabels = ['1주', '2주', '3주', '4주', '5주'];
    let filteredLabels = weekLabels;
    let filteredData = weeklySums;

    // Remove the 5th week if there's no data
    if (weeklySums[4] === 0) {
        filteredLabels = weekLabels.slice(0, 4);
        filteredData = weeklySums.slice(0, 4);
    }

    return (
        <View style={{ marginTop: 16 }}>
            <View style={{ marginLeft: -64 }}>
                <BarChart
                    data={{
                        labels: filteredLabels,
                        datasets: [{ data: filteredData }],
                    }}
                    width={width}
                    height={220}          // 차트 높이
                    fromZero
                    showValuesOnTopOfBars={true}
                    withHorizontalLabels={false}
                    withVerticalLabels={true}
                    withInnerLines={false}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={{
                        backgroundGradientFrom: colors.bg.card,
                        backgroundGradientTo: colors.bg.card,
                        decimalPlaces: 0,
                        barPercentage: 0.85,
                        labelColor: () => colors.text.tertiary,
                        propsForBackgroundLines: { stroke: 'transparent' },
                        // Set a visible bar color
                        color: () => colors.active.active,
                    }}
                    style={{ borderRadius: 12 }}
                />
            </View>
        </View>
    );
};