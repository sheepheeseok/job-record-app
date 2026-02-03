import React, {useEffect} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Switch,
    Pressable,
    Alert,
} from 'react-native';
import AppText from '@/src/components/AppText';
import UserIcon from '@/assets/icons/my.svg';
import BellIcon from '@/assets/icons/bell.svg';
import TagIcon from '@/assets/icons/tag.svg';
import TargetIcon from '@/assets/icons/Best.svg';
import MoonIcon from '@/assets/icons/moon.svg';
import ArrowIcon from '@/assets/icons/right_arrow.svg';
import {SafeAreaView} from "react-native-safe-area-context";
import {EditProfileModal} from "@/src/modals/EditProfileModal";
import {NotificationSettingModal} from "@/src/modals/NotificationSettiongModal";
import {CategoryManageModal} from "@/src/modals/CategoryManageModal";
import GoalSettingModal from "@/src/modals/GoalSettingModal";
import NoticeModal from "@/src/modals/NoticeModal";
import TermsModal from "@/src/modals/termsModal";
import PrivacyPolicyModal from "@/src/modals/PrivacyPolicyModal";
import VersionInfoModal from "@/src/modals/VersionInfoModal";
import { useTheme } from '@/src/theme/ThemeContext';
import { useAuth } from '@/src/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import {useUser} from "@/src/hooks/useUser";

export default function MyScreen() {
    const { colors, mode, setMode } = useTheme();
    const [showEditProfile, setShowEditProfile] = React.useState(false);
    const [showNotificationModal, setShowNotificationModal] = React.useState(false);
    const [categoryModal, setCategoryModal] = React.useState(false);
    const [goalSettingModal, setGoalSettingModal] = React.useState(false);
    const [noticeModal, setNoticeModal] = React.useState(false);
    const [termsModal, setTermsModal] = React.useState(false);
    const [privacyPolicyModal, setPrivacyPolicyModal] = React.useState(false);
    const [versionInfoModal, setVersionInfoModal] = React.useState(false);
    const { logout } = useAuth();
    const navigation = useNavigation<any>();

    const { user, loading, fetchMyProfile } = useUser();

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            '로그아웃',
            '로그아웃 하시겠습니까?',
            [
                {
                    text: '아니오',
                    style: 'cancel', // iOS에서 기본 취소 스타일
                },
                {
                    text: '예',
                    style: 'destructive', // iOS 빨간색
                    onPress: async () => {
                        await logout();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Tabs' }],
                        });
                    },
                },
            ],
        );
    };

    return (
        <SafeAreaView
          style={[styles.safe, { backgroundColor: colors.bg.card }]}
          edges={['top']}
        >
            <AppText variant="headingLarge" style={styles.title}>
                마이페이지
            </AppText>
        <ScrollView
            contentContainerStyle={[
              styles.container,
              { backgroundColor: colors.bg.app },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Profile Card */}
            <View style={[styles.profileCard, { backgroundColor: colors.bg.card }]}>
                <View style={styles.profileRow}>
                    <View style={[styles.avatar, { backgroundColor: colors.active.active }]}>
                        <UserIcon width={32} height={31} color="#fff" />
                    </View>

                    <View style={{ gap: 6 }}>
                        <AppText variant="headingLarge">{user?.name}</AppText>
                        <AppText variant="caption" color="secondary">
                            {user?.statusMessage}
                        </AppText>
                    </View>
                </View>

                <View style={[styles.emailBox, { backgroundColor: colors.bg.subtle }]}>
                    <AppText variant="caption" color="secondary">
                        이메일
                    </AppText>
                    <AppText variant="caption">{user?.email}</AppText>
                </View>

                <Pressable
                    style={[styles.editButton, { backgroundColor: colors.bg.subtle }]}
                    onPress={() => setShowEditProfile(true)}
                >
                    <AppText variant="caption">프로필 수정</AppText>
                </Pressable>
            </View>

            {/* 설정 */}
            <Section title="설정" colors={colors}>
                <SettingRow
                    icon={<BellIcon />}
                    label="알림 설정"
                    iconBgColor={colors.bg_category.effort}
                    onPress={() => setShowNotificationModal(true)}
                />
                <SettingRow
                    icon={<TagIcon />}
                    label="카테고리 관리"
                    iconBgColor={colors.bg_category.complete}
                    onPress={() => setCategoryModal(true)}
                />
                <SettingRow
                    icon={<TargetIcon />}
                    label="목표 설정"
                    iconBgColor={colors.bg_category.support}
                    onPress={() => setGoalSettingModal(true)}
                />

                <SettingRow
                    icon={<MoonIcon />}
                    label="다크 모드"
                    iconBgColor={colors.bg_category.feedback}
                    isLast
                    right={
                        <Switch
                            value={mode === 'dark'}
                            onValueChange={(value) => setMode(value ? 'dark' : 'light')}
                            trackColor={{
                                false: colors.bg.Divider,
                                true: colors.active.active,
                            }}
                            thumbColor="#FFFFFF"
                        />
                    }
                />
            </Section>

            {/* 앱 정보 */}
            <Section title="앱 정보" colors={colors}>
                <SettingRow label="공지사항" onPress={() => setNoticeModal(true)}/>
                <SettingRow label="이용약관" onPress={() => setTermsModal(true)}/>
                <SettingRow label="개인정보 처리방침" onPress={() => setPrivacyPolicyModal(true)}/>
                <SettingRow
                    label="버전 정보"
                    onPress={() => setVersionInfoModal(true)}
                    isLast
                    right={<AppText variant="caption" color="secondary"> v1.0.0</AppText>}
                />
            </Section>

            {/* Logout */}
            <Pressable
              style={[styles.logoutButton, { backgroundColor: colors.bg.card }]}
              onPress={handleLogout}
            >
                <AppText variant="caption" style={{ color: colors.state.error }}>
                    로그아웃
                </AppText>
            </Pressable>
        </ScrollView>
            <EditProfileModal
                visible={showEditProfile}
                onClose={() => setShowEditProfile(false)}
            />
            <NotificationSettingModal
                visible={showNotificationModal}
                onClose={() => setShowNotificationModal(false)}
            />
            <CategoryManageModal
                visible={categoryModal}
                onClose={() => setCategoryModal(false)}
            />
            <GoalSettingModal
                visible={goalSettingModal}
                onClose={() => setGoalSettingModal(false)}
            />
            <NoticeModal
                visible={noticeModal}
                onClose={() => setNoticeModal(false)}
            />
            <TermsModal
                visible={termsModal}
                onClose={() => setTermsModal(false)}
            />
            <PrivacyPolicyModal
                visible={privacyPolicyModal}
                onClose={() => setPrivacyPolicyModal(false)}
            />
            <VersionInfoModal
                visible={versionInfoModal}
                onClose={() => setVersionInfoModal(false)}
            />
        </SafeAreaView>
    );
}

