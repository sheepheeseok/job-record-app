import {useCallback, useState} from "react";
import axios from "../lib/axios";

interface AnalysisSummary {
    tendencyType: string;

    totalActivities: number;
    activeDays: number;
    totalHours: number;

    categoryRatio: {
        effort: number;
        complete: number;
        explore: number;
        support: number;
        feedback: number;
    };

    completionRatio: number;
    consistencyScore: number;
}

interface AIResponse {
    summary: string;
    feedback: string;
    recommendation: string;
}

export const useAnalysis = () => {
    const [data, setData] = useState<AnalysisSummary | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastPayload, setLastPayload] = useState<string | null>(null);

    const fetchAnalysis = useCallback(
        async (userId: number, startDate: string, endDate: string) => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get<AnalysisSummary>('activities/analysis', {
                    params: {
                        userId,
                        startDate,
                        endDate,
                    },
                });

                setData(response.data);
            } catch (err: any) {
                setError('분석 데이터를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const [aiData, setAiData] = useState<AIResponse | null>(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const fetchAI = useCallback(async (summary: AnalysisSummary) => {
        const payloadString = JSON.stringify(summary);
        try {
            setAiLoading(true);
            setAiError(null);

            const res = await axios.post<AIResponse>(
                'activities/analysis/ai',
                summary
            );

            setAiData(res.data);
            setLastPayload(payloadString);
        } catch (err: any) {
            setAiError('AI 분석에 실패했습니다.');
        } finally {
            setAiLoading(false);
        }
    }, [lastPayload]);


    return {
        data,
        loading,
        error,
        fetchAnalysis,
        aiData,
        aiLoading,
        aiError,
        fetchAI,
    };
};