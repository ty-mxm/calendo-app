// src/views/EventDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { EventController } from '../controllers/EventController';
import { Event } from '../models/Event';
import { RootStackParamList } from '../../../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;
type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

export default function EventDetailsScreen() {
  const route = useRoute<EventDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { eventId } = route.params;

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const fetchedEvent = await EventController.getEventById(eventId);
        if (fetchedEvent) {
          setEvent(fetchedEvent);
        } else {
          alert("L'événement n'a pas été trouvé !");
          navigation.goBack();
        }
      } catch (error) {
        alert("Erreur lors de la récupération des détails de l'événement.");
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Chargement...</Text>
      </View>
    );
  }

  const { title, location, date, time, category } = event;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l'Événement</Text>
      </View>

      <View style={styles.eventDetailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>📍 {location}</Text>
        <Text style={styles.details}>⏰ {date}</Text>
        <Text style={styles.details}>🕒 {time}</Text>
        <Text style={styles.category}>Catégorie : {category}</Text>
      </View>
      <TouchableOpacity
  style={styles.voteButton}
  onPress={() => navigation.navigate('VoteScreen', { eventId })}
>
  <Text style={styles.voteButtonText}>Voter</Text>
</TouchableOpacity>

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
  voteButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  voteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
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
});
