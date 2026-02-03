import React from 'react';
import { useFonts } from 'expo-font';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from '@/src/theme/ThemeContext';
import {AuthProvider} from "@/src/utils/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import {navigationRef} from "@/src/types/navigationRef";

export default function App() {
    const [fontsLoaded] = useFonts({
        'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
        'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
        'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
        'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
    });

    if (!fontsLoaded) {
        return null; // 또는 SplashScreen
    }

    return (
        <ThemeProvider>
                <AuthProvider>
                    <NavigationContainer ref={navigationRef}>
                        <RootNavigator />
                    </NavigationContainer>
                </AuthProvider>

        </ThemeProvider>
    );
}