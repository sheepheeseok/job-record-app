import { useState } from 'react';
import axios from '@/src/lib/axios';

interface LoginResponse {
    accessToken: string;
    userId: number;
    email: string;
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

   const submitLogin = async (
       email: string,
       password: string,
) : Promise<LoginResponse> => {
       try {
           setLoading(true);
           setError(null);

           const { data } = await axios.post<LoginResponse>(
               'auth/login',
               {
                   email,
                   password,
               },
           );

           return data;
       } catch (err: any) {
           setError(
               err.response?.data?.message ??
                   '로그인에 실패했습니다.',
           );
           throw err;
       } finally {
           setLoading(false);
       }
   };

       return {
           submitLogin,
           loading,
           error,
       };
};