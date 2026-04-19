import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BookOpen, Lock, ShieldCheck, Users } from 'lucide-react-native';
import React from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LOGO = require("../assets/images/arqelion_parent.png");

export default function SplashScreen() {
	const views = [
		{
			title: "Track Your Child in Real Time",
			desc: "See attendance, daily pickup status, and important school updates in one clear timeline.",
			icon: <Users size={24} color="#009966" />,
		},
		{
			title: "Stay Close to Academics",
			desc: "Monitor results, assignments, and teacher feedback so you can support learning from home.",
			icon: <BookOpen size={24} color="#009966" />,
		},
		{
			title: "Pay Fees and Get Reminders",
			desc: "Make secure payments, view receipts instantly, and never miss upcoming school fee deadlines.",
			icon: <ShieldCheck size={24} color="#009966" />,
		}
	];

	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<LinearGradient
				colors={['#f7fbff', '#eef9f4', '#f7f7f3']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.backgroundGradient}
			/>

			<View style={styles.glowTop} />
			<View style={styles.glowBottom} />

			<View style={styles.content}>
				<View style={styles.brandRow}>
					<View style={styles.brandBadge}>
						<Text style={styles.brandBadgeText}>FUS-DITP Platform</Text>
					</View>
				</View>

				<View style={styles.heroCard}>
					<View style={styles.logoRing}>
						<Image source={LOGO} style={styles.logo} resizeMode="contain" />
					</View>
					<Text style={styles.title}>FEDERAL UNITY SCHOOL DIGITAL INFRASTRUCTURE & TRANSFORMATION PLATFORM (FUS-DITP).</Text>
					{/* <Text style={styles.subtitle}>Your family dashboard for student progress, school communication, pickup safety, and fee management.</Text> */}
				</View>

				<View style={styles.multiViewSectionCol}>
					{views.map((view) => (
						<View key={view.title} style={[styles.viewCard, styles.viewCardActive]}>
							<View style={styles.cardRow}>
								<View style={styles.iconBadge}>{view.icon}</View>
								<View style={styles.cardTextCol}>
									<Text style={styles.viewCardTitle}>{view.title}</Text>
									<Text style={styles.viewCardDesc}>{view.desc}</Text>
								</View>
							</View>
						</View>
					))}
				</View>
				<TouchableOpacity activeOpacity={0.9} style={styles.loginButtonWrap} onPress={() => router.replace("/login")}>
					<View style={styles.loginButtonRow}>
						<Lock size={18} color="#fff" style={{ marginRight: 8 }} />
						<Text style={styles.loginButton}>Go to Sign In</Text>
					</View>
				</TouchableOpacity>

				<Text style={styles.poweredBy}>Built for modern schools and powered by Trs-G</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	backgroundGradient: {
		...StyleSheet.absoluteFillObject,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 14,
		paddingBottom: 18,
		justifyContent: 'center',
	},
	glowTop: {
		position: 'absolute',
		width: 240,
		height: 240,
		borderRadius: 999,
		top: -70,
		right: -70,
		backgroundColor: 'rgba(0, 153, 102, 0.09)',
	},
	glowBottom: {
		position: 'absolute',
		width: 280,
		height: 280,
		borderRadius: 999,
		bottom: -110,
		left: -100,
		backgroundColor: 'rgba(15, 23, 42, 0.06)',
	},
	brandRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
	},
	brandBadge: {
		backgroundColor: 'rgba(0, 153, 102, 0.12)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: 'rgba(0, 153, 102, 0.2)',
	},
	brandBadgeText: {
		fontSize: 11,
		fontWeight: '700',
		color: '#007a52',
		letterSpacing: 0.5,
	},
	heroCard: {
		backgroundColor: 'rgba(255,255,255,0.94)',
		borderRadius: 24,
		paddingVertical: 24,
		paddingHorizontal: 20,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#dbe8e1',
		shadowColor: '#0f172a',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.09,
		shadowRadius: 16,
		elevation: 6,
		marginBottom: 16,
		width: '100%',
		justifyContent: 'center',
	},
	logoRing: {
		width: 112,
		height: 112,
		borderRadius: 56,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#dfe8ea',
		marginBottom: 6,
	},
	loginButtonWrap: {
		backgroundColor: '#007a52',
		marginTop: 16,
		paddingVertical: 15,
		borderRadius: 14,
		alignSelf: "stretch",
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#007a52',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.25,
		shadowRadius: 14,
		elevation: 7,
	},
	loginButtonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginButton: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
		letterSpacing: 0.3,
	},
	cardRow: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	iconBadge: {
		width: 48,
		height: 48,
		borderRadius: 14,
		backgroundColor: '#eefbf5',
		borderWidth: 1,
		borderColor: '#d7efe4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardTextCol: {
		flex: 1,
		marginLeft: 14,
	},
	multiViewSectionCol: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		gap: 12,
		marginBottom: 8,
	},
	poweredBy: {
		marginTop: 16,
		fontSize: 12,
		color: '#566273',
		textAlign: 'center',
	},
	logo: {
		width: 72,
		height: 72,
	},
	title: {
		fontSize: 19,
		fontWeight: "800",
		color: '#0f172a',
		letterSpacing: 0.1,
		textAlign: 'center',
		lineHeight: 28,
	},
	subtitle: {
		marginTop: 7,
		fontSize: 14,
		color: '#4b5563',
		textAlign: "center",
		fontWeight: '500',
		lineHeight: 20,
		paddingHorizontal: 2,
	},
	viewCard: {
		width: '100%',
		minHeight: 86,
		borderRadius: 16,
		padding: 16,
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.95)',
	},
	viewCardActive: {
		backgroundColor: 'rgba(255,255,255,0.95)',
		opacity: 1,
		borderWidth: 1,
		borderColor: '#dbe8e1',
		shadowColor: '#0f172a',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.07,
		shadowRadius: 12,
		elevation: 5,
	},
	viewCardTitle: {
		fontSize: 13,
		fontWeight: '700',
		color: '#0f172a',
		marginBottom: 2,
		textAlign: 'left',
	},
	viewCardDesc: {
		fontSize: 10,
		color: '#5b6472',
		textAlign: 'left',
		lineHeight: 14,
	},
});
