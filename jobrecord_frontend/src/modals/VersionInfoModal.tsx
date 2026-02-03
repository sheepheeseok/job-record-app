import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AppText from '@/src/components/AppText';
import FileIcon from '@/assets/icons/note.svg';
import CloseIcon from "@/assets/icons/close.svg";
import { useTheme } from '@/src/theme/ThemeContext';

interface VersionInfoModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function VersionInfoModal({
                                             visible,
                                             onClose,
                                         }: VersionInfoModalProps) {
    const { colors } = useTheme();

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText variant="headingMedium">버전 정보</AppText>

                        <TouchableOpacity
                          onPress={onClose}
                          style={[styles.closeButton, { backgroundColor: colors.bg.subtle }]}
                        >
                            <CloseIcon width={12} height={12} />
                        </TouchableOpacity>
                    </View>

                    {/* Icon */}
                    <View
                      style={[
                        styles.iconWrapper,
                        { backgroundColor: colors.active.active },
                      ]}
                    >
                        <FileIcon width={28} height={28} color="#fff" />
                    </View>

                    {/* Version */}
                    <AppText variant="headingLarge" style={styles.version}>
                        v1.0.0
                    </AppText>

                    <AppText variant="caption" color="secondary" style={styles.statusText}>
                        최신 버전을 사용하고 계십니다
                    </AppText>

                    {/* Update Notes */}
                    <View
                      style={[
                        styles.noteBox,
                        { backgroundColor: colors.bg.subtle },
                      ]}
                    >
                        <AppText variant="headingMedium" style={styles.noteTitle}>
                            업데이트 내역
                        </AppText>

                        <AppText variant="caption" color="secondary">
                            • 활동 기록 기능 추가{'\n'}
                            • 카테고리 관리 기능{'\n'}
                            • 주간 리포트 제공{'\n'}
                            • 목표 설정 기능
                        </AppText>
                    </View>

                    {/* Confirm Button */}
                    <TouchableOpacity
                      style={[
                        styles.confirmButton,
                        { backgroundColor: colors.active.active },
                      ]}
                      onPress={onClose}
                    >
                        <AppText variant="headingMedium" color="inverse">
                            확인
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    container: {
        borderRadius: 24,
        padding: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },

    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },

    version: {
        textAlign: 'center',
        marginBottom: 4,
    },

    statusText: {
        textAlign: 'center',
        marginBottom: 20,
    },

    noteBox: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },

    noteTitle: {
        marginBottom: 8,
    },

    confirmButton: {
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});