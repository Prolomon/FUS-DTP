import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthenticatorScreen() {
  const router = useRouter();
  const totalSeconds = 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((current) => (current > 0 ? current - 1 : totalSeconds));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progress = (totalSeconds - secondsRemaining) / totalSeconds;
  const handRotation = progress * 360;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#009966" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginLeft: 12 }}>Authenticator</Text>
        </View>

        {/* Main Content */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 20, shadowColor: '#009966', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 16 }}>Two-Factor Authentication</Text>
            <Text style={{ fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 24 }}>
              Use the code below to carry out any action on the portal.
            </Text>

            {/* Clock Loading */}
            <View style={{ backgroundColor: '#f3f4f6', borderRadius: 12, padding: 28, alignItems: 'center', marginBottom: 24, minHeight: 280, justifyContent: 'center' }}>
              <View style={{ width: 180, height: 180, borderRadius: 90, borderWidth: 4, borderColor: '#009966', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#009966' }} />
                <View style={{ position: 'absolute', width: 2, height: 72, backgroundColor: '#009966', borderRadius: 1, transform: [{ rotate: `${handRotation}deg` }, { translateY: -36 }] }} />
                <Text style={{ position: 'absolute', top: 12, fontSize: 14, fontWeight: 'bold', color: '#009966' }}>12</Text>
                <Text style={{ position: 'absolute', right: 14, fontSize: 14, fontWeight: 'bold', color: '#009966' }}>3</Text>
                <Text style={{ position: 'absolute', bottom: 10, fontSize: 14, fontWeight: 'bold', color: '#009966' }}>6</Text>
                <Text style={{ position: 'absolute', left: 14, fontSize: 14, fontWeight: 'bold', color: '#009966' }}>9</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 6 }}>Loading for 1 minute</Text>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#009966' }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </Text>
            </View>

            {/* Setup Code */}
            <View style={{ backgroundColor: '#f7faff', borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#666', marginBottom: 12, fontWeight: 900 }}>Auth Code</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                {['4', '7', '2', '9', '1', '5'].map((digit, index) => (
                  <View
                    key={index}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 8,
                      backgroundColor: '#fff',
                      borderWidth: 2,
                      borderColor: '#009966',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#009966' }}>{digit}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Enable Button */}
            <TouchableOpacity style={{ backgroundColor: '#009966', borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Regenerate Code</Text>
            </TouchableOpacity>
          </View>
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
});
