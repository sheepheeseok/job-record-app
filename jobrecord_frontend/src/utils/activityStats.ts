import { Activity } from '@/src/types/activity';

type CategoryKey =
    | 'effort'
    | 'complete'
    | 'explore'
    | 'support'
    | 'feedback';

const categoryMap = {
    EFFORT: 'effort',
    COMPLETE: 'complete',
    EXPLORE: 'explore',
    SUPPORT: 'support',
    FEEDBACK: 'feedback',
} as const;

/** 전체 활동 시간 (분) */
export function getTotalDuration(activities: Activity[]): number {
    return activities.reduce((sum, a) => sum + a.duration, 0);
}

/** 카테고리별 활동 시간 합계 */
export function getCategoryDurationMap(
    activities: Activity[],
): Record<CategoryKey, number> {
    const result: Record<CategoryKey, number> = {
        effort: 0,
        complete: 0,
        explore: 0,
        support: 0,
        feedback: 0,
    };

    activities.forEach(a => {
        const key = categoryMap[a.category];
        result[key] += a.duration;
    });

    return result;
}

/** 카테고리별 퍼센트 계산 */
export function getCategoryRatioMap(
    activities: Activity[],
): Record<CategoryKey, number> {
    const total = getTotalDuration(activities);
    const durations = getCategoryDurationMap(activities);

    const ratioMap = {} as Record<CategoryKey, number>;

    (Object.keys(durations) as CategoryKey[]).forEach(key => {
        ratioMap[key] =
            total > 0 ? Math.round((durations[key] / total) * 100) : 0;
    });

    return ratioMap;
}