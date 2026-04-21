import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck, UserRound } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DUMMY_STAFF = {
  id: 'staff-001',
  name: 'Amara Okonkwo',
  role: 'Head of Class',
  email: 'amara.okonkwo@example.com',
  phone: '+234 801 234 5678',
  avatar: 'https://i.pravatar.cc/120?img=31',
  status: 'Active',
  joined: '2022-09-01',
};

export default function StaffDetailScreen() {
  const router = useRouter();
  const { staffid } = useLocalSearchParams();
  // In a real app, fetch staff details by staffid
  const staff = DUMMY_STAFF;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <TouchableOpacity activeOpacity={0.84} style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={18} color="#10293e" strokeWidth={2.4} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.avatarWrap}>
            {staff.avatar ? (
              <Image source={{ uri: staff.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <UserRound size={32} color="#009966" strokeWidth={2.3} />
              </View>
            )}
          </View>
          <Text style={styles.name}>{staff.name}</Text>
          <Text style={styles.role}>{staff.role}</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusPill}>
              <ShieldCheck size={13} color="#fff" strokeWidth={2.1} />
              <Text style={styles.statusText}>{staff.status}</Text>
            </View>
            <Text style={styles.joinedText}>Joined: {staff.joined}</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{staff.email}</Text>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{staff.phone}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#f3f6fa',
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginBottom: 14,
  },
  backButtonText: {
    fontSize: 14,
    color: '#10293e',
    fontWeight: '700',
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 32,
    backgroundColor: '#e8fbf3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 32,
  },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8fbf3',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#10293e',
    marginBottom: 2,
  },
  role: {
    fontSize: 15,
    color: '#009966',
    fontWeight: '700',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    backgroundColor: '#009966',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  joinedText: {
    fontSize: 12,
    color: '#627789',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e1eaf1',
    padding: 16,
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: '#5f7082',
    marginTop: 8,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 15,
    color: '#0f2a41',
    fontWeight: '700',
    marginBottom: 2,
  },
});
