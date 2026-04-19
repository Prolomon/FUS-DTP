import { RelativePathString, useRouter } from 'expo-router';
import { ArrowRight, Receipt, Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DueCard = {
	id: string;
	title: string;
	amount: number;
	dueDate: string;
};

type PaymentRecord = {
	id: string;
	title: string;
	amount: number;
	date: string;
	method: string;
	status: 'Paid' | 'Pending';
};

const schoolFeeAmount = 125000;

const otherDues: DueCard[] = [
	{ id: 'due-transport-2026-01', title: 'Transport Fee', amount: 30000, dueDate: 'Apr 25, 2026' },
	{ id: 'due-uniform-2026-01', title: 'Uniform Balance', amount: 18000, dueDate: 'Apr 30, 2026' },
	{ id: 'due-activity-2026-01', title: 'Activity Levy', amount: 9500, dueDate: 'May 05, 2026' },
];

const paymentRecords: PaymentRecord[] = [
	{ id: 'pay-1062', title: 'School Fee - Term 2', amount: 125000, date: 'Apr 10, 2026', method: 'Bank Transfer', status: 'Paid' },
	{ id: 'pay-1038', title: 'Transport Fee - March', amount: 30000, date: 'Mar 28, 2026', method: 'Card', status: 'Paid' },
	{ id: 'pay-0994', title: 'Examination Levy', amount: 12000, date: 'Mar 02, 2026', method: 'USSD', status: 'Paid' },
	{ id: 'pay-0960', title: 'PTA Dues', amount: 7000, date: 'Feb 18, 2026', method: 'Card', status: 'Paid' },
];

const currency = (value: number) =>
	new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
		maximumFractionDigits: 0,
	}).format(value);

