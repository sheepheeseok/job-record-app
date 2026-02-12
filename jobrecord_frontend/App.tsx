import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from '@/src/theme/ThemeContext';
import {AuthProvider} from "@/src/utils/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import {navigationRef} from "@/src/types/navigationRef";
import AppSplashScreen from './src/screens/SplashScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
        'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
        'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
        'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
    });

    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
            setTimeout(() => {
                setShowSplash(false);
            }, 3000);
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    if (showSplash) {
        return <AppSplashScreen />;
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