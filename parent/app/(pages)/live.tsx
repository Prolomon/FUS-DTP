import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Activity, ArrowLeft, Expand, Minimize2, Radio, Shield } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

type LiveFeed = {
	id: string;
	title: string;
	provider: string;
	quality: string;
	location: string;
	url: string;
};

const LIVE_FEEDS: LiveFeed[] = [
	{
		id: 'bus',
		title: 'School Bus',
		provider: 'Bus feed',
		quality: 'HD adaptive',
		location: 'Worldwide',
		url: 'http://204.106.237.68:88/mjpg/1/video.mjpg',
	},
	{
		id: 'assembly',
		title: 'Assembly',
		provider: 'Assembly Feed',
		quality: '720p',
		location: 'City route',
		url: 'https://imgproxy.windy.com/_/full/plain/current/1604771729/original.jpg',
	},
	{
		id: 'class-room',
		title: 'Class Room',
		provider: 'Class Feed',
		quality: 'HD stream',
		location: 'Campus gate',
		url: 'http://93.157.158.32:8091/axis-cgi/mjpg/video.cgi?camera=1',
	},
	{
		id: 'cafeteria',
		title: 'Cafeteria',
		provider: 'Cafeteria Feed',
		quality: 'Low latency',
		location: 'School corridor',
		url: 'http://93.157.158.32:8091/axis-cgi/mjpg/video.cgi?camera=1',
	},
];

