import React, {useState, useCallback} from 'react';
import { View, FlatList, StyleSheet, Modal, Pressable } from 'react-native';
import ActivityCard from '../components/ActivityCard';
import {CategoryType} from "@/src/components/CategoryTag";
import {SafeAreaView} from "react-native-safe-area-context";
import AppText from "@/src/components/AppText";
import FilterIcon from '../../assets/icons/filter.svg';
import FilterTab from "@/src/components/FilterTab";
import { useTheme } from '@/src/theme/ThemeContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActivity } from '@/src/hooks/useActivities';
import { ActivityCategory } from '@/src/types/activity';

const categoryMap: Record<ActivityCategory, CategoryType> = {
    EFFORT: 'effort',
    COMPLETE: 'complete',
    EXPLORE: 'explore',
    SUPPORT: 'support',
    FEEDBACK: 'feedback',
};

export type ActivityFilterType = CategoryType | 'all';

type RootStackParamList = {
  ActivityDetailScreen: {
    activityId: number;
  };
};

const FILTER_TABS: { label: string; value: ActivityFilterType }[] = [
    { label: '전체', value: 'all' },
    { label: '노력', value: 'effort' },
    { label: '완성', value: 'complete' },
    { label: '탐색', value: 'explore' },
    { label: '지원', value: 'support' },
    { label: '피드백', value: 'feedback' },
];

export default function ActivityScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [selectedCategory, setSelectedCategory] = useState<ActivityFilterType>('all');
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);
    const [sortType, setSortType] = useState<'latest' | 'duration'>('latest');
    const { activities, loading, fetchActivityDetail, fetchActivities } = useActivity();

    useFocusEffect(
      useCallback(() => {
          fetchActivities();
      }, [fetchActivityDetail])
    );

    const filteredActivities =
        selectedCategory === 'all'
            ? activities
            : activities.filter(
                  item => categoryMap[item.category] === selectedCategory,
              );
    const sortedActivities = [...filteredActivities].sort((a, b) => {
        if (sortType === 'latest') {
            return new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime();
        }
        return b.duration - a.duration;
    });
    return (
        <SafeAreaView
          edges={['top']}
          style={[styles.safe, { backgroundColor: colors.bg.card }]}
        >
        <View style={[styles.container, { backgroundColor: colors.bg.app }]}>

            <View style={[styles.header, { backgroundColor: colors.bg.card }]}>
                <AppText variant="headingLarge">
                    활동
                </AppText>
                <Pressable onPress={() => setIsSortModalVisible(true)}>
                  <View style={[styles.filterWrapper, { backgroundColor: colors.bg.Divider }]}>
                      <FilterIcon width={20} height={20}/>
                  </View>
                </Pressable>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.bg.Divider }]} />

            <View style={[styles.filterArea, { backgroundColor: colors.bg.card }]}>
                {FILTER_TABS.map(tab=> (
                    <FilterTab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        selected={selectedCategory === tab.value}
                        onPress={setSelectedCategory}/>
                ))}
            </View>

            <FlatList
                data={sortedActivities}
                keyExtractor={item => String(item.activityId)}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ActivityCard
                        title={item.title}
                        category={categoryMap[item.category]}
                        date={item.activityDate}
                        duration={item.duration}
                        onPress={() =>
                          navigation.navigate('ActivityDetailScreen', {
                              activityId: item.activityId,
                          })
                        }
                    />
                )}
            />
        </View>
        <Modal
          visible={isSortModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsSortModalVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setIsSortModalVisible(false)}>
            <View style={[styles.modalContainer, { backgroundColor: colors.bg.card }]}>
              <Pressable
                style={[
                  styles.modalItem,
                  sortType === 'latest' && styles.modalItemSelected,
                ]}
                onPress={() => {
                  setSortType('latest');
                  setIsSortModalVisible(false);
                }}
              >
                <View style={styles.modalRow}>
                  <AppText
                    variant="caption"
                    style={{
                      color: sortType === 'latest' ? '#FFFFFF' : colors.text.primary,
                    }}
                  >
                    최신순
                  </AppText>
                </View>
              </Pressable>
              <View style={styles.modalDivider} />
              <Pressable
                style={[
                  styles.modalItem,
                  sortType === 'duration' && styles.modalItemSelected,
                ]}
                onPress={() => {
                  setSortType('duration');
                  setIsSortModalVisible(false);
                }}
              >
                <View style={styles.modalRow}>
                  <AppText
                    variant="caption"
                    style={{
                      color: sortType === 'duration' ? '#FFFFFF' : colors.text.primary,
                    }}
                  >
                    소요시간순
                  </AppText>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
        </SafeAreaView>
    );
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    divider: {
        height: 1,
    },

    filterWrapper: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },

    filterArea: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 8,
    },

    list: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 24,
        gap: 12,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
      width: 280,
      borderRadius: 12,
    },
    modalItem: {
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    modalRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalDivider: {
      height: 1,
      marginHorizontal: 16,
      backgroundColor: '#E5E7EB',
    },
    modalItemSelected: {
        backgroundColor: '#92A289',
        color: '#fff',
    },
});