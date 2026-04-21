import { Tabs } from 'expo-router';
import { School, User, Group, Users, Home } from 'lucide-react-native';
import React from 'react';

import type { GestureResponderEvent } from 'react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomTabBarButtonProps = {
  children: React.ReactNode;
  accessibilityState?: { selected?: boolean };
  onPress?: (event: GestureResponderEvent) => void;
  [x: string]: any;
};

function CustomTabBarButton({ children, accessibilityState, onPress, ...rest }: CustomTabBarButtonProps) {
  const focused = accessibilityState?.selected;
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        margin: 6,
        overflow: 'hidden',
        backgroundColor: focused ? '#f3f4f6' : '#fff',
      }}
      {...rest}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden' }}>
        {children}
      </View>
    </Pressable>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#009966', // royal blue
        tabBarInactiveTintColor: '#687076', // gray
        tabBarActiveBackgroundColor: '#f3f4f6', // light gray background for active tab
        tabBarInactiveBackgroundColor: '#fff', // white for inactive tabs
        tabBarStyle: {
          backgroundColor: '#fff', // whole tab bar background white
          borderTopWidth: 0.5,
          borderTopColor: '#e5e7eb', // subtle border
          paddingTop: 8,
          paddingHorizontal: 8,
          height: 90 + insets.bottom, // increase height to accommodate larger icons and padding
          paddingBottom: insets.bottom,
        },
        headerShown: false,
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}>
      <Tabs.Screen
        name="class"
        options={{
          title: 'Class',
          tabBarIcon: ({ color, focused }) => <Group size={28} color={focused ? '#009966' : color} />,
        }}
      />
      <Tabs.Screen
        name="staff"
        options={{
          title: 'Staffs',
          tabBarIcon: ({ color, focused }) => <Users size={28} color={focused ? '#009966' : color} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Home size={28} color={focused ? '#009966' : color} />,
        }}
      />
      <Tabs.Screen
        name="parent"
        options={{
          title: 'Parents',
          tabBarIcon: ({ color, focused }) => <Users size={28} color={focused ? '#009966' : color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <User size={28} color={focused ? '#009966' : color} />,
        }}
      />
    </Tabs>
  );
}
