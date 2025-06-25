import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from './JobCard';
import { DashboardHeader } from './DashboardHeader';
import { dashboardStyles } from '../constants/styles';
import { useUser } from '../contexts/UserContext';

// 🎯 MOCK DATA PER CHI SI OFFRE
const mockProviderJobs = [
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

// 🏗️ CONFIGURAZIONE PER TIPO UTENTE
interface ProviderDashboardProps {
  userType: 'Professionista' | 'Azienda';
  showHeader?: boolean; // Default true, false quando usato da SmartDashboard Azienda
}

const PROVIDER_CONFIG = {
  Professionista: {
    emoji: '👨‍💼',
    welcomeTitle: (name?: string) => name ? `Benvenuto ${name}! 👨‍💼` : 'Area professionista 👨‍💼',
    welcomeSubtitle: 'Trova nuovi lavori e gestisci le tue offerte',
    sectionTitle: 'Lavori disponibili',
    emptyState: {
      icon: '🔧',
      title: 'Nessun lavoro disponibile',
      description: 'Controlla più tardi per nuove opportunità'
    }
  },
  Azienda: {
    emoji: '🏢',
    welcomeTitle: (name?: string) => name ? `Benvenuta ${name}! 🏢` : 'Area fornitore aziendale 🏢',
    welcomeSubtitle: 'Rispondi ad appalti e gestisci le offerte aziendali',
    sectionTitle: 'Appalti disponibili',
    emptyState: {
      icon: '🏗️',
      title: 'Nessun appalto disponibile',
      description: 'Controlla più tardi per nuove opportunità di business'
    }
  }
};

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ userType, showHeader = true }) => {
  // 🪝 USER CONTEXT HOOK
  const { user, isLoggedIn } = useUser();
  
  // 🎭 ANIMAZIONI COERENTI
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(30)).current;

  // 🎨 CONFIGURAZIONE DINAMICA
  const config = PROVIDER_CONFIG[userType];

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE
  useEffect(() => {
    console.log(`🎬 Provider Dashboard (${userType}) entrance animations...`);
    console.log('👤 User data:', { 
      user: user ? {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      } : null, 
      isLoggedIn 
    });
    
    // FASE 1: Welcome section (400ms)
    Animated.parallel([
      Animated.timing(welcomeOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100,
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
  }, [userType]);

  return (
    <SafeAreaView style={dashboardStyles.container}>
      {showHeader && (
        <DashboardHeader 
          title={`Dashboard ${userType}`}
          subtitle={userType === 'Professionista' ? 'Lavori disponibili e offerte' : 'Appalti e opportunità aziendali'}
        />
      )}
      
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
            {config.welcomeTitle(user?.name)}
          </Text>
          <Text style={dashboardStyles.welcomeSubtitle}>
            {user?.role ? `Ruolo: ${user.role} • ` : ''}{config.welcomeSubtitle}
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
          <Text style={dashboardStyles.sectionTitle}>{config.sectionTitle}</Text>
          
          {mockProviderJobs.length > 0 ? (
            <FlatList
              data={mockProviderJobs}
              keyExtractor={item => item.title}
              renderItem={({ item }) => <JobCard {...item} />}
              contentContainerStyle={{ paddingBottom: 32 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={dashboardStyles.emptyState}>
              <Text style={dashboardStyles.emptyIcon}>{config.emptyState.icon}</Text>
              <Text style={dashboardStyles.emptyTitle}>{config.emptyState.title}</Text>
              <Text style={dashboardStyles.emptyDescription}>
                {config.emptyState.description}
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}; 