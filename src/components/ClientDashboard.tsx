import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from './JobCard';
import { DashboardHeader } from './DashboardHeader';
import { dashboardStyles } from '../constants/styles';
import { useUser } from '../contexts/UserContext';

// 🎯 MOCK DATA PER CHI APPALTA
const mockClientJobs = [
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

// 🏗️ CONFIGURAZIONE PER TIPO UTENTE
interface ClientDashboardProps {
  userType: 'Privato' | 'Azienda';
  showHeader?: boolean; // Default true, false quando usato da SmartDashboard Azienda
}

const CLIENT_CONFIG = {
  Privato: {
    emoji: '🏠',
    welcomeTitle: (name?: string) => name ? `Ciao ${name}! 🏠` : 'Benvenuto nella tua area privata! 🏠',
    welcomeSubtitle: 'Gestisci i tuoi lavori e trova i migliori professionisti',
    sectionTitle: 'I tuoi lavori',
    emptyState: {
      icon: '📋',
      title: 'Nessun lavoro attivo',
      description: 'Inizia creando la tua prima richiesta di lavoro'
    }
  },
  Azienda: {
    emoji: '🏢',
    welcomeTitle: (name?: string) => name ? `Benvenuta ${name}! 🏢` : 'Area gestionale aziendale 🏢',
    welcomeSubtitle: 'Pubblica appalti e gestisci i progetti aziendali',
    sectionTitle: 'Appalti pubblicati',
    emptyState: {
      icon: '🏗️',
      title: 'Nessun appalto pubblicato',
      description: 'Pubblica il tuo primo appalto per iniziare'
    }
  }
};

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ userType, showHeader = true }) => {
  // 🪝 USER CONTEXT HOOK
  const { user, isLoggedIn } = useUser();
  
  // 🎭 ANIMAZIONI COERENTI
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(20)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(30)).current;

  // 🎨 CONFIGURAZIONE DINAMICA
  const config = CLIENT_CONFIG[userType];

  // 🎬 SEQUENZA ANIMAZIONE ENTRANCE
  useEffect(() => {
    console.log(`🎬 Client Dashboard (${userType}) entrance animations...`);
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
          subtitle={userType === 'Privato' ? 'I tuoi lavori e richieste' : 'Gestione appalti e progetti'}
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
          
          {mockClientJobs.length > 0 ? (
            <FlatList
              data={mockClientJobs}
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