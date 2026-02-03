import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AppText from '@/src/components/AppText';
import CloseIcon from "@/assets/icons/close.svg";
import { useTheme } from '@/src/theme/ThemeContext';

interface TermsModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function TermsModal({
                                       visible,
                                       onClose,
                                   }: TermsModalProps) {
    const { colors } = useTheme();

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText variant="headingMedium">이용약관</AppText>

                        <TouchableOpacity
                          onPress={onClose}
                          style={[styles.closeButton, { backgroundColor: colors.bg.subtle }]}
                        >
                            <CloseIcon width={12} height={12} />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
                    >
                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            제1조 (목적)
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            본 약관은 [서비스명]이 제공하는 모든 서비스의 이용조건 및
                            절차, 이용자의 권리·의무, 책임사항 기타 필요한 사항을
                            규정함을 목적으로 합니다.
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            제2조 (정의)
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            1. “서비스”란 구현되는 단말기(PC, TV, 휴대형단말기 등)의
                            종류와 관계없이 “이용자”가 이용할 수 있는 서비스를 의미합니다.
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            2. “이용자”란 서비스에 접속하여 본 약관에 따라 당사가
                            제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            제3조 (약관의 게시와 개정)
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            1. 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록
                            서비스 초기 화면에 게시합니다.
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            2. 회사는 관련법을 위배하지 않는 범위에서 본 약관을
                            개정할 수 있습니다.
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            제4조 (서비스의 제공 및 변경)
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            회사는 다음과 같은 업무를 수행합니다: 활동 기록 및 관리,
                            통계 제공, 기타 회사가 정하는 업무.
                        </AppText>
                    </ScrollView>
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
        maxHeight: '85%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        paddingBottom: 12,
    },

    sectionTitle: {
        marginTop: 16,
        marginBottom: 6,
    },

    paragraph: {
        lineHeight: 20,
    },
});