export default function PaymentScreen() {
	const router = useRouter();
	const [query, setQuery] = useState('');

	const filteredRecords = useMemo(() => {
		if (!query.trim()) {
			return paymentRecords;
		}

		const value = query.toLowerCase();
		return paymentRecords.filter(
			(record) =>
				record.id.toLowerCase().includes(value) ||
				record.title.toLowerCase().includes(value) ||
				record.date.toLowerCase().includes(value) ||
				record.method.toLowerCase().includes(value),
		);
	}, [query]);

	const openPayment = (paymentId: string) => {
		router.push(`/payments/${paymentId}` as RelativePathString);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.screenTitle}>Payments</Text>
				<Text style={styles.subtitle}>Manage school fees, dues, and receipts in one place.</Text>

				<View style={styles.schoolFeeCard}>
					<View>
						<Text style={styles.cardLabel}>School Fee Amount</Text>
						<Text style={styles.amountText}>{currency(schoolFeeAmount)}</Text>
						<Text style={styles.metaText}>Outstanding for current term</Text>
					</View>

					<Pressable style={styles.primaryButton}>
						<Text style={styles.primaryButtonText}>Pay School Fee</Text>
					</Pressable>
				</View>

				<Text style={styles.sectionTitle}>Other Dues</Text>
				{otherDues.map((due) => (
					<View key={due.id} style={styles.dueCard}>
						<View style={styles.dueTopRow}>
							<Text style={styles.dueTitle}>{due.title}</Text>
							<Text style={styles.dueAmount}>{currency(due.amount)}</Text>
						</View>
						<Text style={styles.dueDate}>Due date: {due.dueDate}</Text>

						<Pressable style={styles.secondaryButton}>
							<Text style={styles.secondaryButtonText}>Pay Now</Text>
						</Pressable>
					</View>
				))}

				<Text style={styles.sectionTitle}>Payment Records</Text>
				<View style={styles.searchWrap}>
					<Search size={18} color="#667085" />
					<TextInput
						value={query}
						onChangeText={setQuery}
						placeholder="Search by payment ID, date, title, or method"
						placeholderTextColor="#8a95a5"
						style={styles.searchInput}
					/>
				</View>

				{filteredRecords.length === 0 ? (
					<View style={styles.emptyCard}>
						<Text style={styles.emptyTitle}>No payment found</Text>
						<Text style={styles.emptyText}>Try another search term.</Text>
					</View>
				) : (
					filteredRecords.map((record) => (
						<Pressable key={record.id} style={styles.recordCard} onPress={() => openPayment(record.id)}>
							<View style={styles.recordIcon}>
								<Receipt size={18} color="#009966" />
							</View>

							<View style={styles.recordInfo}>
								<Text style={styles.recordTitle}>{record.title}</Text>
								<Text style={styles.recordMeta}>
									{record.id} • {record.date} • {record.method}
								</Text>
								<View style={styles.recordFooter}>
									<Text style={styles.recordAmount}>{currency(record.amount)}</Text>
									<Text style={styles.recordStatus}>{record.status}</Text>
								</View>
							</View>

							<ArrowRight size={18} color="#7b8794" />
						</Pressable>
					))
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'ghostwhite',
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 12,
		paddingBottom: 24,
	},
	screenTitle: {
		fontSize: 28,
		fontWeight: '800',
		color: '#102536',
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: '#5f7385',
		marginBottom: 14,
	},
	schoolFeeCard: {
		backgroundColor: '#009966',
		borderRadius: 18,
		padding: 16,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: '#009966',
	},
	cardLabel: {
		color: '#d4f6ea',
		fontSize: 12,
		fontWeight: '700',
		marginBottom: 4,
	},
	amountText: {
		color: '#fff',
		fontSize: 30,
		fontWeight: '800',
		marginBottom: 2,
	},
	metaText: {
		color: '#d4f6ea',
		fontSize: 12,
		marginBottom: 14,
	},
	primaryButton: {
		backgroundColor: '#f3fff8',
		paddingVertical: 12,
		borderRadius: 12,
		alignItems: 'center',
	},
	primaryButtonText: {
		color: '#08644d',
		fontWeight: '800',
		fontSize: 14,
	},
	sectionTitle: {
		color: '#102536',
		fontSize: 18,
		fontWeight: '800',
		marginTop: 6,
		marginBottom: 8,
	},
	dueCard: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#dbe7e2',
		borderRadius: 15,
		padding: 14,
		marginBottom: 10,
	},
	dueTopRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 4,
		gap: 8,
	},
	dueTitle: {
		flex: 1,
		color: '#1a3344',
		fontSize: 15,
		fontWeight: '700',
	},
	dueAmount: {
		color: '#0e7c61',
		fontSize: 15,
		fontWeight: '800',
	},
	dueDate: {
		color: '#607387',
		fontSize: 12,
		marginBottom: 10,
	},
	secondaryButton: {
		backgroundColor: '#009966',
		borderRadius: 10,
		paddingVertical: 10,
		alignItems: 'center',
	},
	secondaryButtonText: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '700',
	},
	searchWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#d9e4ee',
		paddingHorizontal: 12,
		paddingVertical: 5,
		marginBottom: 10,
		gap: 8,
	},
	searchInput: {
		flex: 1,
		color: '#13293d',
		fontSize: 14,
		paddingVertical: 8,
	},
	emptyCard: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#dbe7e2',
		borderRadius: 14,
		padding: 14,
	},
	emptyTitle: {
		color: '#1a3344',
		fontSize: 15,
		fontWeight: '700',
	},
	emptyText: {
		color: '#607387',
		fontSize: 13,
		marginTop: 2,
	},
	recordCard: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#dbe7e2',
		borderRadius: 14,
		padding: 12,
		marginBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	recordIcon: {
		width: 34,
		height: 34,
		borderRadius: 10,
		backgroundColor: '#ebfaf4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	recordInfo: {
		flex: 1,
	},
	recordTitle: {
		color: '#1a3344',
		fontSize: 14,
		fontWeight: '700',
		marginBottom: 3,
	},
	recordMeta: {
		color: '#607387',
		fontSize: 11,
		marginBottom: 4,
	},
	recordFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	recordAmount: {
		color: '#0e7c61',
		fontSize: 14,
		fontWeight: '800',
	},
	recordStatus: {
		color: '#0e7c61',
		fontSize: 11,
		fontWeight: '700',
		backgroundColor: '#ebfaf4',
		borderRadius: 99,
		paddingHorizontal: 8,
		paddingVertical: 3,
	},
});
