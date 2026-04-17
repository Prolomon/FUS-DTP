import React, { useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AttendanceStatus = 'present' | 'absent';

type StudentItem = {
	id: string;
	name: string;
	uid: string;
	imageUrl?: string;
};

const students: StudentItem[] = [
	{ id: 'std-001', name: 'Amara Okonkwo', uid: 'UID-2026-001', imageUrl: 'https://i.pravatar.cc/120?img=31' },
	{ id: 'std-002', name: 'Daniel Ibrahim', uid: 'UID-2026-002', imageUrl: 'https://i.pravatar.cc/120?img=12' },
	{ id: 'std-003', name: 'Blessing Afolabi', uid: 'UID-2026-003', imageUrl: 'https://i.pravatar.cc/120?img=45' },
	{ id: 'std-004', name: 'Mubarak Musa', uid: 'UID-2026-004', imageUrl: 'https://i.pravatar.cc/120?img=15' },
	{ id: 'std-005', name: 'Nora Edet', uid: 'UID-2026-005', imageUrl: 'https://i.pravatar.cc/120?img=20' },
];

const initialStatus: Record<string, AttendanceStatus> = {
	'std-001': 'present',
	'std-002': 'present',
	'std-003': 'absent',
	'std-004': 'present',
	'std-005': 'absent',
};

export default function AttendanceScreen() {
	const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>(initialStatus);
	const [searchQuery, setSearchQuery] = useState('');

	const presentCount = useMemo(
		() => Object.values(attendanceMap).filter((status) => status === 'present').length,
		[attendanceMap],
	);

	const absentCount = students.length - presentCount;

	const filteredStudents = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return students;
		}

		return students.filter(
			(student) => student.name.toLowerCase().includes(query) || student.uid.toLowerCase().includes(query),
		);
	}, [searchQuery]);

	const markAttendance = (student: StudentItem, status: AttendanceStatus) => {
		setAttendanceMap((current) => ({ ...current, [student.id]: status }));
		Alert.alert(
			'Attendance Updated',
			`${student.name} has been marked ${status === 'present' ? 'Present' : 'Absent'}.`,
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                <View>
                    <Text style={{ fontSize: 28, color: '#10293e', fontWeight: '800', marginBottom: 8 }}>
                        Attendance
                    </Text>
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
						const status = attendanceMap[student.id];
						return (
							<View key={student.id} style={styles.studentCard}>
								<View style={styles.leftSection}>
									{student.imageUrl ? (
										<Image source={{ uri: student.imageUrl }} style={styles.avatar} />
									) : (
										<View style={styles.avatarPlaceholder} />
									)}

									<View style={styles.studentTextWrap}>
										<Text style={styles.studentName}>{student.name}</Text>
										<Text style={styles.studentUid}>{student.uid}</Text>
									</View>
								</View>

								<View style={styles.actionsWrap}>
									<TouchableOpacity
										activeOpacity={0.85}
										style={[styles.presentButton, status === 'present' && styles.presentButtonActive]}
										onPress={() => markAttendance(student, 'present')}
									>
										<Text style={[styles.presentButtonText, status === 'present' && styles.activeButtonText]}>Present</Text>
									</TouchableOpacity>

									<TouchableOpacity
										activeOpacity={0.85}
										style={[styles.absentButton, status === 'absent' && styles.absentButtonActive]}
										onPress={() => markAttendance(student, 'absent')}
									>
										<Text style={[styles.absentButtonText, status === 'absent' && styles.activeButtonText]}>Absent</Text>
									</TouchableOpacity>
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
	content: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 28,
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
		backgroundColor: '#e7edf3',
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
	actionsWrap: {
		flexDirection: 'row',
		gap: 6,
	},
	presentButton: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#c6eedf',
		backgroundColor: '#effcf6',
		paddingHorizontal: 9,
		paddingVertical: 7,
	},
	presentButtonActive: {
		backgroundColor: '#009966',
		borderColor: '#009966',
	},
	presentButtonText: {
		fontSize: 12,
		color: '#0b7656',
		fontWeight: '700',
	},
	absentButton: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ffd8d8',
		backgroundColor: '#fff5f5',
		paddingHorizontal: 9,
		paddingVertical: 7,
	},
	absentButtonActive: {
		backgroundColor: '#ef4444',
		borderColor: '#ef4444',
	},
	absentButtonText: {
		fontSize: 12,
		color: '#b63030',
		fontWeight: '700',
	},
	activeButtonText: {
		color: '#fff',
	},
});
