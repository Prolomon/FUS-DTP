import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, UserRound } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AttendanceStatus = 'present' | 'absent';

type StudentItem = {
	id: string;
	name: string;
	uid: string;
	imageUrl?: string;
};

type ClassAttendance = {
	id: string;
	name: string;
	students: StudentItem[];
	attendanceMap: Record<string, AttendanceStatus>;
};

const classes: Record<string, ClassAttendance> = {
	'ss1-blue': {
		id: 'ss1-blue',
		name: 'SS1 Blue',
		students: [
			{ id: 'std-101', name: 'Amina Yusuf', uid: 'UID-2026-101', imageUrl: 'https://i.pravatar.cc/120?img=32' },
			{ id: 'std-102', name: 'Peter Okafor', uid: 'UID-2026-102', imageUrl: 'https://i.pravatar.cc/120?img=18' },
			{ id: 'std-103', name: 'Sofia Mohammed', uid: 'UID-2026-103', imageUrl: 'https://i.pravatar.cc/120?img=47' },
		],
		attendanceMap: {
			'std-101': 'present',
			'std-102': 'absent',
			'std-103': 'present',
		},
	},
	'ss2-gold': {
		id: 'ss2-gold',
		name: 'SS2 Gold',
		students: [
			{ id: 'std-001', name: 'Amara Okonkwo', uid: 'UID-2026-001', imageUrl: 'https://i.pravatar.cc/120?img=31' },
			{ id: 'std-002', name: 'Daniel Ibrahim', uid: 'UID-2026-002', imageUrl: 'https://i.pravatar.cc/120?img=12' },
			{ id: 'std-003', name: 'Blessing Afolabi', uid: 'UID-2026-003', imageUrl: 'https://i.pravatar.cc/120?img=45' },
			{ id: 'std-004', name: 'Mubarak Musa', uid: 'UID-2026-004', imageUrl: 'https://i.pravatar.cc/120?img=15' },
			{ id: 'std-005', name: 'Nora Edet', uid: 'UID-2026-005', imageUrl: 'https://i.pravatar.cc/120?img=20' },
		],
		attendanceMap: {
			'std-001': 'present',
			'std-002': 'present',
			'std-003': 'absent',
			'std-004': 'present',
			'std-005': 'absent',
		},
	},
	'ss2-silver': {
		id: 'ss2-silver',
		name: 'SS2 Silver',
		students: [
			{ id: 'std-201', name: 'John Bassey', uid: 'UID-2026-201', imageUrl: 'https://i.pravatar.cc/120?img=22' },
			{ id: 'std-202', name: 'Esther Daniel', uid: 'UID-2026-202', imageUrl: 'https://i.pravatar.cc/120?img=25' },
			{ id: 'std-203', name: 'Ibrahim Hassan', uid: 'UID-2026-203', imageUrl: 'https://i.pravatar.cc/120?img=27' },
		],
		attendanceMap: {
			'std-201': 'present',
			'std-202': 'absent',
			'std-203': 'present',
		},
	},
	'ss3-red': {
		id: 'ss3-red',
		name: 'SS3 Red',
		students: [
			{ id: 'std-301', name: 'Uche Nnamdi', uid: 'UID-2026-301', imageUrl: 'https://i.pravatar.cc/120?img=29' },
			{ id: 'std-302', name: 'Chioma Obi', uid: 'UID-2026-302', imageUrl: 'https://i.pravatar.cc/120?img=41' },
			{ id: 'std-303', name: 'Samuel Adeyemi', uid: 'UID-2026-303', imageUrl: 'https://i.pravatar.cc/120?img=36' },
		],
		attendanceMap: {
			'std-301': 'present',
			'std-302': 'present',
			'std-303': 'absent',
		},
	},
	'jss3-green': {
		id: 'jss3-green',
		name: 'JSS3 Green',
		students: [
			{ id: 'std-401', name: 'Grace Ezenwa', uid: 'UID-2026-401', imageUrl: 'https://i.pravatar.cc/120?img=40' },
			{ id: 'std-402', name: 'Moses Tanko', uid: 'UID-2026-402', imageUrl: 'https://i.pravatar.cc/120?img=43' },
			{ id: 'std-403', name: 'Fatima Abdullahi', uid: 'UID-2026-403', imageUrl: 'https://i.pravatar.cc/120?img=48' },
		],
		attendanceMap: {
			'std-401': 'present',
			'std-402': 'absent',
			'std-403': 'present',
		},
	},
};

