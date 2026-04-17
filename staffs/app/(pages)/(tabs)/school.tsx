import { useAuth } from '@/hooks/useAuth';
import { getSchool, School } from '@/lib/services/school';
import { Calendar, Globe, Home, Mail, MapPin, Phone, User, Users, Blend } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckInScreen() {
  const { auth, token } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchool = async () => {
      setLoading(true);
      try {
        const data = await getSchool(auth?.schoolId || '', token as string);
        setSchool(data);
      } catch (error) {
        console.error('Error fetching school:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.schoolId) {
      fetchSchool();
    }
  }, [auth?.schoolId, token]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {loading && !school ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
          <ActivityIndicator size="large" color="#4169E1" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          {/* School Logo & Name Card */}
          {school && (
            <View style={[styles.schoolCard, { marginBottom: 16 }]}>
              <View style={styles.schoolLogoContainer}>
                {school.schoolLogo ? (
                  <Image source={{ uri: school.schoolLogo }} style={styles.schoolLogo} />
                ) : (
                  <View style={styles.schoolLogoPlaceholder} />
                )}
              </View>
              <View style={styles.schoolDetailsContainer}>
                <Text style={styles.schoolName} numberOfLines={2} ellipsizeMode="tail">{school.schoolName || 'School Name'}</Text>
                <Text style={{ color: '#4169E1', fontSize: 15, marginTop: 2,textAlign: "center", backgroundColor: "#f0f0f0", borderRadius: 8 }}>{school.registrationNumber}</Text>
              </View>
            </View>
          )}
          {/* School Details Card */}
          {school && (
            <View style={styles.schoolCard}>
              {/* School Type */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><User size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Type</Text>
                  <Text style={styles.detailValue}>{school.schoolType}</Text>
                </View>
              </View>
              {/* Student Mix */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Blend size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Student Mix</Text>
                  <Text style={styles.detailValue}>{school.studentMix}</Text>
                </View>
              </View>
              {/* Boarding Option */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Home size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Boarding Option</Text>
                  <Text style={styles.detailValue}>{school.boardingOption}</Text>
                </View>
              </View>
              {/* Year Established */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Calendar size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Year Established</Text>
                  <Text style={styles.detailValue}>{school.yearEstablished || 'N/A'}</Text>
                </View>
              </View>
              {/* Student Count */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Users size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Student Count</Text>
                  <Text style={styles.detailValue}>{school.studentCount}</Text>
                </View>
              </View>
              {/* Capacity */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Users size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Capacity</Text>
                  <Text style={styles.detailValue}>{school.capacity || 'N/A'}</Text>
                </View>
              </View>
              {/* Address */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><MapPin size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Address</Text>
                  <Text style={styles.detailValue}>{school.schoolAddress}</Text>
                </View>
              </View>
              {/* Country */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Globe size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Country</Text>
                  <Text style={styles.detailValue}>{school.country}</Text>
                </View>
              </View>
              {/* State */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><MapPin size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>State</Text>
                  <Text style={styles.detailValue}>{school.state}</Text>
                </View>
              </View>
              {/* LGA */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><MapPin size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>LGA</Text>
                  <Text style={styles.detailValue}>{school.lga}</Text>
                </View>
              </View>
              {/* Contact Name */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><User size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Name</Text>
                  <Text style={styles.detailValue}>{school.contactName}</Text>
                </View>
              </View>
              {/* Contact Role */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><User size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Role</Text>
                  <Text style={styles.detailValue}>{school.contactRole}</Text>
                </View>
              </View>
              {/* Contact Gender */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><User size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Gender</Text>
                  <Text style={styles.detailValue}>{school.contactGender}</Text>
                </View>
              </View>
              {/* Contact Nationality */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Globe size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Nationality</Text>
                  <Text style={styles.detailValue}>{school.nationality}</Text>
                </View>
              </View>
              {/* Contact State */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><MapPin size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact State</Text>
                  <Text style={styles.detailValue}>{school.contactState}</Text>
                </View>
              </View>
              {/* Contact LGA */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><MapPin size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact LGA</Text>
                  <Text style={styles.detailValue}>{school.contactLga}</Text>
                </View>
              </View>
              {/* Contact Address */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><MapPin size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Address</Text>
                  <Text style={styles.detailValue}>{school.contactAddress}</Text>
                </View>
              </View>
              {/* Contact Email */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Mail size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Email</Text>
                  {school.contactEmail ? (
                    <Text style={[styles.detailValue, { color: '#4169E1' }]} onPress={() => Linking.openURL(`mailto:${school.contactEmail}`)}>{school.contactEmail}</Text>
                  ) : (
                    <Text style={styles.detailValue}>Email not available</Text>
                  )}
                </View>
              </View>
              {/* Contact Phone */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}><Phone size={22} color="#4169E1" /></View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Contact Phone</Text>
                  {school.contactPhone ? (
                    <Text style={[styles.detailValue, { color: '#4169E1' }]} onPress={() => Linking.openURL(`tel:${school.contactPhone}`)}>{school.contactPhone}</Text>
                  ) : (
                    <Text style={styles.detailValue}>Phone not available</Text>
                  )}
                </View>
              </View>
              {/* Alternate Phone */}
              {school.alternatePhone ? (
                <View style={styles.detailRow}>
                  <View style={styles.detailIcon}><Phone size={22} color="#4169E1" /></View>
                  <View style={styles.detailTextWrap}>
                    <Text style={styles.detailLabel}>Alternate Phone</Text>
                    <Text style={[styles.detailValue, { color: '#4169E1' }]} onPress={() => Linking.openURL(`tel:${school.alternatePhone}`)}>{school.alternatePhone}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  schoolCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 8,
    shadowColor: '#4169E1',
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
    borderColor: '#4169E1',
    backgroundColor: '#e6edfa',
    objectFit: 'contain',
  },
  schoolLogoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e6edfa',
    borderWidth: 2,
    borderColor: '#4169E1',
  },
  schoolDetailsContainer: {
    flex: 1,
    marginBottom: 20
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  schoolInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  schoolInfoIcon: {
    marginRight: 6,
  },
  schoolInfo: {
    fontSize: 15,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 0,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 12,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e6edfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4169E1',
    objectFit: 'contain',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameGradeContainer: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  childGrade: {
    fontSize: 15,
    color: '#4169E1',
    fontWeight: '600',
  },
  checkInButton: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  headerTitleModern: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 18,
    letterSpacing: 1,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '90%',
    maxWidth: 420,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#e3e8f7',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  codeInput: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  schoolDetailLabel: {
    fontWeight: 'bold',
    color: '#4169E1',
    marginTop: 4,
    fontSize: 15,
  },
  schoolDetailValue: {
    fontWeight: 'normal',
    color: '#333',
    fontSize: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e7ef',
    backgroundColor: '#f7faff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  detailTextWrap: {
    flex: 1,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#222',
    fontSize: 13,
    marginBottom: 2,
  },
  detailValue: {
    color: '#444',
    fontSize: 16,
  },
});