export default function LiveScreen() {
	const [selectedFeedId, setSelectedFeedId] = useState(LIVE_FEEDS[0].id);
	const [isFullscreenVisible, setIsFullscreenVisible] = useState(false);

	const selectedFeed = useMemo(
		() => LIVE_FEEDS.find((feed) => feed.id === selectedFeedId) || LIVE_FEEDS[0],
		[selectedFeedId],
	);

	const isMjpegFeed = useMemo(() => {
		const url = selectedFeed.url.toLowerCase();
		return url.includes('.mjpg') || url.includes('.mjpeg') || url.includes('/mjpg') || url.includes('axis-cgi/mjpg');
	}, [selectedFeed.url]);

	const isImageFeed = useMemo(() => {
		return /\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(selectedFeed.url);
	}, [selectedFeed.url]);

	const supportsNativeVideo = !isMjpegFeed && !isImageFeed;

	const player = useVideoPlayer(supportsNativeVideo ? { uri: selectedFeed.url } : null, (videoPlayer) => {
		videoPlayer.loop = true;
		videoPlayer.muted = false;
		videoPlayer.play();
	});

	const lockLandscape = async () => {
		if (Platform.OS === 'web') {
			return;
		}
		try {
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
		} catch {
			ToastAndroid.show('Unable to rotate to landscape on this device.', ToastAndroid.SHORT);
		}
	};

	const lockPortrait = async () => {
		if (Platform.OS === 'web') {
			return;
		}
		try {
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
		} catch {
			ToastAndroid.show('Unable to return to portrait mode.', ToastAndroid.SHORT);
		}
	};

	const requestFullscreen = async () => {
		setIsFullscreenVisible(true);
		await lockLandscape();
	};

	const closeFullscreen = async () => {
		setIsFullscreenVisible(false);
		await lockPortrait();
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.headerRow}>
					<Text style={styles.title}>Live Stream</Text>
					<Pressable style={styles.backBtn} onPress={() => router.back()}>
						<ArrowLeft size={16} color="#0f172a" />
						<Text style={styles.backBtnText}>Back</Text>
					</Pressable>
				</View>
				<Text style={styles.subtitle}>Switch between camera feeds and monitor in real time.</Text>

				<View style={styles.playerCard}>
					{isMjpegFeed ? (
						<WebView
							source={{ uri: selectedFeed.url }}
							style={styles.video}
							mixedContentMode="always"
							scrollEnabled={false}
							allowsInlineMediaPlayback
						/>
					) : isImageFeed ? (
						<Image source={{ uri: selectedFeed.url }} style={styles.video} contentFit="cover" />
					) : (
						<VideoView
							player={player}
							style={styles.video}
							nativeControls
							allowsFullscreen
							allowsPictureInPicture
							contentFit="cover"
						/>
					)}

					<View style={styles.liveBadge}>
						<Radio size={12} color="#fff" />
						<Text style={styles.liveBadgeText}>LIVE</Text>
					</View>

					<Text style={styles.feedTitle}>{selectedFeed.title}</Text>
					<Text style={styles.feedMeta}>
						{selectedFeed.provider} - {selectedFeed.location} - {selectedFeed.quality}
					</Text>

					<View style={styles.actionsRow}>
						<Pressable style={styles.actionBtn} onPress={isFullscreenVisible ? closeFullscreen : 	requestFullscreen}>
							<Expand size={16} color="#009966" />
							<Text style={styles.actionText}>Fullscreen</Text>
						</Pressable>
					</View>
				</View>

				<Text style={styles.sectionTitle}>Feeds</Text>
				{LIVE_FEEDS.map((feed) => {
					const active = feed.id === selectedFeedId;
					return (
						<Pressable
							key={feed.id}
							style={[styles.feedCard, active && styles.feedCardActive]}
							onPress={() => {
								setSelectedFeedId(feed.id);
							}}
						>
							<View style={styles.feedIconWrap}>
								<Activity size={16} color={active ? '#006b49' : '#009966'} />
							</View>
							<View style={styles.feedTextWrap}>
								<Text style={styles.feedCardTitle}>{feed.title}</Text>
								<Text style={styles.feedCardMeta}>{feed.provider} - {feed.quality}</Text>
							</View>
						</Pressable>
					);
				})}

				<Text style={styles.sectionTitle}>Features</Text>
				<View style={styles.featureCard}>
					<Shield size={16} color="#009966" />
					<Text style={styles.featureText}>Live feed switching inspired by alternatives like EarthCam and IP Cam Viewer.</Text>
				</View>
				<View style={styles.featureCard}>
					<Shield size={16} color="#009966" />
					<Text style={styles.featureText}>Built-in full-screen and Picture-in-Picture via Expo Video controls.</Text>
				</View>
				<View style={styles.featureCard}>
					<Shield size={16} color="#009966" />
					<Text style={styles.featureText}>One-tap fullscreen viewing for clearer monitoring.</Text>
				</View>
			</ScrollView>

			<Modal
				visible={isFullscreenVisible}
				animationType="fade"
				presentationStyle="fullScreen"
				onRequestClose={closeFullscreen}
			>
				<View style={styles.fullscreenContainer}>
					{isMjpegFeed ? (
						<WebView
							source={{ uri: selectedFeed.url }}
							style={styles.fullscreenMedia}
							mixedContentMode="always"
							scrollEnabled={false}
							allowsInlineMediaPlayback
						/>
					) : isImageFeed ? (
						<Image source={{ uri: selectedFeed.url }} style={styles.fullscreenMedia} contentFit="contain" />
					) : (
						<VideoView
							player={player}
							style={styles.fullscreenMedia}
							nativeControls
							allowsFullscreen
							allowsPictureInPicture
							contentFit="contain"
						/>
					)}

					<Pressable style={styles.fullscreenCloseBtn} onPress={closeFullscreen}>
						<Minimize2 size={18} color="#fff" />
						<Text style={styles.fullscreenCloseText}>Exit</Text>
					</Pressable>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'ghostwhite',
	},
	content: {
		padding: 16,
		paddingBottom: 26,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: '#0f172a',
		fontSize: 31,
		fontWeight: '800',
	},
	backBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderColor: '#dbe4ea',
		borderWidth: 1,
		borderRadius: 999,
		paddingVertical: 8,
		paddingHorizontal: 12,
		gap: 6,
	},
	backBtnText: {
		color: '#0f172a',
		fontSize: 12,
		fontWeight: '700',
	},
	subtitle: {
		color: '#4b5563',
		fontSize: 13,
		marginTop: 4,
		marginBottom: 14,
	},
	playerCard: {
		backgroundColor: '#ffffff',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#dbe4ea',
		padding: 10,
		marginBottom: 14,
	},
	video: {
		width: '100%',
		height: 220,
		borderRadius: 12,
		backgroundColor: '#000',
	},
	liveBadge: {
		alignSelf: 'flex-start',
		marginTop: 10,
		backgroundColor: '#e11d48',
		borderRadius: 999,
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	liveBadgeText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 11,
	},
	feedTitle: {
		color: '#111827',
		fontWeight: '700',
		fontSize: 15,
		marginTop: 8,
	},
	feedMeta: {
		color: '#6b7280',
		fontSize: 12,
		marginTop: 3,
	},
	actionsRow: {
		marginTop: 12,
		flexDirection: 'row',
		gap: 10,
	},
	actionBtn: {
		backgroundColor: '#ffffff',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#009966',
		paddingVertical: 9,
		paddingHorizontal: 11,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	actionText: {
		color: '#009966',
		fontWeight: '700',
		fontSize: 12,
	},
	sectionTitle: {
		color: '#111827',
		fontSize: 16,
		fontWeight: '800',
		marginTop: 8,
		marginBottom: 8,
	},
	feedCard: {
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#dbe4ea',
		borderRadius: 12,
		padding: 12,
		marginBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	feedCardActive: {
		backgroundColor: '#ecfdf5',
		borderColor: '#009966',
	},
	feedIconWrap: {
		width: 30,
		height: 30,
		borderRadius: 8,
		backgroundColor: '#d8fff0',
		alignItems: 'center',
		justifyContent: 'center',
	},
	feedTextWrap: {
		flex: 1,
	},
	feedCardTitle: {
		color: '#111827',
		fontSize: 14,
		fontWeight: '700',
	},
	feedCardMeta: {
		color: '#6b7280',
		fontSize: 11,
		marginTop: 2,
	},
	featureCard: {
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#dbe4ea',
		borderRadius: 12,
		padding: 11,
		marginBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	featureText: {
		flex: 1,
		color: '#374151',
		fontSize: 12,
		lineHeight: 18,
	},
	fullscreenContainer: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
	},
	fullscreenMedia: {
		width: '100%',
		height: '100%',
		backgroundColor: '#000',
	},
	fullscreenCloseBtn: {
		position: 'absolute',
		top: 24,
		right: 16,
		backgroundColor: 'rgba(0,0,0,0.65)',
		borderRadius: 999,
		paddingVertical: 8,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	fullscreenCloseText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '700',
	},
});
