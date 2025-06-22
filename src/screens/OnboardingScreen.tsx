import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { onboardingStyles } from '../constants/styles';

const ROLES = [
  { key: 'privato', label: 'Privato', descr: 'Devo ristrutturare il bagno' },
  { key: 'azienda', label: 'Azienda', descr: 'Appalto di costruzione per 4 villette' },
  { key: 'pro', label: 'Professionista', descr: 'Muratore, idraulico, elettricista...' },
];

export const OnboardingScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectRole = (role: string) => setSelectedRole(role);

  const handleContinue = () => {
    if (selectedRole === 'privato') navigation.navigate('DashboardPrivato');
    else if (selectedRole === 'azienda') navigation.navigate('DashboardAzienda');
    else if (selectedRole === 'pro') navigation.navigate('DashboardPro');
  };

  const getRoleCardStyle = (isSelected: boolean) => [
    onboardingStyles.roleCard,
    isSelected ? onboardingStyles.roleCardSelected : onboardingStyles.roleCardUnselected,
  ];

  return (
    <SafeAreaView style={onboardingStyles.container}>
      <Text style={onboardingStyles.title}>Benvenuto su Appaltra</Text>
      <Text style={onboardingStyles.subtitle}>Seleziona il tuo ruolo per iniziare:</Text>
      <FlatList
        data={ROLES}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Pressable
            style={getRoleCardStyle(selectedRole === item.key)}
            onPress={() => handleSelectRole(item.key)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Ruolo: ${item.label}`}
            accessibilityState={{ selected: selectedRole === item.key }}
            accessibilityHint="Tocca per selezionare il ruolo"
          >
            <Text style={onboardingStyles.roleTitle}>{item.label}</Text>
            <Text style={onboardingStyles.roleDescription}>{item.descr}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ width: '100%' }}
      />
      {selectedRole && (
        <Pressable
          style={onboardingStyles.continueButton}
          onPress={handleContinue}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Continua"
        >
          <Text style={onboardingStyles.continueButtonText}>Continua</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}; 