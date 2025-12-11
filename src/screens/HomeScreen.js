// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SafeAreaView } from "react-native-safe-area-context";
import {  AFRICAN_CATEGORIES, POPULAR_RECIPES , FEATURED_RECIPE} from '../data/mockData';


const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('1');

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Ionicons
          name={item.icon}
          size={18}
          color={isSelected ? COLORS.white : COLORS.text}
        />
        <Text
          style={[
            styles.categoryText,
            isSelected && styles.categoryTextActive,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard} activeOpacity={0.9}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeOverlay}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.recipeMetaContainer}>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.recipeMeta}>
            <Ionicons name="star" size={16} color={COLORS.accent} />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.authorContainer}>
          <Image
            source={{ uri: item.authorImage }}
            style={styles.authorImage}
          />
          <Text style={styles.authorName}>{item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Chef! 👋</Text>
          <Text style={styles.subtitle}>What would you like to cook today?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <FlatList
            data={AFRICAN_CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

           {/* Featured Recipe Banner */}
        <View style={styles.section}>
           <TouchableOpacity style={styles.featuredBanner}>
            <Image
              source={{ uri: FEATURED_RECIPE?.image }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredLabel}>Recipe of the Day</Text>
              <Text style={styles.featuredTitle}>{FEATURED_RECIPE?.title}</Text>
              <TouchableOpacity style={styles.tryButton}>
                <Text style={styles.tryButtonText}>Try Now</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Popular Recipes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Recipes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={POPULAR_RECIPES}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.recipeRow}
            scrollEnabled={false}
          />
        </View>

     
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  greeting: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    gap: SPACING.xs,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  seeAll: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
  recipeRow: {
    paddingHorizontal: SPACING.md,
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.border,
  },
  recipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.sm,
  },
  difficultyBadge: {
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  difficultyText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: '600',
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeInfo: {
    padding: SPACING.sm,
  },
  recipeTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  authorImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  authorName: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },
  featuredBanner: {
    marginHorizontal: SPACING.md,
    height: 140,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: SPACING.md,
    justifyContent: 'center',
  },
  featuredLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  featuredTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  tryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: 'flex-start',
    gap: SPACING.xs,
  },
  tryButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default HomeScreen;