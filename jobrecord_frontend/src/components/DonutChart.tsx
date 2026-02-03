import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg from 'react-native-svg';
import { DonutSegment } from './DonutSegment';

interface DonutChartProps {
  segments: {
    key: string;
    percent: number; // 0 ~ 100
    color: string;
  }[];
}

export function DonutChart({ segments }: DonutChartProps) {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: false,
        }).start();
    }, []);

    let acc = 0;

    return (
        <Svg
            width={120}
            height={120}
            viewBox="0 0 120 120"
            style={{ transform: [{ rotate: '-90deg' }] }}
        >
            {segments.map(item => {
                const start = acc;
                const end = acc + item.percent;
                acc = end;

                return (
                    <DonutSegment
                        key={item.key}
                        start={start}
                        end={end}
                        progress={progress}
                        color={item.color}
                    />
                );
            })}
        </Svg>
    );
}