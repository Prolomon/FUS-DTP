import { RelativePathString, useRouter } from 'expo-router';
import { Crown, ShieldCheck, UserRound } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type StudentItem = {
    id: string;
    name: string;
    rank: string;
    position: 'HOC' | 'Assistant';
    imageUrl?: string;
};

const className = 'SS2 Gold';
const curriculumCompletion = 72;

const students: StudentItem[] = [
    {
        id: 'std-001',
        name: 'Amara Okonkwo',
        rank: 'Captain',
        position: 'HOC',
        imageUrl: 'https://i.pravatar.cc/120?img=31',
    },
    {
        id: 'std-002',
        name: 'Daniel Ibrahim',
        rank: 'Prefect',
        position: 'Assistant',
        imageUrl: 'https://i.pravatar.cc/120?img=12',
    },
    {
        id: 'std-003',
        name: 'Blessing Afolabi',
        rank: 'Senior Member',
        position: 'Assistant',
        imageUrl: 'https://i.pravatar.cc/120?img=45',
    },
    {
        id: 'std-004',
        name: 'Mubarak Musa',
        rank: 'Class Rep',
        position: 'Assistant',
        imageUrl: 'https://i.pravatar.cc/120?img=15',
    },
    {
        id: 'std-005',
        name: 'Nora Edet',
        rank: 'Senior Member',
        position: 'Assistant',
        imageUrl: 'https://i.pravatar.cc/120?img=20',
    },
];

export default function ClassScreen() {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStudents = students.filter((student) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return true;
        }

        return (
            student.name.toLowerCase().includes(query) ||
            student.rank.toLowerCase().includes(query) ||
            student.position.toLowerCase().includes(query)
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
                <View style={styles.classCard}>
                    <Text style={styles.classLabel}>Class Name</Text>
                    <Text style={styles.className}>{className}</Text>

                    <View style={styles.progressHeaderRow}>
                        <Text style={styles.progressLabel}>Curriculum completion:</Text>
                        <Text style={styles.progressPercent}>{curriculumCompletion}%</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${curriculumCompletion}%` }]} />
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
