import React, { useMemo, useState } from 'react';
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

const reportTypes = ['Security', 'Attendance', 'Discipline', 'Medical', 'Maintenance'] as const;
const priorities = ['Low', 'Medium', 'High'] as const;

type ReportType = (typeof reportTypes)[number];
type ReportPriority = (typeof priorities)[number];

export default function ReportScreen() {
	const [title, setTitle] = useState('');
	const [studentId, setStudentId] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [reportType, setReportType] = useState<ReportType>('Security');
	const [priority, setPriority] = useState<ReportPriority>('Medium');

	const canSubmit = useMemo(() => {
		return !!title.trim() && !!location.trim() && !!description.trim();
	}, [title, location, description]);

	const resetForm = () => {
		setTitle('');
		setStudentId('');
		setLocation('');
		setDescription('');
		setReportType('Security');
		setPriority('Medium');
	};

	const submitReport = () => {
		if (!canSubmit) {
			Alert.alert('Missing Information', 'Please fill title, location, and report details.');
			return;
		}

		const payload = {
			title: title.trim(),
			studentId: studentId.trim() || 'N/A',
			location: location.trim(),
			reportType,
			priority,
			description: description.trim(),
			createdAt: new Date().toISOString(),
		};

		Alert.alert('Report Submitted', `Type: ${payload.reportType}\nPriority: ${payload.priority}\nTitle: ${payload.title}`);
		resetForm();
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Make Report</Text>
				<Text style={styles.subtitle}>Create and send an incident report.</Text>

				<View style={styles.card}>
					<Text style={styles.label}>Report Title</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. Student picked up by wrong person"
						placeholderTextColor="#7a8b9b"
						value={title}
						onChangeText={setTitle}
					/>

					<Text style={styles.label}>Student ID (Optional)</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. STU-0241"
						placeholderTextColor="#7a8b9b"
						value={studentId}
						onChangeText={setStudentId}
						autoCapitalize="characters"
					/>

					<Text style={styles.label}>Location</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g. Main Gate"
						placeholderTextColor="#7a8b9b"
						value={location}
						onChangeText={setLocation}
					/>

					<Text style={styles.label}>Report Type</Text>
					<View style={styles.chipRow}>
						{reportTypes.map((type) => {
							const active = reportType === type;
							return (
								<TouchableOpacity
									key={type}
									activeOpacity={0.85}
									style={[styles.chip, active && styles.chipActive]}
									onPress={() => setReportType(type)}
								>
									<Text style={[styles.chipText, active && styles.chipTextActive]}>{type}</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<Text style={styles.label}>Priority</Text>
					<View style={styles.priorityRow}>
						{priorities.map((value) => {
							const active = priority === value;
							return (
								<TouchableOpacity
									key={value}
									activeOpacity={0.85}
									style={[styles.priorityButton, active && styles.priorityButtonActive]}
									onPress={() => setPriority(value)}
								>
									<Text style={[styles.priorityButtonText, active && styles.priorityButtonTextActive]}>{value}</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<Text style={styles.label}>Report Details</Text>
					<TextInput
						style={styles.textArea}
						placeholder="Explain exactly what happened..."
						placeholderTextColor="#7a8b9b"
						value={description}
						onChangeText={setDescription}
						multiline
						textAlignVertical="top"
					/>
				</View>

				<View style={styles.actionsRow}>
					<TouchableOpacity activeOpacity={0.85} style={styles.resetButton} onPress={resetForm}>
						<Text style={styles.resetButtonText}>Clear</Text>
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.85}
						style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
						onPress={submitReport}
					>
						<Text style={styles.submitButtonText}>Submit Report</Text>
					</TouchableOpacity>
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
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: '#5e7388',
		marginBottom: 12,
	},
	card: {
		backgroundColor: '#fff',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#d9e5ef',
		padding: 14,
	},
	label: {
		fontSize: 13,
		color: '#1f364c',
		fontWeight: '700',
		marginBottom: 6,
		marginTop: 6,
	},
	input: {
		backgroundColor: '#f7fafd',
		borderWidth: 1,
		borderColor: '#dce6ef',
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 11,
		fontSize: 14,
		color: '#10293e',
	},
	chipRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginBottom: 4,
	},
	chip: {
		backgroundColor: '#f4f8fc',
		borderWidth: 1,
		borderColor: '#dbe7f1',
		borderRadius: 999,
		paddingHorizontal: 12,
		paddingVertical: 7,
	},
	chipActive: {
		backgroundColor: '#e8fbf3',
		borderColor: '#b9e9d4',
	},
	chipText: {
		color: '#455d72',
		fontSize: 13,
		fontWeight: '700',
	},
	chipTextActive: {
		color: '#009966',
	},
	priorityRow: {
		flexDirection: 'row',
		gap: 8,
		marginBottom: 4,
	},
	priorityButton: {
		flex: 1,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#dbe7f1',
		backgroundColor: '#f4f8fc',
		alignItems: 'center',
		paddingVertical: 9,
	},
	priorityButtonActive: {
		backgroundColor: '#e8fbf3',
		borderColor: '#b9e9d4',
	},
	priorityButtonText: {
		fontSize: 13,
		fontWeight: '700',
		color: '#455d72',
	},
	priorityButtonTextActive: {
		color: '#009966',
	},
	textArea: {
		minHeight: 120,
		backgroundColor: '#f7fafd',
		borderWidth: 1,
		borderColor: '#dce6ef',
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: '#10293e',
	},
	actionsRow: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 12,
	},
	resetButton: {
		flex: 1,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#d5e0ea',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
	},
	resetButtonText: {
		color: '#2d455b',
		fontWeight: '700',
		fontSize: 14,
	},
	submitButton: {
		flex: 2,
		borderRadius: 12,
		backgroundColor: '#009966',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
	},
	submitButtonDisabled: {
		opacity: 0.55,
	},
	submitButtonText: {
		color: '#fff',
		fontWeight: '800',
		fontSize: 14,
	},
});
