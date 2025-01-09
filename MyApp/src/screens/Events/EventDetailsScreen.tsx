import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const { title, location, date, time } = event;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l'événement</Text>
      </View>

      {/* Event Details */}
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailRow}>
          <MaterialIcons name="place" size={20} color="#6495ED" />
          <Text style={styles.details}>{location}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="event" size={20} color="#6495ED" />
          <Text style={styles.details}>{date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="access-time" size={20} color="#6495ED" />
          <Text style={styles.details}>{time}</Text>
        </View>
      </View>

      {/* Vote Button */}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F57FF', // Same purple as vote button
    paddingVertical: 40, 
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  eventDetailsContainer: {
    margin: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  details: { fontSize: 16, color: '#666', marginLeft: 8 },
  voteButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#6495ED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  voteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
});
