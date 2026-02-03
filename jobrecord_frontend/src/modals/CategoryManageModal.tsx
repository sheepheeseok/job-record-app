import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/src/components/AppText';
import { useTheme } from '@/src/theme/ThemeContext';
import CloseIcon from '@/assets/icons/close.svg';
import CheckIcon from '@/assets/icons/check_category.svg';

export type CategoryType =
    | 'effort'
    | 'complete'
    | 'explore'
    | 'support'
    | 'feedback';

interface CategoryItem {
    type: CategoryType;
    label: string;
    selected: boolean;
}

interface Props {
    visible: boolean;
    onClose: () => void;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
    { type: 'effort', label: '노력', selected: false },
    { type: 'complete', label: '완성', selected: true },
    { type: 'explore', label: '탐색', selected: true },
    { type: 'support', label: '지원', selected: true },
    { type: 'feedback', label: '피드백', selected: true },
];

export function CategoryManageModal({ visible, onClose }: Props) {
    const { colors } = useTheme();
    const [categories, setCategories] = useState(INITIAL_CATEGORIES);

    const toggleCategory = (type: CategoryType) => {
        setCategories(prev =>
            prev.map(item =>
                item.type === type
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <SafeAreaView style={styles.safe}>
                <View style={styles.backdrop}>
                    <View style={[styles.sheet, { backgroundColor: colors.bg.card }]}>
                        {/* Header */}
                        <View style={styles.header}>
                            <AppText variant="headingMedium">카테고리 관리</AppText>

                            <Pressable onPress={onClose}>
                                <View style={[styles.closeButton, { backgroundColor: colors.bg.subtle }]}>
                                    <CloseIcon width={12} height={12} />
                                </View>
                            </Pressable>
                        </View>

                        {/* Category List */}
                        {categories.map(category => {
                            const selected = category.selected;

                            return (
                                <Pressable
                                    key={category.type}
                                    onPress={() => toggleCategory(category.type)}
                                    style={[
                                        styles.categoryItem,
                                        selected
                                            ? {
                                                backgroundColor: colors.bg_category[category.type],
                                                borderColor: colors.text_category[category.type],
                                            }
                                            : {
                                                backgroundColor: colors.bg.subtle,
                                                borderColor: colors.bg.Divider,
                                            },
                                    ]}
                                >
                                    <AppText
                                        variant="headingMedium"
                                        color={selected ? category.type : 'secondary'}
                                    >
                                        {category.label}
                                    </AppText>

                                    {selected && (
                                        <CheckIcon
                                            width={16}
                                            height={16}
                                            color={colors.text_category[category.type]}
                                        />
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
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
        paddingTop: 16,
        paddingBottom: 24,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    closeButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    categoryItem: {
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});