import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { Student, verifyCode, createRecord } from '@/lib/services/staff';
import { RelativePathString, useLocalSearchParams, useRouter } from 'expo-router';
import { RefreshCw, User } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type VerifyResponse = {
	student?: Student[] | Student | null;
	status: string;
	pickup?: {
		name: string;
		phone: string;
		relationship: string;
		parentId: string;
	}
};

export default function CodeStudentListScreen() {
	const { id } = useLocalSearchParams<{ id?: string | string[] }>();
	const router = useRouter();
	const { token, auth } = useAuth();
	const { showToast } = useToast();
	const [students, setStudents] = useState<Student[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [pickup, setPickup] = useState<VerifyResponse['pickup']>({ name: '', phone: '', relationship: '', parentId: '' });

	const code = useMemo(() => {
		const raw = Array.isArray(id) ? id[0] : id;
		return raw ? decodeURIComponent(raw).trim() : '';
	}, [id]);

	const fetchStudents = useCallback(
		async (isManualRefresh = false) => {
			if (!code) {
				setStudents([]);
				setLoading(false);
				return;
			}

			if (isManualRefresh) {
				setRefreshing(true);
			} else {
				setLoading(true);
			}

			try {
				const data = (await verifyCode(code, token || undefined)) as VerifyResponse;
				const verifiedStudents = data?.student;

				setPickup(data?.pickup || { name: '', phone: '', relationship: '', parentId: '' });

				if (Array.isArray(verifiedStudents)) {
					setStudents(verifiedStudents);
				} else if (verifiedStudents) {
					setStudents([verifiedStudents]);
				} else {
					setStudents([]);
				}
			} catch (error: any) {
				setStudents([]);
				showToast({
					message: error?.message || 'Failed to verify code. Try again.',
					type: 'alert',
					status: 'failed',
				});
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		},
		[code, token, showToast],
	);

	useEffect(() => {
		fetchStudents();
	}, [fetchStudents]);

	const getStudentName = (student: Student) => {
		return [student.firstName, student.middleName, student.lastName]
			.filter(Boolean)
			.join(' ')
			.trim();
	};

	const getStudentClass = (student: Student) => {
		const classValue = [student.grade, student.section].filter(Boolean).join(' - ');
		return classValue || 'N/A';
	};

	const handleCheckIn = useCallback(async () => {
		if (!students.length) return;

		setLoading(true);

		try {

			const payload = {
				studentIds: students.map(s => s.studentId),
				pickupPerson: pickup?.name || '',
				pickupPhone: pickup?.phone || '',
				pickupRelationship: pickup?.relationship || '',
				parentId: pickup?.parentId || '', // Replace with actual parent ID if available
				schoolUid: auth?.schoolId || '',
				staffId: auth?.id || '',
			};

			const res = await createRecord(payload, token as string)

			console.log(res)

			if (res.success) {
				showToast({
					message: 'Check-in successful.',
					type: 'alert',
					status: 'success',
				});

				router.replace("scan" as RelativePathString);
			} else {
				showToast({
					message: res.message || 'Failed to create check-in record.',
					type: 'alert',
					status: 'failed',
				});
			}

		} catch (error: any) {
			showToast({
				message: error?.message || 'Failed to create check-in record.',
				type: 'alert',
				status: 'failed',
			});
		} finally {
			setLoading(false);
		}
	}, [students, pickup?.name, pickup?.phone, pickup?.relationship, pickup?.parentId, auth?.schoolId, auth?.id, token, showToast, router]);

	const handleBack = useCallback(() => {
		router.back();
	}, [router]);

	const renderStudent = ({ item }: { item: Student }) => {
		return (
			<View style={styles.studentCard}>
				<View style={styles.avatarWrap}>
					{item.avatar ? (
						<Image
							source={{ uri: item.avatar }}
							style={styles.avatarImage}
						/>
					) : (
						<User size={24} color="#4169E1" />
					)}
				</View>

				<View style={styles.infoWrap}>
					<Text style={styles.studentName} numberOfLines={1}>
						{getStudentName(item) || 'Unnamed Student'}
					</Text>
					<Text style={styles.studentMeta}>Gender: {item.gender || 'N/A'}</Text>
					<Text style={styles.studentMeta}>Class: {getStudentClass(item)}</Text>
				</View>
			</View>
		);
	};

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.centeredContent}>
					<ActivityIndicator size="large" color="#4169E1" />
					<Text style={styles.loadingText}>Verifying code...</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (!code) {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.centeredContent}>
					<Text style={styles.emptyTitle}>Missing code</Text>
					<Text style={styles.emptyText}>No code was provided in the URL.</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.headerRow}>
				<View style={styles.headerTextWrap}>
					<Text style={styles.headerTitle}>Verified Students</Text>
					<Text style={styles.headerSubtitle}>Code: {code}</Text>
				</View>

				<Pressable
					onPress={() => fetchStudents(true)}
					disabled={refreshing}
					style={({ pressed }) => [
						styles.refreshButton,
						pressed ? styles.refreshButtonPressed : null,
						refreshing ? styles.refreshButtonDisabled : null,
					]}
				>
					{refreshing ? (
						<ActivityIndicator size="small" color="#4169E1" />
					) : (
						<RefreshCw size={18} color="#4169E1" />
					)}
				</Pressable>
			</View>

			<View style={styles.pickupSection}>
				<Text style={styles.pickupLabel}>Pickup Details</Text>
				<View style={styles.pickupField}>
					<Text style={styles.pickupFieldLabel}>Name</Text>
					<TextInput
						style={styles.pickupInput}
						value={pickup?.name || 'N/A'}
						editable={false}
					/>
				</View>

				<View style={[styles.pickupField, styles.pickupFieldSpacing]}>
					<Text style={styles.pickupFieldLabel}>Phone</Text>
					<TextInput
						style={styles.pickupInput}
						value={pickup?.phone || 'N/A'}
						editable={false}
					/>
				</View>

				<View style={[styles.pickupField, styles.pickupFieldSpacing]}>
					<Text style={styles.pickupFieldLabel}>Relationship</Text>
					<TextInput
						style={styles.pickupInput}
						value={pickup?.relationship || 'N/A'}
						editable={false}
					/>
				</View>
			</View>

			<View style={styles.studentsSection}>
				<Text style={[styles.pickupLabel, {
					paddingHorizontal: 16,
					paddingBottom: 5,
				}]}>Students</Text>
				<FlatList
					data={students}
					keyExtractor={(item, index) => item.id || item.studentId || `${index}`}
					contentContainerStyle={students.length === 0 ? styles.emptyListContent : styles.listContent}
					renderItem={renderStudent}
					ListEmptyComponent={
						<View style={styles.emptyListWrap}>
							<Text style={styles.emptyTitle}>No students found</Text>
							<Text style={styles.emptyText}>The code is valid, but no student data was returned.</Text>
						</View>
					}
				/>
			</View>
			<TouchableOpacity
				onPress={handleCheckIn}
				disabled={students.length === 0}
				activeOpacity={0.85}
				style={[styles.checkInButton, students.length === 0 ? styles.checkInButtonDisabled : null]}
			>
				<Text style={styles.checkInButtonText}>{loading ? "Checking in..." : "Check In"}</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={handleBack}
				activeOpacity={0.85}
				style={styles.backButton}
			>
				<Text style={styles.backButtonText}>Back</Text>
			</TouchableOpacity>

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4f7ff',
	},
	centeredContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
	},
	loadingText: {
		marginTop: 12,
		fontSize: 15,
		color: '#334155',
		fontWeight: '500',
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 18,
		paddingTop: 16,
		paddingBottom: 10,
	},
	headerTextWrap: {
		flex: 1,
		paddingRight: 12,
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: '700',
		color: '#0f172a',
	},
	headerSubtitle: {
		marginTop: 4,
		fontSize: 13,
		color: '#475569',
	},
	refreshButton: {
		width: 40,
		height: 40,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#dbe7ff',
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	refreshButtonPressed: {
		opacity: 0.7,
	},
	refreshButtonDisabled: {
		opacity: 0.6,
	},
	pickupSection: {
		paddingHorizontal: 16,
		paddingBottom: 10,
	},
	pickupLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: '#334155',
		marginBottom: 6,
	},
	pickupField: {},
	pickupFieldSpacing: {
		marginTop: 10,
	},
	pickupFieldLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: '#64748b',
		marginBottom: 4,
	},
	pickupInput: {
		borderWidth: 1,
		borderColor: '#dbe7ff',
		backgroundColor: '#f8faff',
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: '#0f172a',
		lineHeight: 20,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 28,
	},
	studentsSection: {
		flex: 1,
	},
	checkInButton: {
		marginHorizontal: 16,
		marginBottom: 8,
		backgroundColor: '#4169E1',
		borderRadius: 12,
		paddingVertical: 13,
		alignItems: 'center',
	},
	checkInButtonDisabled: {
		backgroundColor: '#9fb3ee',
	},
	checkInButtonText: {
		color: '#ffffff',
		fontSize: 15,
		fontWeight: '700',
	},
	backButton: {
		marginHorizontal: 16,
		marginBottom: 14,
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#4169E1',
		borderRadius: 12,
		paddingVertical: 13,
		alignItems: 'center',
	},
	backButtonText: {
		color: '#4169E1',
		fontSize: 15,
		fontWeight: '700',
	},
	studentCard: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#e3ebff',
		borderRadius: 16,
		padding: 14,
		marginBottom: 12,
		shadowColor: '#4169E1',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
	},
	avatarWrap: {
		width: 54,
		height: 54,
		borderRadius: 27,
		borderWidth: 1,
		borderColor: '#d9e5ff',
		backgroundColor: '#edf3ff',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		marginRight: 12,
	},
	avatarImage: {
		width: 54,
		height: 54,
		borderRadius: 27,
	},
	infoWrap: {
		flex: 1,
	},
	studentName: {
		fontSize: 16,
		fontWeight: '700',
		color: '#0f172a',
		marginBottom: 3,
	},
	studentMeta: {
		fontSize: 13,
		color: '#475569',
		marginTop: 1,
	},
	emptyListContent: {
		flexGrow: 1,
		justifyContent: 'center',
		paddingHorizontal: 24,
		paddingBottom: 40,
	},
	emptyListWrap: {
		alignItems: 'center',
	},
	emptyTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#1e293b',
		textAlign: 'center',
	},
	emptyText: {
		marginTop: 8,
		fontSize: 14,
		color: '#64748b',
		textAlign: 'center',
	},
});
