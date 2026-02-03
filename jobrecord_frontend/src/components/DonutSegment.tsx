import React from 'react';
import { Animated } from 'react-native';
import { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CIRCUMFERENCE = 314;

interface Props {
    start: number;   // 0 ~ 100
    end: number;     // 0 ~ 100
    progress: Animated.Value;
    color: string;
}

export function DonutSegment({ start, end, progress, color }: Props) {
    const startRatio = start / 100;
    const endRatio = end / 100;

    const segmentLength = (endRatio - startRatio) * CIRCUMFERENCE;

    const strokeOpacity = progress.interpolate({
        inputRange: [0, startRatio, startRatio + 0.0001],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    });

    const strokeDasharray = progress.interpolate({
        inputRange: [0, startRatio, endRatio],
        outputRange: [
            `0 ${CIRCUMFERENCE}`,
            `0 ${CIRCUMFERENCE}`,
            `${segmentLength} ${CIRCUMFERENCE}`,
        ],
        extrapolate: 'clamp',
    });

    return (
        <AnimatedCircle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={color}
            strokeWidth={12}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={-startRatio * CIRCUMFERENCE}
            strokeLinecap="round"
            strokeOpacity={strokeOpacity}
        />
    );
}