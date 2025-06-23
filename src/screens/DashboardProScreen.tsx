import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from '../components/JobCard';
import { DashboardHeader } from '../components/DashboardHeader';
import { dashboardStyles } from '../constants/styles';
import { useUser } from '../contexts/UserContext';

const mockJobs = [
  {
    title: 'Installazione Caldaia',
    description: 'Sostituzione caldaia e collaudo impianto.',
    category: 'Idraulico',
    location: 'Lecco',
    status: 'In corso' as const,
  },
  {
    title: 'Manutenzione Elettrica',
    description: 'Controllo e manutenzione impianto elettrico domestico.',
    category: 'Elettricista',
    location: 'Varese',
    status: 'Aperto' as const,
  },
];

export const DashboardProScreen: React.FC = () => {
  // 🪝 USER CONTEXT HOOK
  const { user, isLoggedIn } = useUser();
  
  // 🎭 ANIMAZIONI COERENTI (Stile Onboarding)
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(30)).current;

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE
  useEffect(() => {
    console.log('🎬 Dashboard Professionista entrance animations...');
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
        title="Dashboard Professionista" 
        subtitle="Lavori disponibili e offerte"
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
            {user ? `Benvenuto ${user.name}! 👨‍💼` : 'Area professionista 👨‍💼'}
          </Text>
          <Text style={dashboardStyles.welcomeSubtitle}>
            {user?.role ? `Ruolo: ${user.role} • ` : ''}Trova nuovi lavori e gestisci le tue offerte
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
          <Text style={dashboardStyles.sectionTitle}>Lavori disponibili</Text>
          
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
              <Text style={dashboardStyles.emptyIcon}>🔧</Text>
              <Text style={dashboardStyles.emptyTitle}>Nessun lavoro disponibile</Text>
              <Text style={dashboardStyles.emptyDescription}>
                Controlla più tardi per nuove opportunità
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}; 