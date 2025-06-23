import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { UserProvider } from '../contexts/UserContext';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { DashboardPrivatoScreen } from '../screens/DashboardPrivatoScreen';
import { DashboardAziendaScreen } from '../screens/DashboardAziendaScreen';
import { DashboardProScreen } from '../screens/DashboardProScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{
              gestureEnabled: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DashboardPrivato" 
            component={DashboardPrivatoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DashboardAzienda" 
            component={DashboardAziendaScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DashboardPro" 
            component={DashboardProScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
} 