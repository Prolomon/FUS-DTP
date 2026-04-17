import { useRouter } from 'expo-router';
import { Lock, LogOut, Mail, MapPin, Phone } from 'lucide-react-native';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  // Temporary data
  const fullName = 'John Doe';
  const tempEmail = 'john.doe@school.edu';
  const tempPhone = '+234 801 234 5678';
  const tempAddress = '123 Education Street, Lagos, Nigeria';
  // const handleChangePassword = async () => {
  //   setLoading(true);
  //   if (passwordForm.newPassword !== passwordForm.confirmPassword) {
  //     toast.showToast({ message: 'New passwords do not match', type: 'alert', status: 'failed' });
  //     return;
  //   }
  //   if (passwordForm.newPassword.length < 6) {
  //     toast.showToast({ message: 'Password must be at least 6 characters', type: 'alert', status: 'failed' });
  //     return;
  //   }
  //   try {
  //     await changePassword(auth?.id || '', passwordForm, token as string);
  //     setPasswordModalVisible(false);
  //     setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  //     toast.showToast({ message: 'Password changed successfully', type: 'alert', status: 'success' });
  //   } catch (error: any) {
  //     toast.showToast({ message: error?.message || 'Failed to change password', type: 'alert', status: 'failed' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleLogout = () => {
  //   setLoading(true);
  //   setLogoutModalVisible(false);
  //   logout();
  // };

  // const handleRefresh = async () => {
  //   setLoading(true);
  //   try {
  //     await refresh();
  //   } catch (error: any) {
  //     toast.showToast({ message: error?.message || 'Failed to refresh profile', type: 'alert', status: 'failed' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 12 }}>
            <View style={{
              backgroundColor: '#f3f4f6',
              borderRadius: 60,
              shadowColor: '#009966',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <Image
                source={require('../../../assets/images/arqelion_staff.png')}
                style={{ width: 100, height: 100, borderRadius: 32 }}
              />
            </View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#222', marginTop: 12 }}>{fullName}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 18, marginHorizontal: 16, padding: 20, shadowColor: '#009966', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#009966', marginBottom: 12 }}>Contact Information</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                <Mail size={22} color="#009966" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Email</Text>
                <Text style={{ color: '#444', fontSize: 16 }}>{tempEmail}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                <Phone size={22} color="#009966" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Phone</Text>
                <Text style={{ color: '#444', fontSize: 16 }}>{tempPhone}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 0 }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: '#e0e7ef', backgroundColor: '#f7faff', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 }}>
                <MapPin size={22} color="#009966" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: '#222', fontSize: 13, marginBottom: 2 }}>Address</Text>
                <Text style={{ color: '#444', fontSize: 16 }}>{tempAddress}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 16, marginHorizontal: 16, gap: 12 }}>
            {/* change password button */}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#009966', borderRadius: 12, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <Lock size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Change Password</Text>
            </TouchableOpacity>

            {/* logout button  */}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#c62828', flexDirection: 'row', justifyContent: 'center' }}>
              <LogOut size={20} color="#c62828" style={{ marginRight: 8 }} />
              <Text style={{ color: '#c62828', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>

            {/* authenticator button */}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 2, borderColor: '#009966', flexDirection: 'row', justifyContent: 'center' }} onPress={() => router.push('/(pages)/authenticator')}>
              <Text style={{ color: '#009966', fontWeight: 'bold', fontSize: 16 }}>Authenticator</Text>
            </TouchableOpacity>
          </View>
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
    , marginBottom: 16,
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
