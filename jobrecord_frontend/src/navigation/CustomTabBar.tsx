import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/src/theme/ThemeContext';

export default function CustomTabBar({
                                         state,
                                         descriptors,
                                         navigation,
                                     }: BottomTabBarProps) {
    const { colors } = useTheme();

    return (
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.bg.card,
              borderTopColor: colors.bg.Divider,
            },
          ]}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const focused = state.index === index;

                const onPress = () => {
                    if (route.name === 'Add') {
                        navigation.getParent()?.navigate('AddActivity');
                        return;
                    }

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const color = focused
                    ? colors.active.active
                    : colors.text.tertiary;

                if (route.name === 'Add') {
                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            activeOpacity={0.9}
                            style={[
                              styles.plusWrapper,
                              { backgroundColor: colors.active.active },
                            ]}
                        >
                            {options.tabBarIcon?.({
                                focused,
                                color: '#fff',
                                size: 24,
                            })}
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        activeOpacity={0.7}
                        style={styles.item}
                    >
                        {options.tabBarIcon?.({
                            focused,
                            color,
                            size: 24,
                        })}
                        <Text
                            style={[
                                styles.label,
                                { color: focused ? colors.active.active : colors.text.tertiary },
                            ]}
                        >
                            {typeof options.tabBarLabel === 'string'
                                ? options.tabBarLabel
                                : options.title}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18,
        paddingTop: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
    },

    item: {
        width: 48,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        marginTop: 4,
        fontSize: 12,

    },

    plusWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        marginTop: -8,
    },
});