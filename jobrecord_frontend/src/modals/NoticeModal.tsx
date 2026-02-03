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

interface Notice {
    id: number;
    title: string;
    description: string;
    date: string;
}

interface NoticeModalProps {
    visible: boolean;
    onClose: () => void;
}

const NOTICE_LIST: Notice[] = [
    {
        id: 1,
        title: '새로운 기능이 추가되었어요!',
        description:
            '주간 리포트 기능으로 한 주간의 활동을 한눈에 확인하세요.',
        date: '2025.01.28',
    },
    {
        id: 2,
        title: '서비스 점검 안내',
        description:
            '더 나은 서비스를 위해 2025.02.01 새벽 2시~4시 서버 점검이 진행됩니다.',
        date: '2025.01.28',
    },
    {
        id: 3,
        title: '앱 버전 1.0.0 업데이트',
        description:
            '안정성이 개선되고 새로운 카테고리가 추가되었습니다.',
        date: '2025.01.20',
    },
];

export default function NoticeModal({
                                        visible,
                                        onClose,
                                    }: NoticeModalProps) {
    const { colors } = useTheme();

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText variant="headingMedium">공지사항</AppText>

                        <TouchableOpacity
                          onPress={onClose}
                          style={[styles.closeButton, { backgroundColor: colors.bg.subtle }]}
                        >
                            <CloseIcon width={12} height={12} />
                        </TouchableOpacity>
                    </View>

                    {/* Notice List */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.list}
                    >
                        {NOTICE_LIST.map((notice) => (
                            <View
                              key={notice.id}
                              style={[
                                styles.noticeCard,
                                {
                                  backgroundColor: colors.bg.card,
                                  borderColor: colors.bg.Divider,
                                },
                              ]}
                            >
                                <AppText variant="headingMedium" style={styles.title}>
                                    {notice.title}
                                </AppText>

                                <AppText
                                    variant="caption"
                                    color="secondary"
                                    style={styles.description}
                                >
                                    {notice.description}
                                </AppText>

                                <AppText variant="caption" color="tertiary">
                                    {notice.date}
                                </AppText>
                            </View>
                        ))}
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
        maxHeight: '80%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    list: {
        gap: 12,
        paddingBottom: 4,
    },

    noticeCard: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
    },

    title: {
        marginBottom: 6,
    },

    description: {
        marginBottom: 8,
        lineHeight: 18,
    },
});