import { createNavigationContainerRef } from '@react-navigation/native';
import {RootStackParamList} from "@/src/navigation/RootNavigator";

export const navigationRef =
    createNavigationContainerRef<RootStackParamList>();