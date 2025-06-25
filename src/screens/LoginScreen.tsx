import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  Image, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { COLORS } from '../constants/colors';
import { loginStyles } from '../constants/styles';

interface LoginScreenProps {
  navigation?: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // 🪝 HOOKS
  const { login, user } = useUser();
  const isNavigatingRef = useRef(false);

  // 🔄 STATO FORM
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 🎭 ANIMAZIONI (Pattern identico a OnboardingScreen)
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;

  // 🔄 RESET ANIMAZIONI (Pattern OnboardingScreen)
  const resetAnimations = () => {
    logoOpacity.setValue(0);
    logoScale.setValue(0.8);
    titleOpacity.setValue(0);
    titleTranslateY.setValue(20);
    subtitleOpacity.setValue(0);
    subtitleTranslateY.setValue(20);
    formOpacity.setValue(0);
    formTranslateY.setValue(30);
    buttonOpacity.setValue(0);
    buttonTranslateY.setValue(30);
  };

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE (Pattern OnboardingScreen)
  const startEntranceAnimation = () => {
    console.log('🎬 Starting login entrance animations...');
    
    // FASE 1: Logo entrance con elastic bounce (600ms)
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 600,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), // Elastic (come splash/onboarding)
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
        
        // FASE 3: Form entrance con slide-up (500ms)
        Animated.parallel([
          Animated.timing(formOpacity, {
            toValue: 1,
            duration: 500,
            delay: 150,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
          Animated.timing(formTranslateY, {
            toValue: 0,
            duration: 500,
            delay: 150,
            easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
            useNativeDriver: true,
          }),
        ]).start(() => {
          
          // FASE 4: Button entrance (300ms)
          Animated.parallel([
            Animated.timing(buttonOpacity, {
              toValue: 1,
              duration: 300,
              delay: 100,
              easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
              useNativeDriver: true,
            }),
            Animated.timing(buttonTranslateY, {
              toValue: 0,
              duration: 300,
              delay: 100,
              easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
              useNativeDriver: true,
            }),
          ]).start();
        });
      });
    });
  };

  // 🎯 GESTIONE FOCUS SCHERMATA (Pattern OnboardingScreen)
  useFocusEffect(
    React.useCallback(() => {
      console.log('📱 Login screen focused');
      resetAnimations();
      
      // Piccolo delay per evitare conflitti con transizioni native
      const timer = setTimeout(() => {
        startEntranceAnimation();
      }, 50);
      
      return () => {
        console.log('📱 Login screen unfocused');
        clearTimeout(timer);
      };
    }, [])
  );

  // 🎯 VALIDAZIONE EMAIL
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email richiesta');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Email non valida');
      return false;
    }
    setEmailError('');
    return true;
  };

  // 🎯 VALIDAZIONE PASSWORD
  const validatePassword = (password: string): boolean => {
    if (!password.trim()) {
      setPasswordError('Password richiesta');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password deve essere di almeno 6 caratteri');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // 🎯 ANIMAZIONE USCITA FLUIDA (Pattern OnboardingScreen)
  const animateExit = (callback: () => void) => {
    console.log('🚀 Starting login exit transition...');
    
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
      // Form: fade + slide down
      Animated.timing(formOpacity, {
        toValue: 0,
        duration: 400,
        delay: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 20,
        duration: 400,
        delay: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('✅ Login exit animation completed, navigating...');
      callback();
    });
  };

  // 🎯 ANIMAZIONE BOTTONE + LOGIN
  const animateButtonPress = async () => {
    // Previeni doppia navigazione
    if (isNavigatingRef.current || isLoading) return;
    
    // Validazioni
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      // Animazione shake per errori
      const shakeAnimation = new Animated.Value(0);
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();
      return;
    }

    isNavigatingRef.current = true;
    setIsLoading(true);

    try {
      // Prima: feedback visivo immediato (100ms)
      const scaleValue = new Animated.Value(1);
      
      await new Promise(resolve => {
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
        ]).start(resolve);
      });

      // Mock login con Context API esistente
      console.log('🔐 Attempting login...', { email, role: user?.role });
      
      const success = await login(email, password, user?.role || 'Privato');

      if (success) {
        console.log('✅ Login successful, navigating to SmartDashboard...');
        
        // Animazione uscita + navigazione
        animateExit(() => {
          navigation?.replace('SmartDashboard');
        });
      } else {
        throw new Error('Login failed');
      }

    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('Errore', 'Errore durante il login. Riprova.');
      setIsLoading(false);
      isNavigatingRef.current = false;
    }
  };

  // 🎯 GESTIONE BACK BUTTON
  const handleBackPress = () => {
    if (isLoading) return;
    
    animateExit(() => {
      navigation?.goBack();
    });
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView
        style={loginStyles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 🔙 BACK BUTTON */}
          <TouchableOpacity 
            style={loginStyles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Text style={loginStyles.backIcon}>←</Text>
          </TouchableOpacity>

          {/* 🎨 LOGO SECTION */}
          <Animated.View 
            style={[
              loginStyles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              }
            ]}
          >
            <Image 
              source={require('../../assets/logo.png')} 
              style={loginStyles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* 📝 TITLE SECTION */}
          <Animated.View 
            style={[
              loginStyles.titleContainer,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              }
            ]}
          >
            <Text style={loginStyles.title}>Bentornato!</Text>
            <Animated.View
              style={[
                {
                  opacity: subtitleOpacity,
                  transform: [{ translateY: subtitleTranslateY }],
                }
              ]}
            >
              <Text style={loginStyles.subtitle}>
                Accedi al tuo account {user?.role || 'Privato'}
              </Text>
            </Animated.View>
          </Animated.View>

          {/* 📋 FORM SECTION */}
          <Animated.View 
            style={[
              loginStyles.formContainer,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }],
              }
            ]}
          >
            {/* Email Input */}
            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  loginStyles.input,
                  emailError ? loginStyles.inputError : null
                ]}
                placeholder="inserisci la tua email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateEmail(text);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
              />
              {emailError ? (
                <Text style={loginStyles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  loginStyles.input,
                  passwordError ? loginStyles.inputError : null
                ]}
                placeholder="inserisci la tua password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) validatePassword(text);
                }}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
              />
              {passwordError ? (
                <Text style={loginStyles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity style={loginStyles.forgotPasswordContainer}>
              <Text style={loginStyles.forgotPasswordText}>
                Hai dimenticato la password?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* 🎯 LOGIN BUTTON */}
          <Animated.View
            style={[
              {
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslateY }],
              }
            ]}
          >
            <TouchableOpacity
              style={[
                loginStyles.loginButton,
                isLoading ? loginStyles.loginButtonDisabled : null
              ]}
              onPress={animateButtonPress}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Text style={loginStyles.loginButtonText}>
                {isLoading ? 'Accesso in corso...' : 'Accedi'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* 📝 REGISTER LINK */}
          <View style={loginStyles.registerContainer}>
            <Text style={loginStyles.registerText}>
              Non hai un account?{' '}
            </Text>
            <TouchableOpacity>
              <Text style={loginStyles.registerLink}>Registrati</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}; 