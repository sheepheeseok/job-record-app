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

interface PrivacyPolicyModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function PrivacyPolicyModal({
                                               visible,
                                               onClose,
                                           }: PrivacyPolicyModalProps) {
    const { colors } = useTheme();

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText variant="headingMedium">개인정보 처리방침</AppText>

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
                            1. 개인정보의 수집 및 이용 목적
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            당사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
                            있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                            이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한
                            조치를 이행할 예정입니다.
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            • 회원 가입 및 관리{'\n'}
                            • 서비스 제공 및 개선{'\n'}
                            • 통계 분석 및 서비스 품질 향상
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            2. 수집하는 개인정보 항목
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            당사는 서비스 제공을 위해 다음의 개인정보를 수집할 수 있습니다.
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            • 필수항목: 이메일 주소, 이름{'\n'}
                            • 선택항목: 프로필 사진, 활동 기록
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            3. 개인정보의 보유 및 이용기간
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            당사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당
                            개인정보를 지체 없이 파기합니다.
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            4. 개인정보의 제3자 제공
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            당사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법
                            제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
                            제공합니다.
                        </AppText>

                        <AppText variant="headingMedium" style={styles.sectionTitle}>
                            5. 정보주체의 권리·의무 및 행사방법
                        </AppText>
                        <AppText variant="caption" color="secondary" style={styles.paragraph}>
                            이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수
                            있습니다.{'\n'}
                            • 개인정보 열람 요구{'\n'}
                            • 오류 등이 있을 경우 정정 요구{'\n'}
                            • 삭제 요구{'\n'}
                            • 처리정지 요구
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