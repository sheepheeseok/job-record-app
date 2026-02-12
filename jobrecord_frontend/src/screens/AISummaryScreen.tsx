import { useTheme } from "@/src/theme/ThemeContext";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LeftArrow from "@/assets/icons/left_arrow.svg";
import AppText from "@/src/components/AppText";
import SummaryBottomBar from "@/src/components/SummaryBottomBar";
import AdviceCard from "@/src/components/AdviceCard";
import AISummaryCard from "@/src/components/AISummaryCard";
import FeedbackCard from "@/src/components/FeedbackCard";
import {useUser} from '@/src/hooks/useUser';
import {useAnalysis} from "@/src/hooks/useAnalysis";
import {useEffect} from "react";
import SummaryStatCard from "@/src/components/SummaryStatCard";

function getTendencyLabel(type?: string) {
    switch (type) {
        case 'PREPARATION':
            return '준비 중심';
        case 'EXECUTION':
            return '실행 중심';
        case 'EXPLORATION':
            return '탐색 중심';
        case 'CONSISTENT':
            return '안정형';
        case 'UNBALANCED':
            return '불균형';
        default:
            return '-';
    }
}

export default function AISummaryScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { user } = useUser();
    const {
        data,
        loading,
        error,
        fetchAnalysis,
        aiData,
        aiLoading,
        fetchAI,
    } = useAnalysis();

    useEffect(() => {
        if (!user?.userId) return;

        const today = new Date();
        const endDate = today.toISOString().split('T')[0];

        const start = new Date();
        start.setDate(today.getDate() - 30);
        const startDate = start.toISOString().split('T')[0];

        fetchAnalysis(user.userId, startDate, endDate);
    }, [user]);

    useEffect(() => {
        if (!data) return;
        fetchAI(data);
    }, [data]);

    if (loading) return null;
    if (error) return null;


    return (
        <View style={{ flex: 1, backgroundColor: colors.bg.card }}>
            <SafeAreaView
                edges={['top']}
                style={[styles.safe, { backgroundColor: colors.bg.card }]}
            >
                <View style={[styles.header, { backgroundColor: colors.bg.card }]}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <LeftArrow width={10} height={18} color={colors.text.primary}/>
                    </Pressable>

                    <View style={styles.headerTextWrapper}>
                        <AppText variant="headingLarge">
                            AI 활동 분석
                        </AppText>

                        <AppText variant="caption" color="secondary">
                            최근 30일 활동 기준
                        </AppText>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={[styles.content, { backgroundColor: colors.bg.app }]}
                    showsVerticalScrollIndicator={false}
                >
                    <AISummaryCard
                        title={`현재 경향: ${getTendencyLabel(data?.tendencyType)}`}
                        description={
                            aiLoading
                                ? 'AI가 분석을 생성하고 있습니다...'
                                : aiData?.summary ?? ''
                        }
                    />

                    <View style={styles.statWrapper}>
                        <SummaryStatCard value={`${data?.totalHours ?? 0}h`} label="총 활동 시간" />
                        <SummaryStatCard value={`${data?.activeDays ?? 0}`} label="활동 일수" />
                        <SummaryStatCard value={`${data?.completionRatio ?? 0}%`} label="완료 비율" />
                        <SummaryStatCard value={`${data?.consistencyScore ?? 0}`} label="꾸준함 점수" />
                    </View>

                    <FeedbackCard
                        text={
                            aiLoading
                                ? 'AI 피드백를 생성 중입니다...'
                                : aiData?.feedback ?? ''
                        }
                    />

                    <AdviceCard
                        type="recommend"
                        title="이번 주 추천 행동"
                        text={
                            aiLoading
                                ? 'AI가 추천 행동을 생성 중입니다...'
                                : aiData?.recommendation ?? ''
                        }
                    />
                </ScrollView>
            </SafeAreaView>

            <SummaryBottomBar
                onRetry={() => {
                    if (data) {
                        fetchAI(data);
                    }
                }}
                disabled={aiLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    content: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        paddingBottom: 200,
    },

    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    statWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 6,
    },

    backButton: {
        position: 'absolute',
        left: 20,
        top: "90%",
        transform: [{ translateY: -12 }],
    },

    headerTextWrapper: {
        alignItems: 'center',
    },
});