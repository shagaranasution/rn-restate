import GlobalProvider from '@/lib/global-context';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import './global.css';

import RubikBold from '@/assets/fonts/Rubik-Bold.ttf';
import RubikExtraBold from '@/assets/fonts/Rubik-ExtraBold.ttf';
import RubikLight from '@/assets/fonts/Rubik-Light.ttf';
import RubikMedium from '@/assets/fonts/Rubik-Medium.ttf';
import RubikRegular from '@/assets/fonts/Rubik-Regular.ttf';
import RubikSemiBold from '@/assets/fonts/Rubik-SemiBold.ttf';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': RubikBold,
    'Rubik-ExtraBold': RubikExtraBold,
    'Rubik-Light': RubikLight,
    'Rubik-Medium': RubikMedium,
    'Rubik-Regular': RubikRegular,
    'Rubik-SemiBold': RubikSemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
