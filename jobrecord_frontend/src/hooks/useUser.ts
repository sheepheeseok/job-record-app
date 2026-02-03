import {useCallback, useContext, useState} from 'react';
import axios from '@/src/lib/axios';
import { AuthContext } from '@/src/utils/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UpdateProfileParams {
    name: string;
    statusMessage?: string;
}

interface UserResponse {
    userId: number;
    name: string;
    email: string;
    statusMessage: string;
}

interface TempPasswordResponse {
    message: string;
}


export function useUser() {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error('useUser must be used within AuthProvider');
    }

    const { user, setUser } = auth;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMyProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get<UserResponse>('users/me');
            setUser(data);
        } catch (err: any) {
            setError(err?.response?.data?.message || '시용자 정보 조회 실패');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = async ({
        name,
        statusMessage,
    }: UpdateProfileParams): Promise<boolean> => {
        try {
            setLoading(true);

            const res = await axios.put(
                'auth/profile',
                {
                    name,
                    statusMessage,
                }
            );

            const updatedUser = res.data;

            if (!updatedUser || !updatedUser.name) {
                throw new Error('업데이트 정보가 잘못 되었습니다.');
            }

            setUser((prev: typeof user) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    name: updatedUser.name,
                    statusMessage: updatedUser.statusMessage,
                };
            });

            await AsyncStorage.multiSet([
                ['name', updatedUser.name],
                ['statusMessage', updatedUser.statusMessage ?? ''],
            ]);

            return true;
        } catch (error) {
            console.error('[updateProfile]', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        // 필요하면 서버 logout API 추가
        setUser(null);
    };

    const issueTempPassword = async (email: string): Promise<string> => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post<TempPasswordResponse>(
                'auth/temp',
                { email }
            );

            return data.message;
        } catch (err: any) {
            setError(
                err?.response?.data?.message ?? '비밀번호 발급에 실패했습니다.'
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        updateProfile,
        fetchMyProfile,
        issueTempPassword,
        logout,
        error,
    };
}