export default function AttendanceScreen() {
	const router = useRouter();
	const params = useLocalSearchParams<{ classid?: string }>();
	const classId = Array.isArray(params.classid) ? params.classid[0] : params.classid || 'ss2-gold';
	const [searchQuery, setSearchQuery] = useState('');

	const classDetails = classes[classId] || classes['ss2-gold'];

	const filteredStudents = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return classDetails.students;
		}

		return classDetails.students.filter((student) => {
			return student.name.toLowerCase().includes(query) || student.uid.toLowerCase().includes(query);
		});
	}, [classDetails.students, searchQuery]);

	const presentCount = useMemo(
		() => classDetails.students.filter((student) => classDetails.attendanceMap[student.id] === 'present').length,
		[classDetails.attendanceMap, classDetails.students],
	);

	const absentCount = classDetails.students.length - presentCount;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.82} style={styles.backButton} onPress={() => router.back()}>
					<ArrowLeft size={18} color="#13293d" strokeWidth={2.4} />
					<Text style={styles.backButtonText}>Back</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Attendance</Text>
				<View style={styles.headerSpacer} />
			</View>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.classCard}>
					<Text style={styles.classLabel}>Class</Text>
					<Text style={styles.className}>{classDetails.name}</Text>
					<Text style={styles.classMeta}>Class ID: {classDetails.id}</Text>
				</View>

				<View style={styles.summaryRow}>
					<View style={styles.presentCard}>
						<Text style={styles.summaryLabel}>Present</Text>
						<Text style={styles.summaryValue}>{presentCount}</Text>
					</View>
					<View style={styles.absentCard}>
						<Text style={styles.summaryLabel}>Absent</Text>
						<Text style={styles.summaryValue}>{absentCount}</Text>
					</View>
				</View>

				<View style={styles.listCard}>
					<View style={styles.listHeaderRow}>
						<Text style={styles.listTitle}>Students</Text>
						<Text style={styles.listCount}>{filteredStudents.length}</Text>
					</View>

					<TextInput
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Search by student name or UID"
						placeholderTextColor="#7a8b9b"
						style={styles.searchInput}
					/>

					{filteredStudents.map((student) => {
						const status = classDetails.attendanceMap[student.id] || 'absent';
						const isPresent = status === 'present';

						return (
							<View key={student.id} style={styles.studentCard}>
								<View style={styles.leftSection}>
									{student.imageUrl ? (
										<Image source={{ uri: student.imageUrl }} style={styles.avatar} />
									) : (
										<View style={styles.avatarPlaceholder}>
											<UserRound size={20} color="#009966" strokeWidth={2.2} />
										</View>
									)}

									<View style={styles.studentTextWrap}>
										<Text style={styles.studentName}>{student.name}</Text>
										<Text style={styles.studentUid}>{student.uid}</Text>
									</View>
								</View>

								<View style={isPresent ? styles.presentButton : styles.absentButton}>
									<Text style={styles.statusButtonText}>{isPresent ? 'Present' : 'Absent'}</Text>
								</View>
							</View>
						);
					})}
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
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#f3f6fa',
		borderRadius: 11,
		paddingHorizontal: 10,
		paddingVertical: 9,
	},
	backButtonText: {
		fontSize: 14,
		color: '#13293d',
		fontWeight: '700',
	},
	headerTitle: {
		fontSize: 18,
		color: '#10293e',
		fontWeight: '800',
	},
	headerSpacer: {
		width: 62,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 28,
	},
	classCard: {
		backgroundColor: '#fff',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#e1eaf1',
		padding: 16,
		marginBottom: 12,
	},
	classLabel: {
		fontSize: 13,
		color: '#5f7082',
		marginBottom: 4,
		fontWeight: '600',
	},
	className: {
		fontSize: 24,
		color: '#0f2a41',
		fontWeight: '800',
		marginBottom: 4,
	},
	classMeta: {
		fontSize: 12,
		color: '#627789',
		fontWeight: '600',
	},
	summaryRow: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 12,
	},
	presentCard: {
		flex: 1,
		backgroundColor: '#e8fbf3',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#c7eedf',
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	absentCard: {
		flex: 1,
		backgroundColor: '#fff1f1',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#ffd8d8',
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	summaryLabel: {
		fontSize: 12,
		color: '#4f6477',
		fontWeight: '600',
		marginBottom: 2,
	},
	summaryValue: {
		fontSize: 22,
		color: '#10293e',
		fontWeight: '800',
	},
	listCard: {
		backgroundColor: '#fff',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#e1eaf1',
		padding: 14,
	},
	listHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	listTitle: {
		fontSize: 20,
		color: '#1a2f44',
		fontWeight: '800',
	},
	listCount: {
		minWidth: 28,
		textAlign: 'center',
		borderRadius: 999,
		backgroundColor: '#e8fbf3',
		color: '#009966',
		fontWeight: '800',
		paddingHorizontal: 8,
		paddingVertical: 3,
	},
	searchInput: {
		backgroundColor: '#f7fafd',
		borderWidth: 1,
		borderColor: '#dce6ef',
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: '#10293e',
		marginBottom: 10,
	},
	studentCard: {
		backgroundColor: '#fbfdff',
		borderWidth: 1,
		borderColor: '#e2ebf2',
		borderRadius: 14,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginBottom: 9,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginRight: 10,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 13,
		marginRight: 10,
	},
	avatarPlaceholder: {
		width: 44,
		height: 44,
		borderRadius: 13,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e8fbf3',
		borderWidth: 1,
		borderColor: '#c5eedf',
	},
	studentTextWrap: {
		flex: 1,
	},
	studentName: {
		fontSize: 15,
		color: '#10293e',
		fontWeight: '700',
		marginBottom: 2,
	},
	studentUid: {
		fontSize: 12,
		color: '#627789',
		fontWeight: '600',
	},
	presentButton: {
		minWidth: 78,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 999,
		backgroundColor: '#009966',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	absentButton: {
		minWidth: 78,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 999,
		backgroundColor: '#e25555',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	statusButtonText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '800',
	},
});
