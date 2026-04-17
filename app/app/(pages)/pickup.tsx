import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { Student } from '@/lib/services/parent';
import { getPickups, Pickup } from '@/lib/services/pickup';
import * as Clipboard from 'expo-clipboard';
import { ArrowLeft, Copy, Phone, Share2, Shield, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useRouter } from 'expo-router';

export default function PickupPage() {
    const router = useRouter();
    const { auth, token } = useAuth();
    const { showToast } = useToast();
    const [pickupData, setPickupData] = useState<Pickup | null>(null);
    const [loading, setLoading] = useState(true);
    // Modal state for QR code
    const [qrModalVisible, setQrModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.id || !token) return;
            setLoading(true);
            try {
                const res = await getPickups(auth.id, token);
                if (res.pickup) {
                    setPickupData(res.pickup);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [auth?.id, token]);

    if (!pickupData) {
        return (
            <View style={styles.pageContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ArrowLeft size={28} color="#4169E1" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Pickup Information</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.centered}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#4169E1" />
                    ) : (
                        <Text style={styles.emptyTitle}>No pickup data found.</Text>
                    )}
                </View>
            </View>
        );
    }

    // Children can be array or object, normalize to array
    let children: Student[] = [];
    if (Array.isArray(pickupData.children)) {
        children = pickupData.children as Student[];
    } else if (pickupData.children && typeof pickupData.children === 'object') {
        children = Object.values(pickupData.children) as Student[];
    }

    // Get code from first child with a code
    const firstChildWithCode = (auth?.children as Student[]).find((child: Student) => child.code);
    const qrCodeValue = firstChildWithCode?.code || '';

    return (
        <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent}>
            {/* Header with Back Button and Title */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={28} color="#4169E1" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pickup Information</Text>
                <View style={{ width: 40 }} />
            </View>

            {
                loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#4169E1" />
                    </View>
                ) : <>
                    {!pickupData ? (
                        <View style={styles.centered}>
                            <Text style={styles.emptyTitle}>No pickup data found.</Text>
                        </View>) :
                        (<>
                            <View style={styles.section}>
                                <View style={styles.zoneCardRow}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                                        <View style={styles.zoneIconLeft}><Users size={32} color="#4169E1" /></View>
                                        <View style={styles.zoneInfoRight}>
                                            <View style={styles.zoneInfoRow}><Shield size={16} color="#4169E1" style={styles.zoneInfoIcon} /><Text style={styles.zoneTitleRow}>{pickupData.name}</Text></View>
                                            <View style={styles.zoneInfoRow}><Phone size={16} color="#4169E1" style={styles.zoneInfoIcon} /><Text style={styles.zonePhoneRow}>{pickupData.phone}</Text></View>
                                            <View style={styles.zoneInfoRow}><Shield size={16} color="#4169E1" style={styles.zoneInfoIcon} /><Text style={styles.zoneRelationshipRow}>{pickupData.relationship}</Text></View>
                                        </View>
                                    </View>
                                    <View style={styles.zoneButtonRowWrap}>
                                        {pickupData.code && (
                                            <View style={styles.zoneInfoRow}>
                                                <Copy size={16} color="#4169E1" style={styles.zoneInfoIcon} />
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
                                                            <Users size={22} color="#4169E1" />
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
                        </>)}
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#4169E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 18 }}>
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
        color: '#4169E1',
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
        borderColor: '#4169E1',
        backgroundColor: '#4169E120',
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
        color: '#4169E1',
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
        color: '#4169E1',
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
        backgroundColor: '#4169E1',
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
        borderColor: '#4169E1',
        backgroundColor: '#4169E120',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childAvatarImgWrap: {
        width: 50,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#4169E1',
        backgroundColor: '#4169E120',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childAvatarFallback: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#4169E1',
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
        backgroundColor: '#4169E1',
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
        color: '#4169E1',
        letterSpacing: 16,
    },
    qrModalCloseBtn: {
        marginTop: 24,
        backgroundColor: '#4169E1',
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
