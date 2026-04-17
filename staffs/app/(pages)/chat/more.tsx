import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, MessageSquareText, Users } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const chatMeta: Record<string, { name: string; description: string; members: string }> = {
  'staff-announcements': {
    name: 'Staff Announcements',
    description: 'Official school-wide updates, events and urgent alerts.',
    members: '68 members',
  },
  'grade-6-teachers': {
    name: 'Grade 6 Teachers',
    description: 'Class schedules, subject planning and daily class follow-up.',
    members: '14 members',
  },
  'front-desk-support': {
    name: 'Front Desk Support',
    description: 'Admissions, parent calls and visitor coordination updates.',
    members: '9 members',
  },
  'transport-coordination': {
    name: 'Transport Coordination',
    description: 'Route changes, pickup incidents and transport notices.',
    members: '21 members',
  },
  'security-compliance': {
    name: 'Security & Compliance',
    description: 'Campus security checks and compliance communication.',
    members: '11 members',
  },
};

export default function ChatDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ chatid?: string }>();
  const chatId = params.chatid || '';
  const details = chatMeta[chatId] || {
    name: 'School Group Chat',
    description: 'General group for staff communication and quick updates.',
    members: 'Unknown members',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={20} color="#1f2e40" strokeWidth={2.4} />
          <Text style={styles.backButtonText}>Return to chat</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Users size={28} color="#009966" strokeWidth={2.3} />
          </View>
          <Text style={styles.chatName}>{details.name}</Text>
          <Text style={styles.chatDescription}>{details.description}</Text>
          <Text style={styles.memberText}>{details.members}</Text>
          <Text style={styles.chatIdText}>chatid: {chatId || 'unknown'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionRow}>
            <View style={styles.actionIconWrap}>
              <MessageSquareText size={18} color="#009966" strokeWidth={2.2} />
            </View>
            <Text style={styles.actionText}>Open chat timeline</Text>
            <ChevronRight size={18} color="#90a1b5" strokeWidth={2.2} />
          </View>
          <View style={styles.actionRow}>
            <View style={styles.actionIconWrap}>
              <Users size={18} color="#009966" strokeWidth={2.2} />
            </View>
            <Text style={styles.actionText}>View group members</Text>
            <ChevronRight size={18} color="#90a1b5" strokeWidth={2.2} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8fb',
  },
  topBar: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2eaf2',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backButtonText: {
    marginLeft: 6,
    color: '#1f2e40',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    padding: 18,
    paddingBottom: 34,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2eaf2',
    shadowColor: '#009966',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  heroIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: '#e7faf1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#c2efd9',
  },
  chatName: {
    fontSize: 22,
    color: '#1f2e40',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 7,
  },
  chatDescription: {
    fontSize: 14,
    color: '#5b6c7b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 9,
  },
  memberText: {
    color: '#009966',
    fontWeight: '700',
    fontSize: 13,
    backgroundColor: '#e8fbf3',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chatIdText: {
    marginTop: 10,
    fontSize: 12,
    color: '#6c7a89',
    fontWeight: '600',
  },
  section: {
    marginTop: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2eaf2',
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#213247',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f3f7',
  },
  actionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#f3fbf7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  actionText: {
    flex: 1,
    color: '#30465d',
    fontSize: 14,
    fontWeight: '600',
  },
});
