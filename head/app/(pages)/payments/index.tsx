import { RelativePathString, useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchField = 'admissionNo' | 'uid' | 'studentName' | 'parentPhone' | 'parentName' | 'paymentRef';

type PaymentRecord = {
    id: string;
    studentName: string;
    admissionNo: string;
    uid: string;
    parentName: string;
    parentPhone: string;
    paymentRef: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
    term: string;
    date: string;
};

const searchFields: { label: string; value: SearchField }[] = [
    { label: 'Admission No', value: 'admissionNo' },
    { label: 'UID', value: 'uid' },
    { label: 'Student Name', value: 'studentName' },
    { label: 'Parent Phone', value: 'parentPhone' },
    { label: 'Parent Name', value: 'parentName' },
    { label: 'Payment Ref', value: 'paymentRef' },
];

const payments: PaymentRecord[] = [
    {
        id: 'pay-1062',
        studentName: 'Amara Okonkwo',
        admissionNo: 'SIS/2026/001',
        uid: 'UID-2026-001',
        parentName: 'Mrs. Amina Okonkwo',
        parentPhone: '+234 801 345 9087',
        paymentRef: 'TXN-9843321-APR26',
        amount: 125000,
        status: 'Paid',
        term: 'Term 2 School Fee',
        date: 'Apr 10, 2026',
    },
    {
        id: 'pay-1038',
        studentName: 'Daniel Ibrahim',
        admissionNo: 'SIS/2026/002',
        uid: 'UID-2026-002',
        parentName: 'Mrs. Hadiza Ibrahim',
        parentPhone: '+234 803 442 1185',
        paymentRef: 'TXN-9831120-MAR26',
        amount: 30000,
        status: 'Paid',
        term: 'Transport Fee',
        date: 'Mar 28, 2026',
    },
    {
        id: 'pay-0994',
        studentName: 'Blessing Afolabi',
        admissionNo: 'SIS/2026/003',
        uid: 'UID-2026-003',
        parentName: 'Mr. Kayode Afolabi',
        parentPhone: '+234 807 560 1298',
        paymentRef: 'TXN-9790322-MAR26',
        amount: 12000,
        status: 'Pending',
        term: 'Examination Levy',
        date: 'Mar 02, 2026',
    },
    {
        id: 'pay-0960',
        studentName: 'Mubarak Musa',
        admissionNo: 'SIS/2026/004',
        uid: 'UID-2026-004',
        parentName: 'Mrs. Zainab Musa',
        parentPhone: '+234 816 210 6639',
        paymentRef: 'TXN-9734410-FEB26',
        amount: 7000,
        status: 'Overdue',
        term: 'PTA Dues',
        date: 'Feb 18, 2026',
    },
];

const currency = (value: number) =>
    new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0,
    }).format(value);

