import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { BackHandler, Platform, StatusBar, Toast, ToastAndroid } from 'react-native';
import { en, registerTranslation } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import MainStackNavigator from './Navigator';
import { navigationRef } from './services/NavigatorService';
import store from './store';

registerTranslation('en', en);

export default function App() {
  const backPressedOnce = useRef(false);

  useEffect(() => {
    const isAtRootScreen = () => {
      if (navigationRef.current) {
        const state = navigationRef.current.getRootState();
        return (
          state &&
          state.routes &&
          state.routes.length === 1 &&
          state.index === 0
        );
      }
      return true;
    };

    const handleBackPress = () => {
      if (isAtRootScreen()) {
        if (backPressedOnce.current) {
          return false;
        } else {
          backPressedOnce.current = true;

          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Pressione novamente para sair',
              ToastAndroid.SHORT,
            );
          } else {
            Toast.show({
              type: 'info',
              text1: 'Pressione novamente para sair',
              position: 'bottom',
            });
          }

          setTimeout(() => {
            backPressedOnce.current = false;
          }, 2000);

          return true;
        }
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#000000FF" />
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <MainStackNavigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}
