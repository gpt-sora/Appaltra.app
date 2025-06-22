import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { jobCardStyles } from '../constants/styles';

export type JobCardProps = {
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'Aperto' | 'In corso' | 'Completato';
  imageUri?: string;
  onPress?: () => void;
};

const getStatusStyle = (status: JobCardProps['status']) => {
  switch (status) {
    case 'Aperto':
      return jobCardStyles.statusOpen;
    case 'In corso':
      return jobCardStyles.statusInProgress;
    case 'Completato':
      return jobCardStyles.statusCompleted;
    default:
      return jobCardStyles.statusOpen;
  }
};

export const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  category,
  location,
  status,
  imageUri,
  onPress,
}) => {
  return (
    <Pressable
      style={jobCardStyles.container}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Lavoro: ${title}, categoria: ${category}, stato: ${status}`}
      accessibilityHint="Tocca per vedere i dettagli del lavoro"
      android_ripple={{ color: COLORS.primary }}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={jobCardStyles.imageContainer}
          accessibilityIgnoresInvertColors
          accessibilityLabel="Immagine del lavoro"
        />
      ) : null}
      <View style={jobCardStyles.contentContainer}>
        <Text style={jobCardStyles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={jobCardStyles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={jobCardStyles.metaContainer}>
          <Text style={jobCardStyles.category}>{category}</Text>
          <Text style={jobCardStyles.location}>{location}</Text>
        </View>
      </View>
      <View style={[jobCardStyles.statusContainer, getStatusStyle(status)]}>
        <Text style={jobCardStyles.statusText}>{status}</Text>
      </View>
    </Pressable>
  );
}; 