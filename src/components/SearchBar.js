import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';


export const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={searchStyles.container}>
      <Ionicons name="search" size={20} color={COLORS.textLight} />
      <TextInput
        style={searchStyles.input}
        placeholder={placeholder || 'Search...'}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.textLight}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 50,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
});
