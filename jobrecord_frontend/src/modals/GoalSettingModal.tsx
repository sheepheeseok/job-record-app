import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import AppText from '@/src/components/AppText';
import { useTheme } from '@/src/theme/ThemeContext';
import CloseIcon from "@/assets/icons/close.svg";
import {useGoal} from "@/src/hooks/useGoal";

interface GoalSettingModalProps {
    visible: boolean;
    onClose: () => void;
    onSave?: (weeklyHours: number, monthlyDays: number) => void;
}

export default function GoalSettingModal({
    visible,
    onClose,
}: GoalSettingModalProps) {
    const [weeklyHours, setWeeklyHours] = useState('0');
    const [monthlyDays, setMonthlyDays] = useState('0');

    const { colors } = useTheme();

    const handleSave = async () => {
        await saveGoals({
            weeklyHours: Number(weeklyHours),
            monthlyDays: Number(monthlyDays),
        });
        onClose();
    };

    const { getCurrentGoals, saveGoals, loading } = useGoal();

    useEffect(() => {
        if (visible) {
            const fetchGoals = async () => {
                const goals = await getCurrentGoals();
                if (goals && goals.weeklyHours != null) {
                    setWeeklyHours(String(goals.weeklyHours));
                } else {
                    setWeeklyHours('0');
                }
                if (goals && goals.monthlyDays != null) {
                    setMonthlyDays(String(goals.monthlyDays));
                } else {
                    setMonthlyDays('0');
                }
            };
            fetchGoals();
        }
    }, [visible]);

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.bg.card }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText variant="headingMedium">목표 설정</AppText>
                        <TouchableOpacity
                          onPress={onClose}
                          style={[styles.closeButton, { backgroundColor: colors.bg.subtle }]}
                        >
                          <CloseIcon width={12} height={12} />
                        </TouchableOpacity>
                    </View>

                    {/* 주간 목표 시간 */}
                    <View style={styles.section}>
                        <AppText variant="caption" color="secondary">
                            주간 목표 시간
                        </AppText>
                        <View style={styles.inputRow}>
                            <TextInput
                                value={weeklyHours}
                                onChangeText={setWeeklyHours}
                                keyboardType="number-pad"
                                style={[
                                  styles.input,
                                  {
                                    borderColor: colors.bg.Divider,
                                    backgroundColor: colors.bg.card,
                                    color: colors.text.primary,
                                  },
                                ]}
                            />
                            <AppText variant="headingMedium">시간</AppText>
                        </View>
                    </View>

                    {/* 월간 목표 일수 */}
                    <View style={styles.section}>
                        <AppText variant="caption" color="secondary">
                            월간 목표 일수
                        </AppText>
                        <View style={styles.inputRow}>
                            <TextInput
                                value={monthlyDays}
                                onChangeText={setMonthlyDays}
                                keyboardType="number-pad"
                                style={[
                                  styles.input,
                                  {
                                    borderColor: colors.bg.Divider,
                                    backgroundColor: colors.bg.card,
                                    color: colors.text.primary,
                                  },
                                ]}
                            />
                            <AppText variant="headingMedium">일</AppText>
                        </View>
                    </View>

                    {/* 저장 버튼 */}
                    <TouchableOpacity
                      style={[styles.saveButton, { backgroundColor: colors.active.active }]}
                      onPress={handleSave}
                    >
                        <AppText variant="headingMedium" color="inverse">
                            저장하기
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
        marginBottom: 20,
    },

    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    section: {
        marginBottom: 16,
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },

    input: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
        fontSize: 16,
    },

    saveButton: {
        marginTop: 12,
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});