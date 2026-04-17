import { RelativePathString, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, FileText, Image as ImageIcon, Mic, MoreVertical, Plus, Send, User, Users, Video } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const chatMeta: Record<string, { name: string; description: string; members: string }> = {
    'staff-announcements': {
        name: 'Staff Announcements',
        description: 'Official school-wide updates, events and urgent alerts.',
        members: '68 members',
    },
    'grade-6-teachers': {
        name: 'Grade 6 Teachers',
        description: 'Class schedules, subject planning and daily class follow-up.',
        members: '14 members',
    },
    'front-desk-support': {
        name: 'Front Desk Support',
        description: 'Admissions, parent calls and visitor coordination updates.',
        members: '9 members',
    },
    'transport-coordination': {
        name: 'Transport Coordination',
        description: 'Route changes, pickup incidents and transport notices.',
        members: '21 members',
    },
    'security-compliance': {
        name: 'Security & Compliance',
        description: 'Campus security checks and compliance communication.',
        members: '11 members',
    },
};

const initialChatTimeline = [
    {
        date: 'Today',
        messages: [
            { id: '1', sender: 'them', name: 'Admin Office', text: 'Please confirm attendance for the morning briefing.', time: '08:10' },
            { id: '2', sender: 'me', name: 'You', text: 'Confirmed. I will be there in 10 minutes.', time: '08:14' },
            { id: '3', sender: 'them', name: 'Admin Office', text: 'Great. Also share the updated schedule before 9:00.', time: '08:18' },
        ],
    },
    {
        date: 'Yesterday',
        messages: [
            { id: '4', sender: 'them', name: 'Transport Lead', text: 'Route B will leave five minutes earlier tomorrow.', time: '16:40' },
            { id: '5', sender: 'me', name: 'You', text: 'Noted. I will inform the drivers.', time: '16:45' },
        ],
    },
    {
        date: 'Monday',
        messages: [
            { id: '6', sender: 'them', name: 'Head Teacher', text: 'Thanks for the reports. We will review them in the next session.', time: '09:05' },
        ],
    },
];

