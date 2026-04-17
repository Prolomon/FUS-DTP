import React, { useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchField = 'uid' | 'admissionNo' | 'name';

type SubjectResult = {
	subject: string;
	firstAssessment: number;
	secondAssessment: number;
	thirdAssessment: number;
	midTerm: number;
	exam: number;
	grade: string;
};

type StudentReport = {
	uid: string;
	admissionNo: string;
	name: string;
	className: string;
	parentName: string;
	parentEmail: string;
	rank: string;
	rating: number;
	position: string;
	remark: string;
	teacherName: string;
	teacherSignature: string;
	avatarUrl: string;
	subjects: SubjectResult[];
};

const tempReports: StudentReport[] = [
	{
		uid: 'UID-2026-001',
		admissionNo: 'SIS/2026/001',
		name: 'Amara Okonkwo',
		className: 'SS2 Gold',
		parentName: 'Mr. Emeka Okonkwo',
		parentEmail: 'emeka.okonkwo@example.com',
		rank: '4th',
		rating: 87,
		position: '4 / 38',
		remark: 'Excellent consistency. Keep it up.',
		teacherName: 'Mrs. I. Daniel',
		teacherSignature: 'I. Daniel',
		avatarUrl: 'https://i.pravatar.cc/120?img=31',
		subjects: [
			{ subject: 'Mathematics', firstAssessment: 14, secondAssessment: 16, thirdAssessment: 15, midTerm: 18, exam: 20, grade: 'A' },
			{ subject: 'English', firstAssessment: 12, secondAssessment: 14, thirdAssessment: 15, midTerm: 16, exam: 19, grade: 'A' },
			{ subject: 'Biology', firstAssessment: 11, secondAssessment: 13, thirdAssessment: 14, midTerm: 16, exam: 18, grade: 'B' },
		],
	},
	{
		uid: 'UID-2026-002',
		admissionNo: 'SIS/2026/002',
		name: 'Daniel Ibrahim',
		className: 'SS2 Gold',
		parentName: 'Mrs. Hadiza Ibrahim',
		parentEmail: 'hadiza.ibrahim@example.com',
		rank: '9th',
		rating: 79,
		position: '9 / 38',
		remark: 'Good work. Improve exam focus.',
		teacherName: 'Mrs. I. Daniel',
		teacherSignature: 'I. Daniel',
		avatarUrl: 'https://i.pravatar.cc/120?img=12',
		subjects: [
			{ subject: 'Mathematics', firstAssessment: 12, secondAssessment: 13, thirdAssessment: 13, midTerm: 15, exam: 17, grade: 'B' },
			{ subject: 'English', firstAssessment: 11, secondAssessment: 12, thirdAssessment: 13, midTerm: 14, exam: 16, grade: 'B' },
			{ subject: 'Chemistry', firstAssessment: 10, secondAssessment: 11, thirdAssessment: 12, midTerm: 13, exam: 16, grade: 'C' },
		],
	},
	{
		uid: 'UID-2026-003',
		admissionNo: 'SIS/2026/003',
		name: 'Blessing Afolabi',
		className: 'SS2 Gold',
		parentName: 'Mr. Kayode Afolabi',
		parentEmail: 'kayode.afolabi@example.com',
		rank: '2nd',
		rating: 92,
		position: '2 / 38',
		remark: 'Outstanding performance.',
		teacherName: 'Mrs. I. Daniel',
		teacherSignature: 'I. Daniel',
		avatarUrl: 'https://i.pravatar.cc/120?img=45',
		subjects: [
			{ subject: 'Mathematics', firstAssessment: 15, secondAssessment: 16, thirdAssessment: 16, midTerm: 18, exam: 20, grade: 'A' },
			{ subject: 'English', firstAssessment: 14, secondAssessment: 15, thirdAssessment: 16, midTerm: 17, exam: 19, grade: 'A' },
			{ subject: 'Physics', firstAssessment: 13, secondAssessment: 15, thirdAssessment: 15, midTerm: 17, exam: 19, grade: 'A' },
		],
	},
	{
		uid: 'UID-2026-004',
		admissionNo: 'SIS/2026/004',
		name: 'Mubarak Musa',
		className: 'SS2 Gold',
		parentName: 'Mrs. Zainab Musa',
		parentEmail: 'zainab.musa@example.com',
		rank: '15th',
		rating: 71,
		position: '15 / 38',
		remark: 'Showing growth. Practice more.',
		teacherName: 'Mrs. I. Daniel',
		teacherSignature: 'I. Daniel',
		avatarUrl: 'https://i.pravatar.cc/120?img=15',
		subjects: [
			{ subject: 'Mathematics', firstAssessment: 9, secondAssessment: 12, thirdAssessment: 12, midTerm: 14, exam: 16, grade: 'C' },
			{ subject: 'English', firstAssessment: 10, secondAssessment: 11, thirdAssessment: 12, midTerm: 13, exam: 15, grade: 'C' },
			{ subject: 'Government', firstAssessment: 11, secondAssessment: 12, thirdAssessment: 12, midTerm: 14, exam: 17, grade: 'B' },
		],
	},
	{
		uid: 'UID-2026-005',
		admissionNo: 'SIS/2026/005',
		name: 'Nora Edet',
		className: 'SS2 Gold',
		parentName: 'Mr. Eyo Edet',
		parentEmail: 'eyo.edet@example.com',
		rank: '6th',
		rating: 84,
		position: '6 / 38',
		remark: 'Very good. Keep aiming higher.',
		teacherName: 'Mrs. I. Daniel',
		teacherSignature: 'I. Daniel',
		avatarUrl: 'https://i.pravatar.cc/120?img=20',
		subjects: [
			{ subject: 'Mathematics', firstAssessment: 12, secondAssessment: 14, thirdAssessment: 14, midTerm: 16, exam: 18, grade: 'B' },
			{ subject: 'English', firstAssessment: 13, secondAssessment: 14, thirdAssessment: 14, midTerm: 15, exam: 18, grade: 'B' },
			{ subject: 'Economics', firstAssessment: 12, secondAssessment: 13, thirdAssessment: 14, midTerm: 16, exam: 19, grade: 'A' },
		],
	},
];

const searchOptions: { label: string; value: SearchField }[] = [
	{ label: 'UID', value: 'uid' },
	{ label: 'Admission No', value: 'admissionNo' },
	{ label: 'Name', value: 'name' },
];

export default function ResultScreen() {
	const [searchBy, setSearchBy] = useState<SearchField>('uid');
	const [searchQuery, setSearchQuery] = useState('');

	const foundReport = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return null;
		}

		return (
			tempReports.find((report) => {
				const target = String(report[searchBy]).toLowerCase();
				return target.includes(query);
			}) || null
		);
	}, [searchBy, searchQuery]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.searchCard}>
					<Text style={styles.searchTitle}>Find Student Result</Text>
					<Text style={styles.searchLabel}>Search By</Text>

					<View style={styles.selectRow}>
						{searchOptions.map((option) => (
							<TouchableOpacity
								key={option.value}
								activeOpacity={0.84}
								onPress={() => setSearchBy(option.value)}
								style={[styles.selectChip, searchBy === option.value && styles.selectChipActive]}
							>
								<Text style={[styles.selectChipText, searchBy === option.value && styles.selectChipTextActive]}>
									{option.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					<TextInput
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder={`Enter ${searchBy === 'uid' ? 'UID' : searchBy === 'admissionNo' ? 'Admission No' : 'Name'}`}
						placeholderTextColor="#7a8b9b"
						style={styles.searchInput}
					/>
				</View>

				{searchQuery.trim().length > 0 && !foundReport && (
					<View style={styles.emptyCard}>
						<Text style={styles.emptyText}>No result found for the current search.</Text>
					</View>
				)}

				{foundReport && (
					<View style={styles.reportCard}>
						<View style={styles.studentHeaderRow}>
							<Image source={{ uri: foundReport.avatarUrl }} style={styles.avatar} />
							<View style={styles.studentInfoWrap}>
								<Text style={styles.studentName}>{foundReport.name}</Text>
								<Text style={styles.studentMeta}>Class: {foundReport.className}</Text>
								<Text style={styles.studentMeta}>Parent: {foundReport.parentName}</Text>
								<Text style={styles.studentMeta}>Parent Email: {foundReport.parentEmail}</Text>
							</View>
							<View style={styles.rankPill}>
								<Text style={styles.rankPillLabel}>Rank</Text>
								<Text style={styles.rankPillValue}>{foundReport.rank}</Text>
							</View>
						</View>

						<ScrollView
							horizontal
							nestedScrollEnabled
							directionalLockEnabled
							showsHorizontalScrollIndicator
							contentContainerStyle={styles.tableScrollWrap}
						>
							<View style={styles.tableInner}>
								<View style={[styles.tableRow, styles.tableHeader]}>
									<Text style={[styles.tableCell, styles.subjectCell, styles.tableHeaderText]}>Subjects</Text>
									<Text style={[styles.tableCell, styles.tableHeaderText]}>First</Text>
									<Text style={[styles.tableCell, styles.tableHeaderText]}>Second</Text>
									<Text style={[styles.tableCell, styles.tableHeaderText]}>Third</Text>
									<Text style={[styles.tableCell, styles.tableHeaderText]}>Mid Term</Text>
									<Text style={[styles.tableCell, styles.tableHeaderText]}>Exam</Text>
									<Text style={[styles.tableCell, styles.tableHeaderText]}>Grade (A-F)</Text>
								</View>

								{foundReport.subjects.map((row, index) => (
									<View key={`${row.subject}-${index}`} style={styles.tableRow}>
										<Text style={[styles.tableCell, styles.subjectCell]}>{row.subject}</Text>
										<Text style={styles.tableCell}>{row.firstAssessment}</Text>
										<Text style={styles.tableCell}>{row.secondAssessment}</Text>
										<Text style={styles.tableCell}>{row.thirdAssessment}</Text>
										<Text style={styles.tableCell}>{row.midTerm}</Text>
										<Text style={styles.tableCell}>{row.exam}</Text>
										<Text style={styles.tableCell}>{row.grade}</Text>
									</View>
								))}
							</View>
						</ScrollView>

						<View style={styles.summaryBlock}>
							<Text style={styles.summaryText}>Student Rating: {foundReport.rating} %</Text>
							<Text style={styles.summaryText}>Position: {foundReport.position}</Text>
							<Text style={styles.summaryText}>Remark: {foundReport.remark}</Text>
							<Text style={styles.summaryText}>Teacher Signature: {foundReport.teacherSignature}</Text>
							<Text style={styles.summaryText}>Teacher Name: {foundReport.teacherName}</Text>
						</View>

						<View style={styles.actionsRow}>
							<TouchableOpacity
								style={styles.downloadButton}
								onPress={() => Alert.alert('Download', 'Result downloaded successfully (demo).')}
								activeOpacity={0.85}
							>
								<Text style={styles.actionButtonText}>Download</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.sendButton}
								onPress={() => Alert.alert('Send to Parent', `Result sent to ${foundReport.parentEmail} (demo).`)}
								activeOpacity={0.85}
							>
								<Text style={styles.actionButtonText}>Send To Parent</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
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
	searchCard: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#e2ebf3',
		borderRadius: 18,
		padding: 14,
		marginBottom: 12,
	},
	searchTitle: {
		fontSize: 20,
		color: '#1a2f44',
		fontWeight: '800',
		marginBottom: 10,
	},
	searchLabel: {
		fontSize: 13,
		color: '#4f6477',
		fontWeight: '600',
		marginBottom: 7,
	},
	selectRow: {
		flexDirection: 'row',
		gap: 8,
		marginBottom: 10,
		flexWrap: 'wrap',
	},
	selectChip: {
		borderWidth: 1,
		borderColor: '#d7e1ea',
		borderRadius: 999,
		paddingHorizontal: 10,
		paddingVertical: 6,
		backgroundColor: '#f7fafd',
	},
	selectChipActive: {
		backgroundColor: '#009966',
		borderColor: '#009966',
	},
	selectChipText: {
		color: '#32485b',
		fontSize: 12,
		fontWeight: '700',
	},
	selectChipTextActive: {
		color: '#fff',
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
	},
	emptyCard: {
		backgroundColor: '#fff1f1',
		borderWidth: 1,
		borderColor: '#ffd8d8',
		borderRadius: 14,
		padding: 12,
		marginBottom: 12,
	},
	emptyText: {
		color: '#b63030',
		fontWeight: '700',
		fontSize: 13,
	},
	reportCard: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#e2ebf3',
		borderRadius: 18,
		padding: 14,
	},
	studentHeaderRow: {
		flexDirection: 'row',
		marginBottom: 12,
		alignItems: 'center',
	},
	avatar: {
		width: 62,
		height: 62,
		borderRadius: 18,
		marginRight: 10,
	},
	studentInfoWrap: {
		flex: 1,
	},
	studentName: {
		fontSize: 18,
		color: '#0f2a41',
		fontWeight: '800',
		marginBottom: 3,
	},
	studentMeta: {
		fontSize: 12,
		color: '#5a7083',
		fontWeight: '600',
	},
	rankPill: {
		borderRadius: 12,
		backgroundColor: '#e8fbf3',
		borderWidth: 1,
		borderColor: '#c8efdf',
		paddingHorizontal: 10,
		paddingVertical: 8,
		minWidth: 60,
		alignItems: 'center',
	},
	rankPillLabel: {
		color: '#4f6477',
		fontSize: 11,
		fontWeight: '700',
	},
	rankPillValue: {
		color: '#009966',
		fontSize: 15,
		fontWeight: '800',
	},
	tableScrollWrap: {
		paddingBottom: 4,
	},
	tableInner: {
		minWidth: 760,
	},
	tableRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#edf2f7',
		backgroundColor: '#fff',
	},
	tableHeader: {
		backgroundColor: '#eef6ff',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	tableCell: {
		width: 80,
		paddingVertical: 10,
		paddingHorizontal: 8,
		fontSize: 12,
		color: '#1f3347',
		fontWeight: '600',
	},
	subjectCell: {
		width: 120,
		fontWeight: '700',
	},
	tableHeaderText: {
		color: '#0f2a41',
		fontWeight: '800',
		fontSize: 11,
	},
	summaryBlock: {
		marginTop: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#e5edf4',
		backgroundColor: '#fbfdff',
		padding: 10,
		gap: 4,
	},
	summaryText: {
		fontSize: 13,
		color: '#2d4358',
		fontWeight: '600',
	},
	actionsRow: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 12,
	},
	downloadButton: {
		flex: 1,
		backgroundColor: '#009966',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 11,
	},
	sendButton: {
		flex: 1,
		backgroundColor: '#2f80ed',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 11,
	},
	actionButtonText: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '800',
	},
});
