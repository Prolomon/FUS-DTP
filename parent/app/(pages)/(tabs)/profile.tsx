import { Lock, LogOut, Mail, MapPin, Phone, RefreshCw, User, FingerprintPattern, ScanFace } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const parentData = {
    id: 'parent-001',
    parentName: 'Mr. Emeka Okonkwo',
    parentEmail: 'emeka.okonkwo@example.com',
    parentPhone: '08012345678',
    parentAlternatePhone: '08087654321',
    parentState: 'Lagos',
    parentLga: 'Ikeja',
    address: '12 Allen Avenue, Ikeja, Lagos',
  };
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  // Add show/hide password state
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  type PasswordField = 'currentPassword' | 'newPassword' | 'confirmPassword';

  const [passwordForm, setPasswordForm] = useState<Record<PasswordField, string>>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async () => {
    setRefreshing(true);
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      ToastAndroid.show('New passwords do not match', ToastAndroid.SHORT);
      setRefreshing(false);
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters', ToastAndroid.SHORT);
      setRefreshing(false);
      return;
    }
    try {
      console.log('Password change payload:', {
        parentId: parentData.id,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordModalVisible(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      ToastAndroid.show('Password change logged successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      console.log('Failed to log password payload:', error?.message || error);
      ToastAndroid.show('Failed to process password change', ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    setRefreshing(true);
    setLogoutModalVisible(false);
    console.log('Logout action triggered for', parentData.parentEmail);
    ToastAndroid.show('Logout action triggered', ToastAndroid.SHORT);
    setTimeout(() => setRefreshing(false), 400);
  };

  const toggleBiometricLock = () => {
    setBiometricEnabled((current) => !current);
    const nextState = !biometricEnabled;
    console.log('Biometric lock set to:', nextState);
    ToastAndroid.show(
      `${Platform.OS === 'android' ? 'Fingerprint Lock' : 'Face Lock'} ${nextState ? 'enabled' : 'disabled'}`,
      ToastAndroid.SHORT,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 500);
            }}
            colors={['#009966']}
            tintColor="#009966"
          />
        }
      >

        {/* Profile Information */}
        <View style={styles.infoSection}>
          <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 12 }}>
            <View style={{
              backgroundColor: '#f3f4f6',
              borderRadius: 60,
              padding: 24,
              shadowColor: '#009966',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <User size={64} color="#009966" />
            </View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#222', marginTop: 12 }}>{parentData.parentName}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 18, marginHorizontal: 16, padding: 20, shadowColor: '#009966', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#009966', marginBottom: 12 }}>Contact Information</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                <Mail size={22} color="#009966" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Email</Text>
                <Text style={{ color: '#444', fontSize: 16 }}>{parentData.parentEmail}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                <Phone size={22} color="#009966" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Phone</Text>
                <Text style={{ color: '#444', fontSize: 16 }}>{parentData.parentPhone}</Text>
              </View>
            </View>
            {parentData.parentAlternatePhone ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                  <Phone size={22} color="#009966" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Alt. Phone</Text>
                  <Text style={{ color: '#444', fontSize: 16 }}>{parentData.parentAlternatePhone}</Text>
                </View>
              </View>
            ) : null}
            {parentData.parentState ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                  <MapPin size={22} color="#009966" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>State</Text>
                  <Text style={{ color: '#444', fontSize: 16 }}>{parentData.parentState}</Text>
                </View>
              </View>
            ) : null}
            {parentData.parentLga ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                  <MapPin size={22} color="#009966" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>LGA</Text>
                  <Text style={{ color: '#444', fontSize: 16 }}>{parentData.parentLga}</Text>
                </View>
              </View>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 0 }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                <MapPin size={22} color="#009966" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Address</Text>
                <Text style={{ color: '#444', fontSize: 16 }}>{parentData.address}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 16, marginHorizontal: 16, gap: 12 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#009966', borderRadius: 12, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={() => setPasswordModalVisible(true)}>
              <Lock size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#009966', flexDirection: 'row', justifyContent: 'center' }} onPress={toggleBiometricLock}>
              {Platform.OS === 'android' ? (
                <FingerprintPattern size={20} color="#009966" style={{ marginRight: 8 }} />
              ) : (
                <ScanFace size={20} color="#009966" style={{ marginRight: 8 }} />
              )}
              <Text style={{ color: '#009966', fontWeight: 'bold', fontSize: 16 }}>
                {Platform.OS === 'android' ? 'Fingerprint Lock' : 'Face Lock'} {biometricEnabled ? 'On' : 'Off'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#c62828', flexDirection: 'row', justifyContent: 'center' }} onPress={() => setLogoutModalVisible(true)}>
              <LogOut size={20} color="#c62828" style={{ marginRight: 8 }} />
              <Text style={{ color: '#c62828', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>

          </View>
        </View>
        {/* Change Password Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={passwordModalVisible}
          onRequestClose={() => setPasswordModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>
              {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map((field, idx) => (
                <View key={field} style={{ marginBottom: 16 }}>
                  <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 6 }}>
                    {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e7ef', borderRadius: 8, backgroundColor: '#f7faff', paddingHorizontal: 10 }}>
                    <TextInput
                      style={{ flex: 1, height: 48, fontSize: 16, color: '#222' }}
                      placeholder={field === 'currentPassword' ? 'Enter current password' : field === 'newPassword' ? 'Enter new password' : 'Confirm new password'}
                      value={passwordForm[field]}
                      onChangeText={text => setPasswordForm({ ...passwordForm, [field]: text })}
                      secureTextEntry={!showPassword[field]}
                      placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(s => ({ ...s, [field]: !s[field] }))}>
                      <Text style={{ color: '#009966', fontWeight: 'bold', fontSize: 15, padding: 8 }}>
                        {showPassword[field] ? 'Hide' : 'Show'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setPasswordModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleChangePassword}
                >
                  <Text style={styles.saveButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Logout Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={logoutModalVisible}
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.confirmModalContent}>
              <Text style={styles.confirmTitle}>Logout</Text>
              <Text style={styles.confirmMessage}>Are you sure you want to logout?</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setLogoutModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.logoutConfirmButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutConfirmText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#fff', borderRadius: 18, marginHorizontal: 16, padding: 20, shadowColor: '#009966', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2
    , marginBottom: 24,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  actionsSection: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 12,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#c62828',
  },
  logoutText: {
    color: '#c62828',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 500,
  },
  confirmModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutConfirmButton: {
    backgroundColor: '#c62828',
  },
  logoutConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
