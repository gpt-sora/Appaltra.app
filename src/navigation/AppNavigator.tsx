import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { DashboardPrivatoScreen } from '../screens/DashboardPrivatoScreen';
import { DashboardAziendaScreen } from '../screens/DashboardAziendaScreen';
import { DashboardProScreen } from '../screens/DashboardProScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  DashboardPrivato: undefined;
  DashboardAzienda: undefined;
  DashboardPro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="DashboardPrivato" component={DashboardPrivatoScreen} />
      <Stack.Screen name="DashboardAzienda" component={DashboardAziendaScreen} />
      <Stack.Screen name="DashboardPro" component={DashboardProScreen} />
    </Stack.Navigator>
  </NavigationContainer>
); 