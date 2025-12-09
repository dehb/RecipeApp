import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';


export const CategoryChip = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        chipStyles.chip,
        isSelected && chipStyles.chipActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          chipStyles.text,
          isSelected && chipStyles.textActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

const chipStyles = StyleSheet.create({
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  text: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: '500',
  },
  textActive: {
    color: COLORS.white,
  },
});
