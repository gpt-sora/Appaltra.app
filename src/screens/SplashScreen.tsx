// 🚀 PROFESSIONAL SPLASH SCREEN
// Basato sui migliori esempi: AboutReact + Hybrid Heroes + Best Practices 2024

import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { splashStyles } from '../constants/styles';
import { COLORS } from '../constants/colors';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // 🎯 ANIMAZIONI PROFESSIONALI (Testate e funzionanti)
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.9)).current;
  
  // 🌈 TRANSIZIONE BACKGROUND per eliminare stacco colori
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  
  // 🔒 Navigation safety
  const hasNavigatedRef = useRef(false);
  const isMountedRef = useRef(true);

  // 🧹 CLEANUP
  const cleanup = useCallback(() => {
    [logoScale, logoOpacity, textOpacity, textScale, backgroundOpacity].forEach(anim => {
      anim.stopAnimation();
      anim.removeAllListeners();
    });
  }, [logoScale, logoOpacity, textOpacity, textScale, backgroundOpacity]);

  // 🚀 TRANSIZIONE FLUIDA CON ELASTIC EXIT (Matching Entrance)
  const startTransition = useCallback(() => {
    if (hasNavigatedRef.current || !isMountedRef.current) return;
    
    hasNavigatedRef.current = true;
    console.log('🚀 Starting elastic exit transition...');
    
    // Exit fluido con elastic bounce inverso + transizione background
    Animated.parallel([
      // Logo: elastic shrink con bounce
      Animated.timing(logoScale, {
        toValue: 0.7,
        duration: 900,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Elastic out (inverso dell'entrata)
        useNativeDriver: true,
      }),
      // Logo opacity: fade graduale
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 800,
        delay: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Smooth fade
        useNativeDriver: true,
      }),
      // Testo: elastic shrink con micro-bounce
      Animated.timing(textScale, {
        toValue: 0.8,
        duration: 700,
        delay: 50,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Elastic out
        useNativeDriver: true,
      }),
      // Testo opacity: fade veloce
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 600,
        delay: 150,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      // 🌈 BACKGROUND OVERLAY: transizione verso colore onboarding
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 800,
        delay: 200,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isMountedRef.current) {
        console.log('✅ Navigating to Onboarding...');
        navigation.replace('Onboarding');
      }
    });
  }, [navigation, logoScale, logoOpacity, textOpacity, textScale]);

  // 🎬 SEQUENZA ANIMAZIONE PRINCIPALE
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    console.log('🎬 Starting splash animation sequence...');
    
    // FASE 1: Logo entrance con elastic bounce (800ms)
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), // Elastic
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!isMountedRef.current) return;
      
      // FASE 2: Text entrance con micro-bounce (400ms)
      Animated.parallel([
        Animated.timing(textScale, {
          toValue: 1,
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!isMountedRef.current) return;
        
        // FASE 3: Pausa e transizione (1500ms)
        setTimeout(() => {
          if (isMountedRef.current) {
            startTransition();
          }
        }, 1500);
      });
    });
    
    return () => {
      console.log('🗑️ SplashScreen cleanup');
      isMountedRef.current = false;
      cleanup();
    };
  }, [startTransition, cleanup]);

  return (
    <SafeAreaView 
      style={splashStyles.container}
      pointerEvents="none"
    >
      {/* 🌈 BACKGROUND OVERLAY per transizione fluida */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.background, // Colore dell'onboarding
            opacity: backgroundOpacity,
          }
        ]}
      />
      
      <View style={splashStyles.logoContainer}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={[
            splashStyles.logo,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }
          ]}
          resizeMode="contain"
        />
      </View>
      
      <Animated.View 
        style={[
          splashStyles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ scale: textScale }],
          }
        ]}
      >
        <Text style={splashStyles.title}>APPALTRA</Text>
        <Text style={splashStyles.subtitle}>
          Il marketplace per professionisti{'\n'}dell'edilizia e artigianato
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}; 