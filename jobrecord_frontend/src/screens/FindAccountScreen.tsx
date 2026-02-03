import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from 'react-native';
import AppText from '@/src/components/AppText';
import NoteIcon from '@/assets/icons/note.svg';
import MyIcon from '@/assets/icons/my.svg';
import TelIcon from "@/assets/icons/tel.svg";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/ThemeContext';
import {useUser} from "@/src/hooks/useUser";

export default function FindAccountScreen() {
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    const { issueTempPassword, loading, error } = useUser();
    const [email, setEmail] = useState('');
    type FindMode = 'id' | 'password';

    const [mode, setMode] = useState<FindMode>('password');
    const title =
        mode === 'id' ? '아이디 찾기' : '비밀번호 찾기';

    const handleSubmit = async () => {
        if (mode === 'password') {
            await issueTempPassword(email);
        } else {
            // 아이디 찾기 로직 (나중에)
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.safe, { backgroundColor: colors.bg.app }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.logoBox, { backgroundColor: colors.active.active }]}>
                        <NoteIcon height={35} width={30}/>
                    </View>

                    <AppText variant="headingLarge">준비 노트</AppText>
                    <AppText variant="caption" style={[styles.subtitle, { color: colors.active.active }]}>
                        Junbi Note
                    </AppText>
                    <AppText
                        variant="caption"
                        color="secondary"
                        style={{ marginTop: 12 }}
                    >
                        기록이 쌓여, 성장이 됩니다
                    </AppText>
                </View>

                <View style={[styles.toggleContainer, { backgroundColor: colors.bg.card }]}>
                    <Pressable
                        style={[
                            styles.toggleButton,
                            mode === 'id' && { backgroundColor: colors.active.active }
                        ]}
                        onPress={() => setMode('id')}
                    >
                        <AppText
                            variant="caption"
                            color={mode === 'id' ? 'inverse' : 'secondary'}
                        >
                            아이디 찾기
                        </AppText>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.toggleButton,
                            mode === 'password' && { backgroundColor: colors.active.active }
                        ]}
                        onPress={() => setMode('password')}
                    >
                        <AppText
                            variant="caption"
                            color={mode === 'password' ? 'inverse' : 'secondary'}
                        >
                            비밀번호 찾기
                        </AppText>
                    </Pressable>
                </View>

                <View style={[styles.card, { backgroundColor: colors.bg.card }]}>
                    {mode === 'id' ? (
                        <>
                            <AppText variant="headingMedium" style={styles.label}>
                                이름
                            </AppText>

                            <View style={[
                                styles.InputBox,
                                {
                                    borderColor: colors.bg.Divider,
                                    backgroundColor: colors.bg.card,
                                },
                            ]}>
                                <MyIcon width={12} height={12} color={colors.text.tertiary}/>
                                <TextInput
                                    placeholder="이름을 입력하세요"
                                    placeholderTextColor={colors.text.tertiary}
                                    style={styles.input}
                                />
                            </View>

                            <AppText variant="headingMedium" style={styles.label}>
                                전화번호
                            </AppText>

                            <View style={[
                                styles.InputBox,
                                {
                                    borderColor: colors.bg.Divider,
                                    backgroundColor: colors.bg.card,
                                },
                            ]}>
                                <TelIcon width={12} height={12} />
                                <TextInput
                                    placeholder="010-1234-1234"
                                    placeholderTextColor={colors.text.tertiary}
                                    style={styles.input}
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <AppText variant="headingMedium" style={styles.label}>
                                이메일
                            </AppText>

                            <View style={[
                                styles.InputBox,
                                {
                                    borderColor: colors.bg.Divider,
                                    backgroundColor: colors.bg.card,
                                },
                            ]}>
                                <MyIcon width={12} height={12} color={colors.text.tertiary} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="이메일을 입력하세요"
                                    placeholderTextColor={colors.text.tertiary}
                                    style={styles.input}
                                />
                            </View>

                            <AppText
                                color="secondary"
                                style={{ marginTop: 8, fontSize: 11 }}
                            >
                                입력하신 이메일로 비밀번호 재설정 링크를 보내드립니다
                            </AppText>
                        </>
                    )}

                    <View style={[styles.loginButton, { backgroundColor: colors.active.active }]}>
                        <Pressable onPress={handleSubmit}>
                            <AppText variant="headingMedium" color="inverse">
                                {title}
                            </AppText>
                        </Pressable>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <AppText variant="caption" color="secondary">
                        계정 정보가 기억나셨나요?
                    </AppText>
                    <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                        <AppText
                            variant="caption"
                            style={[styles.SignUpText, { color: colors.active.active }]}
                        >
                            로그인
                        </AppText>
                    </Pressable>
                </View>

                <AppText
                    variant="tag"
                    color="tertiary"
                    style={{ marginTop: 24 }}
                >
                    © 2025 Junbi Note. All rights reserved.
                </AppText>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    header: {
        alignItems: 'center',
        marginBottom: 32,
    },

    subtitle: {
        marginTop: 8,
    },

    logoBox: {
        width: 72,
        height: 72,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    card: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    label: {
        marginBottom: 8,
        marginTop: 12,
    },

    toggleContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 6,
        marginBottom: 20,
        gap: 4,
    },

    toggleButton: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    InputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 12,
    },

    loginButton: {
        marginTop: 20,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        flexDirection: 'row',
        marginTop: 24,
    },

    SignUpText: {
        marginLeft: 4,
    },
});