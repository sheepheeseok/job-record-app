import { useState } from 'react';
import axios from '@/src/lib/axios';

interface SignUpResponse {
    userId: number;
}

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitSignUp = async (
        email: string,
        password: string,
    ) : Promise<SignUpResponse> => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post<SignUpResponse>(
                'auth/signup',
                {
                    email,
                    password,
                },
            );

            return data;
        } catch (err: any) {
            setError(
                err.response?.data?.message ??
                '회원가입에 실패했습니다.',
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        submitSignUp,
        loading,
        error,
    }
}