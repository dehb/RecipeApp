import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';

export const Button = ({ title, onPress, variant = 'primary', icon }) => {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        variant === 'secondary' && buttonStyles.buttonSecondary,
        variant === 'outline' && buttonStyles.buttonOutline,
      ]}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={20} color={COLORS.white} />}
      <Text
        style={[
          buttonStyles.text,
          variant === 'outline' && buttonStyles.textOutline,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  text: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  },
});