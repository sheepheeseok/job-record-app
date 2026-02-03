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
import EmailIcon from '@/assets/icons/email.svg';
import PasswordIcon from '@/assets/icons/password.svg';
import PasswordOffIcon from '@/assets/icons/password_off.svg';
import PasswordOnIcon from '@/assets/icons/password_on.svg';
import CheckIcon from '@/assets/icons/check.svg';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/src/theme/ThemeContext';
import { useSignUp } from '@/src/hooks/useSignUp';
import axios from "@/src/lib/axios";

export default function SignUpScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    const { submitSignUp, loading, error } = useSignUp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {

        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return
        }

        try {
            await submitSignUp(email, password);
            navigation.navigate('LoginScreen');
        } catch (e: any) {
            const message =
                e?.response?.data?.message ??
                '회원가입에 실패했습니다.';

            alert(message);
        }
    }

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
                        간단한 정보로 바로 시작하세요
                    </AppText>
                </View>

                {/* Login Card */}
                <View style={[styles.card, { backgroundColor: colors.bg.card }]}>
                    <AppText variant="headingMedium" style={styles.label}>
                        이메일
                    </AppText>
                    <View
                        style={[
                            styles.InputBox,
                            {
                                borderColor: colors.bg.Divider,
                                backgroundColor: colors.bg.card,
                            },
                        ]}
                    >
                        <EmailIcon width={12} height={12}/>
                        <TextInput
                            placeholder="이메일을 입력하세요"
                            placeholderTextColor={colors.text.tertiary}
                            style={[styles.input, { color: colors.text.primary }]}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <AppText variant="headingMedium" style={styles.label}>
                        비밀번호
                    </AppText>
                    <View
                        style={[
                            styles.InputBox,
                            {
                                borderColor: colors.bg.Divider,
                                backgroundColor: colors.bg.card,
                            },
                        ]}
                    >
                        <PasswordIcon width={12} height={12} />

                        <TextInput
                            placeholder="비밀번호를 입력하세요 (최소 6자)"
                            placeholderTextColor={colors.text.tertiary}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            style={[styles.input, { color: colors.text.primary }]}
                        />

                        <Pressable onPress={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                <PasswordOnIcon width={16} height={16} />
                            ) : (
                                <PasswordOffIcon width={16} height={16} />
                            )}
                        </Pressable>
                    </View>

                    <AppText variant="headingMedium" style={styles.label}>
                        비밀번호 확인
                    </AppText>

                    <View
                        style={[
                            styles.InputBox,
                            {
                                borderColor: colors.bg.Divider,
                                backgroundColor: colors.bg.card,
                            },
                        ]}
                    >
                        <CheckIcon width={12} height={12} />

                        <TextInput
                            placeholder="비밀번호를 다시 입력하세요"
                            placeholderTextColor={colors.text.tertiary}
                            secureTextEntry={!showPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={[styles.input, { color: colors.text.primary }]}
                        />

                        <Pressable onPress={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                <PasswordOnIcon width={16} height={16} />
                            ) : (
                                <PasswordOffIcon width={16} height={16} />
                            )}
                        </Pressable>
                    </View>
                    <Pressable
                        onPress={handleSignUp}
                        disabled={loading}>
                    <View style={[styles.SignUpButton, { backgroundColor: colors.active.active }]}>
                        <AppText variant="headingMedium" color="inverse">
                            회원가입
                        </AppText>
                    </View>
                    </Pressable>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <AppText variant="caption" color="secondary">
                        계정이 있으신가요?
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

    SignUpButton: {
        marginTop: 20,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    footer: {
        flexDirection: 'row',
        marginTop: 24,
    },

    SignUpText: {
        marginLeft: 4,
    },
});