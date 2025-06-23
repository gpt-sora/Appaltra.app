import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { onboardingStyles } from '../constants/styles';
import { useUser, UserRole } from '../contexts/UserContext';

interface OnboardingScreenProps {
  navigation?: any; // TODO: Tipizzare correttamente con React Navigation
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  
  // 🪝 USER CONTEXT HOOK
  const { setUserRole } = useUser();
  
  // 🎭 ANIMAZIONI COERENTI CON SPLASH (Entrance Elegante)
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(30)).current;
  
  // 🔒 Navigation safety per evitare doppia navigazione
  const isNavigatingRef = useRef(false);

  // 🔄 RESET ANIMAZIONI quando si torna alla schermata
  const resetAnimations = () => {
    console.log('🔄 Resetting onboarding animations...');
    isNavigatingRef.current = false;
    
    // Reset valori iniziali
    logoScale.setValue(0.8);
    logoOpacity.setValue(0);
    titleOpacity.setValue(0);
    titleTranslateY.setValue(20);
    subtitleOpacity.setValue(0);
    subtitleTranslateY.setValue(20);
    buttonsOpacity.setValue(0);
    buttonsTranslateY.setValue(30);
  };

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE
  const startEntranceAnimation = () => {
    console.log('🎬 Starting onboarding entrance animations...');
    
    // FASE 1: Logo entrance con elastic bounce (600ms)
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 600,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), // Elastic (come splash)
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      
      // FASE 2: Testi entrance con slide-up elegante (400ms)
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          delay: 100,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(subtitleTranslateY, {
          toValue: 0,
          duration: 400,
          delay: 100,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
      ]).start(() => {
        
        // FASE 3: Bottoni entrance con slide-up (500ms)
        Animated.parallel([
          Animated.timing(buttonsOpacity, {
            toValue: 1,
            duration: 500,
            delay: 150,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
          Animated.timing(buttonsTranslateY, {
            toValue: 0,
            duration: 500,
            delay: 150,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
        ]).start();
      });
    });
  };

  // 🎯 GESTIONE FOCUS SCHERMATA (per back button)
  useFocusEffect(
    React.useCallback(() => {
      console.log('📱 Onboarding screen focused');
      resetAnimations();
      
      // Piccolo delay per evitare conflitti con transizioni native
      const timer = setTimeout(() => {
        startEntranceAnimation();
      }, 50);
      
      return () => {
        console.log('📱 Onboarding screen unfocused');
        clearTimeout(timer);
      };
    }, [])
  );

  // 🎬 MOUNT INIZIALE (solo al primo caricamento)
  useEffect(() => {
    // Questo useEffect è vuoto perché ora usiamo useFocusEffect
    // che gestisce sia il mount iniziale che i ritorni da altre schermate
  }, []);

  // 🎯 ANIMAZIONE USCITA FLUIDA (Come Splash)
  const animateExit = (callback: () => void) => {
    console.log('🚀 Starting onboarding exit transition...');
    
    // Exit fluido con fade + slide (600ms totali)
    Animated.parallel([
      // Logo: fade + scale
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 0.9,
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      // Testi: fade + slide up
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 350,
        delay: 50,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateY, {
        toValue: -10,
        duration: 350,
        delay: 50,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(subtitleOpacity, {
        toValue: 0,
        duration: 350,
        delay: 75,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(subtitleTranslateY, {
        toValue: -10,
        duration: 350,
        delay: 75,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      // Bottoni: fade + slide down
      Animated.timing(buttonsOpacity, {
        toValue: 0,
        duration: 400,
        delay: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(buttonsTranslateY, {
        toValue: 20,
        duration: 400,
        delay: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('✅ Exit animation completed, navigating...');
      callback();
    });
  };

  // 🎯 ANIMAZIONE BOTTONE + NAVIGAZIONE
  const animateButtonPress = (callback: () => void) => {
    // Previeni doppia navigazione
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    
    // Prima: feedback visivo immediato (100ms)
    const scaleValue = new Animated.Value(1);
    
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Poi: animazione uscita + navigazione
      animateExit(callback);
    });
  };

  // 🎯 GESTIONE SELEZIONE RUOLO CON CONTEXT
  const handleRoleSelection = async (role: UserRole) => {
    console.log(`🎯 Ruolo selezionato: ${role}`);
    
    try {
      // 💾 Salva ruolo nel Context + AsyncStorage
      await setUserRole(role);
      console.log('✅ Ruolo salvato nel Context:', role);
      
      // 📱 Navigazione alle dashboard
      if (navigation) {
        switch (role) {
          case 'Privato':
            navigation.navigate('DashboardPrivato');
            break;
          case 'Azienda':
            navigation.navigate('DashboardAzienda');
            break;
          case 'Professionista':
            navigation.navigate('DashboardPro');
            break;
          default:
            console.log('⚠️ Ruolo non riconosciuto:', role);
        }
      } else {
        console.log('⚠️ Navigation prop non disponibile');
      }
      
    } catch (error) {
      console.error('❌ Errore salvataggio ruolo:', error);
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.container}>
      
      <View style={onboardingStyles.content}>
        
        {/* Header con logo animato (coerente con splash) */}
        <View style={onboardingStyles.logoContainer}>
          <Animated.Image
            source={require('../../assets/logo.png')}
            style={[
              onboardingStyles.logo,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              }
            ]}
            resizeMode="contain"
          />
          <Animated.Text 
            style={[
              onboardingStyles.title,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              }
            ]}
          >
            Benvenuto in Appaltra
          </Animated.Text>
          <Animated.Text 
            style={[
              onboardingStyles.subtitle,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }],
              }
            ]}
          >
            Scegli il tuo ruolo per iniziare
          </Animated.Text>
        </View>
        
        {/* Pulsanti ruoli animati */}
        <Animated.View 
          style={[
            onboardingStyles.rolesContainer,
            {
              opacity: buttonsOpacity,
              transform: [{ translateY: buttonsTranslateY }],
            }
          ]}
        >
          
          <TouchableOpacity
            style={[onboardingStyles.roleButton, { backgroundColor: COLORS.primary }]}
            onPress={() => animateButtonPress(() => handleRoleSelection('Privato'))}
            activeOpacity={0.9}
          >
            <Text style={onboardingStyles.roleIcon}>🏠</Text>
            <View style={onboardingStyles.roleTextContainer}>
              <Text style={onboardingStyles.roleTitle}>Privato</Text>
              <Text style={onboardingStyles.roleDescription}>
                Trova professionisti per casa tua
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[onboardingStyles.roleButton, { backgroundColor: COLORS.secondary }]}
            onPress={() => animateButtonPress(() => handleRoleSelection('Azienda'))}
            activeOpacity={0.9}
          >
            <Text style={onboardingStyles.roleIcon}>🏢</Text>
            <View style={onboardingStyles.roleTextContainer}>
              <Text style={onboardingStyles.roleTitle}>Azienda</Text>
              <Text style={onboardingStyles.roleDescription}>
                Gestisci appalti e progetti
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[onboardingStyles.roleButton, { backgroundColor: COLORS.primary }]}
            onPress={() => animateButtonPress(() => handleRoleSelection('Professionista'))}
            activeOpacity={0.9}
          >
            <Text style={onboardingStyles.roleIcon}>👨‍💼</Text>
            <View style={onboardingStyles.roleTextContainer}>
              <Text style={onboardingStyles.roleTitle}>Professionista</Text>
              <Text style={onboardingStyles.roleDescription}>
                Offri i tuoi servizi specializzati
              </Text>
            </View>
          </TouchableOpacity>
          
        </Animated.View>
        
      </View>
    </SafeAreaView>
  );
}; 