export default function ChatDetailsScreen() {
    const router = useRouter();
    const [attachmentOpen, setAttachmentOpen] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [chatTimeline, setChatTimeline] = useState(initialChatTimeline);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<{ id: string; date: string; text: string } | null>(null);
    const params = useLocalSearchParams<{ chatid?: string }>();
    const chatId = params.chatid || '';
    const details = chatMeta[chatId] || {
        name: 'School Group Chat',
        description: 'General group for staff communication and quick updates.',
        members: 'Unknown members',
    };

    const openMore = () => {
        router.push(`/chat/more?chatid=${encodeURIComponent(chatId)}` as RelativePathString);
    };

    const openDeleteModal = (date: string, id: string, text: string) => {
        setSelectedMessage({ id, date, text });
        setDeleteModalOpen(true);
    };

    const deleteSelectedMessage = () => {
        if (!selectedMessage) {
            return;
        }

        setChatTimeline((currentTimeline) =>
            currentTimeline
                .map((section) =>
                    section.date === selectedMessage.date
                        ? { ...section, messages: section.messages.filter((message) => message.id !== selectedMessage.id) }
                        : section,
                )
                .filter((section) => section.messages.length > 0),
        );

        setDeleteModalOpen(false);
        setSelectedMessage(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerCard}>
                <View style={styles.headerLeft}>
                    <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backButton}>
                        <ChevronLeft size={22} color="#1f2e40" strokeWidth={2.4} />
                    </Pressable>

                    <View style={styles.headerAvatar}>
                        <Users size={20} color="#009966" strokeWidth={2.4} />
                        <View style={styles.headerBadge}>
                            <User size={10} color="#fff" strokeWidth={3} />
                        </View>
                    </View>

                    <View style={styles.headerTextWrap}>
                        <Text style={styles.chatName} numberOfLines={1}>{details.name}</Text>
                        <Text style={styles.memberText}>{details.members}</Text>
                    </View>
                </View>

                <Pressable onPress={openMore} hitSlop={10} style={styles.moreButton}>
                    <MoreVertical size={22} color="#1f2e40" strokeWidth={2.2} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {chatTimeline.map((section) => (
                    <View key={section.date} style={styles.dateBlock}>
                        <View style={styles.datePill}>
                            <Text style={styles.datePillText}>{section.date}</Text>
                        </View>

                        {section.messages.map((message) => (
                            <Pressable
                                key={message.id}
                                onPress={() => openDeleteModal(section.date, message.id, message.text)}
                                style={({ pressed }) => [
                                    message.sender === 'me' ? styles.myMessageRow : styles.theirMessageRow,
                                    pressed && styles.messagePressed,
                                ]}
                            >
                                {message.sender !== 'me' && (
                                    <View style={styles.messageAvatar}>
                                        <Users size={14} color="#009966" strokeWidth={2.2} />
                                    </View>
                                )}

                                <View style={message.sender === 'me' ? styles.myBubble : styles.theirBubble}>
                                    <Text style={styles.messageSender}>{message.name}</Text>
                                    <Text style={styles.messageText}>{message.text}</Text>
                                    <Text style={styles.messageTime}>{message.time}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.composerBar}>
                <Pressable onPress={() => setAttachmentOpen(true)} hitSlop={10} style={styles.addButton}>
                    <Plus size={20} color="#009966" strokeWidth={2.6} />
                </Pressable>

                <View style={styles.composerInput}>
                    <TextInput
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Write a message"
                        placeholderTextColor="#7b8a99"
                        style={styles.composerTextInput}
                    />
                </View>
                <View style={styles.sendButton}>
                    <Send size={18} color="#fff" strokeWidth={2.4} />
                </View>
            </View>

            <Modal
                transparent
                animationType="slide"
                visible={attachmentOpen}
                onRequestClose={() => setAttachmentOpen(false)}
            >
                <Pressable style={styles.modalBackdrop} onPress={() => setAttachmentOpen(false)}>
                    <Pressable style={styles.modalSheet} onPress={() => null}>
                        <View style={styles.sheetHandle} />
                        <Text style={styles.sheetTitle}>Attach media</Text>
                        <Text style={styles.sheetSubtitle}>Choose what you want to send in this group chat.</Text>

                        <TouchableOpacity style={styles.sheetAction} activeOpacity={0.82}>
                            <View style={styles.sheetIconWrap}>
                                <ImageIcon size={18} color="#009966" strokeWidth={2.2} />
                            </View>
                            <Text style={styles.sheetActionText}>Send image</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sheetAction} activeOpacity={0.82}>
                            <View style={styles.sheetIconWrap}>
                                <Video size={18} color="#009966" strokeWidth={2.2} />
                            </View>
                            <Text style={styles.sheetActionText}>Send video</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sheetAction} activeOpacity={0.82}>
                            <View style={styles.sheetIconWrap}>
                                <Mic size={18} color="#009966" strokeWidth={2.2} />
                            </View>
                            <Text style={styles.sheetActionText}>Send audio</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sheetAction} activeOpacity={0.82}>
                            <View style={styles.sheetIconWrap}>
                                <FileText size={18} color="#009966" strokeWidth={2.2} />
                            </View>
                            <Text style={styles.sheetActionText}>Send document</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal
                transparent
                animationType="slide"
                visible={deleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
            >
                <Pressable style={styles.modalBackdrop} onPress={() => setDeleteModalOpen(false)}>
                    <Pressable style={styles.deleteSheet} onPress={() => null}>
                        <View style={styles.sheetHandle} />
                        <Text style={styles.sheetTitle}>Delete message?</Text>
                        <Text style={styles.sheetSubtitle} numberOfLines={3}>
                            {selectedMessage?.text || 'This message will be removed from the chat.'}
                        </Text>

                        <TouchableOpacity style={styles.deleteAction} activeOpacity={0.86} onPress={deleteSelectedMessage}>
                            <Text style={styles.deleteActionText}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelAction}
                            activeOpacity={0.86}
                            onPress={() => setDeleteModalOpen(false)}
                        >
                            <Text style={styles.cancelActionText}>Cancel</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef4f1',
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 14,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e9f1',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f6fa',
        marginRight: 8,
    },
    headerAvatar: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: '#e7faf1',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#c7eedc',
        marginRight: 12,
    },
    headerBadge: {
        position: 'absolute',
        right: -2,
        bottom: -2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#009966',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    headerTextWrap: {
        flex: 1,
    },
    moreButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f6fa',
    },
    content: {
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 92,
    },
    dateBlock: {
        marginBottom: 16,
    },
    datePill: {
        alignSelf: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginBottom: 12,
    },
    datePillText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    theirMessageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
        paddingRight: 42,
    },
    myMessageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
        paddingLeft: 42,
    },
    messageAvatar: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#e8fbf3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#cceedd',
    },
    theirBubble: {
        maxWidth: '82%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e3e9f1',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    myBubble: {
        maxWidth: '82%',
        backgroundColor: '#dcf8c6',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    messageSender: {
        fontSize: 11,
        fontWeight: '700',
        color: '#009966',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#1f2e40',
    },
    messageTime: {
        marginTop: 4,
        fontSize: 11,
        color: '#64748b',
        textAlign: 'right',
        fontWeight: '600',
    },
    messagePressed: {
        opacity: 0.88,
        transform: [{ scale: 0.99 }],
    },
    composerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 14,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e4e9f1',
    },
    addButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: '#e8fbf3',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#cceedd',
        marginRight: 10,
    },
    composerInput: {
        flex: 1,
        minHeight: 48,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#d9e2ea',
        backgroundColor: '#f7fafc',
        justifyContent: 'center',
        paddingHorizontal: 14,
        marginRight: 10,
    },
    composerTextInput: {
        flex: 1,
        color: '#7b8a99',
        fontSize: 14,
        paddingVertical: 0,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#009966',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatName: {
        fontSize: 18,
        color: '#1f2e40',
        fontWeight: '800',
        marginBottom: 3,
    },
    chatDescription: {
        fontSize: 12,
        color: '#5b6c7b',
        lineHeight: 16,
        marginBottom: 4,
    },
    memberText: {
        color: '#009966',
        fontWeight: '700',
        fontSize: 13,
        backgroundColor: '#e8fbf3',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.42)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: '#e4e9f1',
    },
    sheetHandle: {
        alignSelf: 'center',
        width: 44,
        height: 5,
        borderRadius: 999,
        backgroundColor: '#d6dde6',
        marginBottom: 12,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1f2e40',
        marginBottom: 4,
    },
    sheetSubtitle: {
        fontSize: 13,
        color: '#64748b',
        lineHeight: 18,
        marginBottom: 14,
    },
    sheetAction: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 14,
        backgroundColor: '#f7fafc',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e4e9f1',
    },
    sheetIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#e8fbf3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#cceedd',
    },
    sheetActionText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#243449',
    },
    deleteSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: '#e4e9f1',
    },
    deleteAction: {
        backgroundColor: '#ef4444',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 8,
    },
    deleteActionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
    },
    cancelAction: {
        backgroundColor: '#f3f6fa',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 10,
    },
    cancelActionText: {
        color: '#243449',
        fontSize: 14,
        fontWeight: '700',
    },
});
