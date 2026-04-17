import { RelativePathString, useRouter } from 'expo-router';
import { ChevronRight, User, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckInScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const school = {
    schoolName: 'Samson International School',
    motto: 'As God is my witness, I will never go hungry again.',
    schoolLogo: require('../../../assets/images/arqelion_staff.png'),
  };
  const loading = false;

  const chats = [
    {
      id: 'staff-announcements',
      groupName: 'Staff Announcements',
      description: 'Official school-wide updates, events and urgent alerts.',
      members: '68 members',
    },
    {
      id: 'grade-6-teachers',
      groupName: 'Grade 6 Teachers',
      description: 'Class schedules, subject planning and daily class follow-up.',
      members: '14 members',
    },
    {
      id: 'front-desk-support',
      groupName: 'Front Desk Support',
      description: 'Admissions, parent calls and visitor coordination updates.',
      members: '9 members',
    },
    {
      id: 'transport-coordination',
      groupName: 'Transport Coordination',
      description: 'Route changes, pickup incidents and transport notices.',
      members: '21 members',
    },
    {
      id: 'security-compliance',
      groupName: 'Security & Compliance',
      description: 'Campus security checks and compliance communication.',
      members: '11 members',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {loading && !school ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#009966" />
        </View>
      ) : (
        <>
          {school && (
            <View style={styles.schoolCard}>
              <View style={styles.schoolLogoContainer}>
                {school.schoolLogo ? (
                  <Image source={school.schoolLogo} style={styles.schoolLogo} />
                ) : (
                  <View style={styles.schoolLogoPlaceholder} />
                )}
              </View>
              <View style={styles.schoolDetailsContainer}>
                <Text style={styles.schoolName} numberOfLines={2} ellipsizeMode="tail">
                  {school.schoolName || 'School Name'}
                </Text>
                <Text style={styles.mottoText}>{school.motto}</Text>
              </View>
            </View>
          )}

          <View style={styles.chatsHeaderRow}>
            <Text style={styles.chatsTitle}>Chats</Text>
            <Text style={styles.chatsCount}>{chats.length}</Text>
          </View>

          <ScrollView
            style={styles.chatListScroll}
            contentContainerStyle={styles.screenContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#009966"
                colors={['#009966']}
              />
            }
          >
            <View style={styles.chatsContainer}>
              {chats.map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  activeOpacity={0.82}
                  style={styles.chatItem}
                  onPress={() => router.push(`/chat/${chat.id}` as RelativePathString)}
                >
                  <View style={styles.chatLeftSection}>
                    <View style={styles.chatIconWrap}>
                      <Users size={20} color="#009966" strokeWidth={2.2} />
                    </View>

                    <View style={styles.chatTextBlock}>
                      <Text style={styles.chatGroupName} numberOfLines={1}>
                        {chat.groupName}
                      </Text>
                      <View style={styles.chatMetaRow}>
                        <User size={13} color="#6c757d" strokeWidth={2} />
                        <Text style={styles.chatMembers}>{chat.members}</Text>
                      </View>
                    </View>
                  </View>

                  <ChevronRight size={20} color="#93a1b3" strokeWidth={2.4} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    paddingTop: 16
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  chatListScroll: {
    flex: 1,
  },
  screenContent: {
    paddingBottom: 32,
  },
  schoolCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 8,
    shadowColor: '#009966',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
  },
  schoolLogoContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009966',
    backgroundColor: '#e6edfa',
    objectFit: 'contain',
  },
  schoolLogoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e6edfa',
    borderWidth: 2,
    borderColor: '#009966',
  },
  schoolDetailsContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#009966',
    marginBottom: 4,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  mottoText: {
    color: '#009966',
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 2,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  chatsContainer: {
    marginTop: 6,
    marginHorizontal: 18,
    marginBottom: 14,
  },
  chatsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginHorizontal: 18,
  },
  chatsTitle: {
    fontSize: 22,
    color: '#1e2c3d',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  chatsCount: {
    minWidth: 30,
    textAlign: 'center',
    backgroundColor: '#dff7ed',
    color: '#009966',
    fontWeight: '700',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  chatItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e9f1',
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#009966',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
  },
  chatLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  chatIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#e8fbf3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#c4eedf',
  },
  chatTextBlock: {
    flex: 1,
  },
  chatGroupName: {
    fontSize: 16,
    color: '#1f2d3a',
    fontWeight: '700',
    marginBottom: 3,
  },
  chatMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  chatMembers: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '600',
  },
});
