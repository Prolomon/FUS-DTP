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
          <Stack.Screen name="[staffid]" options={{ headerShown: false }} />
       </Stack>
    </AuthProvider>
  );
}