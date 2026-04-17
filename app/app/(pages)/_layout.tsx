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
        </Stack>
    </AuthProvider>
  );
}