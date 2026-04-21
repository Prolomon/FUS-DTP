
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';

import { useRouter } from 'expo-router';

// import { login } from '@/lib/services/staff';

const styles = StyleSheet.create({
    gradientBg: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    topBubble: {
        position: 'absolute',
        top: -60,
        left: -40,
        width: 180,
        height: 180,
        borderRadius: 90,
        opacity: 0.7,
    },
    bottomBubble: {
        position: 'absolute',
        bottom: -60,
        right: -40,
        width: 180,
        height: 180,
        borderRadius: 90,
        opacity: 0.7,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    cardContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 28,
        shadowColor: '#009966',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 8,
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 16,
    },
    title: {
        marginBottom: 8,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#009966',
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 24,
        fontSize: 15,
        color: '#009966',
        textAlign: 'center',
        fontWeight: '500',
    },
    inputWrap: {
        width: '100%',
        marginBottom: 18,
    },
    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#e0e7ff',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f7f9ff',
        fontSize: 16,
        color: '#222',
        shadowColor: '#009966',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    showHideBtn: {
        marginLeft: 8,
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#e0ffef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 12,
        marginTop: 12,
        overflow: 'hidden',
        elevation: 0,
    },
    buttonGradient: {
        width: '100%',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

const LOGO = require('../assets/images/arqelion_staff.png');

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0.5, duration: 120, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 120, useNativeDriver: true })
        ]).start(() => setShowPassword(false));
        try {
            if (!email || !password) {
                ToastAndroid.showWithGravity(
                    'Please enter email and password',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                return;
            }

            ToastAndroid.showWithGravity(
                'Login successful! Redirecting...',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );

            router.replace('/(pages)/(tabs)/home');

        } catch (error: any) {
            console.log('Login error:', error);
            ToastAndroid.showWithGravity(
                error.message || 'An error occurred, try again',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } finally {
            setLoading(false);
        }
    };

    // Animate show/hide toggle
    const toggleShowPassword = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0.5, duration: 120, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 120, useNativeDriver: true })
        ]).start(() => setShowPassword(!showPassword));
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Gradient background bubbles */}
            <LinearGradient
                colors={["#e0e7ff", "#fff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientBg}
            />
            <LinearGradient
                colors={["#009966", "#fff"]}
                style={styles.topBubble}
            />
            <LinearGradient
                colors={["#009966", "#fff"]}
                style={styles.bottomBubble}
            />
            <KeyboardAvoidingView
                style={styles.centeredContent}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <View style={styles.cardContainer}>
                    <Image source={LOGO} style={styles.logo} resizeMode="contain" />
                    <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>Sign in to continue</ThemedText>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#888"
                            editable={!loading}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.passwordRow}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="#888"
                                editable={!loading}
                            />
                            <Animated.View style={{ opacity: fadeAnim }}>
                                <TouchableOpacity onPress={toggleShowPassword} style={styles.showHideBtn}>
                                    {showPassword ? <EyeOff size={22} color="#009966" /> : <Eye size={22} color="#888" />}
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={loading ? undefined : handleLogin} activeOpacity={0.85}>
                        <LinearGradient
                            colors={["#009966", "#009966"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <View style={styles.buttonRow}>
                                {loading ? (
                                    <ThemedText type="link" style={styles.buttonText}>Loading...</ThemedText>) : (<>
                                        <Lock size={18} color="#fff" style={{ marginRight: 8 }} />
                                        <ThemedText type="link" style={styles.buttonText}>Log In</ThemedText></>)}
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;
