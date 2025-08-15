import { useGlobalContext } from '@/lib/global-context';
import { Link, Redirect } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  const { user } = useGlobalContext();

  if (!user) return <Redirect href={'/sign-in'} />;

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
    </View>
  );
}
