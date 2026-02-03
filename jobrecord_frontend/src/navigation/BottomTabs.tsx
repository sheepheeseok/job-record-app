import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import HomeIcon from '../../assets/icons/home.svg';
import ActivityIcon from '@/assets/icons/activity.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import ReportIcon from '@/assets/icons/report.svg';
import MyIcon from '@/assets/icons/my.svg';

import CustomTabBar from './CustomTabBar';
import ActivityScreen from "@/src/screens/ActivityScreen";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReportScreen from "@/src/screens/ReportScreen";
import MyScreen from "@/src/screens/MyScreen";

type RootStackParamList = {
    Tabs: undefined;
    AddActivity: undefined;
};

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
            <Tab.Navigator
              tabBar={props => <CustomTabBar {...props} />}
              screenOptions={{
                headerShown: false,
              }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ color }) => (
                        <HomeIcon
                            width={24}
                            height={24}
                            color={color}
                        />
                        ),
                    }}
                />

                <Tab.Screen name="Activity" component={ActivityScreen} options={{
                    tabBarLabel: '활동',
                    tabBarIcon: ({ color }) => (
                        <ActivityIcon
                            width={24}
                            height={24}
                            color={color}
                        />
                    ),
                }}
                />

                <Tab.Screen name="Add" component={View} options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddActivity')}
                        >
                        <View>
                            <PlusIcon width={24} height={24} fill="#fff" />
                        </View>
                        </TouchableOpacity>
                    ),
                }}
                />

                <Tab.Screen name="Report" component={ReportScreen} options={{
                    tabBarLabel: '리포트',
                    tabBarIcon: ({ color }) => (
                        <ReportIcon
                            width={24}
                            height={24}
                            color={color}
                        />
                    ),
                }}
                />

                <Tab.Screen name="My" component={MyScreen} options={{
                    tabBarLabel: '마이',
                    tabBarIcon: ({ color }) => (
                        <MyIcon
                            width={24}
                            height={24}
                            color={color}
                        />
                    ),
                }}
                />
            </Tab.Navigator>
    )
}