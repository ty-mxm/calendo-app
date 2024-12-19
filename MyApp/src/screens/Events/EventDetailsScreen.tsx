import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Event } from '../../../types';

// Typage pour la navigation
type NavigationProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;
type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

export default function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { event } = route.params;
  const { title: eventName, location: team, date: bucketlist, category, id, time } = event;

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l'Événement</Text>
      </View>

      {/* Détails de l'événement */}
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.title}>{eventName}</Text>
        <Text style={styles.details}>📍 {team}</Text>
        <Text style={styles.details}>⏰ {bucketlist}</Text>
        <Text style={styles.category}>Catégorie : {category}</Text>
      </View>

      {/* Bouton Modifier */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('EditEvent', {
            event: {
              id,
              title: eventName,
              location: team,
              date: bucketlist,
              time,
              category,
            },
          })
        }
      >
        <Ionicons name="pencil-outline" size={20} color="#FFF" />
        <Text style={styles.editButtonText}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
}const styles = StyleSheet.create({
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
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  details: { fontSize: 16, color: '#666', marginBottom: 5 },
  category: { fontSize: 16, fontWeight: 'bold', color: '#7F57FF', marginTop: 10 },
  editButton: {
    backgroundColor: '#7F57FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
