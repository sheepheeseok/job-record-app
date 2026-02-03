export type ActivityCategory =
    | 'EFFORT'
    | 'COMPLETE'
    | 'EXPLORE'
    | 'SUPPORT'
    | 'FEEDBACK';

export interface Activity {
    activityId: number;
    title: string;
    category: ActivityCategory;
    duration: number;
    activityDate: string; // YYYY-MM-DD
}

export interface ActivityDetail extends Activity {
    description?: string;
    createdAt: string;
    updatedAt: string;
}