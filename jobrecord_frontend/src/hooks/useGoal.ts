import { useState } from 'react';
import axios from '@/src/lib/axios';

interface SaveGoalRequest {
    weeklyHours?: number;
    monthlyDays?: number;
}

interface GoalResponse {
    weeklyHours: number | null;
    monthlyDays: number | null;
}

export const useGoal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCurrentGoals = async (): Promise<GoalResponse> => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get<GoalResponse>('goals/current');
            console.log(data);
            return data;
        } catch (e) {
            setError('목표 조회에 실패했습니다.');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const saveGoals = async (payload: SaveGoalRequest): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await axios.post('goals', payload);
        } catch (e) {
            setError('목표 저장에 실패했습니다.');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getCurrentGoals,
        saveGoals,
    };
};