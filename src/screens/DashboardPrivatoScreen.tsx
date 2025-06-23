import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from '../components/JobCard';
import { DashboardHeader } from '../components/DashboardHeader';
import { dashboardStyles } from '../constants/styles';
import { useUser } from '../contexts/UserContext';

const mockJobs = [
  {
    title: 'Ristrutturazione Bagno',
    description: 'Rifacimento completo bagno con nuovi sanitari e piastrelle.',
    category: 'Edilizia',
    location: 'Milano',
    status: 'Aperto' as const,
  },
  {
    title: 'Imbiancatura Appartamento',
    description: 'Imbiancatura pareti e soffitti, 90mq.',
    category: 'Pittura',
    location: 'Bergamo',
    status: 'In corso' as const,
  },
];

export const DashboardPrivatoScreen: React.FC = () => {
  // 🪝 USER CONTEXT HOOK
  const { user, isLoggedIn } = useUser();
  
  // 🎭 ANIMAZIONI COERENTI (Stile Onboarding)
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(30)).current;

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE (Coordinata con exit onboarding)
  useEffect(() => {
    console.log('🎬 Dashboard Privato entrance animations...');
    console.log('👤 User data:', { 
      user: user ? {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      } : null, 
      isLoggedIn 
    });
    
    // FASE 1: Welcome section (400ms) - Delay ridotto per fluidità
    Animated.parallel([
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100, // Delay ridotto per coordinare con exit onboarding
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      Animated.timing(welcomeTranslateY, {
        toValue: 0,
        duration: 400,
        delay: 100,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
    ]).start(() => {
      
      // FASE 2: Lista lavori (500ms)
      Animated.parallel([
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: 500,
          delay: 150,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        Animated.timing(listTranslateY, {
          toValue: 0,
          duration: 500,
          delay: 150,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <SafeAreaView style={dashboardStyles.container}>
      <DashboardHeader 
        title="Dashboard Privato" 
        subtitle="I tuoi lavori e richieste"
      />
      
      <View style={dashboardStyles.content}>
        {/* Welcome Section Animata con Dati Context */}
        <Animated.View 
          style={[
            dashboardStyles.welcomeSection,
            {
              opacity: welcomeOpacity,
              transform: [{ translateY: welcomeTranslateY }],
            }
          ]}
        >
          <Text style={dashboardStyles.welcomeTitle}>
            {user ? `Ciao ${user.name}! 🏠` : 'Benvenuto nella tua area privata! 🏠'}
          </Text>
          <Text style={dashboardStyles.welcomeSubtitle}>
            {user?.role ? `Ruolo: ${user.role} • ` : ''}Gestisci i tuoi lavori e trova i migliori professionisti
          </Text>
        </Animated.View>

        {/* Lista Lavori Animata */}
        <Animated.View 
          style={[
            dashboardStyles.listContainer,
            {
              opacity: listOpacity,
              transform: [{ translateY: listTranslateY }],
            }
          ]}
        >
          <Text style={dashboardStyles.sectionTitle}>I tuoi lavori</Text>
          
          {mockJobs.length > 0 ? (
            <FlatList
              data={mockJobs}
              keyExtractor={item => item.title}
              renderItem={({ item }) => <JobCard {...item} />}
              contentContainerStyle={{ paddingBottom: 32 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={dashboardStyles.emptyState}>
              <Text style={dashboardStyles.emptyIcon}>📋</Text>
              <Text style={dashboardStyles.emptyTitle}>Nessun lavoro attivo</Text>
              <Text style={dashboardStyles.emptyDescription}>
                Inizia creando la tua prima richiesta di lavoro
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}; 