import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

// Typage des paramètres pour la route
type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

export default function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation();
  const { event } = route.params;

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l'Événement</Text>
      </View>

      {/* Carte d'événement */}
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>📍 {event.location}</Text>
        <Text style={styles.details}>⏰ {event.time}</Text>
        <Text style={styles.details}>📅 {event.date}</Text>
        <Text style={styles.category}>Catégorie : {event.category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
  },
  eventDetailsContainer: {
    margin: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  details: { fontSize: 16, color: '#666', marginBottom: 5 },
  category: { fontSize: 16, fontWeight: 'bold', color: '#7F57FF', marginTop: 10 },
});
