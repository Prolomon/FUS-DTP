import { Tabs } from 'expo-router';
import { Baby, FileText, MapPin, User, School } from 'lucide-react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

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
        tabBarActiveTintColor: '#4169E1', // royal blue
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
        name="child"
        options={{
          title: 'Children',
          tabBarIcon: ({ color, focused }) => <Baby size={28} color={focused ? '#4169E1' : color} />,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, focused }) => <FileText size={28} color={focused ? '#4169E1' : color} />,
        }}
      />
      <Tabs.Screen
        name="school"
        options={{
          title: 'School',
          tabBarIcon: ({ color, focused }) => <School size={28} color={focused ? '#4169E1' : color} />,
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Track',
          tabBarIcon: ({ color, focused }) => <MapPin size={28} color={focused ? '#4169E1' : color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <User size={28} color={focused ? '#4169E1' : color} />,
        }}
      />
    </Tabs>
  );
}
