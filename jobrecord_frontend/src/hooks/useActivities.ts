import { useCallback, useEffect, useState } from 'react';
import axios from '@/src/lib/axios';
import { Activity, ActivityDetail } from '@/src/types/activity';

interface UseActivityParams {
    activityId?: number;
}

interface ActivityCreateRequest {
    title: string;
    description?: string;
    category: 'EFFORT' | 'COMPLETE' | 'EXPLORE' | 'SUPPORT' | 'FEEDBACK';
    duration: number;
    activityDate: string;
}

interface ActivityUpdateRequest {
    title?: string;
    description?: string;
    category?: 'EFFORT' | 'COMPLETE' | 'EXPLORE' | 'SUPPORT' | 'FEEDBACK';
    duration?: number;
    activityDate?: string;
}

export const useActivity = (params?: UseActivityParams) => {
    const activityId = params?.activityId;

    const [activities, setActivities] = useState<Activity[]>([]);
    const [activity, setActivity] = useState<ActivityDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchActivities = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get<Activity[]>('activities');
            setActivities(data);
        } catch (e: any) {
            setError(
                e?.response?.data?.message ??
                '활동 목록을 불러오지 못했습니다.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchActivityDetail = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get<ActivityDetail>(
                `activities/${id}`,
            );
            setActivity(data);
        } catch (e: any) {
            setError(
                e?.response?.data?.message ??
                '활동 상세를 불러오지 못했습니다.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activityId) {
            fetchActivityDetail(activityId);
        } else {
            fetchActivities();
        }
    }, [activityId, fetchActivities, fetchActivityDetail]);

    const addActivity = async (
        payload: ActivityCreateRequest
    ) : Promise<ActivityCreateRequest> => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post<ActivityCreateRequest>(
                'activities',
                payload
            );

            return data;
        } catch (err:any) {
            const message =
                err?.response?.data?.message ?? '활동 등록 중 오류 발생;';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const updateActivity = async (
        activityId: number,
        payload: ActivityUpdateRequest
    ) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.patch(
                `activities/${activityId}`,
                payload
            );

            return data;
        } catch (err:any) {
            setError(err?.response?.data?.message ?? '활동 수정 실패');
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const deleteActivity = async (activityId: number): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            await axios.delete(`activities/${activityId}`);
        } catch (e:any) {
            setError(
                e?.response?.data?.message ??
                '활동 삭제 중 오류가 발생했습니다.'
            );
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        activities,
        activity,
        addActivity,
        updateActivity,
        deleteActivity,
        fetchActivities,
        fetchActivityDetail,
        loading,
        error,
        refetch: activityId
            ? () => fetchActivityDetail(activityId)
            : fetchActivities,
    };
};