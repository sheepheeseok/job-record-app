import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import AppText from '@/src/components/AppText';
import { useTheme } from '@/src/theme/ThemeContext';

interface AuthRequiredModalProps {
    visible: boolean;
    onClose: () => void;
    onLoginPress: () => void;
}

export function AuthRequiredModal({
                                      visible,
                                      onClose,
                                      onLoginPress,
                                  }: AuthRequiredModalProps) {
    const { colors } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    <AppText variant="headingMedium" style={styles.title}>
                        로그인이 필요합니다
                    </AppText>

                    <AppText
                        variant="headingMedium"
                        color="secondary"
                        style={styles.description}
                    >
                        해당 기능을 이용하려면 로그인이 필요합니다.
                    </AppText>

                    <View style={styles.buttonRow}>
                        <Pressable
                            onPress={onLoginPress}
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: colors.active.active },
                                pressed && { opacity: 0.8 },
                            ]}
                        >
                            <AppText variant="caption" style={{ color: '#fff' }}>
                                로그인
                            </AppText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '82%',
        borderRadius: 16,
        padding: 20,
    },
    title: {
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});