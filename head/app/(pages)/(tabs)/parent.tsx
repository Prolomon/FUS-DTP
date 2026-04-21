import { RelativePathString, useRouter } from 'expo-router';
import { ChevronRight, UserRound } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ParentItem = {
	id: string;
	name: string;
	email: string;
	phone: string;
	childrenCount: number;
	wardName: string;
	imageUrl?: string;
};

const parents: ParentItem[] = [
	{
		id: 'parent-001',
		name: 'Mrs. Amina Okonkwo',
		email: 'amina.okonkwo@example.com',
		phone: '+234 801 345 9087',
		childrenCount: 2,
		wardName: 'Amara Okonkwo',
		imageUrl: 'https://i.pravatar.cc/120?img=68',
	},
	{
		id: 'parent-002',
		name: 'Mr. Emeka Nwafor',
		email: 'emeka.nwafor@example.com',
		phone: '+234 803 442 1185',
		childrenCount: 1,
		wardName: 'Samuel Adeyemi',
		imageUrl: 'https://i.pravatar.cc/120?img=64',
	},
	{
		id: 'parent-003',
		name: 'Mrs. Grace Johnson',
		email: 'grace.johnson@example.com',
		phone: '+234 816 210 6639',
		childrenCount: 3,
		wardName: 'Esther Daniel',
		imageUrl: 'https://i.pravatar.cc/120?img=47',
	},
	{
		id: 'parent-004',
		name: 'Mr. Kayode Afolabi',
		email: 'kayode.afolabi@example.com',
		phone: '+234 807 560 1298',
		childrenCount: 1,
		wardName: 'Blessing Afolabi',
		imageUrl: 'https://i.pravatar.cc/120?img=53',
	},
];

export default function ParentListScreen() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');

	const filteredParents = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			return parents;
		}

		return parents.filter((parent) => {
			return (
				parent.name.toLowerCase().includes(query) ||
				parent.wardName.toLowerCase().includes(query) ||
				parent.email.toLowerCase().includes(query)
			);
		});
	}, [searchQuery]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.sectionHeaderRow}>
					<Text style={styles.sectionTitle}>Parents</Text>
					<Text style={styles.sectionCount}>{filteredParents.length}</Text>
				</View>

				<TextInput
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search by parent, ward or email"
					placeholderTextColor="#7a8b9b"
					style={styles.searchInput}
				/>

				{filteredParents.map((parent) => (
					<TouchableOpacity
						key={parent.id}
						activeOpacity={0.84}
						style={styles.parentCard}
						onPress={() => router.push(`/parent/${parent.id}` as RelativePathString)}
					>
						<View style={styles.leftRow}>
							{parent.imageUrl ? (
								<Image source={{ uri: parent.imageUrl }} style={styles.avatar} />
							) : (
								<View style={styles.avatarFallback}>
									<UserRound size={18} color="#009966" strokeWidth={2.2} />
								</View>
							)}

							<View style={styles.parentTextWrap}>
								<Text style={styles.parentName}>{parent.name}</Text>
								<Text style={styles.parentMeta}>Ward: {parent.wardName}</Text>
								<Text style={styles.parentMeta}>{parent.email}</Text>
								<Text style={styles.parentMeta}>{parent.phone}</Text>
							</View>
						</View>

						<View style={styles.rightWrap}>
							<View style={styles.childrenPill}>
								<Text style={styles.childrenPillText}>{parent.childrenCount} child{parent.childrenCount > 1 ? 'ren' : ''}</Text>
							</View>
							<ChevronRight size={18} color="#8ea1af" strokeWidth={2.3} />
						</View>
					</TouchableOpacity>
				))}
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
		paddingBottom: 28,
	},
	sectionHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 22,
		color: '#10293e',
		fontWeight: '800',
	},
	sectionCount: {
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
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#dce6ef',
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: '#10293e',
		marginBottom: 10,
	},
	parentCard: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#e2ebf2',
		borderRadius: 14,
		paddingHorizontal: 12,
		paddingVertical: 12,
		marginBottom: 10,
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
	parentTextWrap: {
		flex: 1,
	},
	parentName: {
		fontSize: 15,
		color: '#10293e',
		fontWeight: '800',
		marginBottom: 3,
	},
	parentMeta: {
		fontSize: 12,
		color: '#627789',
		fontWeight: '600',
	},
	rightWrap: {
		alignItems: 'flex-end',
		gap: 8,
	},
	childrenPill: {
		backgroundColor: '#e8fbf3',
		borderRadius: 999,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	childrenPillText: {
		fontSize: 11,
		color: '#009966',
		fontWeight: '800',
	},
});
