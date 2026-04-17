import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Lock, MapPin, Rocket } from 'lucide-react-native';
import React from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LOGO = require("../assets/images/logo.png");

export default function SplashScreen() {
	const views = [
		{
			title: "Live Tracking",
			desc: "Track what matters most in real time.",
			icon: <MapPin size={32} color="#4169E1" style={{ marginBottom: 4 }} />,
		},
		{
			title: "Sync & Secure",
			desc: "Your data is always safe and synchronized.",
			icon: <Lock size={32} color="#4169E1" style={{ marginBottom: 4 }} />,
		},
		{
			title: "Get Started",
			desc: "Begin your journey with Arqelion today.",
			icon: <Rocket size={32} color="#4169E1" style={{ marginBottom: 4 }} />,
		}
	];

	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<LinearGradient
				colors={['#eef3ff', '#f5f7ff', '#f5f5f5']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0.95, y: 1 }}
				style={styles.backgroundGradient}
			/>
			<View style={styles.content}>
				<View style={styles.heroCard}>
					<Image source={LOGO} style={styles.logo} resizeMode="contain" />
					<Text style={styles.title}>Arqelion</Text>
					<Text style={styles.subtitle}>Secure. Always in sync.</Text>
				</View>

				<View style={styles.multiViewSectionCol}>
					{views.map((view) => (
						<View key={view.title} style={[styles.viewCard, styles.viewCardActive]}>
							<View style={styles.cardRow}>
								{view.icon}
								<View style={styles.cardTextCol}>
									<Text style={styles.viewCardTitle}>{view.title}</Text>
									<Text style={styles.viewCardDesc}>{view.desc}</Text>
								</View>
							</View>
						</View>
					))}
				</View>
				<TouchableOpacity style={styles.loginButtonWrap} onPress={() => router.replace("/login")}>
					<View style={styles.loginButtonRow}>
						<Lock size={20} color="#fff" style={{ marginRight: 8 }} />
						<Text style={styles.loginButton}>Login</Text>
					</View>
				</TouchableOpacity>

				<Text style={styles.poweredBy}>Powered by Secure System</Text>
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
		paddingHorizontal: 18,
		paddingTop: 18,
		paddingBottom: 20,
		justifyContent: 'center',
	},
	heroCard: {
		backgroundColor: '#fff',
		borderRadius: 20,
		paddingVertical: 22,
		paddingHorizontal: 18,
		alignItems: 'center',
		borderWidth: 1.5,
		borderColor: '#e3e8f7',
		shadowColor: '#4169E1',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 14,
		aspectRatio: 1,
		width: '100%',
		alignContent: 'center',
		justifyContent: 'center',
	},
	loginButtonWrap: {
		backgroundColor: '#4169E1',
		marginTop: 16,
		paddingVertical: 14,
		borderRadius: 12,
		alignSelf: "stretch",
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#4169E1',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.16,
		shadowRadius: 10,
		elevation: 5,
	},
	loginButtonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginButton: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 0.2,
	},
	cardRow: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	cardTextCol: {
		flex: 1,
		marginLeft: 14,
	},
	multiViewSectionCol: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		gap: 10,
		marginBottom: 6,
	},
	poweredBy: {
		marginTop: 14,
		fontSize: 12,
		color: '#64748b',
		textAlign: 'center',
	},
	logo: {
		width: 100,
		height: 100,
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		color: '#4169E1',
		letterSpacing: 0.6,
	},
	subtitle: {
		marginTop: 6,
		fontSize: 14,
		color: '#64748b',
		textAlign: "center",
		fontWeight: '500',
	},
	viewCard: {
		width: '100%',
		minHeight: 78,
		borderRadius: 18,
		padding: 16,
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	viewCardActive: {
		backgroundColor: '#fff',
		opacity: 1,
		borderWidth: 1.5,
		borderColor: '#e3e8f7',
		shadowColor: '#4169E1',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 10,
		elevation: 5,
	},
	viewCardTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#4169E1',
		marginBottom: 2,
		textAlign: 'left',
	},
	viewCardDesc: {
		fontSize: 12,
		color: '#64748b',
		textAlign: 'left',
	},
});
