import { RelativePathString, useLocalSearchParams, useRouter } from 'expo-router';
import { Award, ChevronLeft, ClipboardList, FileBarChart2, GraduationCap, ShieldCheck, UserRound } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

type StudentDetails = {
  id: string;
  name: string;
  rank: string;
  position: 'HOC' | 'Assistant';
  className: string;
  admissionNo: string;
  averageScore: string;
  attendance: string;
};

const students: Record<string, StudentDetails> = {
  'std-001': {
    id: 'std-001',
    name: 'Amara Okonkwo',
    rank: 'Captain',
    position: 'HOC',
    className: 'SS2 Gold',
    admissionNo: 'SIS/2024/001',
    averageScore: '89%',
    attendance: '96%',
  },
  'std-002': {
    id: 'std-002',
    name: 'Daniel Ibrahim',
    rank: 'Prefect',
    position: 'Assistant',
    className: 'SS2 Gold',
    admissionNo: 'SIS/2024/002',
    averageScore: '84%',
    attendance: '93%',
  },
  'std-003': {
    id: 'std-003',
    name: 'Blessing Afolabi',
    rank: 'Senior Member',
    position: 'Assistant',
    className: 'SS2 Gold',
    admissionNo: 'SIS/2024/003',
    averageScore: '81%',
    attendance: '90%',
  },
  'std-004': {
    id: 'std-004',
    name: 'Mubarak Musa',
    rank: 'Class Rep',
    position: 'Assistant',
    className: 'SS2 Gold',
    admissionNo: 'SIS/2024/004',
    averageScore: '79%',
    attendance: '91%',
  },
  'std-005': {
    id: 'std-005',
    name: 'Nora Edet',
    rank: 'Senior Member',
    position: 'Assistant',
    className: 'SS2 Gold',
    admissionNo: 'SIS/2024/005',
    averageScore: '86%',
    attendance: '95%',
  },
};

export default function StudentDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    studentid?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    grade?: string;
    section?: string;
    studentId?: string;
    code?: string;
  }>();
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState(params.code || '');
  const [loading, setLoading] = useState(false);
  const [selectedChild, setSelectedChild] = useState<{ id: string; firstName: string; lastName: string } | null>(null);
  const studentId = params.studentid || '';

  const fullName = [params.firstName, params.middleName, params.lastName]
    .filter((part) => !!part && part.trim().length > 0)
    .join(' ');

  const fallbackDetails = students[studentId] || {
    id: studentId,
    name: 'Unknown Student',
    rank: 'N/A',
    position: 'Assistant' as const,
    className: 'N/A',
    admissionNo: 'N/A',
    averageScore: 'N/A',
    attendance: 'N/A',
  };

  const details = {
    ...fallbackDetails,
    id: params.studentId || fallbackDetails.id,
    name: fullName || fallbackDetails.name,
    className: params.grade || params.section || fallbackDetails.className,
  };

  const openResult = () => {
    const query = [
      `studentid=${encodeURIComponent(details.id)}`,
      `name=${encodeURIComponent(details.name)}`,
      `className=${encodeURIComponent(details.className)}`,
    ].join('&');

    router.push(`/result?${query}` as RelativePathString);
  };

  const openSignKid = () => {
    const firstName = params.firstName || details.name.split(' ')[0] || 'Student';
    const lastName = params.lastName || details.name.split(' ').slice(1).join(' ') || '';

    setSelectedChild({
      id: details.id,
      firstName,
      lastName,
    });
    setCode(params.code || '');
    setModalVisible(true);
  };

  const handleGetCode = async (_childId: string) => {
    const fallbackCode = `${Math.floor(100000 + Math.random() * 900000)}`;
    setCode(fallbackCode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={() => router.back()}>
          <ChevronLeft size={19} color="#13293d" strokeWidth={2.5} />
          <Text style={styles.headerButtonText}>Back</Text>
        </Pressable>

        <Pressable style={styles.resultButton} onPress={openResult}>
          <FileBarChart2 size={16} color="#fff" strokeWidth={2.4} />
          <Text style={styles.resultButtonText}>View Result</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.avatarWrap}>
            <UserRound size={36} color="#009966" strokeWidth={2.1} />
          </View>
          <Text style={styles.studentName}>{details.name}</Text>
          <Text style={styles.studentId}>ID: {details.id}</Text>
        </View>

        <TouchableOpacity style={styles.signKidButton} activeOpacity={0.86} onPress={openSignKid}>
          <Text style={styles.signKidButtonText}>Sign Kid</Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <GraduationCap size={18} color="#009966" strokeWidth={2.2} />
            <Text style={styles.infoLabel}>Class</Text>
            <Text style={styles.infoValue}>{details.className}</Text>
          </View>

          <View style={styles.infoRow}>
            <ClipboardList size={18} color="#009966" strokeWidth={2.2} />
            <Text style={styles.infoLabel}>Admission No.</Text>
            <Text style={styles.infoValue}>{details.admissionNo}</Text>
          </View>

          <View style={styles.infoRow}>
            <Award size={18} color="#009966" strokeWidth={2.2} />
            <Text style={styles.infoLabel}>Rank</Text>
            <Text style={styles.infoValue}>{details.rank}</Text>
          </View>

          <View style={styles.infoRow}>
            <ShieldCheck size={18} color="#009966" strokeWidth={2.2} />
            <Text style={styles.infoLabel}>Position</Text>
            <Text style={styles.infoValue}>{details.position}</Text>
          </View>

          <View style={styles.infoRow}>
            <FileBarChart2 size={18} color="#009966" strokeWidth={2.2} />
            <Text style={styles.infoLabel}>Average Score</Text>
            <Text style={styles.infoValue}>{details.averageScore}</Text>
          </View>

          <View style={styles.infoRow}>
            <ClipboardList size={18} color="#009966" strokeWidth={2.2} />
            <Text style={styles.infoLabel}>Attendance</Text>
            <Text style={styles.infoValue}>{details.attendance}</Text>
          </View>
        </View>
      </ScrollView>

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
                    borderColor: '#009966',
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
                {loading ? <ActivityIndicator size="large" color="#009966" /> : <QRCodeSVG value={code || '000000'} size={300} />}
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
                    backgroundColor: '#009966',
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9f7',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3eaf1',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f3f6fa',
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  headerButtonText: {
    fontSize: 14,
    color: '#13293d',
    fontWeight: '700',
  },
  resultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#009966',
    borderRadius: 11,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  resultButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2ebf3',
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 12,
  },
  avatarWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#e8fbf3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#c7eedf',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 21,
    color: '#10293e',
    fontWeight: '800',
    marginBottom: 3,
  },
  studentId: {
    fontSize: 12,
    color: '#6b7f90',
    fontWeight: '600',
  },
  signKidButton: {
    backgroundColor: '#009966',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signKidButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2ebf3',
    paddingVertical: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eff3f7',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 13,
    color: '#4f6477',
    fontWeight: '700',
  },
  infoValue: {
    fontSize: 14,
    color: '#10293e',
    fontWeight: '700',
  },
});
