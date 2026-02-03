import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Platform, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import FilterTab from '../components/FilterTab';
import { CategoryType } from '../components/CategoryTag';
import { formatDateKR } from "@/src/utils/date";
import CalendarIcon from '../../assets/icons/calendar.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/types';
import { useTheme } from '@/src/theme/ThemeContext';
import { useActivity } from '@/src/hooks/useActivities';

const CATEGORY_TABS: { label: string; value: CategoryType }[] = [
    { label: '노력', value: 'effort' },
    { label: '완성', value: 'complete' },
    { label: '탐색', value: 'explore' },
    { label: '지원', value: 'support' },
    { label: '피드백', value: 'feedback' },
];

type ApiCategory =
    | 'EFFORT'
    | 'COMPLETE'
    | 'EXPLORE'
    | 'SUPPORT'
    | 'FEEDBACK';

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'AddActivity'>;

export default function AddActivityScreen() {
    const { colors } = useTheme();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<CategoryType>('effort');
    const [date, setDate] = useState<Date>(new Date());
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [memo, setMemo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<
        RouteProp<RootStackParamList, 'AddActivity' | 'EditActivity'>
    >();

    const isEditMode = route.name === 'EditActivity';

    const activityId = isEditMode
        ? (route.params as RootStackParamList['EditActivity']).activityId
        : undefined;

    const {
      addActivity,
      updateActivity,
      fetchActivityDetail,
      activity,
      loading,
      error,
    } = useActivity();

    const mapCategoryToApi = (value: CategoryType): ApiCategory => {
        const mapper: Record<CategoryType, ApiCategory> = {
            effort: 'EFFORT',
            complete: 'COMPLETE',
            explore: 'EXPLORE',
            support: 'SUPPORT',
            feedback: 'FEEDBACK',
        };

        return mapper[value];
    };

    useEffect(() => {
      if (!isEditMode || !activity) return;

      setTitle(activity.title);
      setMemo(activity.description ?? '');
      setDate(new Date(activity.activityDate));

      const totalMinutes = activity.duration ?? 0;
      setHours(String(Math.floor(totalMinutes / 60)));
      setMinutes(String(totalMinutes % 60));

      const reverseCategoryMap: Record<ApiCategory, CategoryType> = {
        EFFORT: 'effort',
        COMPLETE: 'complete',
        EXPLORE: 'explore',
        SUPPORT: 'support',
        FEEDBACK: 'feedback',
      };
      setCategory(reverseCategoryMap[activity.category]);
    }, [isEditMode, activity]);

    useEffect(() => {
      if (isEditMode && activityId) {
        fetchActivityDetail(activityId);
      }
    }, [isEditMode, activityId, fetchActivityDetail]);

    const handleSave = async () => {
      const totalMinutes =
        Number(hours || 0) * 60 + Number(minutes || 0);

      if (isEditMode && activityId) {
        await updateActivity(activityId, {
          title,
          description: memo || undefined,
          category: mapCategoryToApi(category),
          duration: totalMinutes,
          activityDate: date.toISOString().split('T')[0],
        });
      } else {
        await addActivity({
          title,
          description: memo || undefined,
          category: mapCategoryToApi(category),
          duration: totalMinutes,
          activityDate: date.toISOString().split('T')[0],
        });
      }

      navigation.goBack();
    };

    const isSaveDisabled =
      loading ||
      title.trim().length === 0 ||
      (hours.trim().length === 0 && minutes.trim().length === 0);

    return (
        <SafeAreaView
          edges={['top']}
          style={[styles.safe, { backgroundColor: colors.bg.card }]}
        >
            <View style={[styles.container, { backgroundColor: colors.bg.app }]}>

                <View style={[styles.header, { backgroundColor: colors.bg.card }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AppText variant="caption" color="secondary">취소</AppText>
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <AppText variant="headingLarge">{isEditMode ? '활동 수정' : '활동 추가'}</AppText>
                    </View>

                    <TouchableOpacity
                      disabled={isSaveDisabled}
                      onPress={handleSave}
                    >
                        <AppText
                            variant="caption"
                            color={isSaveDisabled ? 'tertiary' : 'secondary'}
                        >
                            저장
                        </AppText>
                    </TouchableOpacity>
                    <View style={[styles.divider, { backgroundColor: colors.bg.Divider }]} />
                </View>

                <View style={styles.section}>
                    <AppText variant="headingMedium">활동 제목</AppText>

                    <TextInput
                        placeholder="활동 제목을 입력하세요"
                        value={title}
                        onChangeText={setTitle}
                        style={[
                            styles.input,
                            {
                                backgroundColor: colors.bg.card,
                                borderColor: colors.bg.Divider,
                                color: colors.text.primary,
                            },
                        ]}
                        placeholderTextColor={colors.text.tertiary}
                        />
                </View>

                <View style={styles.section}>
                    <AppText variant="headingMedium">
                        카테고리
                    </AppText>
                    <View style={styles.categoryRow}>
                        {CATEGORY_TABS.map(tab => (
                            <FilterTab
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                            selected={category === tab.value}
                            onPress={setCategory}/>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="headingMedium">날짜</AppText>

                    <TouchableOpacity style={[
                        styles.selectBox,
                        {
                            backgroundColor: colors.bg.card,
                            borderColor: colors.bg.Divider,
                        },
                    ]} activeOpacity={0.8} onPress={() => setShowDatePicker(true)}>
                        <AppText variant="caption">{formatDateKR(date)}</AppText>
                        <CalendarIcon width={10} height={11}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <AppText variant="headingMedium">
                        소요 시간
                    </AppText>

                    <View style={styles.timeRow}>

                        <View style={[
                            styles.timeBox,
                            {
                                backgroundColor: colors.bg.card,
                                borderColor: colors.bg.Divider,
                            },
                        ]}>
                        <TextInput
                            value={hours}
                            onChangeText={setHours}
                            keyboardType="number-pad"
                            style={[
                                styles.timeValue,
                                { color: colors.text.primary }
                            ]}
                            placeholder="0"
                            placeholderTextColor={colors.text.primary}
                        />
                        <AppText variant="caption" color="secondary">시간</AppText>
                        </View>

                        <View style={[
                            styles.timeBox,
                            {
                                backgroundColor: colors.bg.card,
                                borderColor: colors.bg.Divider,
                            },
                        ]}>
                        <TextInput
                            value={minutes}
                            onChangeText={setMinutes}
                            keyboardType="number-pad"
                            style={[
                                styles.timeValue,
                                { color: colors.text.primary }
                            ]}
                            placeholder="0"
                            placeholderTextColor={colors.text.primary}
                        />
                        <AppText variant="caption" color="secondary">분</AppText>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="headingMedium">
                        메모 (선택)
                    </AppText>

                    <TextInput
                        placeholder="메모를 입력하세요 (선택)"
                        value={memo}
                        onChangeText={setMemo}
                        multiline
                        style={[
                            styles.memoInput,
                            {
                                backgroundColor: colors.bg.subtle,
                                borderColor: colors.bg.Divider,
                                color: colors.text.primary,
                            },
                        ]}
                        placeholderTextColor={colors.text.tertiary}
                    />
                </View>
            </View>

            <View style={[
                styles.bottomArea,
                {
                    backgroundColor: colors.bg.app,
                }
            ]}>
                <TouchableOpacity
                activeOpacity={0.8}
                disabled={isSaveDisabled}
                onPress={handleSave}
                style={[
                    styles.saveButton,
                    { backgroundColor: colors.active.active },
                    isSaveDisabled && { backgroundColor: colors.bg.Divider },
                ]}
                >
                    <AppText variant="headingMedium" color="inverse">
                        저장하기
                    </AppText>
                </TouchableOpacity>
            </View>
            <Modal
                transparent
                animationType="fade"
                visible={showDatePicker}
            >
                <View style={styles.modalOverlay}>
                    <View style={[
                        styles.pickerContainer,
                        {
                            backgroundColor: colors.bg.card,
                        },
                    ]}>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => setShowDatePicker(false)}
                        >
                            <AppText variant="caption">확인</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 16,
        paddingHorizontal: 20,
    },

    divider: {
        height: 1,
    },

    section: {
        marginBottom: 32,
        paddingHorizontal: 20,
    },

    input: {
        marginTop: 8,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        borderWidth: 0.5,
    },

    categoryRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        flexWrap: 'wrap',
    },

    selectBox: {
        flexDirection: 'row',
        marginTop: 8,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        borderWidth: 0.5,
    },

    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    timeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '48%',
        height: 44,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 0.5,
    },

    timeValue: {
        flex: 1,
        fontSize: 12,
        padding: 0,
    },

    memoInput: {
        marginTop: 8,
        minHeight: 120,
        borderRadius: 12,
        padding: 14,
        textAlignVertical: 'top',
        borderWidth: 0.5,
    },

    bottomArea: {
        paddingHorizontal: 20,
        paddingVertical: 40,
    },

    saveButton: {
        height: 60,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveButtonDisabled: {
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    pickerContainer: {
        width: '90%',
        borderRadius: 16,
        padding: 16,
    },

    confirmButton: {
        marginTop: 12,
        alignItems: 'flex-end',
    },
})