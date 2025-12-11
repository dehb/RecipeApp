// src/screens/SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SafeAreaView } from "react-native-safe-area-context";
import { SEARCH_RESULTS} from '../data/mockData';



const FILTER_OPTIONS = ['All', 'Quick', 'Vegetarian', 'Desserts', 'Healthy'];



const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const renderFilterOption = (option) => (
    <TouchableOpacity
      key={option}
      style={[
        styles.filterChip,
        selectedFilter === option && styles.filterChipActive,
      ]}
      onPress={() => setSelectedFilter(option)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === option && styles.filterTextActive,
        ]}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity style={styles.resultCard}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <View style={styles.resultMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="flame-outline" size={16} color={COLORS.textLight} />
            <Text style={styles.metaText}>{item.calories} cal</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.bookmarkButton}>
        <Ionicons name="bookmark-outline" size={20} color={COLORS.textLight} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textLight}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <View style={styles.filtersContainer}>
        {FILTER_OPTIONS.map(renderFilterOption)}
      </View>

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {SEARCH_RESULTS.length} recipes found
      </Text>

      {/* Search Results */}
      <FlatList
        data={SEARCH_RESULTS}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 50,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  resultsCount: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textLight,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  resultsList: {
    paddingHorizontal: SPACING.md,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.border,
  },
  resultInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  resultTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;