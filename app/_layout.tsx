import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Load fonts or other assets here
        await Font.loadAsync({
          'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('@/assets/fonts/Roboto-Bold.ttf'),
        });

        // Simulate a delay for testing (optional)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        // Hide the splash screen once everything is ready
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!isReady) {
    return null; // Keep the splash screen visible
  }

  return (
    <Stack>
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    </Stack>
  );
}
