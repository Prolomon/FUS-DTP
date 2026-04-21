import { useRouter } from 'expo-router';
import { Bell, CalendarDays, Cctv, FileText, MapPinned, MessageCircleMore, User, WalletCards } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ChildItem = {
    id: string;
    name: string;
    className: string;
    uid: string;
    attendance: string;
    averageScore: number;
    rank: string;
    imageUrl: string;
};

type NoticeItem = {
    id: string;
    title: string;
    description: string;
    time: string;
};

const children: ChildItem[] = [
    {
        id: 'std-001',
        name: 'Amara Okonkwo',
        className: 'SS2 Gold',
        uid: 'UID-2026-001',
        attendance: '96%',
        averageScore: 87,
        rank: '4th in class',
        imageUrl: 'https://i.pravatar.cc/120?img=31',
    },
    {
        id: 'std-101',
        name: 'Amina Yusuf',
        className: 'SS1 Blue',
        uid: 'UID-2026-101',
        attendance: '93%',
        averageScore: 84,
        rank: '6th in class',
        imageUrl: 'https://i.pravatar.cc/120?img=32',
    },
];

const notices: NoticeItem[] = [
    {
        id: 'notice-1',
        title: 'Parents Meeting',
        description: 'Term briefing and progress review scheduled for Friday 2:00 PM.',
        time: 'Today',
    },
    {
        id: 'notice-2',
        title: 'Assignment Reminder',
        description: 'Mathematics project submission closes tomorrow morning.',
        time: '1h ago',
    },
    {
        id: 'notice-3',
        title: 'Transport Update',
        description: 'School bus pickup will be 10 minutes earlier this week.',
        time: 'Yesterday',
    },
];

