import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/src/theme/ThemeContext';
import AppText from '@/src/components/AppText';
import UserIcon from '@/assets/icons/my.svg';
import { useUser } from '@/src/hooks/useUser';

interface ProfileSetupModalProps {
    visible: boolean;
    onStart: () => void;
}

export default function ProfileSetupModal({
                                              visible,
                                              onStart,
                                          }: ProfileSetupModalProps) {
    const { colors } = useTheme();
    const { updateProfile, loading } = useUser();

    const [name, setName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const isValid = name.trim().length > 0;

    const handleStart = async () => {
        const success = await updateProfile({
            name,
            statusMessage,
        });

        if (success) {
            onStart();
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    {/* Title */}
                    <AppText variant="headingLarge" style={styles.title}>
                        프로필 설정
                    </AppText>
                    <AppText variant="caption" color="secondary" style={styles.subtitle}>
                        앱 사용을 시작하기 전에 프로필을 완성해 주세요
                    </AppText>

                    {/* Profile Image */}
                    <View style={styles.avatarWrapper}>
                        <View
                            style={[
                                styles.avatar,
                                { backgroundColor: colors.active.active },
                            ]}
                        >
                            <UserIcon width={32} height={32} color={colors.text.inverse} />
                        </View>
                        <AppText variant="caption" style={{ marginTop: 8, color: colors.active.active  }}>
                            사진 추가
                        </AppText>
                    </View>

                    {/* Name */}
                    <View style={styles.field}>
                        <AppText variant="caption">이름</AppText>
                        <View
                            style={[
                                styles.inputWrapper,
                                { borderColor: colors.bg.Divider },
                            ]}
                        >
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="이름을 입력해주세요"
                            placeholderTextColor={colors.text.tertiary}
                            style={[styles.input, { color: colors.text.primary }]}
                        />
                        </View>
                    </View>

                    {/* Status Message */}
                    <View style={styles.field}>
                        <AppText variant="caption">상태 메시지 (선택)</AppText>
                        <View
                            style={[
                                styles.inputWrapper,
                                { borderColor: colors.bg.Divider },
                            ]}
                        >
                        <TextInput
                            value={statusMessage}
                            onChangeText={setStatusMessage}
                            placeholder="상태 메시지를 입력해주세요"
                            placeholderTextColor={colors.text.tertiary}
                            style={[styles.input, { color: colors.text.primary }]}
                            maxLength={30}
                        />
                        </View>
                        <AppText
                            variant="caption"
                            color="secondary"
                            style={styles.counter}
                        >
                        {statusMessage.length}/30
                        </AppText>
                    </View>

                    {/* Start Button */}
                <TouchableOpacity
                    disabled={!isValid || loading}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                !isValid || loading
                                    ? colors.bg.Divider
                                    : colors.category.effort,
                        },
                    ]}
                    onPress={handleStart}
                    activeOpacity={0.8}
                >
                        <AppText variant="caption" color="inverse">
                            시작하기
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        width: '88%',
        borderRadius: 20,
        padding: 24,
    },

    title: {
        textAlign: 'center',
    },

    subtitle: {
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 24,
    },

    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 24,
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },

    field: {
        marginBottom: 20,
    },

    inputWrapper: {
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        justifyContent: 'center',
    },

    input: {
        fontSize: 14,
    },

    counter: {
        textAlign: 'right',
        marginTop: 4,
    },

    button: {
        marginTop: 8,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});