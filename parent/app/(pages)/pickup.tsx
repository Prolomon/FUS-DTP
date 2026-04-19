import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import * as Clipboard from 'expo-clipboard';
import { ArrowLeft, ChevronRight, Copy, Phone, Share2, Shield, Users } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useRouter } from 'expo-router';

type Student = {
    id: string;
    studentId?: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    dateOfBirth?: string;
    grade?: string;
    gender?: string;
    avatar?: string | null;
    code?: string;
};

type Pickup = {
    id: string;
    parentId: string;
    name: string;
    phone: string;
    relationship: string;
    code?: string;
    children?: Student[];
};

export default function PickupPage() {
    const router = useRouter();
    const { auth } = useAuth();
    const { showToast } = useToast();
    const authChildren = useMemo(() => {
        return Array.isArray(auth?.children) ? (auth.children as Student[]) : [];
    }, [auth?.children]);
    const [pickupData, setPickupData] = useState<Pickup | null>(null);
    const [pickupList, setPickupList] = useState<Pickup[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formName, setFormName] = useState('');
    const [formPhone, setFormPhone] = useState('');
    const [formRelationship, setFormRelationship] = useState('');
    // Modal state for QR code
    const [qrModalVisible, setQrModalVisible] = useState(false);

    useEffect(() => {
        const children = authChildren;
        const dummyList: Pickup[] = [
            {
                id: 'pickup-local-001',
                parentId: auth?.id || 'parent-dummy',
                name: 'Samuel Driver',
                phone: '08000000000',
                relationship: 'driver',
                code: 'PICK-7842',
                children,
            },
            {
                id: 'pickup-local-002',
                parentId: auth?.id || 'parent-dummy',
                name: 'Esther Aunty',
                phone: '08011112222',
                relationship: 'aunty',
                code: 'PICK-5621',
                children: children.slice(0, 1),
            },
            {
                id: 'pickup-local-003',
                parentId: auth?.id || 'parent-dummy',
                name: 'Bello Bus Driver',
                phone: '08033334444',
                relationship: 'school bus driver',
                code: 'PICK-2299',
                children,
            },
        ];

        setPickupData(dummyList[0] || null);
        setPickupList(dummyList);
        setLoading(false);
    }, [authChildren, auth?.id]);

    const handleDelete = () => {
        if (!pickupData) {
            showToast({ message: 'No pickup selected', type: 'alert', status: 'failed' });
            return;
        }

        setPickupList((current) => {
            const filtered = current.filter((item) => item.id !== pickupData.id);
            setPickupData(filtered.length > 0 ? filtered[0] : null);
            return filtered;
        });

        showToast({ message: 'Pick Up deleted successfully', type: 'alert', status: 'success' });
    };

    const handleCreatePickup = () => {
        if (!formName.trim() || !formPhone.trim() || !formRelationship.trim()) {
            showToast({ message: 'Please fill name, phone and relationship', type: 'alert', status: 'failed' });
            return;
        }

        const selectedChildren = authChildren;
        const newPickup: Pickup = {
            id: `pickup-${Date.now()}`,
            parentId: auth?.id || 'parent-dummy',
            name: formName.trim(),
            phone: formPhone.trim(),
            relationship: formRelationship.trim().toLowerCase(),
            children: selectedChildren,
        };

        setPickupList((current) => [newPickup, ...current]);
        setPickupData(newPickup);
        setShowCreateForm(false);
        setFormName('');
        setFormPhone('');
        setFormRelationship('');
        showToast({ message: 'Pickup created', type: 'alert', status: 'success' });
    };

    // Children can be array or object, normalize to array
    let children: Student[] = [];
    if (pickupData && Array.isArray(pickupData.children)) {
        children = pickupData.children as Student[];
    } else if (pickupData?.children && typeof pickupData.children === 'object') {
        children = Object.values(pickupData.children) as Student[];
    }

    // Get code from first child with a code
    const firstChildWithCode = authChildren.find((child) => child.code);
    const qrCodeValue = firstChildWithCode?.code || '';

    const pickupState = { pickup: pickupData };

    return (
        <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
            {/* Header with Back Button and Title */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={28} color="#009966" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pickup Information</Text>
                <View style={{ width: 40 }} />
            </View>

            {pickupData && (
                <View style={styles.section}>
                    <View style={styles.zoneCardRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                            <View style={styles.zoneIconLeft}><Users size={32} color="#009966" /></View>
                            <View style={styles.zoneInfoRight}>
                                <View style={styles.zoneInfoRow}><Shield size={16} color="#009966" style={styles.zoneInfoIcon} /><Text style={styles.zoneTitleRow}>{pickupData.name}</Text></View>
                                <View style={styles.zoneInfoRow}><Phone size={16} color="#009966" style={styles.zoneInfoIcon} /><Text style={styles.zonePhoneRow}>{pickupData.phone}</Text></View>
                                <View style={styles.zoneInfoRow}><Shield size={16} color="#009966" style={styles.zoneInfoIcon} /><Text style={styles.zoneRelationshipRow}>{pickupData.relationship}</Text></View>
                            </View>
                        </View>
                        <View style={styles.zoneButtonRowWrap}>
                            {pickupData.code && (
                                <View style={styles.zoneInfoRow}>
                                    <Copy size={16} color="#009966" style={styles.zoneInfoIcon} />
                                    <Text style={styles.zoneCodeRow}>{pickupData.code}</Text>
                                    <TouchableOpacity
                                        style={styles.copyButton}
                                        onPress={() => {
                                            Clipboard.setStringAsync(pickupData.code || '');
                                            showToast({ message: 'Code copied!', type: 'alert', status: 'success' });
                                        }}
                                    >
                                        <Text style={styles.copyButtonText}>Copy</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            <TouchableOpacity style={styles.zoneButton} activeOpacity={0.6} onPress={() => {
                                Share.share({
                                    title: 'Pickup Information',
                                    message: `*Pickup Person Code:* ${pickupData.code}\n*Children Pickup Code:* ${qrCodeValue}`,
                                })
                            }}>
                                <Share2 size={18} color="#fff" style={{ marginRight: 8 }} />
                                <Text style={styles.zoneButtonText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {pickupData && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Children</Text>
                    {children.length === 0 ? (
                        <Text style={styles.noChildren}>No children found for this pickup.</Text>
                    ) : (
                        children.map(child => {
                            // Calculate age from dateOfBirth
                            let age = '';
                            if (child.dateOfBirth) {
                                const dob = new Date(child.dateOfBirth);
                                const now = new Date();
                                let years = now.getFullYear() - dob.getFullYear();
                                const m = now.getMonth() - dob.getMonth();
                                if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
                                    years--;
                                }
                                // Always show age, even if 0
                                age = `${years} yrs`;
                            }
                            return (
                                <View key={child.id} style={styles.childCardRow}>
                                    <View style={styles.childAvatarWrap}>
                                        {child.avatar ? (
                                            <View style={styles.childAvatarImgWrap}>
                                                <Image source={{ uri: child.avatar }} style={styles.childAvatarImgWrap} />
                                            </View>
                                        ) : (
                                            <View style={styles.childAvatarFallback}>
                                                <Users size={22} color="#009966" />
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.childInfoRight}>
                                        <Text style={styles.childNameRow}>{child.firstName} {child.lastName} {child.middleName}</Text>
                                        <View style={styles.childInfoRow}><Text style={styles.childInfoLabel}>Grade:</Text><Text style={styles.childInfoValue}>{child.grade}</Text></View>
                                        <View style={styles.childInfoRow}><Text style={styles.childInfoLabel}>Gender:</Text><Text style={styles.childInfoValue}>{child.gender}{age ? ` (${age})` : ''}</Text></View>
                                    </View>
                                </View>
                            );
                        })
                    )}
                    {/* QR Code Button */}
                    {qrCodeValue ? (
                        <TouchableOpacity style={styles.qrButton} onPress={() => setQrModalVisible(true)}>
                            <Text style={styles.qrButtonText}>Show QR Code</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            )}

            {
                loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#009966" />
                    </View>
                ) : <>
                    <>
                        {/* pickup list */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Pickups</Text>
                                <View style={styles.sectionHeaderActions}>
                                    <TouchableOpacity
                                        style={styles.addPickupButton}
                                        activeOpacity={0.85}
                                        onPress={() => setShowCreateForm((current) => !current)}
                                    >
                                        <Text style={styles.addPickupButtonText}>{showCreateForm ? 'Close' : 'Add'}</Text>
                                    </TouchableOpacity>
                                    {pickupState?.pickup &&
                                        (<TouchableOpacity
                                            style={styles.cancelPickupButton}
                                            activeOpacity={0.85}
                                            onPress={handleDelete}
                                        >
                                            <Text style={styles.cancelPickupButtonText}>Cancel Pickup</Text>
                                        </TouchableOpacity>)
                                    }
                                </View>
                            </View>

                            {showCreateForm && (
                                <View style={styles.createFormCard}>
                                    <View style={styles.inputWrap}>
                                        <Users size={17} color="#64748b" style={styles.formIcon} />
                                        <TextInput
                                            style={styles.formInput}
                                            value={formName}
                                            onChangeText={setFormName}
                                            placeholder="Pickup person name"
                                            placeholderTextColor="#94a3b8"
                                        />
                                    </View>

                                    <View style={styles.inputWrap}>
                                        <Phone size={17} color="#64748b" style={styles.formIcon} />
                                        <TextInput
                                            style={styles.formInput}
                                            value={formPhone}
                                            onChangeText={setFormPhone}
                                            placeholder="Phone number"
                                            placeholderTextColor="#94a3b8"
                                            keyboardType="phone-pad"
                                        />
                                    </View>

                                    <View style={styles.inputWrap}>
                                        <Shield size={17} color="#64748b" style={styles.formIcon} />
                                        <TextInput
                                            style={styles.formInput}
                                            value={formRelationship}
                                            onChangeText={setFormRelationship}
                                            placeholder="Relationship"
                                            placeholderTextColor="#94a3b8"
                                        />
                                    </View>

                                    <TouchableOpacity style={styles.submitCreateButton} activeOpacity={0.86} onPress={handleCreatePickup}>
                                        <Text style={styles.submitCreateButtonText}>Create</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {pickupList.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.pickupListCard}
                                    activeOpacity={0.85}
                                    onPress={() => setPickupData(item)}
                                >
                                    <View style={styles.pickupListBadge}><Users size={14} color="#fff" /></View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.pickupListName}>{item.name}</Text>
                                        <Text style={styles.pickupListMeta}>{item.phone} ({item.relationship})</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                </>
            }

            {/* QR Code Modal */}
            <Modal
                visible={qrModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setQrModalVisible(false)}
            >
                <View style={styles.qrModalOverlay}>
                    <View style={styles.qrModalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#009966', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 18 }}>
                            <Text style={styles.qrCodeLabel}>{qrCodeValue}</Text>
                        </View>
                        <QRCode value={qrCodeValue} size={220} />
                        <TouchableOpacity style={styles.qrModalCloseBtn} onPress={() => setQrModalVisible(false)}>
                            <Text style={styles.qrModalCloseText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    backButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#009966',
        letterSpacing: 0.2,
    },
    scrollContent: {
        paddingVertical: 20,
        backgroundColor: '#f8fafc',
        flex: 1,
    },
    section: {
        marginTop: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionHeaderActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    addPickupButton: {
        backgroundColor: '#009966',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    addPickupButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    cancelPickupButton: {
        backgroundColor: '#c1c1c1',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    cancelPickupButtonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700',
    },
    listHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    createPickupButton: {
        backgroundColor: '#009966',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    createPickupButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    createFormCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#e2ebf3',
        padding: 12,
        marginBottom: 10,
        gap: 10,
    },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    formIcon: {
        marginRight: 8,
    },
    formInput: {
        flex: 1,
        fontSize: 14,
        color: '#0f172a',
        paddingVertical: 4,
    },
    submitCreateButton: {
        backgroundColor: '#009966',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    submitCreateButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    emptyPickupCard: {
        marginTop: 8,
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
    zoneCard: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#0f172a',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
        marginTop: 8,
        marginBottom: 8,
    },
    zoneIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#0f766e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoneTextWrap: {
        flex: 1,
    },
    zoneTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    zoneSubtitle: {
        marginTop: 4,
        fontSize: 12,
        color: '#64748b',
    },
    pickupListCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2ebf3',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    pickupListBadge: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: '#009966',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickupListName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    pickupListMeta: {
        marginTop: 2,
        fontSize: 12,
        color: '#64748b',
        textTransform: 'capitalize',
    },
    zoneCardRow: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 20,
        shadowColor: '#0f172a',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },
    zoneIconLeft: {
        width: 80,
        height: 80,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#009966',
        backgroundColor: '#00996620',
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoneInfoRight: {
        flex: 1,
        justifyContent: 'center',
    },
    zoneInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    zoneInfoIcon: {
        marginRight: 8,
    },
    zoneTitleRow: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    zoneRelationshipRow: {
        fontSize: 16,
        color: '#009966',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    zonePhoneRow: {
        fontSize: 15,
        color: '#0f172a',
        fontWeight: '500',
    },
    zoneCodeRow: {
        fontSize: 17,
        color: '#64748b',
        marginRight: 10,
    },
    copyButton: {
        backgroundColor: '#f1f5f9',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 28,
        marginLeft: 4,
    },
    copyButtonText: {
        color: '#009966',
        fontWeight: 'bold',
        fontSize: 16,
    },
    zoneButtonRowWrap: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 12,
        alignItems: 'center',
    },
    zoneButton: {
        backgroundColor: '#009966',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 28,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    zoneButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
        marginTop: 8,
    },
    childCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#0f172a',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    childAvatarWrap: {
        width: 60,
        height: 60,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#009966',
        backgroundColor: '#00996620',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childAvatarImgWrap: {
        width: 50,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#009966',
        backgroundColor: '#00996620',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childAvatarFallback: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#009966',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childInfoRight: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16,
    },
    childNameRow: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0f172a',
    },
    childInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    childInfoLabel: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '600',
        marginRight: 6,
    },
    childInfoValue: {
        fontSize: 13,
        color: '#0f172a',
        fontWeight: '500',
    },
    noChildren: {
        color: '#64748b',
        marginBottom: 12,
        fontSize: 14,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    emptyTitle: {
        fontSize: 18,
        color: '#64748b',
        fontWeight: '600',
    },
    qrButton: {
        marginTop: 18,
        backgroundColor: '#009966',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    qrButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    qrModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrModalContent: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 28,
        alignItems: 'center',
        width: 320,
        maxWidth: '90%',
    },
    qrCodeLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#009966',
        letterSpacing: 16,
    },
    qrModalCloseBtn: {
        marginTop: 24,
        backgroundColor: '#009966',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 32,
    },
    qrModalCloseText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
