import { Calendar, Clock, Search, User, Users } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View, ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { CheckInRecord, getCheckinRecords } from '@/lib/services/parent';
import useToast from '@/hooks/useToast';

export default function RecordsScreen() {
  const { token, auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const { showToast } = useToast();

  const fetchRecords = useCallback(async () => {
    setRefreshing(true);
    if (!auth) return;
    try {
      const data = await getCheckinRecords(auth.id, token as string);
      console.log(Array.from(data?.checkIns?.map((a: any) => a.studentId)));
      setRecords(Array.isArray(data) ? data : data?.checkIns || []);
    } catch (error: any) {
      showToast({ message: error?.message || error?.error || 'Error fetching check-in records', type: 'alert', status: 'failed' });
    } finally {
      setRefreshing(false);
    }
  }, [auth, token, showToast]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      // Refresh your data here
      fetchRecords();
      setRefreshing(false);
    }, 1500);
  };

  const filteredRecords = records.filter(record =>
    record.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.date?.includes(searchQuery) ||
    record.action?.toLowerCase().includes(searchQuery.toLowerCase()) || false
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const renderRecord = ({ item }: { item: CheckInRecord }) => (
    <View style={styles.recordCard}>
      <View style={styles.avatarContainer}>
        {item.student?.avatar ? (
          <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden', backgroundColor: '#e6edfa', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: item.student.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          </View>
        ) : (
          <User size={24} color="#007AFF" />
        )}
      </View>
      <View style={styles.recordInfo}>
        <Text style={[styles.childName, { flexWrap: 'wrap' }]} numberOfLines={2} ellipsizeMode="tail">{item.student?.firstName} {item.student?.lastName}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Clock size={16} color="#666" />
            <Text style={styles.detailText}>Time: {item.date ? new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color="#666" />
            <Text style={styles.detailText}>{item.action ? item.action : 'Not Yet'}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Calendar size={16} color="#666" />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Users size={16} color="#666" />
            <Text style={styles.detailText}>{item.pickupRelationship ? item.pickupRelationship.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : ''}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={{ paddingHorizontal: 18, paddingTop: 18, marginBottom: 8 }}>
        <View style={styles.searchContainerModern}>
          <Search size={20} color="#4169E1" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInputModern}
            placeholder="Search by name, date, or time..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
        </View>
      </View>

      {refreshing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4169E1" />
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          renderItem={renderRecord}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No records found</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e6edfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4169E1',
  },
  recordInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 5,
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#4169E1',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  searchContainerModern: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInputModern: {
    flex: 1,
    fontSize: 17,
    color: '#222',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 12,
  },
});
