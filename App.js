import { StatusBar } from 'expo-status-bar';
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './app/Screen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import TabNavigation from './app/navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { UserLocationCtx } from './app/context/UserLocationCtx';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit-bold': require('./assets/font/Outfit-Bold.ttf'),
    'outfit-semibold': require('./assets/font/Outfit-SemiBold.ttf'),
    'outfit-regular': require('./assets/font/Outfit-Regular.ttf'),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    // <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_c2V0dGxlZC1raXQtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA'>
    <UserLocationCtx.Provider value={{ location, setLocation }}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* <SignedIn> */}
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
        {/* </SignedIn> */}
        {/* <SignedOut>
          <LoginScreen />
        </SignedOut> */}
        <StatusBar style="auto" />
      </View>
    </UserLocationCtx.Provider>
    // </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
});
