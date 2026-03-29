import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import DashboardScreen from './src/screens/DashboardScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createStackNavigator();

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#131313', // Ether Dark Background
    primary: '#536DFE',    // Ether Dark Primary
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppDarkTheme}>
        <StatusBar style="light" />
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            // Subtle transition settings
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen 
            name="Camera" 
            component={CameraScreen} 
            options={{ 
               // Treat the camera like a modal presentation for polish
               presentation: 'modal',
               cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS 
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
