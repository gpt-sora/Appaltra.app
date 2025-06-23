import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from '../components/JobCard';
import { DashboardHeader } from '../components/DashboardHeader';
import { dashboardStyles } from '../constants/styles';
import { useUser } from '../contexts/UserContext';

const mockJobs = [
  {
    title: 'Costruzione Villette',
    description: 'Appalto per costruzione di 4 villette a schiera.',
    category: 'Edilizia',
    location: 'Monza',
    status: 'Aperto' as const,
  },
  {
    title: 'Rifacimento Impianto Elettrico',
    description: 'Impianto elettrico nuovo per capannone industriale.',
    category: 'Elettricista',
    location: 'Como',
    status: 'Completato' as const,
  },
];

export const DashboardAziendaScreen: React.FC = () => {
  // 🪝 USER CONTEXT HOOK
  const { user, isLoggedIn } = useUser();
  
  // 🎭 ANIMAZIONI COERENTI (Stile Onboarding)
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(30)).current;

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE
  useEffect(() => {
    console.log('🎬 Dashboard Azienda entrance animations...');
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
      
      // FASE 2: Lista appalti (500ms)
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
        title="Dashboard Azienda" 
        subtitle="Gestione appalti e progetti"
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
            {user ? `Benvenuta ${user.name}! 🏢` : 'Area gestionale aziendale 🏢'}
          </Text>
          <Text style={dashboardStyles.welcomeSubtitle}>
            {user?.role ? `Ruolo: ${user.role} • ` : ''}Monitora i tuoi appalti e gestisci i progetti in corso
          </Text>
        </Animated.View>

        {/* Lista Appalti Animata */}
        <Animated.View 
          style={[
            dashboardStyles.listContainer,
            {
              opacity: listOpacity,
              transform: [{ translateY: listTranslateY }],
            }
          ]}
        >
          <Text style={dashboardStyles.sectionTitle}>Appalti aziendali</Text>
          
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
              <Text style={dashboardStyles.emptyIcon}>🏗️</Text>
              <Text style={dashboardStyles.emptyTitle}>Nessun appalto attivo</Text>
              <Text style={dashboardStyles.emptyDescription}>
                Pubblica il tuo primo appalto per iniziare
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}; 