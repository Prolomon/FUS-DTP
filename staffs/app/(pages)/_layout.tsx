import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from '@/hooks/useAuth';

export const unstable_settings = {
  anchor: '(tabs)',
};


export default function RootLayout() {
  return (
    <AuthProvider>
       <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pickup" options={{ headerShown: false }} />
          <Stack.Screen name="code" options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
  );
}