function Section({
                     title,
                     children,
                     colors,
                 }: {
    title: string;
    children: React.ReactNode;
    colors: any;
}) {
    return (
        <View style={styles.section}>
            <AppText variant="caption" style={styles.sectionTitle}>
                {title}
            </AppText>
            <View
              style={[
                styles.sectionCard,
                { backgroundColor: colors.bg.card },
              ]}
            >
              {children}
            </View>
        </View>
    );
}

function SettingRow({
                        icon,
                        label,
                        right,
                        iconBgColor,
                        isLast,
                        onPress,
                    }: {
    icon?: React.ReactNode;
    label: string;
    right?: React.ReactNode;
    iconBgColor?: string;
    isLast?: boolean;
    onPress?: () => void;
}) {
    const { colors } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.settingRow,
                isLast && { borderBottomWidth: 0 },
                !isLast && { borderBottomColor: colors.bg.Divider },
            ]}
        >
            <View style={styles.settingLeft}>
                {icon && (
                    <View
                        style={[
                            styles.iconBox,
                            iconBgColor && { backgroundColor: iconBgColor },
                        ]}
                    >
                        {icon}
                    </View>
                )}
                <AppText variant="headingMedium">{label}</AppText>
            </View>

            {right ?? <ArrowIcon width={7} height={12} color={colors.arrow.default}/>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        padding: 20,
        paddingBottom: 40,
    },

    title: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },

    profileCard: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emailBox: {
        marginTop: 12,
        padding: 12,
        borderRadius: 12,
    },

    editButton: {
        marginTop: 16,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    section: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },

    sectionTitle: {
        marginBottom: 8,
    },

    sectionCard: {
        borderRadius: 16,
        overflow: 'hidden',
    },

    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },

    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoutButton: {
        marginTop: 16,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
});