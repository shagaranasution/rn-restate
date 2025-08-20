import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-context';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      await refetch();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text className="font-rubik-bold text-2xl">Welcome to ReState</Text>
      <Link href={'/explore'}>Explore</Link>
      <Link href={'/profile'}>Profile</Link>
      <Link href={'/properties/1'}>Property</Link>

      <TouchableOpacity onPress={handleLogout} className="text-black">
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
