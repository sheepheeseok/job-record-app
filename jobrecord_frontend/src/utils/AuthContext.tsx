import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRequiredModal } from '@/src/modals/AuthRequiredModal';
import ProfileSetupModal from '@/src/modals/ProfileSetupModal';
import { navigationRef } from '@/src/types/navigationRef';

interface AuthContextValue {
    isLoggedIn: boolean;
    user: {
        userId: number;
        email: string;
        name?: string;
        profileImg?: string;
        statusMessage?: string;
    } | null;
    setUser: React.Dispatch<
        React.SetStateAction<{
            userId: number;
            email: string;
            name?: string;
            profileImg?: string;
            statusMessage?: string;
        } | null>
    >;
    loading: boolean;
    login: (token: string, userId: number, email: string) => Promise<void>;
    logout: () => Promise<void>;
    requireAuth: (onSuccess?: () => void) => boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextValue['user']>(null);
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showProfileSetupModal, setShowProfileSetupModal] = useState(false);

    const isLoggedIn = !!user;

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            setShowAuthModal(true);
        }
    }, [loading, isLoggedIn]);

    const requireAuth = (onSuccess?: () => void) => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
            return false;
        }
        onSuccess?.();
        return true;
    };

    // 🔹 앱 시작 시 자동 로그인 체크
    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const userId = await AsyncStorage.getItem('userId');
                const email = await AsyncStorage.getItem('email');
                const name = await AsyncStorage.getItem('name');
                const profileImg = await AsyncStorage.getItem('profileImg');
                const statusMessage = await AsyncStorage.getItem('statusMessage');

                if (token && userId && email) {
                    const newUser = {
                        userId: Number(userId),
                        email,
                        name: name ?? undefined,
                        profileImg: profileImg ?? undefined,
                        statusMessage: statusMessage ?? undefined,
                    };
                    setUser(newUser);
                    const hasName = typeof newUser.name === 'string' && newUser.name.trim().length > 0;
                    const hasStatusMessage =
                        typeof newUser.statusMessage === 'string' &&
                        newUser.statusMessage.trim().length > 0;

                    // ⚠️ profileImg is excluded for now (not implemented yet)
                    if (!hasName || !hasStatusMessage) {
                        setShowProfileSetupModal(true);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // 🔹 로그인 성공 시
    const login = async (token: string, userId: number, email: string) => {
        await AsyncStorage.multiSet([
            ['accessToken', token],
            ['userId', String(userId)],
            ['email', email],
        ]);

        setUser({ userId, email });
        setShowAuthModal(false);
    };

    // 🔹 로그아웃
    const logout = async () => {
        await AsyncStorage.multiRemove(['accessToken', 'userId', 'email']);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                setUser,
                loading,
                login,
                logout,
                requireAuth,
            }}
        >
            {children}
            <AuthRequiredModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginPress={() => {
                    setShowAuthModal(false);
                    if (navigationRef.isReady()) {
                        navigationRef.navigate('LoginScreen');
                    }
                }}
            />
            <ProfileSetupModal
                visible={showProfileSetupModal}
                onStart={() => setShowProfileSetupModal(false)}
            />
        </AuthContext.Provider>
    );
};