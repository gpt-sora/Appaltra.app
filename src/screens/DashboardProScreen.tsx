import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobCard } from '../components/JobCard';
import { globalStyles } from '../constants/styles';

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

export const DashboardProScreen: React.FC = () => (
  <SafeAreaView style={globalStyles.containerWithPadding}>
    <Text style={globalStyles.title}>Lavori disponibili</Text>
    <FlatList
      data={mockJobs}
      keyExtractor={item => item.title}
      renderItem={({ item }) => <JobCard {...item} />}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  </SafeAreaView>
); 