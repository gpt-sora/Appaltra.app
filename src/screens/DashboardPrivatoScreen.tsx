import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from '../components/JobCard';
import { globalStyles } from '../constants/styles';

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

export const DashboardPrivatoScreen: React.FC = () => (
  <SafeAreaView style={globalStyles.containerWithPadding}>
    <Text style={globalStyles.title}>I tuoi lavori</Text>
    <FlatList
      data={mockJobs}
      keyExtractor={item => item.title}
      renderItem={({ item }) => <JobCard {...item} />}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  </SafeAreaView>
); 