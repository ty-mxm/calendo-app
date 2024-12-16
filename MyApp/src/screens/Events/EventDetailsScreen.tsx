import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';

// Typage des paramètres pour la route
type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

export default function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>📍 {event.location}</Text>
      <Text style={styles.details}>⏰ {event.time}</Text>
      <Text style={styles.details}>📅 {event.date}</Text>
      <Text style={styles.category}>Catégorie: {event.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  details: { fontSize: 16, marginBottom: 5 },
  category: { fontSize: 16, fontWeight: 'bold', color: '#7F57FF', marginTop: 10 },
});
