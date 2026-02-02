import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FormLoginCostumer,
  SplashScreen,
  SwitchLogin
} from './components';
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const CustomHeader = () => {
  return (
    <View
      style={{
        backgroundColor: '#000000',
        paddingTop: useSafeAreaInsets().top,
      }}>
      <StatusBar backgroundColor="#000000" />

    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          } else if (route.name === 'Store') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Início', headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{ title: 'Pedidos', headerShown: false }}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{ title: 'Loja', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Perfil', headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerBackTitle: 'Voltar' }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ header: () => <CustomHeader /> }}
      />
      <Stack.Screen
        name="SwitchLogin"
        component={SwitchLogin}
        options={{ header: () => <CustomHeader /> }}
      />
      <Stack.Screen
        name="FormLoginCostumer"
        component={FormLoginCostumer}
        options={{ header: () => <CustomHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default MainStackNavigator;
