import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import React, { useCallback, useMemo, useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScanScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const [hasScanned, setHasScanned] = useState(false);
	const [flashlightOn, setFlashlightOn] = useState(false);
	const [manualCode, setManualCode] = useState('');

	const scannerActive = useMemo(() => !!permission?.granted && !hasScanned, [permission?.granted, hasScanned]);

	const showCodeAlert = useCallback((value: string) => {
		Alert.alert('Scan Result', `QR Code Value: ${value}`);
	}, []);

	const handleBarcodeScanned = useCallback(
		(result: BarcodeScanningResult) => {
			if (hasScanned) {
				return;
			}

			setHasScanned(true);
			showCodeAlert(result.data);
		},
		[hasScanned, showCodeAlert],
	);

	const handleManualInput = useCallback(
		(text: string) => {
			const normalizedText = text.replace(/\s/g, '');
			const nextText = normalizedText.slice(0, 8);
			setManualCode(nextText);

			if (nextText.length === 8) {
				showCodeAlert(nextText);
			}
		},
		[showCodeAlert],
	);

	if (!permission) {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.centeredState}>
					<Text style={styles.stateTitle}>Preparing Camera...</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (!permission.granted) {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.centeredState}>
					<Text style={styles.stateTitle}>Camera Permission Needed</Text>
					<Text style={styles.stateSubtitle}>Allow camera access to scan QR codes.</Text>

					<TouchableOpacity
						activeOpacity={0.85}
						onPress={requestPermission}
						style={styles.permissionButton}
					>
						<Text style={styles.permissionButtonText}>Enable Camera</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Scan</Text>

				<View style={styles.cameraCard}>
					<CameraView
						style={styles.camera}
						facing="back"
						enableTorch={flashlightOn}
						barcodeScannerSettings={{
							barcodeTypes: ['qr'],
						}}
						onBarcodeScanned={scannerActive ? handleBarcodeScanned : undefined}
					/>
				</View>

				<View style={styles.actionsRow}>
					<TouchableOpacity
						activeOpacity={0.85}
						style={[styles.actionButton, flashlightOn && styles.actionButtonActive]}
						onPress={() => setFlashlightOn((prev) => !prev)}
					>
						<Text style={[styles.actionButtonText, flashlightOn && styles.actionButtonTextActive]}>
							{flashlightOn ? 'Flashlight ON' : 'Flashlight OFF'}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.85}
						style={styles.actionButton}
						onPress={() => setHasScanned(false)}
					>
						<Text style={styles.actionButtonText}>Scan Again</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.separatorWrap}>
					<View style={styles.hr} />
					<Text style={styles.orText}>OR</Text>
					<View style={styles.hr} />
				</View>

				<View style={styles.manualWrap}>
					<Text style={styles.manualLabel}>Enter Code Manually</Text>
					<TextInput
						value={manualCode}
						onChangeText={handleManualInput}
						placeholder="Type 8 characters"
						placeholderTextColor="#7a8b9b"
						style={styles.input}
						autoCapitalize="characters"
						autoCorrect={false}
						maxLength={8}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f9f7',
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 28,
	},
	title: {
		fontSize: 28,
		color: '#10293e',
		fontWeight: '800',
		marginBottom: 12,
	},
	cameraCard: {
		borderRadius: 18,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#d8e5ef',
		backgroundColor: '#fff',
		marginBottom: 12,
	},
	camera: {
		width: '100%',
		aspectRatio: 1,
	},
	actionsRow: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 14,
	},
	actionButton: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#d8e5ef',
		paddingVertical: 12,
		alignItems: 'center',
	},
	actionButtonActive: {
		backgroundColor: '#e8fbf3',
		borderColor: '#b9e9d4',
	},
	actionButtonText: {
		color: '#1f364c',
		fontWeight: '700',
		fontSize: 14,
	},
	actionButtonTextActive: {
		color: '#009966',
	},
	separatorWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginVertical: 10,
	},
	hr: {
		flex: 1,
		height: 1,
		backgroundColor: '#d9e5ef',
	},
	orText: {
		color: '#5f7489',
		fontWeight: '700',
		letterSpacing: 0.3,
	},
	manualWrap: {
		backgroundColor: '#fff',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#d8e5ef',
		padding: 14,
	},
	manualLabel: {
		fontSize: 14,
		color: '#1f364c',
		fontWeight: '700',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#f7fafd',
		borderWidth: 1,
		borderColor: '#dce6ef',
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 11,
		fontSize: 15,
		color: '#10293e',
		letterSpacing: 1,
	},
	centeredState: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	stateTitle: {
		fontSize: 20,
		color: '#10293e',
		fontWeight: '800',
		marginBottom: 6,
		textAlign: 'center',
	},
	stateSubtitle: {
		fontSize: 14,
		color: '#4f6477',
		textAlign: 'center',
		marginBottom: 14,
	},
	permissionButton: {
		backgroundColor: '#009966',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	permissionButtonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 14,
	},
});
