import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Pressable,
    Switch,
} from 'react-native';
import AppText from '@/src/components/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseIcon from '@/assets/icons/close.svg';
import { useTheme } from '@/src/theme/ThemeContext';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function NotificationSettingModal({ visible, onClose }: Props) {
    const { colors } = useTheme();
    const [activityAlert, setActivityAlert] = useState(true);
    const [weeklyReportAlert, setWeeklyReportAlert] = useState(true);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <SafeAreaView
              style={[styles.safe, { backgroundColor: colors.bg.app }]}
              edges={["top"]}
            >
                <View style={styles.backdrop}>
                    <View style={[styles.sheet, { backgroundColor: colors.bg.card }]}>
                        {/* Header */}
                        <View style={styles.header}>
                            <AppText variant="headingMedium">알림 설정</AppText>

                            <Pressable onPress={onClose}>
                                <View style={[styles.closeButton, { backgroundColor: colors.bg.subtle }]}>
                                    <CloseIcon width={14} height={14} />
                                </View>
                            </Pressable>
                        </View>

                        {/* Rows */}
                        <SettingItem
                            label="활동 기록 알림"
                            value={activityAlert}
                            onChange={setActivityAlert}
                            colors={colors}
                        />

                        <SettingItem
                            label="주간 리포트 알림"
                            value={weeklyReportAlert}
                            onChange={setWeeklyReportAlert}
                            isLast
                            colors={colors}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

function SettingItem({
                         label,
                         value,
                         onChange,
                         isLast,
                         colors,
                     }: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
    isLast?: boolean;
    colors: any;
}) {
    return (
        <View
            style={[
                styles.row,
                { borderBottomColor: colors.bg.Divider },
                isLast && { borderBottomWidth: 0 },
            ]}
        >
            <AppText variant="headingMedium">{label}</AppText>

            <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{
                    false: colors.bg.Divider,
                    true: colors.active.active,
                }}
                thumbColor="#fff"
                style={{ marginTop: 12}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    sheet: {
        width: '90%',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 32,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    closeButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        marginTop: 12,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
});