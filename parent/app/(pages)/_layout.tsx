import { AuthProvider } from '@/hooks/useAuth';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};


export default function RootLayout() {
  return (
    <AuthProvider>
       <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pickup" options={{ headerShown: false, contentStyle: { backgroundColor: '#f8fafc' } }} />
          <Stack.Screen name="payments" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
          <Stack.Screen name="chat" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
          <Stack.Screen name="authenticator" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
          <Stack.Screen name="records" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
          <Stack.Screen name="result" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
          <Stack.Screen name="student" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
          <Stack.Screen name="live" options={{ headerShown: false, contentStyle: { backgroundColor: '#f4f8f6' } }} />
        </Stack> 
    </AuthProvider>
  );
}