import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING, BORDER_RADIUS } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SafeAreaView } from "react-native-safe-area-context";
import { NOTIFICATIONS} from '../data/mockData';




const NotificationsScreen = () => {
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.notificationUnread]}
    >
      <Image source={{ uri: item.userImage }} style={styles.userImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{item.user}</Text> {item.message}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.iconContainer}>
        {item.type === 'like' && (
          <Ionicons name="heart" size={20} color={COLORS.error} />
        )}
        {item.type === 'comment' && (
          <Ionicons name="chatbubble" size={20} color={COLORS.info} />
        )}
        {item.type === 'follow' && (
          <Ionicons name="person-add" size={20} color={COLORS.success} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={NOTIFICATIONS}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
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
  markRead: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: SPACING.md,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  notificationUnread: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SPACING.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  userName: {
    fontWeight: '600',
  },
  time: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default NotificationsScreen;