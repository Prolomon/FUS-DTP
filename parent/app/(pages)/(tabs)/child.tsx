import { RelativePathString, useRouter } from 'expo-router';
import { ChevronRight, Phone, Search, Shield, User, Users } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

type Student = {
  id: string;
  studentId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  dateOfBirth: string;
  section: string;
  grade: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  avatar?: string | null;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  code?: string;
};

type CheckInRecord = {
  id: string;
  studentId: string;
  student: Student;
  action?: string | null;
  pickupPerson?: string | null;
  pickupPhone?: string | null;
  pickupRelationship?: string | null;
  parentId?: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
};

type Pickup = {
  id: string;
  parentId: string;
  name: string;
  phone: string;
  relationship: string;
  children?: Student[];
};

const dummyChildren: Student[] = [
  {
    id: 'std-001',
    studentId: 'std-001',
    firstName: 'Amara',
    middleName: 'N.',
    lastName: 'Okonkwo',
    dateOfBirth: '2014-04-18',
    section: 'Primary',
    grade: 'Grade 6',
    gender: 'Female',
    nationality: 'Nigerian',
    stateOfOrigin: 'Lagos',
    lga: 'Ikeja',
    avatar: null,
    parentId: 'parent-dummy',
    createdAt: '2026-01-01T08:00:00.000Z',
    updatedAt: '2026-01-01T08:00:00.000Z',
    code: '348921',
  },
  {
    id: 'std-002',
    studentId: 'std-002',
    firstName: 'Daniel',
    middleName: 'K.',
    lastName: 'Ibrahim',
    dateOfBirth: '2013-09-07',
    section: 'Primary',
    grade: 'Grade 5',
    gender: 'Male',
    nationality: 'Nigerian',
    stateOfOrigin: 'Kano',
    lga: 'Nassarawa',
    avatar: null,
    parentId: 'parent-dummy',
    createdAt: '2026-01-01T08:00:00.000Z',
    updatedAt: '2026-01-01T08:00:00.000Z',
    code: '274619',
  },
];