export default function PaymentScreen() {
    const router = useRouter();
    const [searchField, setSearchField] = useState<SearchField>('admissionNo');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPayments = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return payments;
        }

        return payments.filter((payment) => {
            const value = String(payment[searchField]).toLowerCase();
            return value.includes(query);
        });
    }, [searchField, searchQuery]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={18} color="#13293d" strokeWidth={2.6} />
                    <Text style={styles.backText}>Back</Text>
                </Pressable>

                <Text style={styles.headerTitle}>Payment</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.searchCard}>
                    <Text style={styles.cardTitle}>Search Payment</Text>
                    <Text style={styles.cardSubtitle}>Choose a search key and enter the value to find a payment record.</Text>

                    <View style={styles.chipRow}>
                        {searchFields.map((field) => (
                            <Pressable
                                key={field.value}
                                style={[styles.chip, searchField === field.value && styles.chipActive]}
                                onPress={() => setSearchField(field.value)}
                            >
                                <Text style={[styles.chipText, searchField === field.value && styles.chipTextActive]}>{field.label}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.inputWrap}>
                        <Search size={18} color="#7a8b9b" strokeWidth={2.2} />
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder={`Search by ${searchFields.find((field) => field.value === searchField)?.label.toLowerCase()}`}
                            placeholderTextColor="#7a8b9b"
                            style={styles.searchInput}
                        />
                    </View>
                </View>

                <View style={styles.resultsCard}>
                    <View style={styles.resultsHeaderRow}>
                        <Text style={styles.cardTitle}>Available Results</Text>
                        <Text style={styles.resultCount}>{filteredPayments.length}</Text>
                    </View>

                    {filteredPayments.map((payment) => (
                        <Pressable
                            key={payment.id}
                            style={styles.resultItem}
                            onPress={() => router.push(`/payments/${payment.id}` as RelativePathString)}
                        >
                            <View style={styles.resultLeft}>
                                <Text style={styles.paymentName}>{payment.studentName}</Text>
                                <Text style={styles.paymentMeta}>Admission No: {payment.admissionNo}</Text>
                                <Text style={styles.paymentMeta}>UID: {payment.uid}</Text>
                                <Text style={styles.paymentMeta}>Parent: {payment.parentName}</Text>
                                <Text style={styles.paymentMeta}>Phone: {payment.parentPhone}</Text>
                                <Text style={styles.paymentMeta}>Ref: {payment.paymentRef}</Text>
                            </View>

                            <View style={styles.resultRight}>
                                <View style={[styles.statusPill, payment.status === 'Paid' ? styles.statusPaid : payment.status === 'Pending' ? styles.statusPending : styles.statusOverdue]}>
                                    <Text style={styles.statusText}>{payment.status}</Text>
                                </View>
                                <Text style={styles.amountText}>{currency(payment.amount)}</Text>
                                <Text style={styles.termText}>{payment.term}</Text>
                                <Text style={styles.dateText}>{payment.date}</Text>
                                <ChevronRight size={18} color="#8ea1af" strokeWidth={2.3} />
                            </View>
                        </Pressable>
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
    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e3eaf1',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f3f6fa',
        borderRadius: 11,
        paddingHorizontal: 10,
        paddingVertical: 9,
    },
    backText: {
        fontSize: 14,
        color: '#13293d',
        fontWeight: '700',
    },
    headerTitle: {
        fontSize: 16,
        color: '#10293e',
        fontWeight: '800',
    },
    headerPlaceholder: {
        width: 62,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 28,
    },
    searchCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e2ebf3',
        padding: 14,
        marginBottom: 12,
    },
    resultsCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e2ebf3',
        padding: 14,
    },
    resultsHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 20,
        color: '#1a2f44',
        fontWeight: '800',
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#5f7082',
        fontWeight: '500',
        marginBottom: 10,
        lineHeight: 18,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    chip: {
        borderWidth: 1,
        borderColor: '#d7e1ea',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: '#f7fafd',
    },
    chipActive: {
        backgroundColor: '#009966',
        borderColor: '#009966',
    },
    chipText: {
        color: '#32485b',
        fontSize: 12,
        fontWeight: '700',
    },
    chipTextActive: {
        color: '#fff',
    },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#f7fafd',
        borderWidth: 1,
        borderColor: '#dce6ef',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 14,
        color: '#10293e',
    },
    resultCount: {
        minWidth: 28,
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: '#e8fbf3',
        color: '#009966',
        fontWeight: '800',
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        backgroundColor: '#fbfdff',
        borderWidth: 1,
        borderColor: '#e2ebf2',
        borderRadius: 16,
        padding: 12,
        marginBottom: 10,
    },
    resultLeft: {
        flex: 1,
    },
    paymentName: {
        fontSize: 15,
        fontWeight: '800',
        color: '#10293e',
        marginBottom: 3,
    },
    paymentMeta: {
        fontSize: 12,
        fontWeight: '600',
        color: '#627789',
        marginBottom: 2,
    },
    resultRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    statusPill: {
        borderRadius: 999,
        paddingHorizontal: 9,
        paddingVertical: 5,
        marginBottom: 8,
    },
    statusPaid: {
        backgroundColor: '#e8fbf3',
    },
    statusPending: {
        backgroundColor: '#fff7e6',
    },
    statusOverdue: {
        backgroundColor: '#fff1f1',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#10293e',
    },
    amountText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0f2a41',
        marginBottom: 2,
    },
    termText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#5f7082',
        marginBottom: 2,
        textAlign: 'right',
    },
    dateText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#8ea1af',
        marginBottom: 4,
    },
});
