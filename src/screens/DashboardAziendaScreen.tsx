import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from '../components/JobCard';
import { globalStyles } from '../constants/styles';

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

export const DashboardAziendaScreen: React.FC = () => (
  <SafeAreaView style={globalStyles.containerWithPadding}>
    <Text style={globalStyles.title}>Appalti aziendali</Text>
    <FlatList
      data={mockJobs}
      keyExtractor={item => item.title}
      renderItem={({ item }) => <JobCard {...item} />}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  </SafeAreaView>
); 