import { useEffect, useState } from 'react';
import axios from '@/src/lib/axios';

interface MonthlyReportResponse {
    days: string[];
    counts: number[];
}

interface UseMonthlyReportResult {
    labels: string[];
    data: number[];
    loading: boolean;
    isEmpty: boolean;
    error: string | null;
}

export const useMonthlyReport = (year: number, month: number): UseMonthlyReportResult => {
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    useEffect(() => {
        const fetchMonthlyReport = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get<MonthlyReportResponse>(
                    'activities/monthly',
                    { params: { startDate, endDate } }
                );

                setLabels(res.data.days);
                setData(res.data.counts);
            } catch (e) {
                setError('주간 리포트를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyReport();
    }, [year, month]);

    const isEmpty = data.length === 0 || data.every(v => v === 0);

    return {
        labels,
        data,
        loading,
        isEmpty,
        error,
    }
}