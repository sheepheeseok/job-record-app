import React, {useEffect, useState} from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import AppText from '@/src/components/AppText';
import UserIcon from '@/assets/icons/my.svg';
import InfoIcon from '@/assets/icons/info.svg';
import CameraIcon from '@/assets/icons/camera.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/theme/ThemeContext';
import {useUser} from "@/src/hooks/useUser";

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function EditProfileModal({ visible, onClose }: Props) {
    const { colors } = useTheme();
    const { loading, user, updateProfile } = useUser();

    const [ name, setName ] = useState(user?.name ?? '');
    const [ statusMessage, setStatusMessage ] = useState(user?.statusMessage ?? '');

    const isChanged =
        !!user &&
        (name !== (user.name ?? '') ||
         statusMessage !== (user.statusMessage ?? ''));

    useEffect(() => {
        if (user) {
            setName(user.name ?? '');
            setStatusMessage(user.statusMessage ?? '');
        }
    }, [user]);

    const onSave = async () => {
        const success = await updateProfile({
            name,
            statusMessage,
        });

        if (success) {
            onClose();
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg.app }]}>
                {/* Header */}
                <View style={[styles.header, { borderBottomColor: colors.bg.Divider }]}>
                    <Pressable onPress={onClose}>
                        <AppText variant="caption" color="secondary">
                            취소
                        </AppText>
                    </Pressable>

                    <AppText variant="headingMedium">프로필 수정</AppText>

                    <Pressable
                        onPress={onSave}
                        disabled={!isChanged || loading}
                    >
                        <AppText
                            variant="caption"
                            color={!isChanged || loading ? 'tertiary' : 'secondary'}
                        >
                            저장
                        </AppText>
                    </Pressable>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Avatar */}
                    <View style={styles.avatarWrapper}>
                        <View style={[styles.avatar, { backgroundColor: colors.active.active }]}>
                            <UserIcon width={28} height={28} color="#fff" />
                        </View>

                        <Pressable
                            style={[
                                styles.cameraButton,
                                { backgroundColor: colors.bg.card },
                            ]}
                        >
                            <CameraIcon width={14} height={14} />
                        </Pressable>

                        <AppText
                            variant="caption"
                            style={{ marginTop: 8, color: colors.active.active }}
                        >
                            사진 변경
                        </AppText>
                    </View>

                    {/* Name */}
                    <Field label="이름">
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.bg.card,
                                    borderColor: colors.bg.Divider,
                                    color: colors.text.primary,
                                },
                            ]}
                        />
                    </Field>

                    {/* Status Message */}
                    <Field label="상태 메시지">
                        <TextInput
                            value={statusMessage}
                            onChangeText={setStatusMessage}
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.bg.card,
                                    borderColor: colors.bg.Divider,
                                    color: colors.text.primary,
                                },
                            ]}
                        />
                    </Field>

                    {/* Email */}
                    <Field label="이메일">
                        <TextInput
                            value={user?.email ?? ''}
                            editable={false}
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.bg.subtle,
                                    borderColor: colors.bg.Divider,
                                    color: colors.text.secondary,
                                },
                            ]}
                        />
                        <AppText
                            variant="caption"
                            color="secondary"
                            style={{ marginTop: 6 }}
                        >
                            이메일은 변경할 수 없습니다.
                        </AppText>
                    </Field>

                    {/* Info Box */}
                    <View
                        style={[
                            styles.infoBox,
                            { backgroundColor: colors.bg.subtle },
                        ]}
                    >
                        <View style={styles.infoArea}>
                            <InfoIcon width={14} height={14} color={colors.text.secondary}/>
                            <AppText variant="caption">
                                프로필 정보 안내
                            </AppText>
                        </View>

                        <AppText
                            variant="caption"
                            color="secondary"
                            style={{ marginTop: 4 }}
                        >
                                프로필 이미지와 상태 메시지는 다른 사용자에게 표시됩니다.
                                간단하고 명확한 소개를 작성해주세요.
                        </AppText>

                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

function Field({
                   label,
                   children,
               }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <View style={{ marginBottom: 16 }}>
            <AppText
                variant="caption"
                style={{ marginBottom: 8 }}
            >
                {label}
            </AppText>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    header: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },

    content: {
        padding: 20,
    },

    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 24,
        position: 'relative',
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cameraButton: {
        position: 'absolute',
        right: 125,
        bottom: 25,
        width: 38,
        height: 38,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },

    input: {
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
    },

    infoBox: {
        marginTop: 8,
        padding: 12,
        borderRadius: 12,
    },

    infoArea: {
        flexDirection: 'row',
        gap: 6,
    },
});