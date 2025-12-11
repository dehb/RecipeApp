// src/screens/AddRecipeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SafeAreaView } from "react-native-safe-area-context";


const AddRecipeScreen = ({ navigation }) => {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks', 'Snacks'];

  const handleAddIngredient = () => {
    Alert.prompt(
      'Add Ingredient',
      'Enter ingredient name and quantity',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (text) => {
            if (text && text.trim()) {
              setIngredients([...ingredients, text.trim()]);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleAddInstruction = () => {
    Alert.prompt(
      'Add Instruction',
      'Enter cooking instruction',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (text) => {
            if (text && text.trim()) {
              setInstructions([...instructions, text.trim()]);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handlePublish = () => {
    if (!recipeName.trim()) {
      Alert.alert('Error', 'Please enter a recipe name');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!cookTime.trim()) {
      Alert.alert('Error', 'Please enter cooking time');
      return;
    }
    if (!servings.trim()) {
      Alert.alert('Error', 'Please enter number of servings');
      return;
    }
    if (ingredients.length === 0) {
      Alert.alert('Error', 'Please add at least one ingredient');
      return;
    }
    if (instructions.length === 0) {
      Alert.alert('Error', 'Please add at least one instruction');
      return;
    }

    // Success - show alert and navigate back
    Alert.alert(
      'Success!',
      'Your recipe has been published successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setRecipeName('');
            setDescription('');
            setCookTime('');
            setServings('');
            setIngredients([]);
            setInstructions([]);
            // Navigate to home
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Recipe</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Image Upload */}
        <TouchableOpacity 
          style={styles.imageUpload}
          onPress={() => Alert.alert('Image Upload', 'Camera/Gallery picker will be implemented here')}
        >
          <Ionicons name="camera" size={48} color={COLORS.textLight} />
          <Text style={styles.uploadText}>Add Recipe Photo</Text>
          <Text style={styles.uploadSubtext}>Tap to select from gallery or camera</Text>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          {/* Recipe Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recipe Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter recipe name"
              value={recipeName}
              onChangeText={setRecipeName}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about your recipe..."
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={COLORS.textLight}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Time and Servings */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Cook Time (min) *</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="time-outline" size={20} color={COLORS.textLight} />
                <TextInput
                  style={[styles.input, styles.inputInline]}
                  placeholder="30"
                  value={cookTime}
                  onChangeText={setCookTime}
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Servings *</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="people-outline" size={20} color={COLORS.textLight} />
                <TextInput
                  style={[styles.input, styles.inputInline]}
                  placeholder="4"
                  value={servings}
                  onChangeText={setServings}
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.inputGroup}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Ingredients *</Text>
              <TouchableOpacity onPress={handleAddIngredient}>
                <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            
            {ingredients.length === 0 ? (
              <TouchableOpacity 
                style={styles.ingredientItem}
                onPress={handleAddIngredient}
              >
                <Ionicons name="add-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.placeholderText}>Tap to add ingredients</Text>
              </TouchableOpacity>
            ) : (
              ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Ionicons name="checkbox-outline" size={20} color={COLORS.success} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                  <TouchableOpacity onPress={() => removeIngredient(index)}>
                    <Ionicons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          {/* Instructions Section */}
          <View style={styles.inputGroup}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Instructions *</Text>
              <TouchableOpacity onPress={handleAddInstruction}>
                <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            
            {instructions.length === 0 ? (
              <TouchableOpacity 
                style={styles.instructionItem}
                onPress={handleAddInstruction}
              >
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.placeholderText}>Tap to add instruction</Text>
              </TouchableOpacity>
            ) : (
              instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                  <TouchableOpacity onPress={() => removeInstruction(index)}>
                    <Ionicons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handlePublish}
        >
          <Text style={styles.submitButtonText}>Publish Recipe</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  imageUpload: {
    marginHorizontal: SPACING.md,
    height: 200,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  uploadText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
    fontWeight: '600',
  },
  uploadSubtext: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textExtraLight,
    marginTop: SPACING.xs,
  },
  form: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    paddingTop: SPACING.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  inputInline: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: SPACING.md,
    borderWidth: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  ingredientText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    flex: 1,
  },
  placeholderText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textLight,
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  instructionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    flex: 1,
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? SPACING.lg : SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  submitButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
});

export default AddRecipeScreen;