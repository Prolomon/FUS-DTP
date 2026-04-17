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
import { CheckInRecord, getCheckinRecords, getCodes, Student } from '@/lib/services/parent';
import { create, deletePickups, getPickups, Pickup } from "@/lib/services/pickup";

export default function ChildrenScreen() {
  const router = useRouter();
  const toast = useToast();
  const { auth, token, refresh } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Student | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [pickup, setPickup] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string, phone: string, relationship: string, children: Student[] }>(
    {
      name: "",
      phone: "",
      relationship: "",
      children: [] as Student[],
    }
  );
  const [pickupData, setPickupData] = useState<{ pickup: Pickup | null } | null>(null);

  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  // Relationship select state and options
  const [showRelationshipOptions, setShowRelationshipOptions] = useState(false);

  const fetchPickups = useCallback(async () => {
    if (!auth?.id || !token) return;
    setLoading(true);

    try {
      const res = await getPickups(auth.id, token);
      if (res.pickup) {
        setPickupData(res);
      }
    } catch {
      toast.showToast({ message: "Failed to fetch pickup data", type: "alert", status: "failed" });
    } finally {
      setLoading(false);
    }
  }, [auth?.id, toast, token]);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await deletePickups(pickupData?.pickup?.id as string, token as string);
      if (res?.success) {
        setPickupData(null);
      }
      toast.showToast({ message: res?.message || "Pick Up deleted successfully", type: "alert", status: res.success ? "success" : "failed" });
    } catch {
      toast.showToast({ message: "Failed to fetch pickup data", type: "alert", status: "failed" });
    } finally {
      setLoading(false);
      await refresh();
    }
  }

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  // Multi-select handler for children
  const handleToggleChild = (child: Student) => {
    setFormData(prev => {
      const exists = prev.children.some(c => c.id === child.id);
      return {
        ...prev,
        children: exists
          ? prev.children.filter(c => c.id !== child.id)
          : [...prev.children, child],
      };
    });
  };

  // Handle form submit
  async function handleSubmit() {

    setLoading(true)
    setShowChildrenDropdown(false);

    try {

      const res = await create({ ...formData, parentId: auth?.id as string }, token as string);

      if (res.success) {
        setPickup(false);
        toast.showToast({ message: "Pickup created successfully", type: "alert", status: "success" });
      } else {
        toast.showToast({ message: res?.message || res?.error || "Failed to create pickup", type: "alert", status: "failed" });
      }
    } catch (error: any) {
      toast.showToast({ message: error?.error || error?.message || "Failed to create pickup", type: "alert", status: "failed" });
    } finally {
      setPickup(false);
      setFormData({ name: "", phone: "", relationship: "", children: [] });

      setLoading(false);

      fetchPickups();

      await refresh();
    }
  }

  // Use children from auth, fallback to empty array
  const children = Array.isArray(auth?.children) ? auth.children : [];

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    if (!auth) return;
    try {
      const data = await getCheckinRecords(auth.id, token as string);
      setRecords(Array.isArray(data) ? data : data?.checkIns || []);
    } catch {
      setRecords([]);
      toast.showToast({
        message: 'Failed to fetch check-in records',
        type: 'alert',
        status: 'failed',
      });
    } finally {
      setLoading(false);
    }
  }, [auth, token, toast]);

  useEffect(() => {
    fetchRecords();
  }, [auth, fetchRecords, token]);

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

  const handleGetCode = async (childId: string) => {
    setLoading(true);
    try {
      const data = await getCodes(token as string, [childId]);

      setCode((data as any)?.code || '');

      await refresh();

    } catch {
      toast.showToast({
        message: 'Failed to fetch student code',
        type: 'alert',
        status: 'failed',
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredChildren = children.filter(child =>
    (child.firstName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (child.grade?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const renderChild = ({ item }: { item: typeof children[0] }) => (
    <View style={styles.childCardModern}>
      <View style={styles.avatarModern}>
        <Text onPress={() => {
          setSelectedChild(item);
          setCode(item.code || '');
          setModalVisible(true);
        }}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatarImageModern} />
          ) : (
            <User size={48} color="#4169E1" />
          )}
        </Text>
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
    </View>
  );

  const relationshipOptions = [
    { label: 'Mother', value: 'mother' },
    { label: 'Father', value: 'father' },
    { label: 'Brother', value: 'brother' },
    { label: 'Sister', value: 'sister' },
    { label: 'Uncle', value: 'uncle' },
    { label: 'Aunty', value: 'aunty' },
    { label: 'Grand Mother', value: 'grand Mother' },
    { label: 'Grand Father', value: 'grand Father' },
    { label: 'Sibling', value: 'sibling' },
    { label: 'Friend', value: 'friend' },
    { label: 'driver', value: 'driver' },
    { label: 'School Bus driver', value: 'school bus driver' },
    { label: 'Teacher', value: 'teacher' },
  ];

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

      {/* pickup list */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pickups</Text>
          {pickupData?.pickup &&
            (<TouchableOpacity
              style={styles.cancelPickupButton}
              activeOpacity={0.85}
              onPress={handleDelete}
            >
              <Text style={styles.cancelPickupButtonText}>Cancel Pickup</Text>
            </TouchableOpacity>)
          }
        </View>
        {pickupData?.pickup ? (
          <TouchableOpacity style={styles.zoneCard} activeOpacity={0.8} onPress={() => router.push(`/pickup` as RelativePathString)}>
            {loading ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', flex: 1 }}>
                <ActivityIndicator size="small" color="#0f766e" />
              </View>
            ) : (
              <>
                <View style={styles.zoneIconWrap}>
                  <Users size={18} color="#fff" />
                </View>
                <View style={styles.zoneTextWrap}>
                  <Text style={styles.zoneTitle}>{pickupData?.pickup?.name || "Loading"}</Text>
                  <Text style={styles.zoneSubtitle}>{pickupData?.pickup?.phone} ({pickupData?.pickup?.relationship})</Text>
                </View>
                <ChevronRight size={18} color="#94a3b8" />
              </>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyPickupCard}>
            <View style={styles.emptyPickupIconWrap}>
              <Users size={20} color="#4169E1" />
            </View>
            <Text style={styles.emptyPickupTitle}>No Pickup Assigned</Text>
            <Text style={styles.emptyPickupSubtitle}>Add a trusted pickup contact for your child.</Text>
            <TouchableOpacity
              style={styles.emptyPickupAction}
              activeOpacity={0.85}
              onPress={() => setPickup(true)}
            >
              <Text style={styles.emptyPickupActionText}>Create Pickup</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
      <Text style={[styles.sectionTitle, { paddingHorizontal: 18, paddingTop: 8 }]}>My Children</Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
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

      {/* Modal for QR code and child id - render once at parent level */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 28, width: '90%', maxWidth: 420, alignItems: 'center' }}>
            {selectedChild && (
              <>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 8,
                  textAlign: 'center',
                }}>Enter 6-Digit Code / Scan Code</Text>
                <Text style={{
                  fontSize: 18,
                  color: '#666',
                  marginBottom: 24,
                  textAlign: 'center',
                }}>
                  Checking in: {selectedChild.firstName} {selectedChild.lastName}
                </Text>
                <TextInput
                  style={{
                    width: '100%',
                    borderWidth: 2,
                    borderColor: '#007AFF',
                    borderRadius: 8,
                    padding: 16,
                    fontSize: 24,
                    textAlign: 'center',
                    letterSpacing: 8,
                    marginBottom: 24,
                  }}
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholder="000000"
                  placeholderTextColor="#999"
                />
                {loading ? <ActivityIndicator size="large" color="#007AFF" /> : <QRCodeSVG value={code || '000000'} size={300} />}
              </>
            )}
            <View style={{ marginTop: 24, width: '100%', flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    backgroundColor: '#f0f0f0',
                    color: '#666',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedChild(null);
                    setCode('');
                  }}
                >
                  Cancel
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    backgroundColor: '#007AFF',
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}
                  onPress={async () => {
                    if (selectedChild) {
                      setLoading(true);
                      await handleGetCode(selectedChild.id);
                      setLoading(false);
                    }
                  }}
                >
                  Regenerate
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={pickup}
        onRequestClose={() => {
          setPickup(false);
          setShowChildrenDropdown(false);
          setShowRelationshipOptions(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickupModalContent}>
            <View style={styles.pickupModalHeader}>
              <Text style={styles.sectionTitle}>Create Pickup</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setPickup(false);
                  setShowChildrenDropdown(false);
                  setShowRelationshipOptions(false);
                }}
              >
                <Text style={styles.pickupModalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              contentContainerStyle={styles.pickupModalScrollContent}
            >
              <View style={[styles.formCard, styles.formCardInModal]}>
                {/* name field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <View style={styles.inputWrap}>
                    <Users size={18} color="#64748b" style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter name"
                      placeholderTextColor="#94a3b8"
                      value={formData.name}
                      onChangeText={text => setFormData({ ...formData, name: text })}
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* phone number field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone</Text>
                  <View style={styles.inputWrap}>
                    <Phone size={18} color="#64748b" style={{ marginRight: 8 }} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter phone number"
                      placeholderTextColor="#94a3b8"
                      keyboardType="phone-pad"
                      value={formData.phone}
                      onChangeText={text => setFormData({ ...formData, phone: text })}
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* relationship field */}
                <View style={[styles.inputGroup, styles.relationshipInputGroup]}>
                  <Text style={styles.inputLabel}>Relationship</Text>
                  <View style={styles.inputWrap}>
                    <Shield size={18} color="#64748b" style={{ marginRight: 8 }} />
                    {/* Relationship select */}
                    <TouchableOpacity
                      style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}
                      activeOpacity={0.85}
                      onPress={() => setShowRelationshipOptions(v => !v)}
                      disabled={loading}
                    >
                      <Text style={{ color: formData.relationship ? '#0f172a' : '#94a3b8', fontSize: 15, flex: 1 }}>
                        {formData.relationship ?
                          relationshipOptions.find(opt => opt.value === formData.relationship)?.label :
                          'Select relationship'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Relationship options dropdown */}
                  {showRelationshipOptions && (
                    <ScrollView
                      style={styles.selectDropdown}
                      nestedScrollEnabled
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator
                    >
                      {relationshipOptions.map(opt => (
                        <TouchableOpacity
                          key={opt.value}
                          style={styles.selectOption}
                          onPress={() => {
                            setFormData({ ...formData, relationship: opt.value });
                            setShowRelationshipOptions(false);
                          }}
                        >
                          <Text style={styles.selectOptionText}>{opt.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>

                {/* Children multi-select */}
                <View style={[styles.inputGroup, styles.childrenInputGroup]}>
                  <Text style={styles.inputLabel}>Children</Text>
                  <View style={styles.inputWrap}>
                    <Users size={18} color="#64748b" style={{ marginRight: 8 }} />
                    <TouchableOpacity
                      style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}
                      activeOpacity={0.85}
                      onPress={() => setShowChildrenDropdown(v => !v)}
                      disabled={loading}
                    >
                      <Text style={{ color: formData.children.length > 0 ? '#0f172a' : '#94a3b8', fontSize: 15, flex: 1 }}>
                        {formData.children.length > 0
                          ? formData.children.map(c => `${c.firstName} ${c.lastName}`).join(', ')
                          : 'Select children'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showChildrenDropdown && (
                    <ScrollView
                      style={styles.selectDropdown}
                      nestedScrollEnabled
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator
                    >
                      {(auth?.children ?? []).length === 0 && (
                        <Text style={{ color: '#94a3b8', fontSize: 14, padding: 12 }}>No children found</Text>
                      )}
                      {(auth?.children ?? []).map((child: Student) => {
                        const selected = formData.children.some(c => c.id === child.id);
                        return (
                          <TouchableOpacity
                            key={child.id}
                            style={[styles.selectOption, selected && { backgroundColor: '#4169E1' }]}
                            onPress={() => handleToggleChild(child)}
                            activeOpacity={0.7}
                          >
                            <Text style={[styles.selectOptionText, selected && { color: '#fff' }]}>
                              {selected ? '✓ ' : ''}{child.firstName} {child.lastName} {child.middleName}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={loading ? undefined : handleSubmit} activeOpacity={0.85} disabled={loading}>
                  <Text style={styles.submitButtonText}>{loading ? "Submitting..." : "Submit"}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    shadowColor: '#4169E1',
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
    shadowColor: '#4169E1',
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
    borderColor: '#4169E1',
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
    color: '#4169E1',
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
  createPickupButton: {
    backgroundColor: '#4169E1',
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
    shadowColor: '#4169E1',
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
    backgroundColor: '#4169E1',
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
    color: '#4169E1',
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
    backgroundColor: "#4169E1",
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
    backgroundColor: '#4169E1',
    borderColor: '#4169E1',
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
