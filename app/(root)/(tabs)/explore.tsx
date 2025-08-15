import { logout } from '@/lib/appwrite';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Explore() {
  const { replace } = useRouter();
  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      replace('/sign-in');
    } else {
      console.log('Fail to logout');
    }
  };

  return (
    <View>
      <Text className="text-red-700">Explore</Text>
    </View>
  );
}
