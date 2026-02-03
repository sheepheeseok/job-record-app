import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const CIRCUMFERENCE = 314; // 2 * PI * r (r = 50 기준)

export function useDonutChart(
    value: number,
    total: number,
    delay = 0,
) {
    const percent =
        total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;

    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: percent,
            duration: 900,
            delay,
            useNativeDriver: false,
        }).start();
    }, [percent]);

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [CIRCUMFERENCE, CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100],
    });

    return {
        strokeDasharray: `${(CIRCUMFERENCE * percent) / 100} ${CIRCUMFERENCE}`,
        strokeDashoffset,
    };
}