export default function ClassScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headerCard}>
                    <View style={styles.headerTopRow}>
                        <View>
                            <Text style={styles.eyebrow}>School Dashboard</Text>
                            <Text style={styles.greeting}>👋 Welcome Back!</Text>
                            <Text style={styles.subtitle}>Administrator</Text>
                        </View>
                        <View style={styles.bellWrap}>
                            <User size={18} color="#009966" strokeWidth={2.2} />
                        </View>
                    </View>

                    <View style={styles.headerStatsGrid}>
                        <View style={styles.statGridItem}>
                            <Text style={styles.statLabel}>Students</Text>
                            <Text style={styles.statValue}>{children.length}</Text>
                        </View>
                        <View style={styles.statGridItem}>
                            <Text style={styles.statLabel}>Messages</Text>
                            <Text style={styles.statValue}>4</Text>
                        </View>
                        <View style={styles.statGridItem}>
                            <Text style={styles.statLabel}>Staffs</Text>
                            <Text style={styles.statValue}>2</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.quickActionsGrid}>
                    <TouchableOpacity activeOpacity={0.84} style={styles.quickActionGridItem} onPress={() => router.push('/result')}>
                        <View style={[styles.quickActionIcon, {backgroundColor: '#009966'}]}>
                            <FileText size={18} color="#fff" strokeWidth={2.2} />
                        </View>
                        <Text style={styles.quickActionText}>Results</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.84} style={styles.quickActionGridItem} onPress={() => router.push('/(pages)/authenticator')}>
                        <View style={[styles.quickActionIcon, {backgroundColor: '#2f80ed'}]}>
                            <CalendarDays size={18} color="#fff" strokeWidth={2.2} />
                        </View>
                        <Text style={styles.quickActionText}>Authenticator</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.84} style={styles.quickActionGridItem} onPress={() => router.push('/(pages)/chat')}>
                        <View style={[styles.quickActionIcon, {backgroundColor: '#6a7cff'}]}>
                            <MessageCircleMore size={18} color="#fff" strokeWidth={2.2} />
                        </View>
                        <Text style={styles.quickActionText}>Messages</Text>
                    </TouchableOpacity>
      
                    <TouchableOpacity activeOpacity={0.84} style={styles.quickActionGridItem} onPress={() => router.push('/(pages)/payments')}>
                        <View style={[styles.quickActionIcon, {backgroundColor: '#f39c12'}]}>
                            <WalletCards size={18} color="#fff" strokeWidth={2.2} />
                        </View>
                        <Text style={styles.quickActionText}>Payments</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.84} style={styles.quickActionGridItem} onPress={() => router.push('/(pages)/track')}>
                        <View style={[styles.quickActionIcon, {backgroundColor: '#00b894'}]}>
                            <MapPinned size={18} color="#fff" strokeWidth={2.2} />
                        </View>
                        <Text style={styles.quickActionText}>Tracking</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.84} style={styles.quickActionGridItem} onPress={() => router.push('/(pages)/live')}>
                        <View style={[styles.quickActionIcon, {backgroundColor: '#e17055'}]}>
                            <Cctv size={18} color="#fff" strokeWidth={2.2} />
                        </View>
                        <Text style={styles.quickActionText}>Feeds</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>School Notices</Text>
                        <Text style={styles.sectionCount}>{notices.length}</Text>
                    </View>

                    {notices.map((notice) => (
                        <View key={notice.id} style={styles.noticeCard}>
                            <View style={styles.noticeTopRow}>
                                <Text style={styles.noticeTitle}>{notice.title}</Text>
                                <Text style={styles.noticeTime}>{notice.time}</Text>
                            </View>
                            <Text style={styles.noticeText}>{notice.description}</Text>
                        </View>
                    ))}
                </View>
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
    headerCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 18,
        marginBottom: 14,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        backgroundColor: '#f3f6fa',
        borderRadius: 11,
        paddingHorizontal: 10,
        paddingVertical: 9,
        marginBottom: 14,
    },
    backButtonText: {
        fontSize: 14,
        color: '#10293e',
        fontWeight: '700',
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    eyebrow: {
        fontSize: 12,
        fontWeight: '700',
        color: '#009966',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 6,
    },
    greeting: {
        fontSize: 26,
        fontWeight: '800',
        color: '#10293e',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: '#102930',
        fontWeight: '600',
    },
    bellWrap: {
        width: 40,
        height: 40,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    headerStatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 0,
    },
    statGridItem: {
        width: '32%',
        backgroundColor: '#fbfdff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e2ebf2',
        alignItems: "flex-start",
        marginBottom: 0,
        justifyContent: "flex-start",
    },
    statLabel: {
        fontSize: 12,
        color: '#b7c7d2',
        fontWeight: '600',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        color: '#10293e',
        fontWeight: '800',
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 14,
        gap: 0,
    },
    quickActionGridItem: {
        width: '32%',
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e2ebf2',
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    quickActionIcon: {
        width: 38,
        height: 38,
        borderRadius: 13,
        backgroundColor: '#009966',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    quickActionIconAlt: {
        backgroundColor: '#2f80ed',
    },
    quickActionIconSoft: {
        backgroundColor: '#6a7cff',
    },
    quickActionText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#10293e',
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e1eaf1',
        padding: 14,
        marginBottom: 12,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: '#1a2f44',
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
    childCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        backgroundColor: '#fbfdff',
        borderWidth: 1,
        borderColor: '#e2ebf2',
        padding: 12,
        marginBottom: 10,
    },
    childLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    childAvatar: {
        width: 48,
        height: 48,
        borderRadius: 15,
        marginRight: 10,
    },
    childTextWrap: {
        flex: 1,
    },
    childName: {
        fontSize: 15,
        fontWeight: '800',
        color: '#10293e',
        marginBottom: 2,
    },
    childMeta: {
        fontSize: 12,
        fontWeight: '600',
        color: '#627789',
    },
    childRight: {
        alignItems: 'flex-end',
        gap: 6,
    },
    scorePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 999,
        backgroundColor: '#009966',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    scoreText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '800',
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 999,
        backgroundColor: '#2f80ed',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    statusText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '800',
    },
    rankText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#5f7082',
    },
    noticeCard: {
        borderRadius: 16,
        backgroundColor: '#f7fafd',
        borderWidth: 1,
        borderColor: '#dce6ef',
        padding: 12,
        marginBottom: 10,
    },
    noticeTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    noticeTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '800',
        color: '#10293e',
        paddingRight: 8,
    },
    noticeTime: {
        fontSize: 11,
        fontWeight: '700',
        color: '#009966',
    },
    noticeText: {
        fontSize: 13,
        lineHeight: 19,
        color: '#4f6477',
        fontWeight: '500',
    },
});
