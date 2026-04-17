import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { verifyCode } from '@/lib/services/staff';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StatusBar, Text, TextInput, View } from 'react-native';

export default function ScanScreen() {
    const router = useRouter();
    const { showToast } = useToast();
    const [permission, requestPermission] = useCameraPermissions();
    const [manualCode, setManualCode] = useState('');
    const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
    const [isScanPaused, setIsScanPaused] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const openCodeModal = useCallback(() => {
        setIsScanPaused(true);
        setIsCodeModalVisible(true);
    }, []);

    const closeCodeModal = useCallback(() => {
        setIsCodeModalVisible(false);
        setIsScanPaused(false);
    }, []);

    const handleBarcodeScanned = useCallback(
        ({ data }: BarcodeScanningResult) => {
            if (!data || isScanPaused) {
                return;
            }

            setManualCode(data);
            setIsScanPaused(true);
            setIsCodeModalVisible(true);
        },
        [isScanPaused],
    );

    const handleCheckCode = useCallback(async () => {
        const cleanedCode = manualCode.trim();
        setIsScanPaused(false);

        if (!cleanedCode) {
            showToast({
                message: 'Enter a code before checking.',
                type: 'alert',
                status: 'warn',
            });
            return;
        }

        setLoading(true);
        try {
            const verify = await verifyCode(cleanedCode, token as string);

            if (!verify) {
                showToast({
                    message: 'Invalid code. Please try again.',
                    type: 'alert',
                    status: 'failed',
                });
                closeCodeModal();
                setManualCode('');
                return;
            }

            router.push(`/code/${encodeURIComponent(cleanedCode)}` as RelativePathString);

            showToast({
                message: `Verified successfully!`,
                type: 'alert',
                status: 'success',
            });
            closeCodeModal();
            setManualCode('');
        } catch (error: any) {
            showToast({
                message: error?.message || 'Failed to verify code. Try again.',
                type: 'alert',
                status: 'failed',
            });
        } finally {
            setLoading(false);
        }
    }, [manualCode, showToast, token, router, closeCodeModal]);

    if (!permission) {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Preparing camera...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={{ flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Camera access needed</Text>
                <Text style={{ color: '#cbd5e1', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                    Allow camera permission so you can scan QR codes.
                </Text>
                <Pressable
                    onPress={requestPermission}
                    style={{ marginTop: 18, backgroundColor: '#4169E1', paddingVertical: 13, paddingHorizontal: 20, borderRadius: 12 }}
                >
                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Enable camera</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <CameraView
                style={{ flex: 1 }}
                facing="back"
                onBarcodeScanned={isScanPaused ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />

            <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.58)', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 24 }}>
                    <Text style={{ color: '#f8fafc', fontSize: 18, fontWeight: '700' }}>Scan QR Code</Text>
                </View>

                <View style={{ flexDirection: 'row', height: 270 }}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.58)' }} />
                    <View style={{ width: 270, borderRadius: 20, borderWidth: 3, borderColor: '#ffffff', backgroundColor: 'transparent' }} />
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.58)' }} />
                </View>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.58)', alignItems: 'center', paddingTop: 26, paddingHorizontal: 22 }}>
                    <Text style={{ color: '#e2e8f0', fontSize: 14, textAlign: 'center' }}>Place the QR code inside the box to scan automatically.</Text>
                    <Pressable
                        onPress={openCodeModal}
                        style={{ marginTop: 18, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 22, width: '100%', maxWidth: 280, alignItems: 'center' }}
                    >
                        <Text style={{ color: '#0f172a', fontSize: 15, fontWeight: '700' }}>Check with code</Text>
                    </Pressable>
                    {isScanPaused ? (
                        <Pressable
                            onPress={() => setIsScanPaused(false)}
                            style={{ marginTop: 12, paddingVertical: 8, paddingHorizontal: 12 }}
                        >
                            <Text style={{ color: '#bfdbfe', fontSize: 13, fontWeight: '600' }}>Tap to scan again</Text>
                        </Pressable>
                    ) : null}
                </View>
            </View>

            <Modal
                visible={isCodeModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeCodeModal}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', paddingHorizontal: 22 }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#0f172a' }}>Check with code</Text>
                            <Text style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>Enter or edit the scanned code below.</Text>

                            <TextInput
                                value={manualCode}
                                onChangeText={setManualCode}
                                autoCapitalize="characters"
                                autoCorrect={false}
                                placeholder="Enter code"
                                placeholderTextColor="#94a3b8"
                                style={{
                                    marginTop: 14,
                                    borderWidth: 1.5,
                                    borderColor: '#cbd5e1',
                                    borderRadius: 12,
                                    paddingHorizontal: 14,
                                    paddingVertical: 12,
                                    fontSize: 16,
                                    color: '#0f172a',
                                    fontWeight: '600',
                                }}
                            />

                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <Pressable
                                    onPress={closeCodeModal}
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#cbd5e1',
                                        borderRadius: 10,
                                        paddingVertical: 11,
                                        alignItems: 'center',
                                        backgroundColor: '#f8fafc',
                                    }}
                                >
                                    <Text style={{ color: '#334155', fontSize: 15, fontWeight: '700' }}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    onPress={loading ? undefined : handleCheckCode}
                                    style={{
                                        flex: 1,
                                        marginLeft: 10,
                                        borderRadius: 10,
                                        paddingVertical: 11,
                                        alignItems: 'center',
                                        backgroundColor: loading ? '#93aee8' : '#4169E1',
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>{loading ? 'Checking...' : 'Check'}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}
