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
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="student" options={{ headerShown: false }} />
          <Stack.Screen name="authenticator" options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
  );
}