import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import AddActivityScreen from '../screens/AddActivityScreen';
import LoginScreen from "@/src/screens/LoginScreen";
import SignUpScreen from "@/src/screens/SignUpScreen";
import FindAccountScreen from "@/src/screens/FindAccountScreen";
import ActivityDetailScreen from "@/src/screens/ActivityDetailScreen";

export type RootStackParamList = {
    Tabs: undefined;
    AddActivity: undefined;
    EditActivity: { activityId: number; };
    LoginScreen: undefined;
    SignUpScreen: undefined;
    FindAccountScreen: undefined;
    ActivityDetailScreen: { activityId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs" component={BottomTabs} />
                <Stack.Screen name="AddActivity" component={AddActivityScreen} />
                <Stack.Screen name="EditActivity" component={AddActivityScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="FindAccountScreen" component={FindAccountScreen} />
                <Stack.Screen name="ActivityDetailScreen" component={ActivityDetailScreen} />
            </Stack.Navigator>
    );
}