const dummyRecords: CheckInRecord[] = [
  {
    id: 'checkin-001',
    studentId: 'std-001',
    student: dummyChildren[0],
    action: 'Checked In',
    pickupPerson: null,
    pickupPhone: null,
    pickupRelationship: null,
    parentId: 'parent-dummy',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'checkin-002',
    studentId: 'std-002',
    student: dummyChildren[1],
    action: 'Checked Out',
    pickupPerson: 'Family Driver',
    pickupPhone: '08000000000',
    pickupRelationship: 'driver',
    parentId: 'parent-dummy',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ChildrenScreen() {
  const router = useRouter();
  const toast = useToast();
  const { auth, refresh } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Use children from auth when available, otherwise fall back to local dummy data.
  const children = Array.isArray(auth?.children) && auth.children.length > 0 ? auth.children : dummyChildren;

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      setRecords(dummyRecords);
    } catch {
      setRecords(dummyRecords);
      toast.showToast({
        message: 'Using dummy records (network unavailable)',
        type: 'alert',
        status: 'success',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchRecords();
  }, [auth, fetchRecords]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refresh();
    } catch {
      toast.showToast({
        message: 'Error refreshing auth',
        type: 'alert',
        status: 'failed',
      });
    }
    setRefreshing(false);
  };

  const ageCalculator = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const filteredChildren = children.filter(child =>
    (child.firstName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (child.grade?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const openStudentProfile = (child: Student) => {
    const query = [
      `firstName=${encodeURIComponent(child.firstName || '')}`,
      `middleName=${encodeURIComponent(child.middleName || '')}`,
      `lastName=${encodeURIComponent(child.lastName || '')}`,
      `grade=${encodeURIComponent(child.grade || '')}`,
      `section=${encodeURIComponent(child.section || '')}`,
      `studentId=${encodeURIComponent(child.studentId || child.id)}`,
      `code=${encodeURIComponent(child.code || '')}`,
    ].join('&');

    router.push(`/student/${child.studentId || child.id}?${query}` as RelativePathString);
  };

  const renderChild = ({ item }: { item: typeof children[0] }) => (
    <TouchableOpacity
      style={styles.childCardModern}
      activeOpacity={0.9}
      onPress={() => openStudentProfile(item)}
    >
      <View style={styles.avatarModern}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImageModern} />
        ) : (
          <User size={48} color="#009966" />
        )}
      </View>
      <Text style={styles.childNameModern}>{item.firstName} {item.lastName} {item.middleName}</Text>
      <View style={styles.infoRowModern}>
        <View style={styles.infoItemModern}>
          <Text style={styles.infoLabelModern}>Grade</Text>
          <Text style={styles.infoValueModern}>{item.grade}</Text>
        </View>
        <View style={styles.infoItemModern}>
          <Text style={styles.infoLabelModern}>Age</Text>
          <Text style={styles.infoValueModern}>{ageCalculator(item.dateOfBirth)}</Text>
        </View>
      </View>
      {/* Status badge logic */}
      {(() => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const childRecords = records.filter(r => r.studentId === item.studentId && new Date(r.date).toISOString().split('T')[0] === todayStr);
        let status = 'Not Yet';
        let badgeStyle = styles.notYetBadgeModern;
        let textStyle = styles.notYetTextModern;
        if (childRecords.length > 0) {
          const rec = childRecords.reduce((latest, curr) => {
            return new Date(curr.createdAt) > new Date(latest.createdAt) ? curr : latest;
          }, childRecords[0]);
          status = rec.action as string
          if (rec.action === 'Checked Out') {
            badgeStyle = styles.checkedOutBadgeModern;
            textStyle = styles.checkedOutTextModern;
          } else if (rec.action === 'Checked In') {
            badgeStyle = styles.checkedInBadgeModern;
            textStyle = styles.checkedInTextModern;
          }
        }
        return (
          <View style={[styles.statusBadgeModern, badgeStyle]}>
            <Text style={[styles.statusTextModern, textStyle]}>{status}</Text>
          </View>
        );
      })()}
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={{ paddingHorizontal: 18, paddingTop: 18, marginBottom: 8 }}>
        <View style={styles.searchContainerModern}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or grade..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.childrenHeaderRow}>
        <Text style={styles.sectionTitle}>My Children</Text>
        <TouchableOpacity
          style={styles.pickupShortcutButton}
          activeOpacity={0.86}
          onPress={() => router.push('/pickup' as RelativePathString)}
        >
          <Text style={styles.pickupShortcutButtonText}>Pickup</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#009966" />
        </View>
      ) : (
        <FlatList
          data={filteredChildren}
          renderItem={renderChild}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No children found</Text>
            </View>
          }
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
  },
  header: {
    // removed, no longer used
  },
  headerTitle: {
    // removed, no longer used
  },
  searchContainer: {
    // legacy, not used
  },
  searchContainerModern: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
    shadowColor: '#009966',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#222',
    fontWeight: '500',
  },
  listContainer: {
    padding: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  childCardModern: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#009966',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
  },
  avatarModern: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e6edfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#009966',
  },
  avatarImageModern: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  childNameModern: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  infoRowModern: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 14,
    gap: 8,
  },
  infoItemModern: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabelModern: {
    fontSize: 13,
    color: '#7b8bb7',
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValueModern: {
    fontSize: 15,
    fontWeight: '700',
    color: '#009966',
  },
  statusBadgeModern: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 2,
  },
  notYetBadgeModern: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 14,
  },
  notYetTextModern: {
    color: '#c62828',
  },
  checkedInBadgeModern: {
    backgroundColor: '#e3f6e8',
    borderWidth: 1,
    borderColor: '#4caf50',
    borderRadius: 14,
  },
  checkedOutBadgeModern: {
    backgroundColor: '#ffeaea',
    borderWidth: 1,
    borderColor: '#e57373',
    borderRadius: 14,
  },
  statusTextModern: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  checkedInTextModern: {
    color: '#388e3c',
  },
  checkedOutTextModern: {
    color: '#c62828',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  childrenHeaderRow: {
    paddingHorizontal: 18,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickupShortcutButton: {
    backgroundColor: '#009966',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pickupShortcutButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  createPickupButton: {
    backgroundColor: '#009966',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createPickupButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cancelPickupButton: {
    backgroundColor: '#c1c1c1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  cancelPickupButtonText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  sectionLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  sectionLinkText: {
    fontSize: 12,
    color: "#64748b",
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },
  zoneCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginTop: 12,
  },
  zoneIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#0f766e",
    alignItems: "center",
    justifyContent: "center",
  },
  zoneTextWrap: {
    flex: 1,
  },
  zoneTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  zoneSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748b",
  },
  emptyPickupCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#009966',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  emptyPickupIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#e6edfa',
    borderWidth: 1,
    borderColor: '#c9d5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyPickupTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  emptyPickupSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyPickupAction: {
    backgroundColor: '#009966',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  emptyPickupActionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pickupModalContent: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '86%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
  },
  pickupModalScrollContent: {
    paddingBottom: 8,
  },
  pickupModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickupModalCloseText: {
    color: '#009966',
    fontSize: 14,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginTop: 12,
    marginBottom: 8,
  },
  formCardInModal: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  inputGroup: {
    marginBottom: 16,
  },
  relationshipInputGroup: {
    zIndex: 20,
    position: 'relative',
  },
  childrenInputGroup: {
    zIndex: 15,
    position: 'relative',
  },
  inputLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    paddingVertical: 6,
  },
  submitButton: {
    backgroundColor: "#009966",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  childrenSelectWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    marginBottom: 2,
  },
  childOption: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  childOptionSelected: {
    backgroundColor: '#009966',
    borderColor: '#009966',
  },
  childOptionText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  childOptionTextSelected: {
    color: '#fff',
  },
  selectDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: 'hidden',
    maxHeight: 180,
  },
  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectOptionText: {
    fontSize: 15,
    color: '#0f172a',
  },
});
