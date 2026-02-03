import React, { createContext, useContext, useState } from 'react';
import {AuthRequiredModal} from "@/src/modals/AuthRequiredModal";

interface AuthModalContextType {
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);

    return (
        <AuthModalContext.Provider
            value={{
                openAuthModal: () => setVisible(true),
                closeAuthModal: () => setVisible(false),
            }}
        >
            {children}
            {/* ⭐ 전역 모달 */}
            <AuthRequiredModal
                visible={visible}
                onClose={() => setVisible(false)}
                onLoginPress={() => {
                    setVisible(false);
                    // navigationRef.navigate('LoginScreen')
                }}
            />
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
    return ctx;
}