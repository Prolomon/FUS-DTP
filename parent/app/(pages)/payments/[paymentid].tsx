import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Download, ReceiptText, Share2 } from 'lucide-react-native';
import React from 'react';
import {
    Pressable,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReceiptData = {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  method: string;
  reference: string;
  date: string;
  status: 'Paid' | 'Pending';
};

const receipts: Record<string, ReceiptData> = {
  'pay-1062': {
    id: 'pay-1062',
    title: 'School Fee - Term 2',
    amount: 125000,
    paidBy: 'Parent Wallet',
    method: 'Bank Transfer',
    reference: 'TXN-9843321-APR26',
    date: 'Apr 10, 2026 - 08:42 AM',
    status: 'Paid',
  },
  'pay-1038': {
    id: 'pay-1038',
    title: 'Transport Fee - March',
    amount: 30000,
    paidBy: 'Debit Card',
    method: 'Card',
    reference: 'TXN-9831120-MAR26',
    date: 'Mar 28, 2026 - 02:20 PM',
    status: 'Paid',
  },
  'pay-0994': {
    id: 'pay-0994',
    title: 'Examination Levy',
    amount: 12000,
    paidBy: 'USSD Account',
    method: 'USSD',
    reference: 'TXN-9790322-MAR26',
    date: 'Mar 02, 2026 - 11:08 AM',
    status: 'Paid',
  },
  'pay-0960': {
    id: 'pay-0960',
    title: 'PTA Dues',
    amount: 7000,
    paidBy: 'Debit Card',
    method: 'Card',
    reference: 'TXN-9734410-FEB26',
    date: 'Feb 18, 2026 - 05:31 PM',
    status: 'Paid',
  },
};

const currency = (value: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);

export default function PaymentReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ paymentid?: string }>();
  const paymentId = params.paymentid || '';

  const details = receipts[paymentId] || {
    id: paymentId || 'Unknown',
    title: 'Payment Receipt',
    amount: 0,
    paidBy: 'N/A',
    method: 'N/A',
    reference: 'N/A',
    date: 'N/A',
    status: 'Pending' as const,
  };

  const onShareReceipt = async () => {
    const message = [
      'Payment Receipt',
      `ID: ${details.id}`,
      `Item: ${details.title}`,
      `Amount: ${currency(details.amount)}`,
      `Method: ${details.method}`,
      `Date: ${details.date}`,
      `Reference: ${details.reference}`,
      `Status: ${details.status}`,
    ].join('\n');

    await Share.share({
      title: `Receipt ${details.id}`,
      message,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={18} color="#13293d" strokeWidth={2.6} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.receiptCard}>
          <View style={styles.receiptTop}>
            <View style={styles.iconWrap}>
              <ReceiptText size={24} color="#0f7d62" strokeWidth={2.2} />
            </View>
            <Text style={styles.receiptTitle}>Payment Receipt</Text>
            <Text style={styles.receiptId}>Receipt ID: {details.id}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>Payment For</Text>
            <Text style={styles.value}>{details.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount Paid</Text>
            <Text style={styles.value}>{currency(details.amount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{details.method}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid From</Text>
            <Text style={styles.value}>{details.paidBy}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reference</Text>
            <Text style={styles.value}>{details.reference}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{details.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.statusPill}>{details.status}</Text>
          </View>
        </View>

        <Pressable style={styles.shareButton} onPress={onShareReceipt}>
          <Share2 size={18} color="#fff" strokeWidth={2.4} />
          <Text style={styles.shareButtonText}>Share Receipt</Text>
        </Pressable>

        <Pressable style={styles.downloadGhostButton}>
          <Download size={17} color="#0f7d62" strokeWidth={2.4} />
          <Text style={styles.downloadGhostText}>Save as PDF (coming soon)</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8f6',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3eaf1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backText: {
    color: '#13293d',
    fontWeight: '700',
    fontSize: 13,
  },
  headerTitle: {
    color: '#102536',
    fontSize: 16,
    fontWeight: '800',
  },
  headerPlaceholder: {
    width: 66,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 30,
  },
  receiptCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#dbe7e2',
    padding: 14,
    marginBottom: 12,
  },
  receiptTop: {
    alignItems: 'center',
    marginBottom: 4,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#ebfaf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  receiptTitle: {
    color: '#1a3344',
    fontSize: 20,
    fontWeight: '800',
  },
  receiptId: {
    color: '#627587',
    fontSize: 12,
    marginTop: 2,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#e7eef4',
    marginTop: 10,
    marginBottom: 4,
  },
  row: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#eef3f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  label: {
    color: '#5f7385',
    fontSize: 13,
    fontWeight: '700',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    color: '#13293d',
    fontSize: 13,
    fontWeight: '700',
  },
  statusPill: {
    color: '#0e7c61',
    fontSize: 12,
    fontWeight: '800',
    backgroundColor: '#ebfaf4',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  shareButton: {
    backgroundColor: '#0f7d62',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  downloadGhostButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe7e2',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  downloadGhostText: {
    color: '#0f7d62',
    fontWeight: '700',
    fontSize: 13,
  },
});
