import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ClientDashboard } from './ClientDashboard';
import { ProviderDashboard } from './ProviderDashboard';
import { DashboardHeader } from './DashboardHeader';
import { useUser } from '../contexts/UserContext';
import { COLORS } from '../constants/colors';
import { dashboardStyles } from '../constants/styles';

// 🎯 MODALITÀ AZIENDA
type AziendaMode = 'Cliente' | 'Fornitore';

// 🎨 STILI HEADER AZIENDA COMPLETO
const aziendaHeaderStyles = {
  headerContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    paddingBottom: 16,
    marginBottom: 16,
  },
  navigationRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold' as const,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: COLORS.textDark,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center' as const,
    marginTop: 2,
  },
  placeholder: {
    width: 40, // Bilanciare il back button
  },
  toggleContainer: {
    flexDirection: 'row' as const,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center' as const,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButtonInactive: {
    backgroundColor: 'transparent',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.primary,
  },
  toggleTextActive: {
    color: COLORS.white,
  },
  toggleTextInactive: {
    color: COLORS.textLight,
  },
};

export const SmartDashboard: React.FC = () => {
  // 🪝 HOOKS
  const { user } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // 🔄 STATO MODALITÀ AZIENDA
  const [aziendaMode, setAziendaMode] = useState<AziendaMode>('Cliente');
  
  // 🎭 ANIMAZIONI TOGGLE
  const toggleOpacity = useRef(new Animated.Value(0)).current;
  const toggleTranslateY = useRef(new Animated.Value(-10)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  // 🎬 ANIMAZIONE ENTRANCE TOGGLE
  useEffect(() => {
    if (user?.role === 'Azienda') {
      console.log('🎬 SmartDashboard Toggle Header animations...');
      
      // Animazione toggle header
      Animated.parallel([
        Animated.timing(toggleOpacity, {
          toValue: 1,
          duration: 300,
          delay: 200,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(toggleTranslateY, {
          toValue: 0,
          duration: 300,
          delay: 200,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animazione contenuto
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Per Privato/Professionista, mostra subito il contenuto
      contentOpacity.setValue(1);
    }
  }, [user?.role]);

  // 🔙 HANDLE BACK NAVIGATION
  const handleBackPress = () => {
    navigation.goBack();
  };

  // 🔄 HANDLE TOGGLE SWITCH
  const handleToggleSwitch = (mode: AziendaMode) => {
    if (mode === aziendaMode) return;
    
    console.log(`🔄 Switching azienda mode: ${aziendaMode} → ${mode}`);
    
    // Animazione fade out → change → fade in
    Animated.timing(contentOpacity, {
      toValue: 0,
      duration: 150,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      useNativeDriver: true,
    }).start(() => {
      setAziendaMode(mode);
      
      // Fade in nuovo contenuto
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 200,
        delay: 50,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }).start();
    });
  };

  // 🎯 RENDERING CONDIZIONALE BASATO SU RUOLO
  const renderDashboard = () => {
    if (!user) {
      return (
        <View style={dashboardStyles.container}>
          <Text>Caricamento...</Text>
        </View>
      );
    }

    switch (user.role) {
      case 'Privato':
        console.log('📱 Rendering ClientDashboard for Privato');
        return <ClientDashboard userType="Privato" />;
        
      case 'Professionista':
        console.log('📱 Rendering ProviderDashboard for Professionista');
        return <ProviderDashboard userType="Professionista" />;
        
      case 'Azienda':
        console.log(`📱 Rendering Azienda Dashboard - Mode: ${aziendaMode}`);
        return (
          <SafeAreaView style={dashboardStyles.container}>
            {/* 🎛️ HEADER AZIENDA COMPLETO */}
            <Animated.View 
              style={[
                aziendaHeaderStyles.headerContainer,
                {
                  opacity: toggleOpacity,
                  transform: [{ translateY: toggleTranslateY }],
                }
              ]}
            >
              {/* Navigation Row */}
              <View style={aziendaHeaderStyles.navigationRow}>
                <TouchableOpacity 
                  style={aziendaHeaderStyles.backButton}
                  onPress={handleBackPress}
                  activeOpacity={0.7}
                >
                  <Text style={aziendaHeaderStyles.backIcon}>←</Text>
                </TouchableOpacity>
                
                <View style={aziendaHeaderStyles.titleContainer}>
                  <Text style={aziendaHeaderStyles.title}>Dashboard Azienda</Text>
                  <Text style={aziendaHeaderStyles.subtitle}>
                    Modalità {aziendaMode} attiva
                  </Text>
                </View>
                
                <View style={aziendaHeaderStyles.placeholder} />
              </View>

              {/* Toggle Buttons */}
              <View style={aziendaHeaderStyles.toggleContainer}>
                              <TouchableOpacity
                  style={[
                    aziendaHeaderStyles.toggleButton,
                    aziendaMode === 'Cliente' 
                      ? aziendaHeaderStyles.toggleButtonActive 
                      : aziendaHeaderStyles.toggleButtonInactive
                  ]}
                  onPress={() => handleToggleSwitch('Cliente')}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    aziendaHeaderStyles.toggleText,
                    aziendaMode === 'Cliente' 
                      ? aziendaHeaderStyles.toggleTextActive 
                      : aziendaHeaderStyles.toggleTextInactive
                  ]}>
                    👤 Cliente
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    aziendaHeaderStyles.toggleButton,
                    aziendaMode === 'Fornitore' 
                      ? aziendaHeaderStyles.toggleButtonActive 
                      : aziendaHeaderStyles.toggleButtonInactive
                  ]}
                  onPress={() => handleToggleSwitch('Fornitore')}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    aziendaHeaderStyles.toggleText,
                    aziendaMode === 'Fornitore' 
                      ? aziendaHeaderStyles.toggleTextActive 
                      : aziendaHeaderStyles.toggleTextInactive
                  ]}>
                    🔧 Fornitore
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* 📱 CONTENUTO DASHBOARD */}
            <Animated.View 
              style={[
                { flex: 1 },
                { opacity: contentOpacity }
              ]}
            >
              {aziendaMode === 'Cliente' ? (
                <View style={{ flex: 1, paddingTop: 0 }}>
                  <ClientDashboard userType="Azienda" showHeader={false} />
                </View>
              ) : (
                <View style={{ flex: 1, paddingTop: 0 }}>
                  <ProviderDashboard userType="Azienda" showHeader={false} />
                </View>
              )}
            </Animated.View>
          </SafeAreaView>
        );
        
      default:
        return (
          <View style={dashboardStyles.container}>
            <Text>Ruolo non riconosciuto</Text>
          </View>
        );
    }
  };

  return renderDashboard();
}; 