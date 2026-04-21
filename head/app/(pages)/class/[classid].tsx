import { RelativePathString, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CalendarCheck2, Crown, ShieldCheck, UserRound } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type StudentItem = {
	id: string;
	name: string;
	rank: string;
	position: 'HOC' | 'Assistant';
	imageUrl?: string;
};

type ClassDetails = {
	id: string;
	name: string;
	curriculumCompletion: number;
	students: StudentItem[];
};

const classes: Record<string, ClassDetails> = {
	'ss1-blue': {
		id: 'ss1-blue',
		name: 'SS1 Blue',
		curriculumCompletion: 64,
		students: [
			{ id: 'std-101', name: 'Amina Yusuf', rank: 'Captain', position: 'HOC', imageUrl: 'https://i.pravatar.cc/120?img=32' },
			{ id: 'std-102', name: 'Peter Okafor', rank: 'Prefect', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=18' },
			{ id: 'std-103', name: 'Sofia Mohammed', rank: 'Senior Member', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=47' },
		],
	},
	'ss2-gold': {
		id: 'ss2-gold',
		name: 'SS2 Gold',
		curriculumCompletion: 72,
		students: [
			{ id: 'std-001', name: 'Amara Okonkwo', rank: 'Captain', position: 'HOC', imageUrl: 'https://i.pravatar.cc/120?img=31' },
			{ id: 'std-002', name: 'Daniel Ibrahim', rank: 'Prefect', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=12' },
			{ id: 'std-003', name: 'Blessing Afolabi', rank: 'Senior Member', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=45' },
			{ id: 'std-004', name: 'Mubarak Musa', rank: 'Class Rep', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=15' },
			{ id: 'std-005', name: 'Nora Edet', rank: 'Senior Member', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=20' },
		],
	},
	'ss2-silver': {
		id: 'ss2-silver',
		name: 'SS2 Silver',
		curriculumCompletion: 57,
		students: [
			{ id: 'std-201', name: 'John Bassey', rank: 'Captain', position: 'HOC', imageUrl: 'https://i.pravatar.cc/120?img=22' },
			{ id: 'std-202', name: 'Esther Daniel', rank: 'Prefect', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=25' },
			{ id: 'std-203', name: 'Ibrahim Hassan', rank: 'Senior Member', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=27' },
		],
	},
	'ss3-red': {
		id: 'ss3-red',
		name: 'SS3 Red',
		curriculumCompletion: 81,
		students: [
			{ id: 'std-301', name: 'Uche Nnamdi', rank: 'Captain', position: 'HOC', imageUrl: 'https://i.pravatar.cc/120?img=29' },
			{ id: 'std-302', name: 'Chioma Obi', rank: 'Prefect', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=41' },
			{ id: 'std-303', name: 'Samuel Adeyemi', rank: 'Senior Member', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=36' },
		],
	},
	'jss3-green': {
		id: 'jss3-green',
		name: 'JSS3 Green',
		curriculumCompletion: 49,
		students: [
			{ id: 'std-401', name: 'Grace Ezenwa', rank: 'Captain', position: 'HOC', imageUrl: 'https://i.pravatar.cc/120?img=40' },
			{ id: 'std-402', name: 'Moses Tanko', rank: 'Prefect', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=43' },
			{ id: 'std-403', name: 'Fatima Abdullahi', rank: 'Senior Member', position: 'Assistant', imageUrl: 'https://i.pravatar.cc/120?img=48' },
		],
	},
};

export default function ClassScreen() {
	const router = useRouter();
	const params = useLocalSearchParams<{ classid?: string }>();
	const classId = Array.isArray(params.classid) ? params.classid[0] : params.classid || 'ss2-gold';
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const classDetails = classes[classId] || classes['ss2-gold'];

	const filteredStudents = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return classDetails.students;
		}

		return classDetails.students.filter((student) => {
			return (
				student.name.toLowerCase().includes(query) ||
				student.rank.toLowerCase().includes(query) ||
				student.position.toLowerCase().includes(query)
			);
		});
	}, [classDetails.students, searchQuery]);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 900);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.82} style={styles.backButton} onPress={() => router.back()}>
					<ArrowLeft size={18} color="#13293d" strokeWidth={2.4} />
					<Text style={styles.backButtonText}>Back</Text>
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={0.82}
					style={styles.attendanceButton}
						onPress={() => router.push({ pathname: '/(pages)/attendance', params: { classid: classDetails.id } })}
				>
					<CalendarCheck2 size={18} color="#fff" strokeWidth={2.2} />
					<Text style={styles.attendanceButtonText}>Attendance</Text>
				</TouchableOpacity>
			</View>

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#009966" colors={['#009966']} />
				}
			>
				<View style={styles.classCard}>
					<Text style={styles.classLabel}>Class Name</Text>
					<Text style={styles.className}>{classDetails.name}</Text>

					<View style={styles.progressHeaderRow}>
						<Text style={styles.progressLabel}>Curriculum completion:</Text>
						<Text style={styles.progressPercent}>{classDetails.curriculumCompletion}%</Text>
					</View>
					<View style={styles.progressTrack}>
						<View style={[styles.progressFill, { width: `${classDetails.curriculumCompletion}%` }]} />
					</View>
				</View>

				<View style={styles.studentsSection}>
					<View style={styles.studentsHeaderRow}>
						<Text style={styles.studentsTitle}>Students</Text>
						<Text style={styles.studentsCount}>{filteredStudents.length}</Text>
					</View>

					<TextInput
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Search by name, rank or position"
						placeholderTextColor="#7a8b9b"
						style={styles.searchInput}
					/>

					{filteredStudents.map((student) => (
						<TouchableOpacity
							key={student.id}
							activeOpacity={0.84}
							style={styles.studentCard}
							onPress={() => router.push(`/student/${student.id}` as RelativePathString)}
						>
							<View style={styles.leftRow}>
								{student.imageUrl ? (
									<Image source={{ uri: student.imageUrl }} style={styles.avatar} />
								) : (
									<View style={styles.avatarFallback}>
										<UserRound size={20} color="#009966" strokeWidth={2.3} />
									</View>
								)}

								<View style={styles.studentTextWrap}>
									<Text style={styles.studentName}>{student.name}</Text>
									<Text style={styles.studentRank}>Rank: {student.rank}</Text>
								</View>
							</View>

							<View style={student.position === 'HOC' ? styles.hocPill : styles.assistantPill}>
								{student.position === 'HOC' ? (
									<Crown size={13} color="#fff" strokeWidth={2.1} />
								) : (
									<ShieldCheck size={13} color="#fff" strokeWidth={2.1} />
								)}
								<Text style={styles.positionText}>{student.position}</Text>
							</View>
						</TouchableOpacity>
					))}
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
	attendanceButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#009966',
		borderRadius: 11,
		paddingHorizontal: 11,
		paddingVertical: 9,
	},
	attendanceButtonText: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '800',
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
		marginBottom: 14,
		shadowColor: '#009966',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
	},
	classLabel: {
		fontSize: 13,
		color: '#5f7082',
		marginBottom: 4,
		fontWeight: '600',
	},
	className: {
		fontSize: 26,
		color: '#0f2a41',
		fontWeight: '800',
		marginBottom: 16,
	},
	progressHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	progressLabel: {
		fontSize: 14,
		color: '#2f3f4e',
		fontWeight: '600',
	},
	progressPercent: {
		fontSize: 14,
		color: '#009966',
		fontWeight: '800',
	},
	progressTrack: {
		height: 10,
		borderRadius: 999,
		backgroundColor: '#e6edf3',
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		backgroundColor: '#009966',
		borderRadius: 999,
	},
	studentsSection: {
		backgroundColor: '#fff',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#e1eaf1',
		padding: 14,
	},
	studentsHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	studentsTitle: {
		fontSize: 20,
		color: '#1a2f44',
		fontWeight: '800',
	},
	studentsCount: {
		minWidth: 28,
		textAlign: 'center',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 999,
		backgroundColor: '#e8fbf3',
		color: '#009966',
		fontWeight: '800',
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
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginBottom: 9,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	leftRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginRight: 10,
	},
	avatar: {
		width: 46,
		height: 46,
		borderRadius: 14,
		marginRight: 10,
	},
	avatarFallback: {
		width: 46,
		height: 46,
		borderRadius: 14,
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
	studentRank: {
		fontSize: 12,
		color: '#627789',
		fontWeight: '600',
	},
	hocPill: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		borderRadius: 999,
		backgroundColor: '#009966',
		paddingHorizontal: 8,
		paddingVertical: 5,
	},
	assistantPill: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		borderRadius: 999,
		backgroundColor: '#2f80ed',
		paddingHorizontal: 8,
		paddingVertical: 5,
	},
	positionText: {
		color: '#fff',
		fontSize: 11,
		fontWeight: '800',
	},
});
