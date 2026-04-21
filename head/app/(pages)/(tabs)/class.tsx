import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ClassItem = {
	id: string;
	name: string;
	curriculumCompletion: number;
	studentCount: number;
	classTeacher: string;
};

const classes: ClassItem[] = [
	{
		id: 'ss1-blue',
		name: 'SS1 Blue',
		curriculumCompletion: 64,
		studentCount: 29,
		classTeacher: 'Mrs. Fatima Bello',
	},
	{
		id: 'ss2-gold',
		name: 'SS2 Gold',
		curriculumCompletion: 72,
		studentCount: 31,
		classTeacher: 'Mr. Chidi Okechukwu',
	},
	{
		id: 'ss2-silver',
		name: 'SS2 Silver',
		curriculumCompletion: 57,
		studentCount: 27,
		classTeacher: 'Mrs. Grace Johnson',
	},
	{
		id: 'ss3-red',
		name: 'SS3 Red',
		curriculumCompletion: 81,
		studentCount: 24,
		classTeacher: 'Mr. Emeka Nwafor',
	},
	{
		id: 'jss3-green',
		name: 'JSS3 Green',
		curriculumCompletion: 49,
		studentCount: 34,
		classTeacher: 'Ms. Adesuwa Eghosa',
	},
];



export default function ClassScreen() {
	const router = useRouter();
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredClasses = classes.filter((classItem) => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return true;
		}

		return (
			classItem.name.toLowerCase().includes(query) ||
			classItem.classTeacher.toLowerCase().includes(query)
		);
	});

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 900);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#009966"
						colors={['#009966']}
					/>
				}
			>
				<View style={styles.classesSection}>
					<View style={styles.classesHeaderRow}>
						<Text style={styles.classesTitle}>Classes</Text>
						<Text style={styles.classesCount}>{filteredClasses.length}</Text>
					</View>

					<TextInput
						value={searchQuery}
						onChangeText={setSearchQuery}
						placeholder="Search by class name or teacher"
						placeholderTextColor="#7a8b9b"
						style={styles.searchInput}
					/>

					{filteredClasses.map((classItem) => (
						<TouchableOpacity
							key={classItem.id}
							activeOpacity={0.84}
							style={styles.classCard}
							onPress={() => router.push(`/class/${classItem.id}` as RelativePathString)}
						>
							<Text style={styles.classLabel}>Class Name</Text>
							<Text style={styles.className}>{classItem.name}</Text>

							<View style={styles.classMetaRow}>
								<Text style={styles.classMetaText}>Teacher: {classItem.classTeacher}</Text>
								<Text style={styles.classMetaText}>Students: {classItem.studentCount}</Text>
							</View>

							<View style={styles.progressHeaderRow}>
								<Text style={styles.progressLabel}>Curriculum completion:</Text>
								<Text style={styles.progressPercent}>{classItem.curriculumCompletion}%</Text>
							</View>
							<View style={styles.progressTrack}>
								<View
									style={[
										styles.progressFill,
										{ width: `${classItem.curriculumCompletion}%` },
									]}
								/>
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
	content: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 28,
	},
	classesSection: {
		backgroundColor: '#fff',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#e1eaf1',
		padding: 14,
	},
	classesHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	classesTitle: {
		fontSize: 20,
		color: '#1a2f44',
		fontWeight: '800',
	},
	classesCount: {
		minWidth: 28,
		textAlign: 'center',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 999,
		backgroundColor: '#e8fbf3',
		color: '#009966',
		fontWeight: '800',
	},
	classCard: {
		backgroundColor: '#fbfdff',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#e2ebf2',
		paddingHorizontal: 12,
		paddingVertical: 12,
		marginBottom: 9,
		shadowColor: '#009966',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 6,
		elevation: 1,
	},
	classLabel: {
		fontSize: 13,
		color: '#5f7082',
		marginBottom: 4,
		fontWeight: '600',
	},
	className: {
		fontSize: 23,
		color: '#0f2a41',
		fontWeight: '800',
		marginBottom: 8,
	},
	classMetaRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		gap: 8,
	},
	classMetaText: {
		fontSize: 12,
		color: '#627789',
		fontWeight: '600',
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
});
